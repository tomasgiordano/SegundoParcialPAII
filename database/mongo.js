const {connect} = require("mongoose");
const {DB_URI} = require("../utils/config");

const conectarMongo = (uri)=>{
    connect(uri).
    then(()=>{
        console.log("conectado a la base!!");
    }).catch((err)=>{
        console.log(err);
    });
};

conectarMongo(DB_URI);