// import express from "express";
// import * as dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";

// dotenv.config(); 

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: "50mb"}));
// app.use(express.urlencoded({ extended: true}));

// app.get("/",async(req,res) => {
//     res.status(200).json({
//         message:"Hello developers from Pappie"
//     });
// } );

// const connectDB = () => {
//     mongoose.set("strictQuery", true);
//     mongoose
//       .connect(process.env.MONGODB_URL)
//       .then(() => console.log("Connected to MongoDB"))
//       .catch((err) => {
//         console.error("failed to connect with mongo");
//         console.error(err);
//       });
//   };

// const startServer = async() => {
//     try {
//         await connectDB();
//       app.listen(8002, () => console.log("Server running at port 8002"))   
//     } catch (error) {
//         console.log(error);   
//     }
// };

// startServer();

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/User.js"

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));


app.use("/api/user", userRoutes)

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Hello developers from Pappie"
    });
});



const connectDB = async () => {
    mongoose.set("strictQuery", true);
    try {
        console.log('MongoDB URL:', process.env.MONGODB_URL); // Log the URI
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect with MongoDB");
        console.error(err);
    }
};

const startServer = async () => {
    try {
        await connectDB(); // Ensure DB connection
        app.listen(8002, () => console.log("Server running at port 8002"));
    } catch (error) {
        console.log("Error starting server:", error);
    }
};

startServer();
