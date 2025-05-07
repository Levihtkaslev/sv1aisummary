const mongoose = require('mongoose');

const roles = new mongoose.Schema({
    rolename : {type : String, required : true},
    status : {type : String, default : "inactive"}
})

const role = mongoose.model('role', roles);

module.exports = role;