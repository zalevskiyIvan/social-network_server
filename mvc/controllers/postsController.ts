import { Request, Response } from "express";
import { Post } from "../models/models";

export const postController = {
  getAll: (req: Request, res: Response) => {
    try {
      const { limit, page } = req.body;
      const offset = limit * (page - 1);
      const posts = Post.findAndCountAll({ limit, offset });
      res.json(posts);
    } catch (error) {
      res.status(500).json(error ? error : { message: "server error" });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { title, description, img, userId } = req.body;
      const post = await Post.create({ title, description, img, userId });
      res.json(post);
    } catch (error) {
      res.status(500).json(error ? error : { message: "server error" });
    }
  },
};
