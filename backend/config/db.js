const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is required to load environment variables

const connectDB = async () => {
    try {
        // Use the correct environment variable
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true, // This should be true
            useUnifiedTopology: true, // This should be true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
