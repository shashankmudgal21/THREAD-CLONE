import { Flex,Avatar, Box,Text, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsThreeDots } from "react-icons/bs";
import Actions from './Actions';

const UserPost = ({likes,replies,postImg,postTitle}) => {
    const [liked,setLiked] = useState(false)
  return (
    <Link to = {'/markzuckerberg/post/1'}>
        <Flex gap={3} py={'3'} mb={'4'}>
            <Flex flexDirection={'column'} alignItems={'center'}>
                <Avatar size={'md'} src='/zuck-avatar.png'/>
                <Box w={'1px'} h={'full'} bg={'gray.light'} my={'2'}></Box>
                <Box position={'relative'} w={'full'}>
                    <Avatar position={'absolute'} top={'0px'} left={'15px'} size={'xs'} p={'2px'} src='https://bit.ly/dan-abramov'/>
                    <Avatar position={'absolute'} bottom={'0px'} right={'-3px'} size={'xs'} p={'2px'} src='https://bit.ly/dan-abramov'/>
                    <Avatar position={'absolute'} bottom={'0px'} left = {'4px'} size={'xs'}  src='https://bit.ly/tioluwani-kolawole'/>
                </Box>
            </Flex>
            <Flex flex={'1'} gap={2} flexDirection={'column'}>
                <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
                    <Flex w={'full'} >
                        <Text fontWeight={'bold'} fontSize={'sm'}>markzuckerberg</Text>
                        
                        <Image src='/verified.png' h={4} w={4}/>
                    </Flex>
                    <Flex gap={4}>
                        <Text color={"gray.light"} fontSize={'sm'}>1d</Text>
                        <BsThreeDots />
                    </Flex>
                </Flex>
                <Text fontSize={'sm'}>{postTitle}</Text>
                <Box borderRadius={'6'} overflow={'hidden'} border={'1px solid gray.light'}>
                    {postImg && (<Image src={postImg}></Image>)}
                    
                </Box>
                <Flex gap={3} my={1}><Actions liked = {liked} setLiked = {setLiked}></Actions></Flex>
                <Flex gap={2} alignItems={'center'}>
                    <Text color={'gray.light'} fontSize={'sm'}>{likes} likes</Text>
                    <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
                    <Text color={'gray.light'} fontSize={'sm'}>{replies} Replies</Text>
                </Flex>
            </Flex>
            
        </Flex>
    </Link>
  )
}

export default UserPost
