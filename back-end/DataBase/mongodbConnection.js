import mongoose from 'mongoose';

const connectmongodb = async () => {
    try {
        
        await mongoose.connect("mongodb+srv://kishorethageesh:test123@cluster0.czn8c1a.mongodb.net/CartRabbit?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connection established with database");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
}

export default connectmongodb;
