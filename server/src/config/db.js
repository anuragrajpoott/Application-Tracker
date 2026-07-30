// src/config/db.js

import mongoose from "mongoose";

const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGODB_URI);

  console.log(`✓ MongoDB Connected: ${connection.host}`);
};

export default connectDB;