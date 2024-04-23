import util from "util";
import jwt from "jsonwebtoken";

import { db } from "../../db.js";
import {
  addPostSchema,
  getPostsSchema,
  idSchema,
  updatePostSchema,
} from "./postsSchemas.js";

export async function getPosts(req, res, next) {
  try {
    const params = await getPostsSchema.validateAsync(req.query);

    let query = "SELECT * FROM posts";
    let queryParams = [];

    if (params.cat) {
      query = "SELECT * FROM posts WHERE cat=?";
      queryParams = [params.cat];
    }

    const [results] = await db.execute(query, queryParams);

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
}

export async function getPost(req, res, next) {
  try {
    const params = await idSchema.validateAsync(req.params);

    const query =
      "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

    const [results] = await db.execute(query, [params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Post not found!" });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    next(error);
  }
}

export async function addPost(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Not authenticated!" });

  try {
    const params = await addPostSchema.validateAsync(req.body);

    // TODO add auth middleware and log user info
    const verify = util.promisify(jwt.verify);
    const userInfo = await verify(token, "jwtkey");

    const query =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?, ?, ?, ?, NOW(), ?)";

    const queryParams = [
      params.title,
      params.desc,
      params.img,
      params.cat,
      userInfo.id,
    ];

    const [results] = await db.execute(query, queryParams);

    return res.json({ id: results.insertId });
  } catch (error) {
    next(error);
  }
}

export async function deletePost(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Not authenticated!" });

  try {
    const params = await idSchema.validateAsync(req.params);

    const verify = util.promisify(jwt.verify);
    const userInfo = await verify(token, "jwtkey");

    const query = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    const queryParams = [params.id, userInfo.id];

    await db.execute(query, queryParams);
    return res.json({ message: "Post has been deleted." });
  } catch (error) {
    next(error);
  }
}

export async function updatePost(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Not authenticated!" });

  try {
    const params = await updatePostSchema.validateAsync({
      ...req.body,
      ...req.params,
    });

    const verify = util.promisify(jwt.verify);
    const userInfo = await verify(token, "jwtkey");

    const [currentPost] = await db.execute(
      "SELECT `img` FROM posts WHERE `id` = ? AND `uid` = ?",
      [params.id, userInfo.id]
    );

    if (params.img && currentPost[0].img !== params.img) {
      const query =
        "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

      const queryParams = [
        params.title,
        params.desc,
        params.img,
        params.cat,
        params.id,
        userInfo.id,
      ];
      await db.execute(query, queryParams);
    } else {
      const query =
        "UPDATE posts SET `title`=?,`desc`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

      const queryParams = [
        params.title,
        params.desc,
        params.cat,
        params.id,
        userInfo.id,
      ];
      await db.execute(query, queryParams);
    }

    return res.json({ message: "Post has been updated." });
  } catch (error) {
    next(error);
  }
}
