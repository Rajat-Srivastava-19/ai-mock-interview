import mongoose from 'mongoose';

export async function connect() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI as string;

    if (!MONGODB_URI) {
      throw new Error("❌ MONGODB_URI not defined in .env.local");
    }

    await mongoose.connect(MONGODB_URI);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('✅ MongoDB connected successfully');
    });

    connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      process.exit();
    });

  } catch (error) {
    console.error('Something went wrong while connecting to MongoDB!');
    console.error(error);
  }
}
