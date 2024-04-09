import { Flex,Image, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Toaster } from 'react-hot-toast';


const Header = () => {
  const {colorMode,toggleColorMode} = useColorMode(); 
  return (
    <div>
      <Flex justifyContent={'center'} mt={10} mb={"10"}>
        <Image
        cursor = {'pointer'}
        w={6}
        src = {colorMode == 'dark'?'/light-logo.svg':'/dark-logo.svg'}
        onClick = {toggleColorMode}
        />
        <Toaster></Toaster>
      </Flex>
    </div>
  )
}

export default Header
