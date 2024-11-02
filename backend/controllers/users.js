import User from "../models/user.js";

export const createUser = async (req, res) => {
    const user  = req.body;
    
    if(!user.username || !user.password || !user.email) {
        res.status(400).json({message: "Fill all the fileds"})
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(200).json({success: true, data: newUser});
    } catch (error) {
        console.error("error creating user", error.message);
        res.status(500).json({message: "Server error"});
        
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