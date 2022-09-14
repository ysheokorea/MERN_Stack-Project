const router = require("express").Router();
const { signUp, signIn } = require('../controller/auth')

// Sing Up
router.post("/signup", signUp);

// Sign In

router.post("/signin", signIn);

module.exports = router;
