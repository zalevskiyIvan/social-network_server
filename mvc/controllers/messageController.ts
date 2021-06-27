import { Request, Response } from "express";
import { Message } from "../models/models";

export const mesageController = {
  create: async (req: Request, res: Response) => {
    try {
      const { senderId, text, conversationId } = req.body;
      const newMessage = await Message.create({
        senderId,
        text,
        conversationId,
      });
      res.json(newMessage);
    } catch (error) {
      res.status(500).json(error ? error : { message: `server error` });
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const { conversationId } = req.query;
      const messages = await Message.findAll({ where: { conversationId } });
      res.json(messages);
    } catch (error) {
      res.status(500).json(error ? error : { message: `server error` });
    }
  },
};
