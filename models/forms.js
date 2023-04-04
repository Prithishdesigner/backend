const mongoose = require('mongoose');

const FormSchema = mongoose.Schema({

    turnover:{type:String},
    name:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    email:{type:String,required:true},
    isChecked:{type:Boolean,required:true},


    // validated:{type:String},
    
   

},{timestamps:true});

const formModel = mongoose.model('forms', FormSchema);

module.exports = formModel;