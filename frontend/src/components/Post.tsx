import { Avatar } from "@chakra-ui/avatar";
import {
  Box,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PostFooter } from "./PostFooter";
import { Card } from "./Card";
import { UserDocument } from "../../../backend/src/model/user.model";
import { PostDocument } from "../../../backend/src/model/post.model";
dayjs.extend(relativeTime);

interface PostProps {
  item: {
    user: UserDocument;
    post: PostDocument;
  };
}

export const Post = ({ item }: PostProps) => {
  const navigate = useNavigate();
  const avatarSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  return (
    <Card>
      <Stack w="100%" display="flex" direction="row">
        <Box as={Link} href="/profile">
          <Avatar
            size={avatarSize}
            src={item.user.avatar}
            cursor="pointer"
            name="user-avatar"
          />
        </Box>
        <Stack w="100%">
          <Box w="max-content">
            <HStack
              role="group"
              cursor="pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/user/${item.user._id}`);
              }}
            >
              <Text
                as="span"
                fontSize="md"
                fontWeight="semibold"
                _groupHover={{ textDecoration: "underline" }}
              >
                {item.user.name}
              </Text>
              <Text as="span" fontSize="sm" color="text-muted">
                {item.user.email}
              </Text>
            </HStack>
            <Text fontSize="sm" color="text-muted">
              {dayjs().to(dayjs(item.post.updatedAt))}
            </Text>
          </Box>
          <Text rounded="md" py="2" fontSize="xl">
            {item.post.title}
          </Text>
          <Text rounded="md" py="2" fontSize="lg">
            {item.post.content}
          </Text>
          <PostFooter item={item} />
        </Stack>
      </Stack>
    </Card>
  );
};
