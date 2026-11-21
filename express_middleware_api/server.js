
import express from "express";
import fs from "fs";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 6500;

// 1. Application-level middleware
// 4. Third-party middleware
app.use(cors());
app.use(morgan("dev"));

// 3. Built-in middleware for parsing JSON request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application-level middleware for logging request details
const logger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const period = Date.now() - start;
        const log = `${req.method} ${req.originalUrl} ${res.statusCode} - ${period}ms`;

        fs.appendFile("server.log", log + "\n", (err) => {
            if (err) {
                console.log(err);
            }
        });
    });

    next();
};

// 2. Route-specific middleware
const validatePatient = (req, res, next) => {
    const { name, age, word } = req.body;

    if (!name || !age || !word) {
        return res.status(400).json({
            message: "Invalid patient data"
        });
    }

    next();
};

app.use(logger);

// Health check root route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Express Middleware API is running" });
});

// CRUD OPERATIONS

// POST - Create
app.post("/api/v1/patients", validatePatient, (req, res) => {
    res.status(201).json({
        message: "Patient created successfully"
    });
});

// GET - Read all
app.get("/api/v1/patients", (req, res) => {
    res.status(200).json({
        message: "Patients fetched successfully"
    });
});

// GET - Read by ID
app.get("/api/v1/patients/:id", (req, res) => {
    const { id } = req.params;

    if (id < 1) {
        const err = new Error("Patient not found");
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        message: "Patient details fetched successfully"
    });
});

// PUT - Update
app.put("/api/v1/patients/:id", validatePatient, (req, res) => {
    const { id } = req.params;

    if (id < 1) {
        const err = new Error("Patient not found");
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        message: "Patient updated successfully"
    });
});

// DELETE
app.delete("/api/v1/patients/:id", (req, res) => {
    const { id } = req.params;

    if (id < 1) {
        const err = new Error("Patient not found");
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        message: "Patient deleted successfully"
    });
});

// 5. Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({ message });
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({
        message: "Resource not found"
    });
});

// Start server
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
