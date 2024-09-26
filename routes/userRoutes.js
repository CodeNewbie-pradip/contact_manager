const express=require("express");
const {registerUser, loginUser, currentUser}=require("../controllers/userController");
const router=express.Router();
const validationToken=require("../middleware/validateTokenHandler");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validationToken, currentUser);

module.exports=router;