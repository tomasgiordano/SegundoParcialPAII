const express = require('express');
const personajesRouter = express.Router();
const Personaje = require("./models/Personaje");
const { verifyToken } = require("../utils/middlewares");

personajesRouter.use(verifyToken);

personajesRouter.get("/", verifyToken, (req, res,next) => {
    Personaje.find({})
    .then((personajes)=>{
      personajes ? res.json(personajes):res.status(404).end();
      })
    .catch((err) =>{
      next(err);
      });
  });
  
  personajesRouter.get("/:id", (req, res,next) => {
      const {id}=req.params;
  
      Personaje.findById(id).then((personaje)=>{
          personaje ? res.json(personaje):res.status(404).end();
      }).catch((err) =>{
          next(err);
      })
  });
  
  personajesRouter.post("/",(req, res,next) => {
      const { nombre, edad } = req.body;
      const nuevoPersonaje = new Personaje({nombre, edad});
  
      nuevoPersonaje.save()
      .then((personaje)=>{
          personaje?res.status(201).json(personaje)
          :res.status(400).send();
  
      }).catch((err)=>{
          next(err);
      })
  });
  
  personajesRouter.delete("/:id",[],(req,res,next)=>{
      const {id} = req.params;
  
      Personaje.findByIdAndRemove(id).then((personaje)=>{
          personaje?res.status(200).json(personaje):res.status(404).end();
      }).catch((err)=>{
          next(err);
      })
  
  });
  
  personajesRouter.put('/:id',(req,res,next)=>{
      const {id} = req.params;
      const {nombre,edad} = req.body;
  
      const per = {nombre,edad};
  
      Personaje.findByIdAndUpdate(id,per).then(
          personaje =>{
              personaje?res.json(personaje):res.status(404).end();
          }
      ).catch(err =>{
          next(err);
      })
  });

module.exports = personajesRouter;