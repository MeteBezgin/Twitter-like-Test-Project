import { Stack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import _ from "lodash";
import { PostDocument } from "../../../backend/src/model/post.model";
import { UserDocument } from "../../../backend/src/model/user.model";
import { LikeButton } from "./LikeButton";
import { PostOptions } from "./PostOptions";

interface PostFooterProps {
  item: {
    user: UserDocument;
    post: PostDocument;
  };
}

export const PostFooter = ({ item }: PostFooterProps) => {
  return (
    <Stack
      display="flex"
      direction="row"
      justifyContent="space-between"
      cursor="default"
      onClick={(e) => e.stopPropagation()}
    >
      <Stack display="flex" direction="row" spacing="3">
        <LikeButton initialLiked={_.sample([true, false]) as boolean} />
      </Stack>
      <PostOptions id={item.post._id} />
    </Stack>
  );
};
