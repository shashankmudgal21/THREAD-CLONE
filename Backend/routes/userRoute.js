import express from 'express'
import { followUnfollowUser, getUserProfile, loginUser, logoutUser, updateUser, userSignup } from '../controllers/userController.js';
import { protectedRoute } from '../middleware/protectedRoute.js';
const router  = express.Router();
router.post('/signup',userSignup);
router.post('/login',loginUser);
router.post('/logout',logoutUser)
router.post('/follow/:id',protectedRoute, followUnfollowUser)
router.post('/update/:id',protectedRoute,updateUser)
router.get('/profile/:username',getUserProfile);
export default router;