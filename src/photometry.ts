//Imports
import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import { PrismaClient, Photometry } from "@prisma/client";
import { v4 } from "uuid";

//Set stuff up
dotenv.config();
const photometryRouter: Router = express.Router();
const prisma = new PrismaClient();

//Routes for /photometry

//Upload photometry data for a candidate
photometryRouter.post("/:id", async (req: Request, res: Response) => {
  const { id } = req.params; //Get the id from the url

  //Check if the candidate exists
  const candidate = await prisma.candidate.findUnique({
    where: {
      id,
    },
  });

  if (!candidate) {
    //If not, return an error
    res.status(400).json({ message: "Candidate does not exist" });
    return;
  }

  const { value, error, obs_date } = req.body; //Get the photometry data from the request body

  if (!value || !error || !obs_date) {
    //Check if all fields are present
    res.status(400).json({ message: "Missing value, error, or obs_date" });
    return;
  }

  const date: Date = new Date(obs_date);

  await prisma.photometry //Create the photometry data
    .create({
      data: {
        id: v4(),
        value,
        error,
        obs_date: date,
        candidate_id: id,
      },
    })
    .then((photometry: Photometry) => {
      //If successful, return the photometry data
      return res
        .status(200)
        .json({ message: "Photometry successfully created", photometry });
    }) //If not, check if it's a duplicate and return an error
    .catch((err: any) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Error creating photometry", error: err });
      return;
    });
});

//Get a given piece of photometry data by id
photometryRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params; //Get the id from the url

  await prisma.photometry //Find the photometry data
    .findUnique({
      where: {
        id,
      },
    })
    .then((photometry: Photometry | null) => {
      if (!photometry) {
        //If not found, return an error
        res.status(400).json({ message: "Photometry not found" });
        return;
      }
      //If successful, return the photometry data
      return res
        .status(200)
        .json({ message: "Photometry successfully retrieved", photometry });
    })
    .catch((err: any) => {
      res
        .status(500)
        .json({ message: "Error retrieving photometry", error: err });
      return;
    });
});

//Export the router
export default photometryRouter;
