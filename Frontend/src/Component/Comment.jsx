import { Avatar, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const Comment = ({comment,createdAt,likes,username,avatar}) => {
    const [liked,setLiked] = useState(false);
  return (
    <div>
      <Flex my={2} py={3} gap={3} w={'full'}>
        <Avatar src={avatar} size={'sm'} />
        <Flex
          w={"full"}
          justifyContent={"space-between"}
          flexDirection={"column"}
        >
          <Flex justifyContent={'space-between'} alignItems={"center"} gap={2} my={2}>
            <Text fontSize={"sm"} fontWeight={'bold'}>{username}</Text>
            <Flex alignItems={"center"} gap={2}>
              <Text color={"gray.light"}>{createdAt}</Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text>{comment}</Text>
          <Actions liked={liked} setLiked={setLiked}/>
          <Text fontSize={'sm'} color={'gray.light'}>{likes+(liked?1:0)} likes</Text>
        </Flex>
      </Flex>
    </div>
  );
};

export default Comment;
