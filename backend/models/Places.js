const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    maxcount : {
        type : Number,
        required : true
    },
    phonenumber : {
        type: Number,
        required : true
    },
    rentperday : {
        type : Number,
        required : true
    },
    imageurls : [],
    currentbookings : [],
    type : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    foodimgurls :[],
    foodname : {
        type : String,
        required : true
    },
    foodtype1 : {
        type : String,
        required : true
    },
    foodtype2 : {
        type : String,
        required : true
    },
    foodhealth : {
        type : String,
        required : true
    },
    fooddescription : {
        type : String,
        required : true
    }
} ,{
    timestamps : true,
})

const placesModel = mongoose.model("place" ,placeSchema)
module.exports = placesModel