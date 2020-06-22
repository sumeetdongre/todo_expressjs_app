const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://mongodbuser:1234@cluster0-ytyvq.mongodb.net/<dbname>?retryWrites=true&w=majority');
const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to db"));

db.once('open',function(){
    console.log("successfully connected to db");
});