const draft = require("../collections/drafts");

exports.postdraft =  async(req, res) => {
    try {
     const  draftt  = req.body;
 
       if(!draftt.uhid){
         return res.status(400).json({
             error: "UHID Missing"
         })
     }  
 
      let existinguhid = await draft.findOne({uhid : draftt.uhid});
 
     if(existinguhid){
         
              existinguhid.encounter = draftt.encounter;
              existinguhid.patient_name = draftt.patient_name; 
              existinguhid.uhid = draftt.uhid;
              existinguhid.patient_gender = draftt.patient_gender;
              existinguhid.last_name = draftt.last_name;
              existinguhid.title = draftt.title;
              existinguhid.dob = draftt.dob;
              existinguhid.age = draftt.age;
              existinguhid.admission_date = draftt.admission_date;
              existinguhid.patient_weight = draftt.patient_weight;
              existinguhid.date_of_discharge = draftt.date_of_discharge; 
              existinguhid.diagnosis = draftt.diagnosis;
              existinguhid.provisional_diagnosis = draftt.provisional_diagnosis
              existinguhid.chief_complaints = draftt.chief_complaints;
              existinguhid.history_of_present_illness = draftt.history_of_present_illness;
              existinguhid.past_medical_history = draftt.past_medical_history;
              existinguhid.past_surgical_history = draftt.past_surgical_history;
              existinguhid.drug_allergy = draftt.drug_allergy;
              existinguhid.family_history = draftt.family_history;
              existinguhid.life_style_history = draftt.life_style_history;
              existinguhid.clinical_examination = draftt.clinical_examination;
              existinguhid.lab_findings = draftt.lab_findings;
              existinguhid.image_finding = draftt.image_finding;
              existinguhid.course_in_the_hospital = draftt.course_in_the_hospital;
              existinguhid.treatment_given = draftt.treatment_given;
              existinguhid.instructions = draftt.instructions;
              existinguhid.advice_medication = draftt.advice_medication;
              existinguhid.condition_at_discharge = draftt.condition_at_discharge;
              existinguhid.followup = draftt.followup;
              existinguhid.diet = draftt.diet;
              existinguhid.x_ray_findings = draftt.x_ray_findings
              existinguhid.ultrasound_findings = draftt.ultrasound_findings
              existinguhid.echo_findings = draftt.echo_findings
              existinguhid.ct_findings = draftt.ct_findings
              existinguhid.mri_findings = draftt.mri_findings
              existinguhid.ecg_findings = draftt.ecg_findings
              existinguhid.eeg_findings = draftt.eeg_findings
              existinguhid.uroflowmetry_findings = draftt.uroflowmetry_findings
              existinguhid.surgery = draftt.surgery
              existinguhid.procedure = draftt.procedure 
              existinguhid.mlc_number = draftt.mlc_number
              existinguhid.discharge_advice = draftt.discharge_advice
              /* existinguhid.icu_days = draftt.icu_days 
              existinguhid.ward_days = draftt.ward_days  */
             /*  existinguhid.s_surgery_date = draftt.s_surgery_date;
              existinguhid.s_anaesthesia = draftt.s_anaesthesia;
              existinguhid.s_assistant_surgeon_name = draftt.s_assistant_surgeon_name;
              existinguhid.s_operative_notes = draftt.s_operative_notes;
              existinguhid.s_surgery = draftt.s_surgery;
              existinguhid.s_surgeon_name = draftt.s_surgeon_name;
              existinguhid.s_anastetist_name = draftt.s_anastetist_name;
              existinguhid.s_post_operative = draftt.s_post_operative;
              existinguhid.s_findings = draftt.s_findings;
              existinguhid.s_implants = draftt.s_implants; */
              existinguhid.surgeries = draftt.surgeries;
              existinguhid.procedures = draftt.procedures;
              existinguhid.gyn_obstetric_history = draftt.gyn_obstetric_history;
              existinguhid.gyn_menstrual_history = draftt.gyn_menstrual_history;
              existinguhid.gyn_lmp = draftt.gyn_lmp;
              existinguhid.gyn_edd = draftt.gyn_edd;
              existinguhid.gyn_marital_history = draftt.gyn_marital_history;
              existinguhid.gyn_bloodgroup = draftt.gyn_bloodgroup;
              existinguhid.gyn_hysteroscopy = draftt.gyn_hysteroscopy;
              existinguhid.gyn_laproscopy= draftt.gyn_laproscopy;
              existinguhid.gyn_indicators = draftt.gyn_indicators;
              existinguhid.obs_obstetric_history = draftt.obs_obstetric_history;
              existinguhid.obs_menstrual_history = draftt.obs_menstrual_history;
              existinguhid.obs_lmp = draftt.obs_lmp;
              existinguhid.obs_edd = draftt.obs_edd;
              existinguhid.obs_bloodgroup = draftt.obs_bloodgroup;
              existinguhid.obs_gravida = draftt.obs_gravida;
              existinguhid.obs_parity = draftt.obs_parity;
              existinguhid.obs_abortion = draftt.obs_abortion;
              existinguhid.obs_live_birth = draftt.obs_live_birth;
              existinguhid.obs_mode_of_delivery = draftt.obs_mode_of_delivery;
              existinguhid.obs_delivery_date = draftt.obs_delivery_date;
              existinguhid.obs_baby_gender = draftt.obs_baby_gender;
              existinguhid.obs_baby_weight = draftt.obs_baby_weight;
              existinguhid.obs_apgar = draftt.obs_apgar;
              existinguhid.obs_marital_history = draftt.obs_marital_history;
              existinguhid.obs_hysteroscopy = draftt.obs_hysteroscopy;
              existinguhid.obs_laproscopy= draftt.obs_laproscopy;
              existinguhid.obs_indicators = draftt.obs_indicators;
              existinguhid.ivf_obstetric_history = draftt.ivf_obstetric_history;
              existinguhid.ivf_menstrual_history = draftt.ivf_menstrual_history;
              existinguhid.ivf_lmp = draftt.ivf_lmp;
              existinguhid.ivf_edd = draftt.ivf_edd;
              existinguhid.ivf_bloodgroup = draftt.ivf_bloodgroup;
              existinguhid.ivf_embryo_transfer = draftt.ivf_embryo_transfer;
              existinguhid.ivf_partner_name = draftt.ivf_partner_name;
              existinguhid.ivf_partner_age = draftt.ivf_partner_age;
              existinguhid.ivf_amh_level = draftt.ivf_amh_level;
              existinguhid.ivf_antrafolicle = draftt.ivf_antrafolicle;
              existinguhid.ivf_previous_ivf_attempt = draftt.ivf_previous_ivf_attempt;
              existinguhid.ivf_treatment_protocol = draftt.ivf_treatment_protocol;
              existinguhid.ivf_outcome = draftt.ivf_outcome; 
              existinguhid.createdtime = draftt.createdtime;
              existinguhid.lastmodified = draftt.lastmodified;
              existinguhid.doctor = draftt.doctor;
              existinguhid.doneby = draftt.doneby;
              /* existinguhid.zzza = draftt.zzza; */
              existinguhid.zzzb = draftt.zzzb;
              existinguhid.zzzc = draftt.zzzc;
              existinguhid.zzzd = draftt.zzzd;
              existinguhid.draftstatus = draftt.draftstatus
              existinguhid.count = existinguhid.count+1
         
         await existinguhid.save();
         return res.json({
             message : "Record saved successfully", 
             data : existinguhid
         });
     }else{ 
         const newrecord = new draft(
             draftt
         )
         await newrecord.save();
         return res.json({
             message: "New patient record created successfully",
             data: newrecord,
         })
      } 
    } catch (error) {
     console.error(" Error saving patient information:", error);
     res.status(500).json({error : "Internal server error"})
    }
 }


 exports.getdraftuhid = async (req, res) => {
    const { uhid } = req.params;
  
    try {
        console.log("Received UHID:", uhid); 

        const patinfo = await draft.findOne({ uhid: Number(uhid) });

        if (!patinfo) {
            console.log("UHID not found in database.");
            return res.status(404).json({ message: "No patient found with this UHID" });
        }

        return res.json({
            message: "Fetched successfully",
            data: patinfo, 
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.getdraft  =  async (req, res) => {
    try {
      const { from, to } = req.query;
  
      if (!from || !to) {
        return res.status(400).json({ message: "From and To dates are required" });
      }
  
      const fromDate = new Date(from);
      const toDate = new Date(to);
  
      const drafts = await draft.find({
        createdtime: {
          $gte: fromDate,
          $lte: toDate
        }
      });
  
      res.json({
        message: "Drafts fetched successfully",
        data: drafts
      });
  
    } catch (error) {
      console.error("Error fetching drafts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  exports.deletedraft = async(req, res) => {
      try {
          const { uhid } = req.params;
          const deleted = await draft.findOneAndDelete({ uhid });
          if (!deleted) {
              return res.status(404).json({ message: "Draft not found with that UHID" });
            }
          res.status(200).json({
          message: "Draft deleted successfully",
          deletedDraft: deleted
          });
          
      } catch (error) {
          console.error("Error deleting draft:", error);
          res.status(500).json({ message: "Internal Server Error", error });
      }
    }

exports.patchdraft = async(req, res) => {
  try {
    const patched = await draft.findOneAndUpdate({uhid : req.params.uhid}, { draftstatus: 'Yes' },{ new: true })
    if (!patched) {
      return res.status(404).json({ message: 'draft not found' });
    }
    res.status(200).json(patched);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}