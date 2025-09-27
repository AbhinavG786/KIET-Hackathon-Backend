import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionObj = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.DB_NAME}`
    );
    console.log(`Successfully connected to database`);
  } catch (error) {
    console.log("Database connection failed.");
    process.exit(1);
  }
};

export default connectDB;
