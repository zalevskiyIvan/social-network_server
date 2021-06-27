import { Request, Response } from "express";
import { User } from "../models/models";

export const userController = {
  getById: async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;
      const user = await User.findOne({ where: { id: userId } });
      res.json(user);
    } catch (error) {
      res.status(500).json(error ? error : { message: `server error` });
    }
  },
};
