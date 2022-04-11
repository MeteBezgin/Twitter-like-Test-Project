import mongoose from "mongoose";
import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import Post, { PostDocument } from "../model/post.model";

export function createPost(input: DocumentDefinition<PostDocument>) {
  return Post.create(input);
}

export function deletePost(query: FilterQuery<PostDocument>) {
  return Post.deleteOne(query);
}

export function getAllPosts() {
  return Post.aggregate([
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        post: {
          title: "$title",
          content: "$content",
          createdAt: "$createdAt",
          updatedAt: "$updatedAt",
          _id: "$_id",
        },
        user: 1,
        _id: 0,
      },
    },
    {
      $lookup: {
        from: "users",
        let: { userId: "$user" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$userId"],
              },
            },
          },
          {
            $project: {
              name: 1,
              email: 1,
              avatar: 1,
            },
          },
        ],
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
  ]);
}

export function getPost(query: FilterQuery<PostDocument>) {
  return Post.aggregate([
    {
      $match: {
        $expr: {
          $eq: ["$user", new mongoose.Types.ObjectId(query.user)],
        },
      },
    },
    {
      $project: {
        post: {
          title: "$title",
          content: "$content",
          createdAt: "$createdAt",
          updatedAt: "$updatedAt",
          _id: "$_id",
        },
        user: 1,
        _id: 0,
      },
    },
    {
      $lookup: {
        from: "users",
        let: { userId: "$user" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$userId"],
              },
            },
          },
          {
            $project: {
              name: 1,
              email: 1,
              avatar: 1,
            },
          },
        ],
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
  ]);
}
