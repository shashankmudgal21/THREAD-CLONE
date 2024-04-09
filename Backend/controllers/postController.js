import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export const createPost = async(req,res)=>{
    try {
        const {postedBy,text,img} = req.body;
        if(!postedBy || !text)return res.status(400).json({message:"Fill all the field"})
        const user = await User.findById(postedBy);
        if(!user) return res.status(400).json({message:"User not found"});
        if(req.user._id.toString() !== user._id.toString()) return res.status(400).json({message:"user is not authorized to create post"})
        const maxLen = 500;
        if(text.length>maxLen)  return res.status(400).json({message:"text should be under 500 words"});
        const post = new Post({postedBy,text,img})
        await post.save();
        return res.status(201).json({
            message:"Post created successfully",
            post
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message:error.message
        })
    }
}
export const getpost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post)return res.status(404).json({message:"Post not found"})
        return  res.status(200).json({
            message:"Post has successully found",
            post
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message:error.message
        })
    }
}

export const deletepost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post)return res.status(404).json({message:"Post not found"})
        if(post.postedBy.toString()!==req.user._id.toString()) return res.status(400).json({message:"User is not authorized to delete"})
        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message:"Post deleted successfully"
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message:error.message
        })
    }
}

export const likePost = async(req,res)=>{
    try {
        const postId = req.params.id
        const userId = req.user._id
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                message:"Post not found",
            })
        }
        const liked = post.likes.includes(userId)
        if(liked){
            await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true });
            return res.status(200).json({
                message:"unlike the post"
            })
        }
        else{
            await Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true });
            return res.status(200).json({
                message:"like the post"
            })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message:error.message
        })
    }
}

export const replyToPost = async(req,res)=>{
    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;
        const username = req.user.username
        const userProfilePic = req.user.profilePic
        console.log(text)
        if(!text){
            return res.status(400).json({
                message:"Text is required",
            })
        }
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                message:"Post not found",
            })
        }

        const reply = {userId,text,userProfilePic,username};
        post.replies.push(reply);
        await post.save();
        return res.status(200).json({
            message:"Reply added succefsully",
            post
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            messgae:error.message
        })
    }
}

export const feedpost = async(req,res)=>{
    try {
        const userId = req.user._id
        const user = await user.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
            })
        }
        const following = user.following
        if (!following || following.length === 0) {
            return res.status(404).json({
                message: "No posts available",
                feedPost: []
            });
        }
        console.log(following)
        const feedPost = await Post.find({ postedBy: { $in: following} }).sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Feeds generated successfully",
            feedPost,
    });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            messgae:error.message
        })
    }
}