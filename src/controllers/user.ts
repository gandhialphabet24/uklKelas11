import { Request, Response, response } from "express";
import { PrismaClient } from "@prisma/client";
import md5 from "md5";
import { v4 as uuidv4 } from "uuid";
import { sign } from "jsonwebtoken";
import { BASE_URL, SECRET } from "../global";

const prisma = new PrismaClient({ errorFormat: "pretty" });

// Start Code here

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const alluser = await prisma.user.findMany({
      where: { username: { contains: search?.toString() || "" } },
    });
    return res.status(200).json({
      status: true,
      data: alluser,
      message: `user has retrieved`,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `There is an error. ${error}`,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const uuid = uuidv4();

    const existingUser = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "username sudah dipakai",
      });
    }

    //membuat pengguna baru
    const newUser = await prisma.user.create({
      data: { uuid, username, password: md5(password), role },
    });

    return res.status(200).json({
      status: true,
      data: newUser,
      message: "New user has been created",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `There is an error. ${(error as Error).message}`,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    const findUser = await prisma.user.findFirst({
      where: { id: Number(id) },
    });
    if (!findUser)
      return res
        .status(200)
        .json({ status: false, message: `error updateUser` });

    const updateUser = await prisma.user.update({
      data: {
        username: username || findUser.username,
        password: md5(password) || findUser.password,
      },
      where: { id: Number(id) },
    });

    return res.status(200).json({
      status: true,
      data: updateUser,
      message: `user has updated`,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `There is an error. ${error}`,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findUser = await prisma.user.findFirst({
      where: { id: Number(id) },
    });
    if (!findUser)
      return res
        .status(200)
        .json({ status: false, message: `user with id ${id} not found` });
    const result = await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });
    return res.status(200).json({
      status: true,
      data: result,
      massage: `user with id ${id} has been Deleted`,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      massage: `There is an error. ${error}`,
    });
  }
};

export const authentication = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const findUser = await prisma.user.findFirst({
      where: { username, password: md5(password) },
    });
    if (!findUser)
      return res.status(200).json({
        status: false,
        logged: false,
        message: `usernmae or password is invalid`,
      });
    let data = {
      id: findUser.id,
      username: findUser.username,
      password: findUser.password,
      role: findUser.role,
    };
    let payload = JSON.stringify(data);
    let token = sign(payload, SECRET || "token");

    return res
      .status(200)
      .json({ status: true, logged: true, message: `Login Success`, token });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `There is an error. ${error}`,
    });
  }
};
