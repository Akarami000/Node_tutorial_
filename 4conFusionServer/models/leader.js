const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    image:{
        type:String,
        require:true
    },
    designation:{
        type:String,
        require:true
    },
    abbr:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }

},{
    timestamps:true
})

var Leader = mongoose.model('Lead',leaderSchema);
module.exports = Leader;