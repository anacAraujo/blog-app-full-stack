import { db } from "../db.js";
import jwt from "jsonwebtoken";
import util from "util";

export async function getPosts(req, res) {
  // TODO add logging middleware
  console.log("Gettting posts...");

  // TODO add validation middleware with JOI
  const category = req.query.cat;

  let query = "SELECT * FROM posts";
  let queryParams = [];

  if (category) {
    query = "SELECT * FROM posts WHERE cat=?";
    queryParams = [category];
  }

  try {
    const [results] = await db.execute(query, queryParams);

    res.status(200).json(results);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getPost(req, res) {
  console.log("Getting post");

  const postId = req.params.id;
  const query =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  try {
    const [results] = await db.execute(query, [postId]);
    if (results.length === 0) {
      return res.status(404).json({ message: "Post not found!" });
    }
    res.status(200).json(results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function addPost(req, res) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Not authenticated!" });

  try {
    const verify = util.promisify(jwt.verify);
    const userInfo = await verify(token, "jwtkey");

    console.log("Adding post with user: ", userInfo);

    const query =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?, ?, ?, ?, NOW(), ?)";

    const queryParams = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      userInfo.id,
    ];

    const [results] = await db.execute(query, queryParams);

    return res.json({ id: results.insertId });
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Token is not valid!" });
    }
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function deletePost(req, res) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Not authenticated!" });

  try {
    const verify = util.promisify(jwt.verify);
    const userInfo = await verify(token, "jwtkey");

    console.log("Deleting post with user: ", userInfo);

    const query = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    const queryParams = [req.params.id, userInfo.id];

    await db.execute(query, queryParams);
    return res.json({ message: "Post has been deleted." });
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Token is not valid!" });
    }
    return res.status(500).json({ message: "Internal server error!" });
  }
}

//TODO keep img - only update if new img is uploaded
export async function updatePost(req, res) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Not authenticated!" });

  try {
    const verify = util.promisify(jwt.verify);
    const userInfo = await verify(token, "jwtkey");

    console.log("Updating post with user: ", userInfo);

    const query =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const queryParams = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.params.id,
      userInfo.id,
    ];

    await db.execute(query, queryParams);
    return res.json({ message: "Post has been updated." });
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Token is not valid!" });
    }
    return res.status(500).json({ message: "Internal server error!" });
  }
}
