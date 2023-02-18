//Imports
import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import { PrismaClient, Candidate } from "@prisma/client";
import { v4 } from "uuid";

//Set stuff up
dotenv.config();
const candidateRouter: Router = express.Router();
const prisma = new PrismaClient();

//Routes for /candidate

//Upload a candidate
candidateRouter.post("/", async (req: Request, res: Response) => {
  const { name, ra, dec } = req.body; //ra and dec are in degrees
  if (!name || !ra || !dec) {
    //Check if all fields are present
    res.status(400).json({ message: "Missing name, ra, or dec" });
    return;
  }

  await prisma.candidate //Create the candidate
    .create({
      data: {
        id: v4(),
        name,
        ra,
        dec,
      },
    })
    .then((candidate: Candidate) => {
      //If successful, return the candidate
      return res
        .status(200)
        .json({ message: "Candidate successfully created", candidate });
    }) //If not, check if it's a duplicate and return an error
    .catch((err: any) => {
      if (err.code === "P2002") {
        res.status(400).json({
          message: "Error creating candidate",
          error: "Candidate already exists",
        });
        return;
      }
      res.status(500).json({ message: "Error creating candidate", error: err });
      return;
    });
});

//Get a candidate by id
candidateRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params; //Get the id from the url
  await prisma.candidate //Find the candidate
    .findUnique({
      where: {
        id,
      },
    })
    .then((candidate: Candidate | null) => {
      //If successful, return the candidate
      if (!candidate)
        return res.status(404).json({ message: "Candidate not found" });

      res.status(200).json({ message: "Candidate Found", candidate });
      return;
    })
    .catch((err: any) => {
      //If not, return an error
      res.status(500).json({ message: "Error finding candidate", error: err });
      return;
    });
});

//Get all candidates
candidateRouter.get("/", async (req: Request, res: Response) => {
  const candidates: void | Candidate[] | null = await prisma.candidate //Find all candidates
    .findMany()
    .catch((err: any) => {
      res.status(500).json({ message: "Error finding candidates", error: err });
      return;
    });

  if (!candidates)
    //If there are no candidates, return an error
    return res.status(404).json({ message: "No candidates found" });

  return res.status(200).json({ message: "Candidates Found", candidates }); //If successful, return the candidates
});

//Exports
export default candidateRouter;
