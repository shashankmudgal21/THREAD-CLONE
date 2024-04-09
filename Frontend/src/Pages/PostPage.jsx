import { React, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../Component/Actions";
import Comment from "../Component/Comment";

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <div>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzuckerberg
            </Text>
            <Image src="/verified.png" h={4} w={4} ml={4} />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={3}>
          <Text color={"gray.light"}>1d</Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>This is my first post</Text>
      <Box
        borderRadius={"6"}
        overflow={"hidden"}
        border={"1px solid gray.light"}
      >
        <Image src={"/post1.png"}></Image>
      </Box>

      <Flex my={2} alignItems={"center"}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex alignItems={"center"} gap={3}>
        <Text fontSize={"sm"} color={"gray.light"}>
          {200 + (liked ? 1 : 0)} likes
        </Text>
        <Box h={0.5} w={0.5} bg={"gray.light"} borderRadius={"full"}></Box>
        <Text fontSize={"sm"} color={"gray.light"}>
          400 replies
        </Text>
      </Flex>

      <Divider my={4}></Divider>

      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={2} alignItems={"center"}>
          <Text>👋</Text>
          <Text color={"gray.light"}>
            Hii get this app to like reply and post
          </Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4}></Divider>
      <Comment
        comment={"Looks really good"}
        createdAt={"2d"}
        likes={200}
        username={"John"}
        avatar = {'https://bit.ly/dan-abramov'}
        
      />
      <Comment
        comment={"Nice pic"}
        createdAt={"1d"}
        likes={100}
        username={"Shanu"}
        avatar = {'https://bit.ly/ryan-florence'}
      />
      <Comment
        comment={"Wow it is a nice pic"}
        createdAt={"3d"}
        likes={500}
        username={"Mudgal"}
        avatar = {'https://bit.ly/kent-c-dodds'}
      />
    </div>
  );
};

export default PostPage;
