import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "../../db/db.js";
import { registerSchema, loginSchema } from "./authSchemas.js";

export async function register(req, res, next) {
  try {
    const params = await registerSchema.validateAsync(req.body);

    //CHECK EXISTING USER
    const querySelect = "SELECT * FROM users WHERE email = ? OR username = ?";

    const [data] = await db.execute(querySelect, [
      params.email,
      params.username,
    ]);

    if (data.length)
      return res.status(409).json({ message: "User already exists!" });

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(params.password, salt);

    const queryInsert =
      "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const queryParams = [params.username, params.email, hash];

    await db.query(queryInsert, [queryParams]);
    return res.status(200).json({ message: "User has been created." });
  } catch (error) {
    next(error);
  }
}

export const login = async (req, res, next) => {
  try {
    const params = await loginSchema.validateAsync(req.body);

    //CHECK USER
    const q = "SELECT * FROM users WHERE username = ?";

    const [data] = await db.query(q, [params.username]);
    if (data.length === 0)
      return res.status(404).json({ message: "User not found!" });

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong username or password!" });

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  } catch (error) {
    next(error);
  }
};

export async function logout(req, res, next) {
  try {
    res
      .clearCookie("access_token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ message: "User has been logged out." });
  } catch (error) {
    next(error);
  }
}
