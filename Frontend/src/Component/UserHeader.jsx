import { Avatar, VStack, Flex, Text, Link, Box, Menu, MenuButton, Portal, MenuList, MenuItem,useToast } from "@chakra-ui/react";
import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";

const UserHeader = () => {
    const toast = useToast()
    const copyUrl = ()=>{
        navigator.clipboard.writeText(window.location.href)
        toast({
            title: 'Copied to clipboard',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
    }
  return (
    <div>
      <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              {" "}
              Mark Zukerberg
            </Text>
            <Flex gap={2}>
              <Text fontSize={"sm"}>markZukerberg</Text>
              <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"}>
                threads.net
              </Text>
            </Flex>
          </Box>
          <Box>
            <Avatar name="Mark Zukerberg" src="/zuck-avatar.png" size={"xl"} />
          </Box>
        </Flex>
        <Text>Co founder, executive and chairman of Meta platform</Text>
        <Flex w={"full"} justifyContent={"space-between"}>
          <Flex gap={2}>
            <Text>3.2K followers</Text>
            <Link color={"gray.light"}>instagram.com</Link>
          </Flex>
          <Flex gap={2}>
            <Box className="icon-container">
              <FaInstagram size={24} />
            </Box>
            <Box className="icon-container">
              <Menu>
                <MenuButton>
                  <IoIosMore size={24} />
                </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem onClick={copyUrl}>Copy link</MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          </Flex>
        </Flex>
        <Flex w={'full'} pb={'5'}>
            <Flex flex={1} borderBottom={'1.5px solid white'} justifyContent={'center'} cursor={'pointer'} pb={'3'}>
                <Text fontWeight={'bold'}>Threads</Text>
            </Flex>
            <Flex flex={1} borderBottom={'1.5px solid gray'} justifyContent={'center'} cursor={'pointer'} pb={'3'}>
            <Text fontWeight={'bold'} color={'gray.light'}>Replies</Text>
            </Flex>
        </Flex>
      </VStack>
    </div>
  );
};

export default UserHeader;
