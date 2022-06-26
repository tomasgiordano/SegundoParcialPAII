const express = require('express');
const loginRouter = express.Router();
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

loginRouter.post("/", (req,res,next)=>{
    try {
        const user = await User.findOne({ username });
        const correctPass = 
            user === null ? false : await bcrypt.compare(password, user.passwordHash);
        if(!(user && correctPass)){
            next({
                name:"ValidationError",
                message:"El password o el username son invalidos"
            });
        }

        const userToken = {
            username: user.username,
            id: user._id,
        }

        const token = await jwt.sign(userToken, SECRET, {expiresIn:"120s"});
        
        res.status(200).json({
            token,
            username
        })

    } catch (error) {
        next(error);
    }
})

module.exports = loginRouter;

