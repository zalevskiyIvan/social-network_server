import { Request, Response } from "express";
import { User } from "../models/models";
import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcrypt";

const createAccessToken = (userID: number) => {
  return jwt.sign({ userID }, config.get("jwt_secret"), {
    expiresIn: config.get("access_expireIn"),
  });
};
const createRefreshToken = (userID: number) => {
  return jwt.sign({ userID }, config.get("jwt_secret"), {
    expiresIn: config.get("refresh_expireIn"),
  });
};

const createTokens = (userID: number) => {
  const accessToken = createAccessToken(userID);
  const refreshToken = createRefreshToken(userID);
  return { accessToken, refreshToken };
};

export const authController = {
  signUp: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 5);
      const user: any = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      const { accessToken, refreshToken } = createTokens(user.id);
      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      res.json(user);
    } catch (error) {
      res.status(500).json(error ? error : { message: "server error" });
    }
  },
  logIn: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user: any = await User.findOne({ where: { email } }); // ! Спросить, как типизировать
      if (!user)
        return res.status(400).json({ message: "пользователь не найден" });

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: "пароли не совпадают" });
      }

      const { accessToken, refreshToken } = createTokens(user.id);

      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      res.json(user);
    } catch (error) {
      res.status(500).json(error ? error : { message: "server error" });
    }
  },
  isAuth: async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      const userID = req.userID;
      const user = await User.findOne({ where: { id: userID } });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error ? error : { message: `server error` });
    }
  },
};
