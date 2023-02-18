//Imports
import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

//Set stuff up
dotenv.config();
const app: Application = express();
const prisma = new PrismaClient();

//Middleware
app.use(express.json());

// The port the express app will listen on
const port = process.env.PORT || 3000;

// Start the Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

//Import routes
import candidateRouter from "./candidate";
import photometryRouter from "./photometry";

//Use routes
app.use("/candidate", candidateRouter);
app.use("/photometry", photometryRouter);
