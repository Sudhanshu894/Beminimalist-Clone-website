const connect = require('./configs/database');
const app = require('./index');

app.listen(5555,async()=>{
    try{
        await connect();
        console.log("Listening to the port 5555");
    }catch(err){
        console.log({message: err.message});
    }
});