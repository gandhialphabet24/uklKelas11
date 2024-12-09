import dotenv from "dotenv";
import path from "path";
export const SECRET = process.env.SECRET;
export const BASE_URL = `${path.join(__dirname, "../")}`;
dotenv.config();

export const PORT = process.env.PORT;
