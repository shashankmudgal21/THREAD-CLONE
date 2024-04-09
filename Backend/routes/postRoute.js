import express from 'express'
import { protectedRoute } from "../middleware/protectedRoute.js";
import { createPost, deletepost, feedpost, getpost, likePost, replyToPost } from "../controllers/postController.js";
const router = express.Router();
router.post('/create',protectedRoute,createPost);
router.get('/:id',getpost)
router.delete('/:id',protectedRoute,deletepost);
router.put('/like/:id',protectedRoute,likePost)
router.post('/reply/:id',protectedRoute,replyToPost);
router.get('/feed',protectedRoute,feedpost)
export default router
