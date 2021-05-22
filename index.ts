import express from "express";
import mongoose from "mongoose";
require("dotenv").config();
const cors = require("cors");

// routes
const auth = require("./routes/auth");
const protectedRoute = require("./routes/protected");

const app = express();
const PORT = 8000;

// middleware
app.use(cors());
app.use(express.json());

// connect to db
mongoose.connect(
    process.env.DB_CONNECT!,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB!");
    }
);

app.get("/", (req: any, res: any) => res.send("Basic User Auth API"));

app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});

app.use("/auth/user", auth);
app.use("/protected", protectedRoute);
