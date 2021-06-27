import { sequelize } from "../../db";
import { DataTypes } from "sequelize";

export const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

export const Post = sequelize.define("posts", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});

export const Message = sequelize.define("messages", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  conversationId: { type: DataTypes.INTEGER, allowNull: false },
  senderId: { type: DataTypes.INTEGER, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
});

export const Conversation = sequelize.define("conversations", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  members: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false },
});

User.hasMany(Post);
Post.belongsTo(User);

const models = { User, Message, Post, Conversation };

export default models;
