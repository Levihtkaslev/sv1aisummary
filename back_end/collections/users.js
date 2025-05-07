const mongoose = require('mongoose');

const users = new mongoose.Schema({
    username : {type : String, required : true},
    password : {type : String, required : true},
    userrole : {type: mongoose.Schema.Types.ObjectId, ref:'role'},
    userid : {type : String, required : true},
    location : {type: mongoose.Schema.Types.ObjectId, ref:'location'},
    status : {type : String, default : "inactive"}
})

const userinfo = mongoose.model('userinfo', users);

module.exports = userinfo;