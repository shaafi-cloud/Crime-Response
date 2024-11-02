import express from 'express';
import { createUser, deleteUser, getUsers } from '../controllers/users.js';

const router = express.Router();



//Create or add user
router.post("/add", createUser);

//read all users

router.get("/all", getUsers)

//Delete user

router.delete("/:id", deleteUser)




export default router;
