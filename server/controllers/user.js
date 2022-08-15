const User = require("../models/User")

module.exports = {

    updateUser : async (req, res)=>{
    
        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, 
                { $set : req.body },
                { new : true }
                );
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }
    },

    deleteUser : async (req, res)=>{
    
        try{
            await User.findByIdAndDelete(
                req.params.id, 
                );
            res.status(200).json("User has been deleted");
        }catch(err){
            res.status(500).json(err);
        }
    },

    getUser : async (req, res)=>{
    
        try{
            const user = await User.findById(
                req.params.id, 
                );
            res.status(200).json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },

    getAllUsers :async (req, res, next)=>{   

        try{
            const users = await User.find();
            res.status(200).json(users);
        }catch(err){
            // res.status(500).json(err);
            next(err);
        }
    } 
}