const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    cname: {
        type : String,
        required:true
    },
    clocation: {
        type : String,
        required:true
    },
    cphonenumber: {
        type : Number,
        required:true
    },
    ctype1: {
        type : String,
        required:true
    },
    ctype2: {
        type : String,
        required:true
    },
    cimageurls:[],
    cemail:{
        type: String,
        required:true
    },
    clink1:{
        type: String,
        required:true
    },
    clink2:{
        type: String,
        required:true
    },
    clink3:{
        type: String,
        required:true
    },
    clink4:{
        type: String,
        required:true
    }
},{
    timestamps:true
})
const contactsModel = mongoose.model("contacts",contactSchema);
module.exports = contactsModel