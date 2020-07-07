const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency

const promoSchema = new Schema({
    name:{
        type:String,
        require:true,
        unique:true

    },
    image:{
        type:String,
        require:true
    },
    lable:{
        type:String,
        require:true,
        
    }
    ,
    price:{
        type:Currency,
        require:true,
        min:0
    },
    featured:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const Promo = mongoose.model('Promo',promoSchema)

module.exports = Promo