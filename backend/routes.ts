import { Express, Request, Response } from "express";
import {
  createPostHandler,
  deletePostHandler,
  getAllPostsHandler,
  getPostHandler,
} from "./src/controller/post.controller";
import { createUserHandler } from "./src/controller/user.controller";
import { validateRequest } from "./src/middleware/validateRequest";
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
} from "./src/validationSchema/post.schema";
import { createUserSchema } from "./src/validationSchema/user.schema";

export default function (app: Express) {
  // Health Check Route
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  // Register Route
  app.post(
    "/api/users/add",
    validateRequest(createUserSchema),
    createUserHandler
  );
  // Login Route (Not implemented)

  // Create a post
  app.post(
    "/api/posts/add",
    validateRequest(createPostSchema),
    createPostHandler
  );

  // Get all posts
  app.get("/api/posts/all", getAllPostsHandler);

  // Get all posts from a user
  app.get("/api/posts/:_id", validateRequest(getPostSchema), getPostHandler);

  // Delete a post
  app.delete(
    "/api/posts/:_id",
    validateRequest(deletePostSchema),
    deletePostHandler
  );
}
