// Core Modules
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./src/config/db");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/users");

// Routes middleware
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);


const { createFolder } = require("./src/utils/os");
const { connect } = require('http2');
app.get("/api/createProject", (req, res) => {
    res.send({
        hello: "World"
    })
})

app.post("/api/createProject", (req, res) => {
    createFolder(req.body.project)
    res.send({
        message: "Your project is created"
    })
})


const server = app.listen(PORT, () => {
    console.log(`Notre seveur démarre sur localhost:${PORT}`);
    connectDB();
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});
