require("dotenv").config();

const express = require("express");

const conectarDB = require("./database/mongo");

const morgan = require("morgan");
const logger = require("./middlewares/logger");
const {handlerNotFound, handlerError} = require("./middlewares/middlewares");
//const{body,validationResult} = require("express-validator");
//const shortid = require("shortid");
const personajesRouter = require('./routes/personajeRouter');
const usersRouter = require('./routes/usersRouter');
const loginRouter = require("./routes/loginRouter");




async function main(){
  
  const app = express();
  const PORT = process.env.PORT | 3000;

  app.use('/api/personajes',personajesRouter);
  app.use('/api/users',usersRouter);
  app.use('/api/login',loginRouter);
  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(logger);
  app.use(handlerNotFound);
  app.use(handlerError);

  let personajes = [
    { id: "1", nombre: "Ironman", edad: 40 },
    { id: "2", nombre: "Capitan America", edad: 30 },
    { id: "3", nombre: "Hulk", edad: 37 },
    { id: "4", nombre: "Hawkeye", edad: 38 },
  ];

  app.get("/", (req, res) => {
    res.send("API Personajes de Marvel");
  });

  await conectarDB();

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

main();