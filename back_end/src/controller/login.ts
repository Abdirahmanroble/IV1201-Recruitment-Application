import { Request, Response } from "express";
import Person from "../model/person";

export const getUser = async (req: Request, res: Response) => {
  try {
    const name = req.method === "POST" ? req.body.name : req.query.name;

    const user = await Person.findAll({
      where: {
        name: name,
      },
    });

    if (user) {
      res.json(user);

      console.log(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
};
