'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import { authScreen } from '../Atom/authAtom'
// import toast from 'react-hot-toast'
import { useToast } from '@chakra-ui/react'
import { userAtom } from '../Atom/userAtom'
import useShowToast from './hooks/useShowToast'
export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
  const [input,setInput] = useState({
    name:"",
    username:"",
    email:"",
    password:"",
  })
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom)
  const setAuthScreen = useSetRecoilState(authScreen);
  const handleSubmit = async()=>{
     try {
       const res  = await fetch('/api/users/signup',{
         method:"POST",
         headers:{
           "Content-Type":"application/json",
         },
         body:JSON.stringify(input)
       })

       const data = await res.json();
       console.log(data)
       if(res.ok){
        showToast('Account created','','success')
        localStorage.setItem("user",JSON.stringify(data));
        setUser(data);
       }
       else{
        showToast('Somthing went wrong','','error')
       }
       
       
     } catch (error) {
       console.log(error)
      
     }
  }
  return (
    <Flex
      align={'center'}
      justify={'center'}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input type="text" value={input.name} onChange={(e)=>{setInput({...input,name:e.target.value})}} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input type="text" value={input.username}  onChange={(e)=>{setInput({...input,username:e.target.value})}} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={input.email}  onChange={(e)=>{setInput({...input,email:e.target.value})}} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={input.password}  onChange={(e)=>{setInput({...input,password:e.target.value})}}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
              onClick={handleSubmit}
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue('gray.700','gray.500')}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link  color={'blue.400'} onClick={()=>setAuthScreen("login")}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}