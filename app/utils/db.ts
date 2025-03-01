import mongoose from "mongoose";

const connect = async () => {
  console.log(process.env.MONGODB_URL);
  if (mongoose.connections[0].readyState) return;

  const mongoUrl = process.env.MONGODB_URL;

  if (!mongoUrl) {
    throw new Error(
      "MongoDB connection string is undefined. Please check your environment variables."
    );
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log("Connection Successful");
  } catch (error) {
    if (error instanceof Error) {
      // Narrowing error to the Error type
      console.error("Error connecting to MongoDB:", error.message);
    } else {
      // Fallback in case error is not an instance of Error
      console.error("Unexpected error:", error);
    }
    throw error; // Re-throw the error after handling
  }
};

export default connect;
