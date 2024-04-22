import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  //CHECK EXISTING USER
  const querySelect = "SELECT * FROM users WHERE email = ? OR username = ?";
  const email = req.body.email;
  const username = req.body.username;

  try {
    const [data] = await db.query(querySelect, [email, username]);
    if (data.length)
      return res.status(409).json({ message: "User already exists!" });

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const queryInsert =
      "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const queryParams = [username, email, hash];

    await db.query(queryInsert, [queryParams]);
    return res.status(200).json({ message: "User has been created." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export const login = async (req, res) => {
  //CHECK USER
  const q = "SELECT * FROM users WHERE username = ?";

  try {
    const [data] = await db.query(q, [req.body.username]);
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
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export async function logout(req, res) {
  try {
    res
      .clearCookie("access_token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ message: "User has been logged out." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
}
