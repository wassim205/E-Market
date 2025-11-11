import express from 'express';
import { register, login } from '../controllers/authController.js';
import { isAuthenticated, isAdmin } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { userSchema } from '../validations/userSchema.js';
import User from '../models/User.js';
const router = express.Router();

const loginSchema = userSchema.pick(['email', 'password']);

router.post('/register', validate(userSchema), register);
router.post('/login', validate(loginSchema), login);

// Example of protected route
router.get('/profile', isAuthenticated, isAdmin, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}`, user: req.user });
});


router.get('/me', isAuthenticated, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.status(200).json({ user: user });
});


export default router;
