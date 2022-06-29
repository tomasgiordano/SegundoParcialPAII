const express = require('express');
const usersRouter = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

usersRouter.get('/', async (req,res,next)=>{
    try {

        const users = await User.find({});
        return res.json(users);

    } catch (error) {

        next(error);

    }
});

usersRouter.post("/",async(req,res,next)=>{
    try {
        const {username, password} = req.body;
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password,saltRounds);

        const user = new User({
            username,
            password: passwordHash
        });

        const userSaved = await user.save();
        return res.status(201).json(userSaved);

    } catch (error) {
        next(error);
    }
})

module.exports = usersRouter;