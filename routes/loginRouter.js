const express = require('express');
const loginRouter = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
loginRouter.post("/", async (req,res,next)=>{
    try {
        const {username,password} = req.body;

        const user = await User.findOne({ username });
        // const correctPass = 
        //     user === null ? false : await bcrypt.compare(password, user.passwordHash);
        // if(!(user && correctPass)){
        //     next({
        //         name:"ValidationError",
        //         message:"El password o el username son invalidos"
        //     });
        // }
        if (!user) {
            next({
                name:"ValidationError",
                message:"El password o el username son invalidos"
            });
        }

        if (!password && !(await bcrypt.compare(password, user.password))) {
            next({
                name:"ValidationError",
                message:"El password o el username son invalidos"
            });
        }

        const userToken = {
            username: user.username,
            id: user._id,
        }

        const token = await jwt.sign(userToken, process.env.SECRET, {expiresIn:Math.floor(Date.now() / 1000) + 60 * 60});
        
        return res.status(200).json({
            token,
            username
        })

    } catch (error) {
        next(error);
    }
})

module.exports = loginRouter;

