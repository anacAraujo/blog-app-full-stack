import { db } from "../../db/db.js";
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

    if (params.cat) {
      query += " WHERE cat=:cat";
    }

    const [results] = await db.execute(query, params);

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
}

export async function getPost(req, res, next) {
  try {
    const params = await idSchema.validateAsync(req.params);

    const query = `
      SELECT p.*, u.img AS userImg 
      FROM posts p
        JOIN users u ON u.id = p.uid 
      WHERE p.id = ? `;

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
  try {
    const params = await addPostSchema.validateAsync(req.body);

    const query =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `video`, `date`,`uid`) VALUES (?, ?, ?, ?, ?, NOW(), ?)";

    const queryParams = [
      params.title,
      params.desc,
      params.img,
      params.cat,
      params.video,
      req.userInfo.id,
    ];

    const [results] = await db.execute(query, queryParams);

    return res.json({ id: results.insertId });
  } catch (error) {
    next(error);
  }
}

export async function deletePost(req, res, next) {
  try {
    const params = await idSchema.validateAsync(req.params);

    const query = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    const queryParams = [params.id, req.userInfo.id];

    await db.execute(query, queryParams);
    return res.json({ message: "Post has been deleted." });
  } catch (error) {
    next(error);
  }
}

export async function updatePost(req, res, next) {
  try {
    const params = await updatePostSchema.validateAsync({
      ...req.body,
      ...req.params,
    });

    const [currentPost] = await db.execute(
      "SELECT `img` FROM posts WHERE `id` = ? AND `uid` = ?",
      [params.id, req.userInfo.id]
    );

    const queryParams = {
      ...params,
      uid: req.userInfo.id,
    };

    let imgQueryPart = "";
    if (params.img && currentPost[0].img !== params.img) {
      imgQueryPart = ",`img`=:img ";
    }

    // TODO check if video is changed and update it or not
    const query =
      "UPDATE posts SET `title`=:title,`desc`=:desc,`cat`=:cat, `video`=:video," +
      imgQueryPart +
      " WHERE `id` = :id AND `uid` = :uid";

    await db.execute(query, queryParams);

    return res.json({ message: "Post has been updated." });
  } catch (error) {
    next(error);
  }
}
