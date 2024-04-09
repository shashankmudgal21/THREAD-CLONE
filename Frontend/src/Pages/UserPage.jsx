import React from 'react'
import UserHeader from '../Component/UserHeader'
import UserPost from '../Component/UserPost'

const UserPage = () => {
  return (
    <div>
      <UserHeader></UserHeader>
      <UserPost likes = {200} replies = {500} postImg = {"/post1.png"} postTitle = {"This is my first post"}></UserPost>
      <UserPost likes = {100} replies = {50} postImg = {"/post2.png"} postTitle = {"I love threa"}></UserPost>
      <UserPost likes = {1200} replies = {800} postImg = {"/post3.png"} postTitle = {"I love this guy"}></UserPost>
      <UserPost likes = {60} replies = {40} postTitle = {"My first thread"}></UserPost>
    </div>
  )
}

export default UserPage
