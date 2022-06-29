const {model, Schema} = require("mongoose");

const PersonajeSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true,
        min: 18,
        max: 65
    },
    vuela:{
        type:Boolean,
        required: true
    }
},{
    toJSON:{
        transform:(document,personajeToJson)=>{
            personajeToJson.id = personajeToJson._id.toString();
            delete personajeToJson._id;
            delete personajeToJson._v;
        }
    }
});

const Personaje = model('personaje',PersonajeSchema);
module.exports = Personaje;