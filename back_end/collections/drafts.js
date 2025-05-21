const mongoose = require('mongoose');

const draft = new mongoose.Schema({
            uhid :      { type : Number,  required: true },
            encounter : { type : Number,/*  required: true */  },
            title : { type : String,  },
            last_name : { type : String,  },
            patient_name : { type : String,  },
            patient_gender : { type : String,  },
            dob : { type : Date,  },
            age : { type : String },
            admission_date : { type : Date,  },
            patient_weight : { type: String,},
            date_of_discharge : { type : Date,  },
            diagnosis : [
                {
                   type : String
                }
            ],
            provisional_diagnosis :[
                {
                   type : String
                }
            ],
            history_of_present_illness : [
                {
                   type : String
                }
            ],
            chief_complaints :   [
                {
                    complaint : String,
                    duration : String,
                    nature : String
                }
            ],
            clinical_examination :   
                {
                    Patient : {type: [String], default: []},
                    Patientwas : {type: [String], default: []},
                    Temp : {type: [String], default: []},
                    RR : {type: [String], default: []},
                    SPO2 : {type: [String], default: []},
                    PR : {type: [String], default: []},
                    BP : {type: [String], default: []},
                    CVS : {type: [String], default: []},
                    RS : {type: [String], default: []},
                    Abdomen : {type: [String], default: []},
                    CNS : {type: [String], default: []},
                    LE : {type: [String], default: []}

                }
            ,

            condition_at_discharge :  {
                Patient : {type: [String], default: []},
                Patientwas : {type: [String], default: []},
                Temp : {type: [String], default: []},
                RR : {type: [String], default: []},
                SPO2 : {type: [String], default: []},
                PR : {type: [String], default: []},
                BP : {type: [String], default: []},
                CVS : {type: [String], default: []},
                RS : {type: [String], default: []},
                Abdomen : {type: [String], default: []},
                CNS : {type: [String], default: []},
                LE : {type: [String], default: []}

            },
            past_medical_history  : [
                {
                    type : String
                }
            ],
            past_surgical_history  : [
                {
                    type : String
                }
            ],
            drug_allergy : [
                {
                    type : String
                }
            ],
            family_history : [
                {
                    type : String
                }
            ],
            life_style_history :  [
                {
                    type : String
                }
            ],
            lab_findings : [
                {
                    type : String
                }
            ],
            image_finding : [
                {
                    type : String
                }
            ],
            course_in_the_hospital : [
                {
                    type : String
                }
            ],
            treatment_given :[
                {
                    /* date : Date, */
                    medicine : String,
                    qty : String,
                    dosage : String,
                    frequency : String,
                    route : String
                }
            ],


            instructions : [
                {
                    type : String
                }
            ],
            advice_medication : [
                {
                    medicine_name : String,
                    qty : String,
                    dose : String,
                    route : String,
                    frequency : String,
                    duration : String,
                    food_timing : String
                }
            ],
            
            
            /* 
            condition_at_discharge : [
                {
                    type : String
                }
            ], */
            followup : [
                {
                    type : String
                }
            ],
            diet : [
                {
                    type : String
                }
            ],
            x_ray_findings :   [
                {
                    date : Date,
                    findings : String,
                }
            ],
            ultrasound_findings :   [
                {
                    date : Date,
                    findings : String,
                }
            ],
            echo_findings :   [
                {
                    date : Date,
                    findings : String,
                }
            ],
            ct_findings :   [
                {
                    date : Date,
                    findings : String,
                }
            ],
            mri_findings :   [
                {
                    date : Date,
                    findings : String,
                }
            ],
            ecg_findings :   [
                {
                    date : Date,
                    findings : String,
                }
            ],
            eeg_findings :   [
                {
                    date : Date,
                    findings : String,
                }
            ],
            uroflowmetry_findings :   [
                {
                    date : Date,
                    findings : String,
                }
            ],
             surgery :   [
                {
                    date : Date,
                    notes : String,
                }
            ],
            procedure :   [
                {
                    date : Date,
                    notes : String,
                }
            ], 
          /*   icu_days :  {
                startDate : Date,
                endDate : Date
                },
            ward_days :  {
                startDate : Date,
                endDate : Date
            },  */
            mlc_number : { type : String },
            discharge_advice :[
                {
                    type : String
                }
            ],



        

//==================================================================================SURGERY FIELD========================================================================

    
            surgeries : [
                 {
                    surgery_date :  Date,
                    
                
            
                    anaesthesia : [
                        {
                            type : String
                        }
                    ],
                
            
                    operative_notes : [
                        {
                            type : String
                        }
                    ],
                
            
                    surgery : [
                        {
                            type : String
                        }
                    ],
                
            
                    surgeon_name : [
                        {
                            type : String
                        }
                    ],

                    assistant_surgeon_name : [
                        {
                            type : String
                        }
                    ],
                
            
                    anastetist_name  : [
                        {
                            type : String
                        }
                    ],
                
            
                    post_operative : [
                        {
                            type : String
                        }
                    ],
                    findings : [
                        {
                            type : String
                        }
                    ],
                    implants : [
                        {
                            type : String
                        }
                    ],
                }
            ],



            procedures : [
                {
                   procedure_date :  Date,
                   
               
           
                   anaesthesia : [
                       {
                           type : String
                       }
                   ],
               
           
                   operative_notes : [
                       {
                           type : String
                       }
                   ],
                   surgery : [
                       {
                           type : String
                       }
                   ],
               
           
                   surgeon_name : [
                       {
                           type : String
                       }
                   ],

                   assistant_surgeon_name : [
                       {
                           type : String
                       }
                   ],
               
           
                   anastetist_name  : [
                       {
                           type : String
                       }
                   ],
               
           
                   post_operative : [
                       {
                           type : String
                       }
                   ],
                   findings : [
                       {
                           type : String
                       }
                   ],
                   implants : [
                       {
                           type : String
                       }
                   ],
               }
           ],
            
    

//==================================================================================GYNECOLOGY FIELD========================================================================


            gyn_menstrual_history : [
                {
                    type : String
                }
            ],
    

            gyn_lmp  : Date,


            gyn_edd : Date,
    

            gyn_bloodgroup : String,

            gyn_obstetric_history :  [
                {
                    type : String
                }
            ],
            gyn_marital_history :  [
                {
                    type : String
                }
            ], 
            gyn_hysteroscopy :  [
                {
                    type : String
                }
            ], 
            gyn_laproscopy :  [
                {
                    type : String
                }
            ], 
            gyn_indicators :  [
                {
                    type : String
                }
            ], 
    

//==================================================================================OBSTETRIC FIELD========================================================================


            obs_marital_history :  [
                {
                    type : String
                }
            ], 
            obs_hysteroscopy :  [
                {
                    type : String
                }
            ], 
            obs_laproscopy :  [
                {
                    type : String
                }
            ], 
            obs_indicators :  [
                {
                    type : String
                }
            ], 
            obs_obstetric_history : [
                {
                    type : String
                }
            ],
    

            obs_menstrual_history : [
                {
                    type : String
                }
            ],
    

            obs_lmp  : Date,
    

            obs_edd :Date,
    

            obs_bloodgroup : String,
    

            obs_gravida : [
                {
                    type : String
                }
            ],
    
    
            obs_parity : [
                {
                    type : String
                }
            ],
        
    
            obs_abortion : String,
        
    
            obs_live_birth : [
                {
                    type : String
                }
            ],
        
    
            obs_mode_of_delivery : [
                {
                    type : String
                }
            ],
        
    
            obs_delivery_date :  Date,
        
    
            obs_baby_gender : String,
        
    
            obs_baby_weight  :String,
        
    
            obs_apgar : [
                {
                    type : String
                }
            ],
        


//==================================================================================NEONATOLOGY FIELD========================================================================

//==================================================================================PEDIATRIC FIELD========================================================================

//==================================================================================IVF FIELD========================================================================

    
            ivf_obstetric_history : [
                {
                    type : String
                }
            ],
        
    
            ivf_menstrual_history : [
                {
                    type : String
                }
            ],
        
    
            ivf_lmp  :Date,
        
    
            ivf_edd :Date,
        
    
            ivf_bloodgroup :String,
        
    
            ivf_embryo_transfer : [
                {
                    type : String
                }
            ],
        
    
            ivf_pregnancy_test : [
                {

                }
            ],
        
    
            ivf_partner_name : [
                {
                    type : String
                }
            ],
        
    
            ivf_partner_age : String,
        
    
            ivf_amh_level : [
                {
                    type : String
                }
            ],
        
    
            ivf_antrafolicle : [
                {
                    type : String
                }
            ],
        
    
            ivf_previous_ivf_attempt : [
                {
                    type : String
                }
            ],
        
    
            ivf_treatment_protocol : [
                {
                    type : String
                }
            ],
        
    
            ivf_outcome : [
                {
                    type : String
                }
            ],
            createdtime: { type: Date, default: Date.now },

            lastmodified: { type: Date, default: Date.now },
            
            doneby: {type :  String,default : "pending"},
            doctor : {type :  String,default : "pending"},
            status : {type : String, default : "pending"},
          /*   zzza : {type : Boolean, default : false}, */
            zzzb : {type : Boolean, default : false},
            zzzc : {type : Boolean, default : false},
            zzzd : {type : Boolean, default : false},
            draftstatus : {default : "No", type : String},
            count : {type: Number, default : 1}

    
})

const draftcollection = mongoose.model('draft', draft);

module.exports = draftcollection;