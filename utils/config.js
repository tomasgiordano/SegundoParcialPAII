require("dotenv").config();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const SECRET = process.env.SECRET;

module.export = {
    PORT,
    DB_URI,
    SECRET
};