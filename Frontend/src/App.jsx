import { Button, Container } from "@chakra-ui/react";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import UserPage from "./Pages/UserPage";
import PostPage from "./Pages/PostPage";
import Header from "./Component/Header";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import { useRecoilValue } from "recoil";
import { userAtom } from "./Atom/userAtom";
import Logout from "./Component/Logout";
export default function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Container>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={user?<HomePage/>:<Navigate to = "/auth"/>}></Route>
          <Route path="/auth" element={!user?<AuthPage/>:<Navigate to = "/"/>}></Route>
          <Route path="/:username" element={<UserPage/>}></Route>
          <Route path="/:username/post/:pid" element={<PostPage/>}></Route>
        </Routes>
        {user && <Logout></Logout>}
      </BrowserRouter>
      
    </Container>
  );
}
