//Imports
import express, { Request, Response, Application } from "express";
const dotenv = require("dotenv");

//Set stuff up
dotenv.config();
const app: Application = express();

// The port the express app will listen on
const port = process.env.PORT || 3000;

// Start the Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

// Dummy route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
