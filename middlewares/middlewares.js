const jwt = require("jsonwebtoken");
const {SECRET} = require("../utils/config");

const handlerNotFound = (req,res) =>{
    res.status(404).json({error:"No existe ese recurso"});
};

const handlerError = (error,req,res,next) => {
    console.log(error.name);
    if(error.name === "CastError"){
        res.status(400).send({error:"Bad Id"});
    }else if(error.name === "SyntaxError"){
        res.status(400).send({error:"Sintax Error"});
    }else if(error.name === "ReferenceError"){
        res.status(400).send({error: error.name, message: error.message});
    }else if(error.name === "ValidationError"){
        res.status(400).send({error: error.name, message: error.message});
    }else if(error.name === "ErrorToken"){
        res.status(401).send({error: error.name, message: error.message});
    }else if(error.name === "JsonWebTokenError"){
        res.status(403).send({error: error.name, message: error.message});
    }else if(error.name === "TokenExpiredError"){
        res.status(401).send({error: error.name, message: error.message});
    }else{
        res.status(500).send({error: error.name, message: error.message});
    }

    next(error);
};

const verifyToken = (req,res,next)=>{
    const bearerToken = req.headers["autorization"];

    if(typeof bearertToken != 'undefined'){
        req.token = bearerToken.split(" ")[1];

        try {
            const data = await jwt.verify(req.token,SECRET);
            console.log(data);
        } catch (error) {
            next(error);
        }
    } else {
        next({name:"ErrorToken", message:"No Token"});
    }
}

module.exports = {
    handlerError,
    handlerNotFound,
    verifyToken
}