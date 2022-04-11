import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FaEllipsisV, FaExternalLinkAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Modal } from "./Modal";
import { toastProps } from "../theme";
import axios from "axios";

interface Props {
  id: number;
}

export const PostOptions = ({ id }: Props) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deletePost = async () => {
    await axios.delete(`/api/posts/${id}`);
    toast({
      title: "Post deleted",
      status: "success",
      ...toastProps,
    });
  };

  return (
    <Menu placement="bottom-end">
      <Tooltip label="Options" isDisabled={isOpen}>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FaEllipsisV />}
          rounded="full"
          size="sm"
          bg="transparent"
        />
      </Tooltip>
      <MenuList>
        <MenuItem icon={<FaTrash />} color="red.500" onClick={onOpen}>
          Delete
        </MenuItem>
        <Modal
          title="Delete Post?"
          body="Are you sure? You can`t undo this action afterwards."
          action="Delete"
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={async () => {
            await deletePost();
          }}
        />
      </MenuList>
    </Menu>
  );
};
