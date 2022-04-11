import { Request, Response } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
} from "../service/post.service";

export async function createPostHandler(req: Request, res: Response) {
  const userId = req.body.user;
  const body = req.body;
  const post = await createPost({ ...body, user: userId });
  return res.send(post);
}

export async function getAllPostsHandler(req: Request, res: Response) {
  const posts = await getAllPosts();
  return res.send(posts);
}

export async function getPostHandler(req: Request, res: Response) {
  const post = await getPost({ user: req.params._id });
  return res.send(post);
}

export async function deletePostHandler(req: Request, res: Response) {
  const postId = req.params._id;
  console.log(postId);
  const post = await getPost({ _id: postId });

  if (!post) {
    return res.status(404).send("Post not found");
  }

  await deletePost({ _id: postId });

  return res.sendStatus(200);
}
