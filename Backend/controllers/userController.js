import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookies } from '../utils/helpers/generateTokenAndSetCookie.js';
export const userSignup = async(req,res)=>{
    try {
        const {name,username,email,password} = req.body;
        const user = await User.findOne({$or:[{username},{email}]});
        if(user){
            return res.status(400).json({
                message: "User existed already"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name,
            username,
            email,
            password:hashedPassword,
        });
        await newUser.save();

        if(newUser){
            generateTokenAndSetCookies(newUser._id,res);
            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                username:newUser.username,
                email:newUser.email,
                message:"User created succesfully",
            })
        }
        else{
            res.status(400).json({
                message:"Invalid user data",
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        console.log(error.message);
    }
}

export const loginUser = async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                message:"Invalid user",
            })
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).send({
                message:"Invalid password",
            })
        }
        generateTokenAndSetCookies(user._id,res);
        return res.status(200).send({
            id:user._id,
            name:user.name,
            email:user.email,
            username:user.username,
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message:error.message
        })
        
    }
}

export const logoutUser = (req,res) =>{
    try{
        res.cookie('jwt',"",{maxAge:1})
        res.status(200).send({
            message:"User logout succesfully",
        })
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message:error.message
        })
        
    }
}

export const followUnfollowUser = async(req,res) =>{
    try {
        const {id} = req.params;
        const modifyUser = await User.findById(id);
        const currentUser = await User.findById(req.user._id);
        if(id == req.user._id.toString())  
        {
            return res.status(400).send({
                message:"you can't follow/unfollow yourself",
            })
        }
        if(!modifyUser || !currentUser){
            return res.status(400).send({
                message:"user not existed",
            })
        }
        const isFollowing = currentUser.following.includes(id);
        if(isFollowing){
            await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}})
            await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}})
            return res.status(200).json({
                message:"User unfollowed succesfully"
            })
        }
        else{
            await User.findByIdAndUpdate(req.user._id,{$push:{following:id}})
            await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}})
            return res.status(200).json({
                message:"User followed succesfully"
            })
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message:error.message
        })
    }
}

export const updateUser = async(req,res)=>{
    const {name,username,email,password,profilePic,bio} = req.body;
    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not existed"
            })
        }
        if(req.params.id!==req.user._id.toString()){
            return res.status(400).json({
                message:"User can't update other user profile"
            })
        }
        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            user.password = hashedPassword;
        }
        user.name = name || user.name;
        user.username = username || user.username;
        user.email = email || user.email;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;
        user = await user.save();
        return res.status(200).json({
            messaage:"Profile updated succesfully",
            user
        })
    } catch (error) {
        console.log(error.messaage)
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getUserProfile = async(req,res)=>{
    const {username} = req.params;
    try {
        const user = await User.findOne({username}).select("-passowrd").select("updatedAt");
        if(!user)return res.status(400).json({message:"User not found"});
        return res.status(200).json({
            user,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message:error.message,
        })
    }
}