const {model, Schema} = require("mongoose");

const UserSchema = Schema({
    username: {
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
},{
    toJSON:{
        transform:(document,userToJson)=>{
            userToJson.id = userToJson._id.toString();
            delete userToJson._id;
            delete userToJson._v;
        }
    }
});

const User = model('user',UserSchema);
module.exports = User;