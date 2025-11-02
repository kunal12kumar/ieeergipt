import clientPromise from "@/lib/mongodb";

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

  console.log('=== Registration API Called ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Request Body:', JSON.stringify(req.body, null, 2));

  try {
    const { name, rollNumber, email, hackerrankId, whatsappNumber, event } = req.body;

    // Validate required fields
    if (!name || !rollNumber || !email || !hackerrankId || !whatsappNumber || !event) {
      console.error('Validation failed - missing fields:', {
        name: !!name,
        rollNumber: !!rollNumber,
        email: !!email,
        hackerrankId: !!hackerrankId,
        whatsappNumber: !!whatsappNumber,
        event: !!event
      });
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log('Fields validated successfully');
    console.log('Attempting MongoDB connection...');

    // Connect with timeout and retry logic
    let client;
    let retries = 3;
    let lastError;
    
    while (retries > 0) {
      try {
        console.log(`Connection attempt ${4 - retries}/3`);
        client = await Promise.race([
          clientPromise,
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Connection timeout after 10s')), 10000)
          )
        ]);
        console.log('MongoDB connected successfully!');
        break;
      } catch (err) {
        lastError = err;
        retries--;
        console.error(`Connection attempt failed. Retries left: ${retries}`);
        console.error('Error:', err.message);
        console.error('Error stack:', err.stack);
        
        if (retries === 0) {
          console.error('All connection attempts failed');
          throw err;
        }
        
        console.log('Waiting 1s before retry...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('Accessing database and collection...');
    const db = client.db("ieee-events");
    const collection = db.collection("registrations");
    console.log('Database and collection accessed successfully');

    // Check for duplicates
    console.log('Checking for duplicate registration...');
    const existingRegistration = await collection.findOne({
      $or: [{ email, event }, { rollNumber, event }]
    });

    if (existingRegistration) {
      console.log('Duplicate registration found:', existingRegistration._id);
      return res.status(409).json({ 
        message: "Already registered for this event"
      });
    }

    console.log('No duplicate found, inserting new registration...');

    // Insert registration
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

    console.log('Registration inserted successfully:', result.insertedId);

    return res.status(201).json({ 
      message: "Registration successful", 
      id: result.insertedId,
      success: true
    });

  } catch (error) {
    console.error("=== REGISTRATION ERROR ===");
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);
    console.error("Error Code:", error.code);
    console.error("Error Stack:", error.stack);
    console.error("Full Error Object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    console.error("========================");
    
    // Specific error handling
    if (error.message?.includes('SSL') || error.message?.includes('TLS')) {
      return res.status(503).json({ 
        message: "Database connection error. Please try again.",
        error: "TLS/SSL connection failed",
        details: error.message
      });
    }

    if (error.message?.includes('timeout') || error.message?.includes('Connection timeout')) {
      return res.status(504).json({ 
        message: "Database connection timed out. Please try again.",
        error: "Connection timeout",
        details: error.message
      });
    }

    if (error.name === 'MongoServerSelectionError' || error.name === 'MongoNetworkError') {
      return res.status(503).json({ 
        message: "Cannot connect to database. Please try again later.",
        error: error.name,
        details: error.message
      });
    }

    return res.status(500).json({ 
      message: "Server error. Please try again.",
      error: error.message,
      errorName: error.name,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}