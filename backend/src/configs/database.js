require('dotenv').config();
const mongoose = require('mongoose'); 
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
module.exports = ()=>{
    return mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.q3a58.mongodb.net/backendprojectunit4`);
} 
