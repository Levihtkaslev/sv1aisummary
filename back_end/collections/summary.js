const mongoose = require('mongoose');

const summar = new mongoose.Schema({
    uhid : {type : Number, required: true},
    summarydetail : [
        {
            patient_name : {type : String},
            uhid : {type: Number, required:true},
            doneby: {type :  String,default : "pending"},
            doctor : {type :  String,default : "pending"},
            encounter : {type : Number, required : true},
            summary : {type : String, required: true},
            status : {type : String, default : "pending"},
            createdtime : {type : Date,},
            lastmodified : {type : Date,} 
        }
    ]
}
)

const dosumm = mongoose.model('fullsummary', summar);

module.exports = dosumm;