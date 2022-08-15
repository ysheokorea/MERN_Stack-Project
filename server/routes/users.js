const express = require('express');
const { updateUser, deleteUser, getUser, getAllUsers } = require('../controllers/user');
const {verifyToken, verifyUser, verifyAdmin}  = require('../utils/verifyToken');

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send("Hello User, You are LoogedIn!")
})

router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
    res.send("Hello User, You are LoogedIn! and You can Delete Your Account");
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
    res.send("Hello admin, You are LoogedIn! and You can Delete all Account");
})


//Update
router.put('/:id', verifyUser,  updateUser)

// Delete
router.delete('/:id', verifyUser, deleteUser)

//Get
router.get('/:id', verifyUser, getUser)

//Get All
router.get('/', verifyAdmin, getAllUsers)


module.exports=router;