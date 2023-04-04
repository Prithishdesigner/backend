const mongoose=require('mongoose');
var mongoURL='mongodb+srv://Prithishdesigner:PprithishwariI2805@cluster0.fzzdy1d.mongodb.net/EMI'
// var mongoURL='mongodb://127.0.0.1:27017/EMI'

mongoose.connect(mongoURL,{useUnifiedTopology:true , useNewUrlParser:true});

var connection=mongoose.connection;

connection.on('error' , ()=>{
    console.log('Mongo DB connection failed')
})

connection.on('connected' , ()=>{
    console.log('Mongo DB connection successful....')
})

module.exports=mongoose;