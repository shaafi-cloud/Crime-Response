import User from "../models/user.js";
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    const { username, email, password, type } = req.body; // Include type here
    
    // Check for required fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Fill all the fields" });
    }

    // Use a default value for type if it's not provided
    const userType = type ? type : 'user'; // Default to 'user' if type is not provided

    const newUser = new User({ username, email, password, type: userType }); // Include type in the user object

    try {
        await newUser.save();
        res.status(200).json({ success: true, message: "Saved successfully!" });
    } catch (error) {
        console.error("error creating user", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


export const getUsers =  async (req, res) => {
    try {
        const  users = await User.find({});
        res.status(200).json({data: users});
    } catch (error) {
        console.log("error getting users", error.message);
        res.status(500).json({message: "server error"});
    }
};

export const deleteUser = async (req, res)=> {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({message: "sucess delete!"});
    } catch (error) {
        console.log("error in deleting", error.message);
        res.status(404).json({message: "user not found"});
        
    }
};


export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });

        // Check if user exists and the password matches
        if (!user || user.password !== password) {  // Plain text comparison
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate a JWT token with the user's ID and type
        const token = jwt.sign({ id: user._id, type: user.type }, 'ourpro123', { expiresIn: '2h' });

        // Send the token and role as response
        res.status(200).json({ token, role: user.type });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getUserRole = async (req, res) => {
    // const user = req.body;
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("type");

        if (!user){
            return res.status(404).json({error: "User not found"});
        }

        res.status(200).json({role: user.type});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Server error"});
        
    }
}