import { Button, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import Logout from '../Component/Logout'

const HomePage = () => {
  return (
    <div>
      <Link href = "/markzucerberg">
        <Flex justifyContent={'center'}>
            <Button>Home Page</Button>
           
        </Flex>
      </Link>
    </div>
  )
}

export default HomePage
