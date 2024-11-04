import express from 'express';
import { createUser, deleteUser, getUserRole, getUsers, loginUser, updateUser } from '../controllers/users.js';
import { authenticate, authorize } from '../middleware/auth.js';
import User from '../models/user.js';

const router = express.Router();



//Create or add user
router.post("/add", createUser);

//login auth
router.post("/login", loginUser);

//read all users

router.get("/all", getUsers);

router.get("/role", authenticate, getUserRole);

//Delete user
router.delete("/:id", deleteUser)

// PUT endpoint to update a user by ID
router.put('/:id', updateUser)



export default router;
