//Imports
import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import { PrismaClient, Candidate } from "@prisma/client";
import { uuid } from "uuidv4";

//Set stuff up
dotenv.config();
const candidateRouter: Router = express.Router();
const prisma = new PrismaClient();

//Routes for /candidate

//Upload a candidate
candidateRouter.post("/", async (req: Request, res: Response) => {
  const { name, ra, dec } = req.body;
  const candidate: void | Candidate = await prisma.candidate
    .create({
      data: {
        id: uuid(),
        name,
        ra,
        dec,
      },
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating candidate", error: err });
      return;
    });

  if (!candidate)
    return res.status(500).json({ message: "Error creating candidate" });

  res
    .status(200)
    .json({ message: "Candidate successfully created", candidate });
});

//Get a candidate by id
candidateRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const candidate: void | Candidate | null = await prisma.candidate
    .findUnique({
      where: {
        id,
      },
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding candidate", error: err });
      return;
    });

  if (!candidate)
    return res.status(404).json({ message: "Candidate not found" });

  res.status(200).json({ message: "Candidate Found", candidate });
});

//Get all candidates
candidateRouter.get("/", async (req: Request, res: Response) => {
  const candidates: void | Candidate[] = await prisma.candidate
    .findMany()
    .catch((err) => {
      res.status(500).json({ message: "Error finding candidates", error: err });
      return;
    });

  if (!candidates)
    return res.status(404).json({ message: "No candidates found" });

  res.status(200).json({ message: "Candidates Found", candidates });
});

//Exports
export default candidateRouter;
