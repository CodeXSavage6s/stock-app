import mongoose from 'mongoose'

declare global {
  var dbCache: {
    conn: typeof mongoose | null;
  };
}


if (!global.dbCache) {
  global.dbCache = {
    conn: null,
  };
}

export default async function connectDB() {
  try {
    if (global.dbCache.conn) {
      console.log("Reusing cached connection");
      return global.dbCache.conn;
    }
  
    if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }
  
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  
    global.dbCache.conn = conn;
  
    console.log("Connected to MongoDB");
    //console.log("Con", global.dbCache.conn)
  
    return conn;
  } catch (err) {
    console.error("failed to connect to database", err)
    throw err
  }
}
