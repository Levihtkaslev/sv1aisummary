const mongoose = require('mongoose');

const locat = new mongoose.Schema({
    locationname : {type : String, required : true},
    status : {type : String, default : "inactive"}
})

const location = mongoose.model('location', locat);

module.exports = location;