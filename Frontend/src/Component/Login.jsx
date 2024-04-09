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
import useShowToast from './hooks/useShowToast'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const setAuthScreen = useSetRecoilState(authScreen)
  const [input,setInput] = useState({
    username:"",
    password:"",
  })
  const showToast = useShowToast();
  const handleSubmit = async()=>{
    try {
      const res = await fetch('/api/users/login',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(input)
      })
      if(res.ok)
      showToast('Succesfully login','','success');
      else{
        showToast('Something went wrong','','error');
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
            Login
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          width={{
            base:"full",
            sm:"400px"
          }}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>username</FormLabel>
              <Input type="text" value={input.username} onChange={(e)=>setInput({...input,username:e.target.value})} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={input.password} onChange={(e)=>setInput({...input,password:e.target.value})}  />
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
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don't have an account? <Link color={'blue.400'} onClick={()=>setAuthScreen("signup")}>Register</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}