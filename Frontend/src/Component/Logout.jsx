import { Button } from '@chakra-ui/react'
import React from 'react'
// import { useToast } from '@chakra-ui/react';
import { IoIosLogOut } from "react-icons/io";
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../Atom/userAtom';
import useShowToast from './hooks/useShowToast';
const Logout = () => {
    const setUser = useSetRecoilState(userAtom)
    const showToast = useShowToast();
    const handleLogout = async()=>{
        try {
            const res = await fetch('/api/users/logout',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                }
            })
            if(res.ok){
              if(res.ok)
              showToast('Succesfully logout','','success');
                  localStorage.removeItem("user")
                  setUser(null);
            }
            else{
              showToast('Something went wrong','','error');
            }
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <Button
      position={"absolute"}
      right={"30px"}
      top={"30px"}
      onClick={handleLogout}
      >
      <IoIosLogOut />
      </Button>
    </div>
  )
}

export default Logout
