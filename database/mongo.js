const { connect } = require("mongoose");

const conectarDB = async () => {
    try{
        await connect(process.env.URI_MONGO);
        console.log("Base de datos - CONECTADO");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = conectarDB;