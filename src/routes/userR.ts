import express from "express";
import {
  authentication,
  createUser,
  deleteUser,
  getAllUser,
  updateUser,
} from "../controllers/user";
import { verifyRole, verifyToken } from "../middlewares/authorization";
import {
  verifyAddAdmin,
  verifyAddUser,
  verifyAuthentification,
  verifyUpdateUser,
} from "../middlewares/userValidation";

const app = express();
app.use(express.json());

app.get(`/`, getAllUser);
app.post(`/create/user`, [verifyAddUser], createUser);
app.post(`/create/admin`, [verifyAddAdmin], createUser);
app.put(`/update/:id`, [verifyUpdateUser], updateUser);
app.post(`/login`, [verifyAuthentification], authentication);
app.delete(`/delete/:id`, deleteUser);

//Start Code Here!!!

export default app;
