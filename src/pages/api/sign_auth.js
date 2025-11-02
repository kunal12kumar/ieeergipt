// pages/api/sign_auth.js
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    console.log('API route hit!');
    console.log('Environment check:', {
      hasMongoUri: !!process.env.MONGODB_URI,
      nodeEnv: process.env.NODE_ENV
    });

    // Test without MongoDB first
    const { name, rollNumber, email, hackerrankId, whatsappNumber, event } = req.body;

    if (!name || !rollNumber || !email || !hackerrankId || !whatsappNumber || !event) {
      return res.status(400).json({ 
        message: "Missing required fields",
        received: { name: !!name, rollNumber: !!rollNumber, email: !!email, hackerrankId: !!hackerrankId, whatsappNumber: !!whatsappNumber, event: !!event }
      });
    }

    console.log('Fields validated, attempting MongoDB import...');

    // Dynamic import to catch import errors
    let clientPromise;
    try {
      const mongoModule = await import('@/lib/mongodb');
      clientPromise = mongoModule.default;
      console.log('MongoDB module imported successfully');
    } catch (importError) {
      console.error('MongoDB import failed:', importError);
      return res.status(500).json({
        message: "Database module import failed",
        error: importError.message,
        stack: importError.stack
      });
    }

    console.log('Attempting connection...');
    const client = await Promise.race([
      clientPromise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout after 8 seconds')), 8000)
      )
    ]);

    console.log('Connected! Accessing database...');
    const db = client.db("ieee-events");
    const collection = db.collection("registrations");

    const existingRegistration = await collection.findOne({
      $or: [{ email, event }, { rollNumber, event }]
    });

    if (existingRegistration) {
      return res.status(409).json({ 
        message: "Already registered for this event"
      });
    }

    const result = await collection.insertOne({
      name: name.trim(),
      rollNumber: rollNumber.trim(),
      email: email.trim().toLowerCase(),
      hackerrankId: hackerrankId.trim(),
      whatsappNumber: whatsappNumber.trim(),
      event,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('Registration successful:', result.insertedId);

    return res.status(201).json({ 
      message: "Registration successful", 
      id: result.insertedId,
      success: true
    });

  } catch (error) {
    console.error("=== FULL ERROR ===");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("Code:", error.code);
    console.error("==================");
    
    return res.status(500).json({ 
      message: "Server error",
      error: error.message,
      errorName: error.name,
      errorCode: error.code,
      stack: error.stack
    });
  }
}