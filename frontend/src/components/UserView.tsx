import {
  Avatar,
  Container,
  Flex,
  Stack,
  VStack,
  Text,
  HStack,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { UserDocument } from "../../../backend/src/model/user.model";
import { PostDocument } from "../../../backend/src/model/post.model";
import { Post } from "./Post";
import { FaInbox } from "react-icons/fa";
import { useParams } from "react-router-dom";
dayjs.extend(relativeTime);

export interface ItemProps {
  user: UserDocument;
  post: PostDocument;
}

export interface ItemArrayProps extends Array<ItemProps> {}

const UserView = () => {
  const params = useParams();
  console.log(params);
  const [data, setData] = React.useState<ItemArrayProps>([]);

  const fetchData = async () => {
    const result = await axios.get(`/api/posts/${params.id}`);
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <Stack>
      {data && data.length > 0 ? (
        data.map((item) => <Post item={item} key={item.post._id} />)
      ) : (
        <VStack w="full" pt="24">
          <Icon as={FaInbox} boxSize="24" color="text-muted" />
          <Text fontSize="4xl" fontWeight="extrabold" color="text-muted">
            Posts are loading...
          </Text>
        </VStack>
      )}
    </Stack>
  );
};

export default UserView;
