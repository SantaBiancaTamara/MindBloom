import mongoose from 'mongoose'


 const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri, {});
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;


