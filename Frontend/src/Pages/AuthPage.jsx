import React from 'react'
import SignupCard from '../Component/SignUpCard'
import Login from '../Component/Login'
import {  useRecoilValue } from 'recoil'
import { authScreen } from '../Atom/authAtom'

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreen);
  
  return (
    <div>
      {/* <SignupCard/> */}
      {authScreenState === 'login'?<Login></Login>:<SignupCard/>}
    </div>
  )
}

export default AuthPage
