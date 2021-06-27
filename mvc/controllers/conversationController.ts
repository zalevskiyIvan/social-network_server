import { Request, Response } from "express";
import { Op } from "sequelize";
import { Conversation } from "../models/models";

export const conversationController = {
  createConversation: async (req: Request, res: Response) => {
    try {
      const { senderId, reciverId } = req.body;
      const newConversation = await Conversation.create({
        members: [senderId, reciverId],
      });
      res.json(newConversation);
    } catch (error) {
      res.status(500).json(error ? error : { message: `server error` });
    }
  },
  getConversation: async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;
      const conversation = await Conversation.findAll({
        where: { members: { [Op.contains]: [`${userId}`] } },
      });
      res.json(conversation);
    } catch (error) {
      res.status(500).json(error ? error : { message: `server error` });
    }
  },
  // getMessage: async (req: Request, res: Response) => {
  //   try {
  //     const { reciverId, senderId } = req.query;
  //     const messages = await Message.findAll({
  //       where: { reciverId, senderId },
  //     });
  //     res.json(messages);
  //   } catch (error) {
  //     res.status(500).json(error ? error : { message: `server error` });
  //   }
  // },
};
