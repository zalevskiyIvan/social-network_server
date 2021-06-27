import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("soc-network", "ivan", "120956", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});
