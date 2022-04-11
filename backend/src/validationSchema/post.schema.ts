import { object, string, ref } from "yup";

const common = {
  body: object({
    title: string().required(),
    content: string().required(),
  }),
};

export const getPostSchema = object({
  params: object({
    _id: string().required(),
  }),
});

export const createPostSchema = object({
  ...common,
});

export const updatePostSchema = object({
  params: object({
    _id: string().required(),
  }),
  ...common,
});

export const deletePostSchema = object({
  params: object({
    _id: string().required(),
  }),
});
