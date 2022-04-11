import { IconButton, Stack, Text, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface Props {
  initialLiked: boolean;
}

export const LikeButton = ({ initialLiked }: Props) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 120));
  return (
    <Tooltip label="Like">
      <Stack display="flex" direction="row" alignItems="center" spacing="0.5">
        <IconButton
          icon={liked ? <BsHeartFill /> : <BsHeart />}
          aria-label="like-button"
          bg="transparent"
          isRound
          size="sm"
          onClick={() => {
            setLiked(!liked);
            liked ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
          }}
        />
        <Text>{likeCount}</Text>
      </Stack>
    </Tooltip>
  );
};
