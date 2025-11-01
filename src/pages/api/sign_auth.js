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

  try {
    const { name, rollNumber, email, hackerrankId, whatsappNumber, event } = req.body;

    // Validate required fields
    if (!name || !rollNumber || !email || !hackerrankId || !whatsappNumber || !event) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Connect with timeout and retry logic
    let client;
    let retries = 3;
    
    while (retries > 0) {
      try {
        client = await Promise.race([
          clientPromise,
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Connection timeout')), 10000)
          )
        ]);
        break;
      } catch (err) {
        retries--;
        if (retries === 0) throw err;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const db = client.db("ieee-events");
    const collection = db.collection("registrations");

    // Check for duplicates
    const existingRegistration = await collection.findOne({
      $or: [{ email, event }, { rollNumber, event }]
    });

    if (existingRegistration) {
      return res.status(409).json({ 
        message: "Already registered for this event"
      });
    }

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

    return res.status(201).json({ 
      message: "Registration successful", 
      id: result.insertedId,
      success: true
    });

  } catch (error) {
    console.error("Registration Error:", error);
    
    // Specific error handling
    if (error.message?.includes('SSL') || error.message?.includes('TLS')) {
      return res.status(503).json({ 
        message: "Database connection error. Please try again.",
        error: "TLS/SSL connection failed"
      });
    }

    if (error.name === 'MongoServerSelectionError') {
      return res.status(503).json({ 
        message: "Cannot connect to database. Please try again later.",
        error: "Server selection failed"
      });
    }

    return res.status(500).json({ 
      message: "Server error. Please try again.",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}