import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom'
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useLocation } from "react-router-dom";
import Kraniumpatinfo from '../kranium/kranipatinfo';
import Kranilab from '../kranium/kranilab';
import { BiSolidHome } from "react-icons/bi";
import { GiLoveInjection } from "react-icons/gi";
import { MdChildFriendly } from "react-icons/md";
import { FaFemale } from "react-icons/fa";
import { FaBaby } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { IoMdRemoveCircle } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";
import { PiClockCountdownFill } from "react-icons/pi";
import { TiThMenu } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import { PiGenderIntersexFill } from "react-icons/pi";
import { GiBoneGnawer } from "react-icons/gi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { MdContactPage } from "react-icons/md";
import { FaWeightScale } from "react-icons/fa6";
import { SiUniqlo } from "react-icons/si";
import { FaTrash } from "react-icons/fa";
import { BsClipboard2DataFill } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { SiOnlyoffice } from "react-icons/si";
import { MdLocalHospital } from "react-icons/md";
import { RiChatHistoryFill } from "react-icons/ri";
import { FaBookMedical } from "react-icons/fa";
import { ImLab } from "react-icons/im";
import { MdHealthAndSafety } from "react-icons/md";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";
import { SiWikimediafoundation } from "react-icons/si";
import { FaSave } from "react-icons/fa";
import { FaMagic } from "react-icons/fa";
import { MdMore } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import Kranilabtext from '../kranium/kanilabtext';
import CreatableSelect from 'react-select/creatable';

function Draft() {

  const navigate = useNavigate();
  const location = useLocation();
  const incomingDraft = location.state;
  console.log("Incoming Draft:", incomingDraft); 
  const offset = 5.5 * 60 * 60 * 1000; // IST offset
  const indianDate = new Date(Date.now() + offset);
  const [blockai, setblockai] = useState(false);
  const[showsurgery, setshowsurgery] = useState(false);
  const[showgyn, setshowgyn] = useState(false);
  const[showobs, setshowobs] = useState(false);
  const[showivf, setshowivf] = useState(false);
  const[doctor, setdoctor] = useState("");
  const[userlist, setuserlist] = useState([]);
  const userid = localStorage.getItem("userid")
  const [showconfirmdraft, setshowconfirmdraft] = useState(false)
  const [showconfirmgenrate, setshowconfirmgenrate] = useState(false)
  const[laburl, setlaburl] = useState("")
  const [moving, setmoving] = useState(true)
  const backendurl = import.meta.env.VITE_BACKEND_BASURL;
  const[draft, setdraft] = useState({
        uhid : "",
        encounter : "",
        patient_name : "",
        last_name : "",
        title: "",
        patient_gender : "",
        dob : "",
        age : "",
        admission_date : "",
        patient_weight : "",
        date_of_discharge : "", 
        diagnosis : [''],
        provisional_diagnosis : [''],
        past_medical_history : [''], 
        chief_complaints : [ {complaint : "", duration : "", nature : ""} ],
        history_of_present_illness : [''],
        past_surgical_history : [''],
        drug_allergy : [""],
        family_history : [""],
        life_style_history : [""],
        clinical_examination : {
          Patient: [],
          Patientwas : [],
          Temp: [],
          RR: [],
          SPO2: [],
          PR: [],
          BP: [],
          CVS: [],
          RS: [],
          Abdomen: [],
          CNS: [],
          LE: []
        },
        condition_at_discharge : {
          Patient: [],
          Patientwas : [],
          Temp: [],
          RR: [],
          SPO2: [],
          PR: [],
          BP: [],
          CVS: [],
          RS: [],
          Abdomen: [],
          CNS: [],
          LE: []
        },
        lab_findings : [""],
        image_finding : [''],
        course_in_the_hospital : [''],
        treatment_given : [ {/* date : "", */ medicine : "", qty :"", dosage : "", frequency :"", route :""} ],
        instructions : [""],
        advice_medication : [{medicine_name : "", qty :"", dose : "", route : "", frequency :"", food_timing :"", duration :""}],
       /*  condition_at_discharge : [''], */
        followup : [""],
        diet : [''],
        x_ray_findings : [ {date : "", findings : ""} ],
        ultrasound_findings : [ {date : "", findings : ""} ],
        echo_findings : [ {date : "", findings : ""} ],
        ct_findings : [ {date : "", findings : ""} ],
        mri_findings : [ {date : "", findings : ""} ],
        ecg_findings : [ {date : "", findings : ""} ],
        eeg_findings : [ {date : "", findings : ""} ],
        uroflowmetry_findings : [ {date : "", findings : ""} ],
        surgery : [ {date : "", notes : ""} ],
        procedure : [ {date : "", notes : ""} ], 
        mlc_number :  "",
        /* icu_days : {startDate : "", endDate : ""},
        ward_days : {startDate : "", endDate : ""}, */
        surgeries : [
          {
            surgery_date : '',
            anaesthesia:[''],
            assistant_surgeon_name : [''],
            operative_notes : [''],
            surgery : [''],
            surgeon_name:[''],
            anastetist_name : [''],
            post_operative :[''],
            implants :[''],
            findings : [''],
          }
        ],

        procedures : [
          {
            procedure_date : '',
            anaesthesia:[''],
            assistant_surgeon_name : [''],
            operative_notes : [''],
            surgery : [''],
            surgeon_name:[''],
            anastetist_name : [''],
            post_operative :[''],
            implants :[''],
            findings : [''],
          }
        ],
        gyn_obstetric_history : [''],
        gyn_menstrual_history : [''],
        gyn_marital_history : [''],
        gyn_lmp :'',
        gyn_edd : '',
        gyn_bloodgroup : '',
        gyn_hysteroscopy : [''],
        gyn_laproscopy : [''],
        gyn_indicators : [''],
        obs_obstetric_history : [''],
        obs_menstrual_history : [''],
        obs_lmp : '',
        obs_edd : '',
        obs_bloodgroup : '',
        obs_gravida : [''],
        obs_parity : [''],
        obs_abortion : '',
        obs_live_birth : [''],
        obs_mode_of_delivery : [''],
        obs_delivery_date : '',
        obs_baby_gender : '',
        obs_baby_weight : '',
        obs_apgar : [''],
        obs_hysteroscopy : [''],
        obs_laproscopy : [''],
        obs_indicators : [''],
        obs_marital_history : [''],
        ivf_obstetric_history : [''],
        ivf_menstrual_history : [''],
        ivf_lmp : '',
        ivf_edd : '',
        ivf_bloodgroup : '',
        ivf_embryo_transfer : [''],
        ivf_pregnancy_test : [''],
        ivf_partner_name : [''],
        ivf_partner_age : '',
        ivf_amh_level : [''],
        ivf_antrafolicle : [''],
        ivf_previous_ivf_attempt : [''],
        ivf_treatment_protocol : [''],
        ivf_outcome : [''],
        createdtime: "",
        lastmodified:"", 
        doctor : doctor,
        doneby : userid,
       /*  zzza : true, */
        zzzb : false,
        zzzc : false,
        zzzd : false,


      })



      useEffect(() => {
        fetchuser();
        if (incomingDraft) {
          setdraft(prev => ({
            ...prev,
            ...incomingDraft,
            /* dob: incomingDraft.dob ? new Date(incomingDraft.dob) : "",
            admission_date: incomingDraft.admission_date ? new Date(incomingDraft.admission_date) : "", */
          }));
          /* setshowsurgery(true),
          setshowobs(true)
          setshowivf(true)
          setshowgyn(true) */
        }
      }, [incomingDraft]);


      const fetchuser = async () => {
          try {
            const response = await axios.get(`${backendurl}/user`);
            /* console.log("Users Response:", response.data); */
      
            if (response.data && response.data.data) {
              const responses = response.data.data
              /* console.log("res", responses) */

              const doctors = responses.filter(doc => doc.userrole?.rolename === "Doctor")
              /* console.log(doctors) */
              setuserlist(doctors);

            } else {
              console.log("No location data found");
            }
          } catch (error) {
            console.error("Error while fetching locations:", error);
          }
        };


    const calculateage = (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
    
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();
    
      if (days < 0) {
        months--;
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += previousMonth.getDate(); 
      }
    
      if (months < 0) {
        years--;
        months += 12;
      }
    
      return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}, and ${days} day${days !== 1 ? 's' : ''}`;
    };
    
    

    const sendtoai = async() => {
      setmoving(false)
      toast.success("Please Wait while generating")
      setblockai(false)
      await axios.patch(`${backendurl}/draft/${draft.uhid}`);
      const encounter = draft.encounter
      console.log("encounter :",encounter )
      const labreport = await Kranilabtext(encounter)
      console.log("lab", labreport)
      const cleaneddraft = cleanDraft(draft);
      console.log("filter", cleaneddraft)
      setshowconfirmgenrate(false)
      navigate("/ai-summariztion", {state: {cleaneddraft, patient_name : draft.patient_name, uhid : draft.uhid, encounter : draft.encounter, doctor : draft.doctor, labreport : labreport}});
      setmoving(true)
    };


/*     const surgery = () => {
      toast.success("Surgery Department Opened")
      setshowsurgery(true)
      setdraft((prev) => ({ ...prev,
        zzza: true,
      }));
    } */

    const gyn = () => {
      toast.success("Gynocology Department Opened")
      setshowgyn(true)
      setdraft((prev) => ({ ...prev,
        zzzb: true,
      }));
    }

    const obste = () => {
      toast.success("obstetrics Department Opened")
      setshowobs(true)
      setdraft((prev) => ({ ...prev,
        zzzc: true,
      }));
    }
    const ivf = () => {
      toast.success("IVF Department Opened")
      setshowivf(true)
      setdraft((prev) => ({ ...prev,
        zzzb: true,
      }));
    }

/*     const formatDateTimeLocal = (isoDate) => {
      if (!isoDate) return "";

  const date = new Date(isoDate);

  const offsetInMinutes = date.getTimezoneOffset(); 
  const istDate = new Date(date.getTime() - offsetInMinutes * 60000);

  return istDate.toISOString().slice(0, 16);
}; */

    const formatDate = (isoString) => {
      if (!isoString) return "";
      const date = new Date(isoString);
      const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      return istDate.toISOString().slice(0, 10);
    };

/*     const handleIcuDaysChange = (value) => {
      if (value && value.length === 2) {
        setdraft((prev) => ({
          ...prev,
          icu_days: {
            startDate: value[0],
            endDate: value[1],
          },
        }));
      }
    };

    const handlewardDaysChange = (value) => {
      if (value && value.length === 2) {
        setdraft((prev) => ({
          ...prev,
          ward_days: {
            startDate: value[0],
            endDate: value[1],
          },
        }));
      }
    }; */
    
    

  const getval = async () => {
    if (!draft.uhid) {
      toast.warning("Please enter a UHID");
      return;
    }
  
    try {
      const response = await axios.get(`${backendurl}/draft/${draft.uhid}`);
      console.log("Fetched Data:", response.data);
  
      if (!response.data.data) {
        alert("No data found for this UHID");
        return;
      }
  
      setdraft((pre) => {
        const fetched = response.data.data;
      
        return {
          ...pre,
          ...fetched,
          icu_days: {
            startDate: fetched.icu_days?.startDate ? new Date(fetched.icu_days.startDate) : null,
            endDate: fetched.icu_days?.endDate ? new Date(fetched.icu_days.endDate) : null,
          },
          ward_days: {
            startDate: fetched.ward_days?.startDate ? new Date(fetched.ward_days.startDate) : null,
            endDate: fetched.ward_days?.endDate ? new Date(fetched.ward_days.endDate) : null,
          }
        };
      });
      toast.success("Draft Fetched Successfully")
      /* setshowgyn(true) */
      /* setshowsurgery(true) */
      /* setshowobs(true)
      setshowivf(true) */
    } catch (error) {
      console.error("Error while fetching data:", error);
      toast.error("No draft Found")
    }
  };
  

//For multi box
  const addmulti = (fieldname, emptyobj) => {
    setdraft((pre) => ({
      ...pre, [fieldname]: [...pre[fieldname], emptyobj]
    }))
  }

  const removemulti = (fieldname, index) => {
    setdraft((pre) => ({
      ...pre,
      [fieldname]: pre[fieldname].filter((_, i) => i !== index),
    }));
  };

  const changingmulti = ( fieldname, index, subfield, value ) => {
    setdraft((pre) => {
      const updatedraft = [...pre[fieldname]];
      updatedraft[index][subfield] = value;
      return {
        ...pre, [fieldname] : updatedraft
      };
    });
  }

  const changingmultee = (fieldname, subfield, value) => {
    setdraft((pre) => ({
      ...pre,
      [fieldname]: {
        ...pre[fieldname],
        [subfield]: value
      }
    }));
  };

  const mediactionduration = ["Till Review", "1 to 10 Days", "1 Month", "2 Month", "3 Month", "6 Month", "1 Year", "To continue", "Alternative days"];
  const mediactionfrequency = ['1 - 0 - 1','1 - 1 - 0', '1 - 1 - 1', '1 - 1 - 1 - 1', '0 - 1 - 0', '0 - 0 - 1', '1 - 0 - 0', '1 - 1 - 1 - 1 - 1 - 1', "STAT" ];
  const dosage = ['MG', 'ML', 'GM', 'MCG','UNIT','SUPP', 'RESP','CAP', 'TAB', 'P/RT','P/PEG', 'P/FJ' , 'AMP','CC','SET', 'TSP', 'SCOOP','SPRAY' ] ;
  const rote =['IV', 'ORAL', 'S/C','P/N','IM','L/A','P/E','P/EAR','S/L','P/R','P/V'];

  
  const val = draft.clinical_examination; 
  const val2 = draft.condition_at_discharge; 
  const fields = [
    'Patient', 'Patientwas', 'Temp', 'RR', 'SPO2', 'PR', 'BP', 'CVS', 'RS', 'Abdomen', 'CNS', 'LE'
  ];

  const fieldOptions = {
    Patient: [
      { label: 'Conscious', value: 'Conscious' },
      { label: 'Unconscious', value: 'Unconscious' },
      { label: 'Unresponsive', value: 'Unresponsive' },
      { label: 'Drowsy', value: 'Drowsy' },
      { label: 'Oriented', value: 'Oriented' },
      { label: 'Disorented', value: 'Disorented' },
      { label: 'Arousable', value: 'Arousable' },
      { label: 'not responding to oral commands', value: 'not responding to oral commands' },
      { label: 'responding to oral commands', value: 'responding to oral commands' },
      { label: 'responding to painful stimuli', value: 'responding to painful stimuli' },
      { label: 'not responding to painful stimuli', value: 'not responding to painful stimuli' },
      { label: 'Febrile ', value: 'Febrile ' },
      { label: 'Afebrile', value: 'Afebrile' },
      { label: 'hydrated', value: 'hydrated' },
      { label: 'Dehydrated', value: 'Dehydrated' }

    ],

    Patientwas: [
      { label: ' Dyspneic', value: ' Dyspneic' },
      { label: 'tachypneic', value: 'tachypneic' },
      { label: ' tachycardia', value: ' tachycardia' },
      { label: 'orthopenia', value: 'orthopenia' },
      { label: ' Pallor', value: ' Pallor' },
      { label: 'Icteric', value: 'Icteric' },
      { label: ' cynosis', value: ' cynosis' },
      { label: 'Bilateral pitting pedal edema', value: 'Bilateral pitting pedal edema' }
    ],

    Temp: [
    ],
    RR: [
      
    ],
    SPO2: [
      { label: ' in room air', value: ' in room air' },
      { label: 'with  Oxygen support', value: 'with  Oxygen support' }
    ],
    PR: [
    
    ],
    BP: [
     
    ],
    CVS: [
      { label: ' S1S2 (+)', value: ' S1S2 (+)' },
      { label: 'ESM (+) ', value: 'ESM (+) ' },
    ],
    RS: [
      { label: ' Bilateral air entry (+)', value: ' Bilateral air entry (+)' },
      { label: 'Normal vesicular breath sounds', value: 'Normal vesicular breath sounds' },
      { label: ' bilateral wheeze (+)', value: ' bilateral wheeze (+)' },
      { label: 'bilateral crepts (+)', value: 'bilateral crepts (+)' },
      { label: ' decreased air entry right side', value: ' decreased air entry right side' },
      { label: 'decreased air entry left side', value: 'decreased air entry left side' },
      { label: ' Absent air entry ', value: ' Absent air entry ' },
    ],
    Abdomen: [
      { label: ' Soft', value: ' Soft' },
      { label: 'Bowel sounds', value: 'Bowel sounds' },
      { label: ' Sluggish', value: ' Sluggish' },
      { label: 'absent', value: 'absent' },
      { label: ' guarding', value: ' guarding' },
      { label: 'rigidity', value: 'rigidity' },
      { label: ' cynosis', value: ' cynosis' },
      { label: 'tenderness  epigastric/ hypochodrial/lumbar/ rif / lif/umbilical ', value: 'tenderness  epigastric/ hypochodrial/lumbar/ rif / lif/umbilical ' }
    ],
    CNS: [
      { label: ' No focal neurological deficit', value: ' No focal neurological deficit' },
      { label: 'Moves all 4 limbs', value: 'Moves all 4 limbs' },
      { label: 'Left hemiparesis', value: 'Left hemiparesis' },
      { label: 'right hemiparesis', value: 'right hemiparesis' },
      { label: 'left hemiplegia', value: 'left hemiplegia' },
      { label: 'right hemiplegia', value: 'right hemiplegia' },
      { label: ' quadriplegia', value: ' quadriplegia' },
      { label: 'spastic hemiparesis', value: 'spastic hemiparesis' },
      { label: 'bradykinesia', value: 'bradykinesia' },
      { label: 'cog wheel rigidty ', value: 'cog wheel rigidty ' },
      { label: 'UMN facial palsy Left /Right', value: 'UMN facial palsy Left /Right' },
      { label: 'deviation of angle of mouth to left / right', value: 'deviation of angle of mouth to left / right' },
      { label: ' motor aphasia', value: ' motor aphasia' },
      { label: 'global aphasia', value: 'global aphasia' },
      { label: ' GCS - 15/15', value: ' GCS - 15/15' },
    ],
    LE: [
     
    ],
  };


  const addsingle = (fieldname) => {
    setdraft((pre) => ({
      ...pre, 
      [fieldname]: [...pre[fieldname], ""] 
    }));
  };


  const addsingleinside = (fieldname, sbfield) => {
    setdraft((pre) => ({
      ...pre, 
      [fieldname]: [...pre[fieldname], ""] 
    }));
  };

  
  const changingsingle = (fieldname, index, value) => {
    setdraft((pre) => {
      const updatedraft = [...pre[fieldname]];
      updatedraft[index] = value; 
      return {
        ...pre, [fieldname]: updatedraft
      };
    });
  };

  const cleanDraft = (data) => {
    const cleaned = {};
  
    for (const key in data) {
      const value = data[key];
  
      if (value === null || (typeof value === "string" && value.trim() === "")) continue;
  
      if (Array.isArray(value)) {
        if (value.length === 0) continue;
  
        const cleanedArray = value
          .map((item) => {
            if (typeof item === "object" && item !== null) {
              const newItem = { ...item };
              delete newItem._id; 
              return newItem;
            }
            return item;
          })
          .filter((item) => {
            if (typeof item === "string") {
              return item && item.trim() !== "";
            }
            if (typeof item === "object") {
              return !Object.values(item).every((val) => val === "" || val === null);
            }
            return item !== null;
          });
  
        if (cleanedArray.length > 0) {
          cleaned[key] = cleanedArray;
        }
  
        continue;
      }
  
      if (typeof value === "object" && value !== null) {
        const newObj = { ...value };
        delete newObj._id;
  
        const allEmptyOrNull = Object.values(newObj).every((val) => val === "" || val === null);
        if (!allEmptyOrNull) {
          cleaned[key] = newObj;
        }
        continue;
      }
  
      cleaned[key] = value;
    }
  
    return cleaned;
  };
  

  const dodraft = () => {
    setshowconfirmdraft(true)
  }

  const dogenerate = () => {
    setshowconfirmgenrate(true)
  }

  const nodraft = () => {
    setshowconfirmdraft(false)
    setmoving(true)
  }

  const nogenerate = () => {
    setshowconfirmgenrate(false)
    setmoving(true)
  }
  
  
  
  
  const submitcomplaints = async() => {

    if(draft.doctor === "" || draft.encounter === "" || draft.uhid === ""){


      toast.error(draft.doctor === "" ? "Choose Doctor to Proceed" : draft.encounter === ""? "Fill Encounter to proceed" : "Fill UHID to Procedd" )
      
      return;
    }
    console.log(draft)
    const draftload = {
      ...draft,
      createdtime: draft.createdtime|| indianDate,
      lastmodified: indianDate, 
      doctor : draft.doctor,
      doneby : userid, 
    };
    try {
      await axios.post(`${backendurl}/draft`, draftload);
      console.log("Added successfully");
      toast.success("Draft Saved Successfully")
    } catch (error) {
      
      console.error("Failed to add", error);
    }
    setblockai(true);
    setshowconfirmdraft(false)
  }

  const getkranidata = async(uhid) => {
    console.log("uhid",uhid)
    if(draft.uhid === "" ){
      
      return
    }
    try {
       const encounter = draft.encounter
      console.log("encounter :",encounter )
      const labreport = await Kranilab(encounter)
      console.log("lab", labreport) 
       setlaburl(labreport) 
      const response = await Kraniumpatinfo(uhid)

      if (response && response.length > 0) {
         const kranidat = response[0];
        console.log("hi", kranidat);
        setdraft((pre) => ({
          ...pre,
          patient_name : kranidat.first_name,
          dob : kranidat.date_of_birth,
          age : calculateage(kranidat.date_of_birth),
          patient_gender : kranidat.gender,
          title : kranidat.title,
          last_name : kranidat.last_name
        }))
        toast.success("Demography Fetched Successfully")
      } else {
        console.log("No patient data found.");
        toast.error("No Patient data found")
      }
    } catch (error) {
      console.log("Error getting data", error)
    }
  }


  return (
    <div className='flex flex-col m-6 justify-center items-center'>

      <div className='heading1'>
          <p className='headtitle'>Create Draft</p>
          <div className='bread'>
              <>
              <><BiSolidHome /></>
              <p className='breadunder' onClick={() => navigate("/")}>Dashboard</p>
              </>
              <>/ </>
              <>
              <div className='text-gray-500 text-sm'>Create Draft</div>
              </>
          </div>
      </div>

    <div className='w-full '>
      <div className='border shadow-lg shadow-gray-200 border-gray-300 rounded-md justify-between p-10 mt-32 flex '>
      
        <div className='flex flex-col gap-3 justify-evenly'>
          <div className='flex items-center  gap-1.5'>
            <FaUserDoctor className='text-2xl text-gray-700'/>
            <p className='text-gray-700 text-2xl'>Doctor <span className='text-red-600'>*</span></p>
          </div>
         

          <select className='cursor-pointer border-2 outline-0 p-2  rounded-md border-gray-300 w-60' value={draft.doctor} onChange={(e) =>setdraft((pre) => ({...pre, doctor: e.target.value}) )}>
            <option value="">Choose Doctor</option>
            {
              userlist.map((e) => (
                <option value={e.userid} key={e.userid}>{e.username}</option>
              ))
            }
          </select>
         
        </div>

        <div className='flex flex-col gap-3 justify-evenly'>
        <div className='flex items-center gap-1.5'>
            <SiOnlyoffice  className='text-2xl text-gray-700'/>
            <p className='text-gray-700 text-2xl'>Departments <span className='text-red-600'>*</span></p>
          </div>
            <div className='flex gap-7 '>

            {/*   <div className= {`${(showsurgery || draft.zzza)? " bg-cyan-500 " : "bg-red-400 "}  bg-cyan-500 w-44 rounded-md  flex justify-center text-white text-lg shadow-xl hover:bg-cyan-500 hover:shadow-cyan-400 transition-all duration-300 hover:shadow-lg `}>
                <button className='flex gap-2 items-center outline-none p-3 px-10 ' onClick={surgery}><GiLoveInjection /> Surgery</button>
              </div> */}
              {/* <div className={`${(showgyn || draft.zzzb)? " bg-cyan-500 " : "bg-red-400 "}  bg-cyan-500  rounded-md w-44 flex justify-center text-white text-lg shadow-xl hover:bg-cyan-500 hover:shadow-cyan-400 transition-all duration-300 hover:shadow-lg `}>  
                <button className='flex gap-1 items-center outline-none p-3 px-10' onClick={gyn}>  <FaFemale /> GYN and OBS</button>
              </div> */}
              <div className={`${(showobs || draft.zzzc)? " bg-cyan-500 " : "bg-red-400 "}  bg-cyan-500  rounded-md w-44 flex justify-center text-white text-lg shadow-xl hover:bg-cyan-500 hover:shadow-cyan-400 transition-all duration-300 hover:shadow-lg `}>
                <button className='flex gap-1 items-center outline-none p-3 px-10' onClick={obste}><FaBaby />GYN<span>and</span><span>OBS</span> </button>
              </div>
              <div className={`${(showivf || draft.zzzd)? " bg-cyan-500  " : "bg-red-400 "}  bg-cyan-500  rounded-md w-44 flex justify-center text-white text-lg shadow-xl hover:bg-cyan-500 hover:shadow-cyan-400 transition-all duration-300 hover:shadow-lg `}>
                <button className='flex gap-1 items-center outline-none p-3 px-10'  onClick={ivf}><MdChildFriendly />IVF</button>
              </div>
            </div>
        </div>
          
      </div>

      <div className='shadow-lg shadow-gray-200 p-10 border rounded-md mt-28 flex gap-9 flex-col items-start border-gray-300 justify-between'>
          <div className='title'>
            <MdLocalHospital className='text-3xl text-white'/>
            <p className='topichead'>Patient Information <span className='text-red-600'>*</span></p>
          </div>

        <div className='w-full flex justify-between items-center'>

        <div className='flex flex-col gap-6 w-1/3  '>
          <div className='flex gap-4  items-center'>
            <div className='investigationfirstdiv'>
              <div className='items-center  flex  gap-2' >
              <SiUniqlo    className='itext-xl'/>
                <p className='patinfotext'>UHID</p>
              </div>
              <input className='investigationinput ' value={draft.uhid} onChange={(e) => setdraft((pre) => ({...pre, uhid: e.target.value}) )} />
            </div>
          </div>
          
          <div className='flex gap-6  justify-between'>
            <div className='bg-sky-500 rounded-md p-3 shadow-xl hover:shadow-cyan-400 flex hover:shadow-lg text-white hover:bg-cyan-500 transition-all duration-200 '>
              <button className='flex gap-2 items-center outline-none justify-center ' onClick={getval} ><FaListAlt /> Fetch<span>Draft</span>  </button>
            </div>
            <div className='bg-teal-500 rounded-md p-3 shadow-xl hover:shadow-teal-400  flex hover:shadow-lg text-white hover:bg-teal-600 transition-all duration-200'>
              <button className='flex gap-2 items-center outline-none' onClick={() => getkranidata(draft.uhid)} ><IoPersonSharp />Fetch<span>Demograph</span> </button>
            </div>
            <div className='bg-red-500 rounded-md p-3 shadow-xl hover:shadow-teal-400 flex  hover:shadow-lg text-white hover:bg-teal-600 transition-all duration-200'>
              <button className='flex gap-2 items-center outline-none' 
                onClick={() => { 
                  if(laburl === "") {
                    toast.error("No lab record Found")
                    return
                  }else{
                    window.open(laburl, "_blank")
                  }
                }} >
                <ImLab />Lab <span>Report</span></button>
            </div>
          </div>
          <p className='font-normal text-sm text-red-500'>(<span className='text-red-600 text-sm'> *</span> Provide valid uhid for demographic details and valid encounter to fetch laboratory reports)</p>
        </div>


        <div className='w-1/4 flex flex-col gap-6'>
          <div className='investigationfirstdiv'>
            <div className='items-center  flex  gap-2' >
              <BsCalendar2DateFill className='itext-xl'/>
              <p className='patinfotext'>Admission</p>
            </div>
              <input className='investigationinput' type='date' value={draft.admission_date? draft.admission_date .slice(0, 10) : ""} onChange={(e) => {
                const selectedDate = e.target.value;  
                setdraft((pre) => ({...pre, admission_date: selectedDate}) )}}  />
          </div>




           <div className='investigationfirstdiv '>
            <div className='items-center  flex  gap-2' >
              <BsCalendar2DateFill className='itext-xl'/>
              <p className='patinfotext'>Discharge</p>
            </div>
              <input className='investigationinput' type='date' value={draft.date_of_discharge? draft.date_of_discharge.slice(0, 10) : ""} onChange={(e) => {
                const selectedDate = e.target.value;
                setdraft((pre) => ({...pre, date_of_discharge: selectedDate}) )}}  />
          </div> 

          <div className='investigationfirstdiv '>
              <div className='items-center  flex  gap-2' >
                <PiClockCountdownFill className='itext-xl'/>
                <p className='investigationtopic'>MLC<span>Number</span></p>
              </div>
                <input className='investigationinput' value={draft.mlc_number} onChange={(e) => setdraft((pre) => ({...pre, mlc_number: e.target.value}) )} />
            </div>



          </div>


        </div>

        <div className='mt-10 w-full flex flex-col gap-8 '>

          <div className='flex gap-6 justify-between  '>

            
            <div className='investigationfirstdiv '>
              <div className='items-center  flex  gap-2' >
                <PiClockCountdownFill className='itext-xl'/>
                <p className='investigationtopic'>Encounter</p>
              </div>

                <input className='investigationinput' value={draft.encounter} onChange={(e) => setdraft((pre) => ({...pre, encounter: e.target.value}) )} />
            </div>

            <div className='investigationfirstdiv'>
              <div className='items-center  flex  gap-2' >
                <MdMore      className='itext-xl'/>
                <p className='investigationtopic'>Title</p>
              </div>
                <input className='investigationinput' value={draft.title} onChange={(e) => setdraft((pre) => ({...pre, title: e.target.value}) )}  />
            </div>

            <div className='investigationfirstdiv'>
             <div className='items-center  flex  gap-2' >
              <IoPerson    className='itext-xl'/>
                <p className='investigationtopic'>First<span className='pl-1'>Name</span></p>
                </div>
                <input className='investigationinput' value={draft.patient_name} onChange={(e) => setdraft((pre) => ({...pre, patient_name: e.target.value}) )} />
            </div>

            <div className='investigationfirstdiv'>
            <div className='items-center  flex  gap-2' >
              <IoPerson    className='itext-xl'/>
                <p className='investigationtopic'>Last<span className='pl-1'></span>Name</p>
              </div>
              <input className='investigationinput' value={draft.last_name} onChange={(e) => setdraft((pre) => ({...pre, last_name: e.target.value}) )}  />
            </div>
            

          </div>

          <div className='flex gap-6 justify-between  '> 

            <div className='investigationfirstdiv '>
              <div className='items-center  flex  gap-2' >
              <PiGenderIntersexFill className='itext-xl'/>
                <p className='investigationtopic'>Gender</p>
              </div>
                <input className='investigationinput' value={draft.patient_gender} onChange={(e) => setdraft((pre) => ({...pre, patient_gender: e.target.value}) )} />
            </div>

            <div className='investigationfirstdiv '>
              <div className='items-center  flex  gap-2' >
              <BsCalendar2DateFill className='itext-xl'/>
                <p className='investigationtopic'>DOB</p>
              </div>
              <input className='investigationinput'  type='date' value={formatDate(draft.dob)} onChange={(e) => {
                  const selectedDob = e.target.value;
                  const calculatedAge = calculateage(selectedDob);
                  console.log(selectedDob)
                  setdraft((prev) => ({ ...prev,
                    dob: selectedDob,
                    age: calculatedAge
                  }));
                }} />
            </div>

            <div className='investigationfirstdiv '>
              <div className='items-center  flex  gap-2' >
                <MdContactPage className='itext-xl'/>
                  <p className='investigationtopic'>Age</p>
              </div>
              <input className='investigationinput' type="text" value={draft.age} readOnly />
            </div>

            <div className='investigationfirstdiv '>
              <div className='items-center  flex  gap-2' >
              <FaWeightScale className='itext-xl'/>
                <p className='investigationtopic'>Weight</p>
              </div>
              <input className='investigationinput' value={draft.patient_weight.replace(" kg", "")} onChange={(e) => setdraft((pre) => ({...pre, patient_weight: `${e.target.value} kg`}) )}  />
            </div>

           </div>
        </div>

      </div>

      

      <div className='shadow-lg shadow-gray-200 p-10  mt-32  border rounded-md border-gray-300  w-full flex flex-col gap-4'>
        <div className='title'>
          <BsClipboard2DataFill className='text-2xl'/>
          <p className='topichead'>Diagnosis</p>
        </div>

        <div className=' flex  gap-10'>
        <div className='investigationfirstdiv'>
            <div className='items-center  flex  gap-2'>
                    <FaBookMedical   className='text-xl'/>
                    <p className='investigationtopic'>Diagnosis</p>
                </div>
                <div className=' investigationadding'>
                  {
                    draft.diagnosis.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("diagnosis", index, e.target.value.toUpperCase())}  />
                        <button onClick={() => changingsingle("diagnosis", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("diagnosis")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.diagnosis.length === 1} onClick={() => removemulti("diagnosis", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            <div className='investigationfirstdiv'>
            <div className='items-center  flex  gap-2'>
                    <FaBookMedical   className='text-xl'/>
                    <p className='investigationtopic'>Provisional Diagnosis</p>
                </div>
                <div className=' investigationadding'>
                  {
                    draft.provisional_diagnosis.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("provisional_diagnosis", index, e.target.value.toUpperCase())}  />
                        <button onClick={() => changingsingle("provisional_diagnosis", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("provisional_diagnosis")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.provisional_diagnosis.length === 1} onClick={() => removemulti("provisional_diagnosis", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>
        </div>
      </div>



      <div className=' shadow-lg shadow-gray-200 p-10  mt-32  border rounded-md border-gray-300  w-full flex flex-col gap-4'>
        <div className='title'>
          <BsClipboard2DataFill className='text-2xl'/>
          <p className='topichead'>Chief Complaints</p>
        </div>
        
        <div className=' flex flex-col gap-3'>
           
                {
                  draft.chief_complaints.map((val, index) => (
                    <div className='flex gap-4' key={index}>

                      <div className='chiefout'>
                      <div className='items-center  flex  gap-2'>
                        <FaBookMedical   className='iconsstyle'/>
                        <p className='pl-2'>Complaint</p>
                      </div>
                        
                        <input className='encountinput' value={val.complaint} onChange={(e) => changingmulti("chief_complaints", index, 'complaint', e.target.value)}  />
                        <button onClick={() => changingmulti("chief_complaints", index, 'complaint', "Nill")}>Nill?</button>
                      </div>

                      <div className='chiefout'>
                      <div className='items-center  flex  gap-2'>
                        <RiChatHistoryFill  className='iconsstyle'/>
                        <p className=''>Duration</p>
                    </div>
                        <input className='encountinput' value={val.duration} onChange={(e) => changingmulti("chief_complaints", index, 'duration', e.target.value)}  />
                        <button onClick={() => changingmulti("chief_complaints", index, 'duration', "Nill")}>Nill?</button>
                      </div>

                      <div className='chiefout'>
                      <div className='items-center  flex  gap-2'>
                        <FaBookMedical   className='iconsstyle'/>
                        <p className='pl-2'>Nature</p>
                      </div>
                       
                        <input className='encountinput' value={val.nature} onChange={(e) => changingmulti("chief_complaints", index, 'nature', e.target.value)}  />
                        <button onClick={() => changingmulti("chief_complaints", index, 'nature', "Nill")}>Nill?</button>
                      </div>

                      <button  onClick={() => addmulti("chief_complaints", { complaint: "", duration: "", nature: "" })}><IoMdAddCircle className='addingcom'/></button>
                      <button disabled={draft.chief_complaints.length === 1} onClick={() => removemulti("chief_complaints", index)}><IoMdRemoveCircle className='removecom'/></button>
                    </div>
                  ))
                }
            
        </div>
      </div>



     



        




      <div className=' shadow-lg shadow-gray-200 eachtopicmargin' >
          <div className='title'>
            <BsClipboard2DataFill className='text-2xl'/>
            <p className='topichead'>History</p>
          </div>
          <div className='flex justify-between gap-10' >

            <div className='flex flex-col gap-10 w-1/2'>
            <div className='investigationfirstdiv'>
            <div className='items-center  flex  gap-2'>
                    <FaBookMedical   className='text-xl'/>
                    <p className='investigationtopic'>H.Present Illness</p>
                </div>
                <div className=' investigationadding'>
                  {
                    draft.history_of_present_illness.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("history_of_present_illness", index, e.target.value)}  />
                        <button onClick={() => changingsingle("history_of_present_illness", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("history_of_present_illness")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.history_of_present_illness.length === 1} onClick={() => removemulti("history_of_present_illness", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            

            <div className='investigationfirstdiv '>
                <div className='items-center  flex  gap-2'>
                    <MdHealthAndSafety   className='text-xl'/>
                    <p className='investigationtopic'>Past M.History</p>
                </div>
                <div className=' investigationadding'>
                  {
                    draft.past_medical_history.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("past_medical_history", index, e.target.value)}  />
                        <button onClick={() => changingsingle("past_medical_history", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("past_medical_history")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.past_medical_history.length === 1} onClick={() => removemulti("past_medical_history", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <div className='items-center  flex  gap-2'>
                    <RiChatHistoryFill  className='text-xl'/>
                    <p className='investigationtopic'>Past S.History</p>
                </div>
                <div className=' investigationadding'>
                  {
                    draft.past_surgical_history.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("past_surgical_history", index, e.target.value)}  />
                        <button onClick={() => changingsingle("past_surgical_history", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("past_surgical_history")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.past_surgical_history.length === 1} onClick={() => removemulti("past_surgical_history", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

        

            {/* <div className='investigationfirstdiv'>
               <div className='items-center  flex  gap-2'>
                    <RiChatHistoryFill  className='text-xl'/>
                    <p className='investigationtopic '>Condition<span className='pl-2'>at</span><span className='pl-2'>Discharge</span></p>
                </div>
                
                <div className=' investigationadding'>
                  {
                    draft.condition_at_discharge.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("condition_at_discharge", index, e.target.value)}  />
                        <button onClick={() => changingsingle("condition_at_discharge", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("condition_at_discharge")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.condition_at_discharge.length === 1} onClick={() => removemulti("condition_at_discharge", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div> */}

            




             <div className='investigationfirstdiv '>
                    <div className='items-center  flex  gap-2'>
                        <ImLab    className='text-xl'/>
                        <p className='investigationtopic  '>Surgery<span className='pl-2'></span></p>
                    </div>
                    
                    <div className='investigationadding'>
                      {
                        draft.surgery.map((val, index) => (
                          <div className='investigationinner' key={index}>
                            
                            <input
                              type="date"  value={val.date ? val.date.slice(0, 10) : ""}
                              onChange={(e) => {
                                const selectedDate = e.target.value; 
                                changingmulti("surgery", index, "date", selectedDate);
                              }}
                              placeholder="Select Date"
                            />
                            <input className='investigationinput' value={val.notes} onChange={(e) => changingmulti("surgery", index, 'notes', e.target.value)}  />
                            <button onClick={() => changingmulti("surgery", index, 'notes', "Nill")}>Nill?</button>
                            <button onClick={() => addmulti("surgery", {date : "", duration: ""})}><IoMdAddCircle className='addingcom'/></button>
                            <button disabled={draft.surgery.length === 1} onClick={() => removemulti("surgery", index)}><IoMdRemoveCircle className='removecom'/></button>
                          </div>
                        ))
                      }
                    </div>
                </div> 





                
            </div>











            <div className='flex flex-col gap-10 w-1/2'>
            <div className='investigationfirstdiv '>
                <div className='items-center  flex  gap-2'>
                    <MdHealthAndSafety   className='text-xl'/>
                    <p className='investigationtopic'>Life Style</p>
                </div>
                
                <div className='investigationadding'>
                  {
                    draft.life_style_history.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("life_style_history", index, e.target.value)}  />
                        <button onClick={() => changingsingle("life_style_history", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("life_style_history")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.life_style_history.length === 1} onClick={() => removemulti("life_style_history", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            <div className='investigationfirstdiv'>
            <div className='items-center  flex  gap-2'>
                    <RiChatHistoryFill  className='text-xl'/>
                    <p className='investigationtopic'>Family History</p>
                </div>
                <div className=' investigationadding'>
                  {
                    draft.family_history.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("family_history", index, e.target.value)}  />
                        <button onClick={() => changingsingle("family_history", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("family_history")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.family_history.length === 1} onClick={() => removemulti("family_history", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            <div className='investigationfirstdiv'>
                <div className='items-center  flex  gap-2'>
                        <MdHealthAndSafety   className='text-xl'/>
                        <p className='investigationtopic  '>Drug<span className='pl-2'>Allergy</span></p>
                </div>
                <div className=' investigationadding'>
                  {
                    draft.drug_allergy.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("drug_allergy", index, e.target.value)}  />
                        <button onClick={() => changingsingle("drug_allergy", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("drug_allergy")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.drug_allergy.length === 1} onClick={() => removemulti("drug_allergy", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

         {/*    <div className='investigationfirstdiv '>
                <div className='items-center  flex  gap-2'>
                    <FaBookMedical   className='text-xl'/>
                    <p className='investigationtopic  '>Clinical<span className='pl-2'>Examination</span></p>
                </div>
                
                <div className=' investigationadding'>
                  {
                    draft.clinical_examination.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("clinical_examination", index, e.target.value)}  />
                        <button onClick={() => changingsingle("clinical_examination", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("clinical_examination")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.clinical_examination.length === 1} onClick={() => removemulti("clinical_examination", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div> */}

           

           

         {/*    <div className='investigationfirstdiv '>
            <div className='items-center  flex  gap-2'>
                    <FaBookMedical   className='text-xl'/>
                    <p className='investigationtopic  '>Course<span className='pl-2'>Hospital</span></p>
                </div>
                
                <div className='investigationadding'>
                  {
                    draft.course_in_the_hospital.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("course_in_the_hospital", index, e.target.value)}  />
                        <button onClick={() => changingsingle("course_in_the_hospital", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("course_in_the_hospital")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.course_in_the_hospital.length === 1} onClick={() => removemulti("course_in_the_hospital", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>
 */}




            
           

           {/*  <div className='investigationfirstdiv '>
            <div className='items-center  flex  gap-2'>
                    <RiChatHistoryFill  className='text-xl'/>
                    <p className='investigationtopic  '>Advice<span className='pl-2'>Medication</span></p>
                </div>
               
                <div className='investigationadding'>
                  {
                    draft.advice_medication.map((val, index) => (
                      <div className='investigationinner' key={index}>

                        <input className='investigationinput' value={val.medicine_name} onChange={(e) => changingmulti("advice_medication", index, 'medicine_name',  e.target.value.toUpperCase())}  />
                        <input className='investigationinput' value={val.dose} onChange={(e) => changingmulti("advice_medication", index, 'dose',  e.target.value.toUpperCase())}  />
                        <input className='investigationinput' value={val.route} onChange={(e) => changingmulti("advice_medication", index, 'route',  e.target.value.toUpperCase())}  />
                        <input className='investigationinput' value={val.frequency} onChange={(e) => changingmulti("advice_medication", index, 'frequency',  e.target.value.toUpperCase())}  />
                        <input className='investigationinput' value={val.duration} onChange={(e) => changingmulti("advice_medication", index, 'duration',  e.target.value.toUpperCase())}  />

                        <button onClick={() => addmulti("advice_medication",{medicine_name : "", dose :"", route :"", frequency :"", duration :""  } )}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.advice_medication.length === 1} onClick={() => removemulti("advice_medication", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div> 


             <div className='investigationfirstdiv '>
                <div className='items-center  flex  gap-2'>
                    <ImLab    className='text-xl'/>
                    <p className='investigationtopic  '>Treatment<span className='pl-2'>Given</span></p>
                </div>
                
                <div className='investigationadding'>
                  {
                    draft.treatment_given.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        
                        {/* <input type='date' value={val.date ? val.date.slice(0, 10) : ""} onChange={(e) => {
                          const selectedDate = e.target.value; 
                          changingmulti( "treatment_given", index, 'date', selectedDate)
                        }}  /> 

                        <input className='investigationinput' placeholder='Medicine' value={val.medicine} onChange={(e) => changingmulti("treatment_given", index, 'medicine', e.target.value.toUpperCase())}  />
                        <input className='investigationinput' placeholder="Dosage" value={val.dosage} onChange={(e) => changingmulti("treatment_given", index, 'dosage', e.target.value.toUpperCase())}  />
                        <input className='investigationinput' placeholder="Frequency" value={val.frequency} onChange={(e) => changingmulti("treatment_given", index, 'frequency', e.target.value.toUpperCase())}  />

                        <button onClick={() => addmulti("treatment_given", {date : "", medicine: "", dosage :"",frequency:"" })}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.treatment_given.length === 1} onClick={() => removemulti("treatment_given", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div> */}

             <div className='investigationfirstdiv '>
                <div className='items-center  flex  gap-2'>
                    <ImLab    className='text-xl'/>
                    <p className='investigationtopic  '>Procedures<span className='pl-2'></span></p>
                </div>
                
                <div className='investigationadding'>
                  {
                    draft.procedure.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        
                        <input type='date' value={val.date ? val.date.slice(0, 10) : ""} onChange={(e) => {
                          const selectedDate = e.target.value; 
                          changingmulti( "procedure", index, 'date', selectedDate)
                          }}  />
                        <input className='investigationinput' value={val.notes} onChange={(e) => changingmulti("procedure", index, 'notes', e.target.value)}  />
                        <button onClick={() => changingmulti("procedure", index, 'notes', "Nill")}>Nill?</button>
                        <button onClick={() => addmulti("procedure", {date : "", duration: ""})}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.procedure.length === 1} onClick={() => removemulti("procedure", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>



            
              
            </div>

          </div>
      </div>





      

      <div className='shadow-lg shadow-gray-200 p-10 mt-32  border rounded-md border-gray-300  w-full flex flex-col gap-4'>
            <div className='title'>
              <BsClipboard2DataFill className='text-2xl'/>
              <p className='topichead'>Clinical Examination</p>
            </div>

            <div className='flex flex-wrap gap-2 justify-around'>
            {fields.map((field) => (
              <div key={field} className="flex items-center w-[22%] mb-5">
                <p className="w-20 gap-3">{field}</p>
                <CreatableSelect
                  isMulti
                  className='w-full'
                  placeholder={`Select or type ${field}`}
                  value={(val[field] || []).map(item => ({ label: item, value: item }))}
                  onChange={(selectedOptions) => {
                    const updatedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                    changingmultee("clinical_examination", field, updatedValues);
                  }}
                  onCreateOption={(inputValue) => {
                    const updatedValues = [...(val[field] || []), inputValue];
                    changingmultee("clinical_examination", field, updatedValues);
                  }}
                  options={fieldOptions[field] || []} 
                />
              </div>
            ))}
          </div>
      </div>

      <div className='shadow-lg shadow-gray-200 eachtopicmargin' >
      <div className='title'>
            <FaImage  className='text-2xl'/>
            <p className='topichead'>Lab & Image Findings and Investigations</p>
          </div>
        <div className='flex justify-between gap-10' >
          
          <div className='flex flex-col gap-10 w-1/2'>

         

          <div className='investigationfirstdiv '>
              <div className='items-center  flex  gap-2'>
                    <BsFileEarmarkMedicalFill    className='text-xl'/>
                    <p className='investigationtopic  '>X-Ray<span className='pl-2'></span></p>
                </div>
                
                <div className='investigationadding'>
                  {
                    draft.x_ray_findings.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        
                        <input type='date' value={val.date ? val.date.slice(0, 10) : ""} onChange={(e) => {
                          const selectedDate = e.target.value; 
                          changingmulti( "x_ray_findings", index, 'date', selectedDate)
                          }}  />
                        <input className='investigationinput' value={val.findings} onChange={(e) => changingmulti("x_ray_findings", index, 'findings', e.target.value)}  />
                        <button onClick={() => changingmulti("x_ray_findings", index, 'findings', "Nill")}>Nill?</button>
                        <button onClick={() => addmulti("x_ray_findings", {date : "", duration: ""})}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.x_ray_findings.length === 1} onClick={() => removemulti("x_ray_findings", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            <div className='investigationfirstdiv '>
            <div className='items-center  flex  gap-2'>
                    <GiBoneGnawer    className='text-xl'/>
                    <p className='investigationtopic  '>USG<span className='pl-2'></span></p>
                </div>
                
                <div className='investigationadding'>
                  {
                    draft.ultrasound_findings.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        
                        <input type='date' value={val.date ? val.date.slice(0, 10) : ""} onChange={(e) => {
                         const selectedDate = e.target.value; 
                          changingmulti( "ultrasound_findings", index, 'date', selectedDate)
                          }}  />
                        <input className='investigationinput' value={val.findings} onChange={(e) => changingmulti("ultrasound_findings", index, 'findings', e.target.value)}  />
                        <button onClick={() => changingmulti("ultrasound_findings", index, 'findings', "Nill")}>Nill?</button>
                        <button onClick={() => addmulti("ultrasound_findings", {date : "", duration: ""})}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.ultrasound_findings.length === 1} onClick={() => removemulti("ultrasound_findings", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            <div className='investigationfirstdiv '>
            <div className='items-center  flex  gap-2'>
                    <SiWikimediafoundation    className='text-xl'/>
                    <p className='investigationtopic  '>ECHO<span className='pl-2'></span></p>
                </div>
                <div className='investigationadding'>
                  {
                    draft.echo_findings.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        
                        <input type='date' value={val.date ? val.date.slice(0, 10) : ""} onChange={(e) => {
                          const selectedDate = e.target.value; 
                          changingmulti( "echo_findings", index, 'date', selectedDate)
                          }}  />
                        <input className='investigationinput' value={val.findings} onChange={(e) => changingmulti("echo_findings", index, 'findings', e.target.value)}  />
                        <button onClick={() => changingmulti("echo_findings", index, 'findings', "Nill")}>Nill?</button>
                        <button onClick={() => addmulti("echo_findings", {date : "", duration: ""})}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.echo_findings.length === 1} onClick={() => removemulti("echo_findings", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            <div className='investigationfirstdiv '>
            <div className='items-center  flex  gap-2'>
                    <BsFileEarmarkMedicalFill    className='text-xl'/>
                    <p className='investigationtopic  '>CT<span className='pl-2'></span></p>
                </div>
                
                <div className='investigationadding'>
                  {
                    draft.ct_findings.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input type='date' value={val.date ? val.date.slice(0, 10) : ""} onChange={(e) => {
                          const selectedDate = e.target.value; 
                          changingmulti( "ct_findings", index, 'date', selectedDate)
                          }}  />
                        <input className='investigationinput' value={val.findings} onChange={(e) => changingmulti("ct_findings", index, 'findings', e.target.value)}  />
                        <button onClick={() => changingmulti("ct_findings", index, 'findings', "Nill")}>Nill?</button>
                        <button onClick={() => addmulti("ct_findings", {date : "", duration: ""})}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.ct_findings.length === 1} onClick={() => removemulti("ct_findings", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <div className='items-center  flex  gap-2'>
                    <ImLab   className='text-xl'/>
                    <p className='investigationtopic  '>Lab<span className='pl-2'>Findings</span></p>
                </div>
                
                <div className='investigationadding'>
                  {
                    draft.lab_findings.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("lab_findings", index, e.target.value)}  />
                        <button onClick={() => changingsingle("lab_findings", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("lab_findings")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.lab_findings.length === 1} onClick={() => removemulti("lab_findings", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>
          
          </div>

          <div className='flex flex-col gap-10 w-1/2'>

         

            <div className='investigationfirstdiv '>
            <div className='items-center  flex  gap-2'>
                    <GiBoneGnawer    className='text-xl'/>
                    <p className='investigationtopic  '>MRI<span className='pl-2'></span></p>
                </div>
                  
                  <div className='investigationadding'>
                    {
                      draft.mri_findings.map((val, index) => (
                        <div className='investigationinner' key={index}>
                          <input type='date' value={val.date ? val.date.slice(0, 10) : ""} onChange={(e) => {
                            const selectedDate = e.target.value; 
                            changingmulti( "mri_findings", index, 'date', selectedDate)
                            }}  />
                          <input className='investigationinput' value={val.findings} onChange={(e) => changingmulti("mri_findings", index, 'findings', e.target.value)}  />
                          <button onClick={() => changingmulti("mri_findings", index, 'findings', "Nill")}>Nill?</button>
                          <button onClick={() => addmulti("mri_findings", {date : "", duration: ""})}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.mri_findings.length === 1} onClick={() => removemulti("mri_findings", index)}><IoMdRemoveCircle className='removecom'/></button>
                        </div>
                      ))
                    }
                  </div>
              </div>

              <div className='investigationfirstdiv '>
              <div className='items-center  flex  gap-2'>
                    <SiWikimediafoundation    className='text-xl'/>
                    <p className='investigationtopic  '>ECG<span className='pl-2'></span></p>
                </div>
                 
                  <div className='investigationadding'>
                    {
                      draft.ecg_findings.map((val, index) => (
                        <div className='investigationinner' key={index}>
                          <input type='date' value={val.date ? val.date.slice(0, 10) : ""} onChange={(e) => {
                            const selectedDate = e.target.value; 
                            changingmulti( "ecg_findings", index, 'date', selectedDate )
                            }}  />
                          <input className='investigationinput' value={val.findings} onChange={(e) => changingmulti("ecg_findings", index, 'findings', e.target.value)}  />
                          <button onClick={() => changingmulti("ecg_findings", index, 'findings', "Nill")}>Nill?</button>
                          <button onClick={() => addmulti("ecg_findings", {date : "", duration: ""})}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.ecg_findings.length === 1} onClick={() => removemulti("ecg_findings", index)}><IoMdRemoveCircle className='removecom'/></button>
                        </div>
                      ))
                    }
                  </div>
              </div>

              <div className='investigationfirstdiv '>
              <div className='items-center  flex  gap-2'>
                    <BsFileEarmarkMedicalFill    className='text-xl'/>
                    <p className='investigationtopic  '>EEG<span className='pl-2'></span></p>
                </div>
                 
                  <div className='investigationadding'>
                    {
                      draft.eeg_findings.map((val, index) => (
                        <div className='investigationinner' key={index}>
                          <input type='date' value={val.date ? val.date.slice(0, 10) : ""} onChange={(e) => {
                           const selectedDate = e.target.value; 
                            changingmulti( "eeg_findings", index, 'date', selectedDate)
                            }}  />
                          <input className='investigationinput' value={val.findings} onChange={(e) => changingmulti("eeg_findings", index, 'findings', e.target.value)}  />
                          <button onClick={() => changingmulti("eeg_findings	", index, 'findings', "Nill")}>Nill?</button>
                          <button onClick={() => addmulti("eeg_findings", {date : "", duration: ""})}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.eeg_findings.length === 1} onClick={() => removemulti("eeg_findings", index)}><IoMdRemoveCircle className='removecom'/></button>
                        </div>
                      ))
                    }
                  </div>
              </div>

              <div className='investigationfirstdiv '>
              <div className='items-center  flex  gap-2'>
                    <ImLab   className='text-xl'/>
                    <p className='investigationtopic  '>Uroflometry<span className='pl-2'></span></p>
                </div>
                  
                  <div className='investigationadding'>
                    {
                      draft.uroflowmetry_findings.map((val, index) => (
                        <div className='investigationinner' key={index}>
                          <input type='date' value={val.date ? val.date.slice(0, 10) : ""} onChange={(e) => {
                            const selectedDate = e.target.value; 
                            changingmulti( "uroflowmetry_findings", index, 'date', selectedDate)
                            }}  />
                          <input className='investigationinput' value={val.findings} onChange={(e) => changingmulti("uroflowmetry_findings", index, 'findings', e.target.value)}  />
                          <button onClick={() => changingmulti("uroflowmetry_findings	", index, 'findings', "Nill")}>Nill?</button>
                          <button onClick={() => addmulti("uroflowmetry_findings", {date : "", duration: ""})}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.uroflowmetry_findings.length === 1} onClick={() => removemulti("uroflowmetry_findings", index)}><IoMdRemoveCircle className='removecom'/></button>
                        </div>
                      ))
                    }
                  </div>
              </div>

              <div className='investigationfirstdiv '>
               <div className='items-center  flex  gap-2'>
                    <FaImage  className='text-xl'/>
                    <p className='investigationtopic '>Image<span className='pl-2'>Findings</span></p>
                </div>
                
                <div className='investigationadding'>
                  {
                    draft.image_finding.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("image_finding", index, e.target.value)}  />
                        <button onClick={() => changingsingle("image_finding", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("image_finding")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.image_finding.length === 1} onClick={() => removemulti("image_finding", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

          
          </div>
        </div>

      </div>

      <div className='shadow-lg shadow-gray-200 p-10 mt-32  border rounded-md border-gray-300  w-full flex flex-col gap-4'>
            <div className='title'>
              <BsClipboard2DataFill className='text-2xl'/>
              <p className='topichead'>Course in the Hospital</p>
            </div>

            <div className='investigationadding'>
              {
                draft.course_in_the_hospital.map((val, index) => (
                  <div className='investigationinner' key={index}>
                    <input placeholder='Course in the hospital' className='investigationinput px-2.5' value={val} onChange={(e) => changingsingle("course_in_the_hospital", index, e.target.value)}  />
                    <button onClick={() => changingsingle("course_in_the_hospital", index, "Nill")}>Nill?</button>
                    <button onClick={() => addsingle("course_in_the_hospital")}><IoMdAddCircle className='addingcom'/></button>
                    <button disabled={draft.course_in_the_hospital.length === 1} onClick={() => removemulti("course_in_the_hospital", index)}><IoMdRemoveCircle className='removecom'/></button>
                  </div>
                ))
              }
            </div>
      </div>


      








    {/*   <div className='hidden ' >
      <div className='items-center  flex gap-2'>
            <FaBed  className='text-2xl'/>
            <p className='topichead'>Bed Days</p>
          </div>
        <div className='flex justify-between gap-10' >

          <div className='flex flex-col gap-10 w-1/3'>
            <div className='flex  gap-5 items-center '>
              <h6>ICU<span className='pl-2'>Days</span></h6>
              <div className=''>
                  <DateRangePicker  value={[
                      draft.icu_days.startDate,
                      draft.icu_days.endDate
                    ]}  onChange={handleIcuDaysChange}  format="yyyy-MM-dd"  placeholder="Select ICU days"  showOneCalendar={false} style={{ width: 300 }} /></div></div>


          </div>

          <div className='flex flex-col gap-10 w-1/3'>
          <div className='flex gap-5 items-center '>
            <h6>Ward<span className='pl-2'>Days</span></h6>
            <div className=''>
                <DateRangePicker  value={[
                  draft.ward_days.startDate,
                  draft.ward_days.endDate
                ]}  onChange={handlewardDaysChange}  format="yyyy-MM-dd" placeholder="Select ICU days" showOneCalendar={false} style={{ width: 300 }} /></div></div>
          </div>
        </div>

      </div> */}

<div className=' shadow-lg shadow-gray-200 p-10  mt-32  border rounded-md border-gray-300  w-full flex flex-col gap-4'>
        <div className='title'>
          <BsClipboard2DataFill className='text-2xl'/>
          <p className='topichead'>Surgery</p>
        </div>
        
        
           
                {
                  draft.surgeries.map((val, index) => (
                    <div className='pb-16 flex justify-between gap-8 items-center'>
                    <div className='flex flex-col gap-10 w-1/2'>

                    <div className='investigationfirstdiv ' >
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Surgery Date</p>
                        </div>
                        <div className='investigationadding'>
                          <div className='investigationinner'>
                            <input className='investigationinput' type='date' key={index}  value={val.surgery_date? val.surgery_date.slice(0, 10): ""}  onChange={(e) => {
                              const selectedDate = e.target.value; 
                              changingmulti( "surgeries", index, 'surgery_date', selectedDate)
                            }} />
                          </div>
                          </div>
                          
                        
                        </div>



                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <RiChatHistoryFill  className='text-xl'/>
                          <p className='investigationtopic'>Surgeon Name</p>
                        </div>

                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.surgeon_name} key={index} onChange={(e) => changingmulti("surgeries", index, 'surgeon_name', e.target.value.toUpperCase())}  />
                          <button onClick={() => changingmulti("surgeries", index, 'surgeon_name', "Nill")}>Nill?</button>
                        </div></div>
                      </div>

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Anaesthetist</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.anastetist_name} key={index}  onChange={(e) => changingmulti("surgeries", index, 'anastetist_name', e.target.value)}  />
                          <button onClick={() => changingmulti("surgeries", index, 'anastetist_name', "Nill")}>Nill?</button></div></div>
                      </div>

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Assist surgeon</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.assistant_surgeon_name} key={index}  onChange={(e) => changingmulti("surgeries", index, 'assistant_surgeon_name', e.target.value)}  />
                          <button onClick={() => changingmulti("surgeries", index, 'assistant_surgeon_name', "Nill")}>Nill?</button></div></div>
                      </div>

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Findings</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.findings} key={index}  onChange={(e) => changingmulti("surgeries", index, 'findings', e.target.value)}  />
                          <button onClick={() => changingmulti("surgeries", index, 'findings', "Nill")}>Nill?</button></div></div>
                      </div>
                    </div>
                    <div div className='flex flex-col gap-10 w-1/2' >

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Surgery</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.surgery} key={index}  onChange={(e) => changingmulti("surgeries", index, 'surgery', e.target.value)}  />
                          <button onClick={() => changingmulti("surgeries", index, 'surgery', "Nill")}>Nill?</button></div></div>
                      </div>

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Anastesia</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.anaesthesia} key={index}  onChange={(e) => changingmulti("surgeries", index, 'anaesthesia', e.target.value)}  />
                          <button onClick={() => changingmulti("surgeries", index, 'anaesthesia', "Nill")}>Nill?</button></div></div>
                      </div>

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Post Operative</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.post_operative} key={index}  onChange={(e) => changingmulti("surgeries", index, 'post_operative', e.target.value)}  />
                          <button onClick={() => changingmulti("surgeries", index, 'post_operative', "Nill")}>Nill?</button></div></div>
                      </div>

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Operative notes</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.operative_notes} key={index}  onChange={(e) => changingmulti("surgeries", index, 'operative_notes', e.target.value)}  />
                          <button onClick={() => changingmulti("surgeries", index, 'operative_notes', "Nill")}>Nill?</button></div></div>
                      </div>

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Implants</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.implants} key={index}  onChange={(e) => changingmulti("surgeries", index, 'implants', e.target.value)}  />
                          <button onClick={() => changingmulti("surgeries", index, 'implants', "Nill")}>Nill?</button></div></div>
                      </div>

                      
                    </div>
                    <div>
                    <button  onClick={() => addmulti("surgeries", { surgery_date: "", surgeon_name: "", anastetist_name: "", assistant_surgeon_name:"", findings :"", implants:"", operative_notes:"", post_operative:"", surgery:"", anaesthesia:""  })}><IoMdAddCircle className='addingcom'/></button>
                    <button disabled={draft.surgeries.length === 1} onClick={() => removemulti("surgeries", index)}><IoMdRemoveCircle className='removecom'/></button>
                    </div>
                    </div>
                  ))
                }
            
       
      </div>


      <div className=' shadow-lg shadow-gray-200 p-10  mt-32  border rounded-md border-gray-300  w-full flex flex-col gap-4'>
        <div className='title'>
          <BsClipboard2DataFill className='text-2xl'/>
          <p className='topichead'>Procedures</p>
        </div>
        
        
           
                {
                  draft.procedures.map((val, index) => (
                    <div className='pb-16 flex justify-between gap-8 items-center'>
                    <div className='flex flex-col gap-10 w-1/2' key={index}>

                    <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Procedure Date</p>
                        </div>
                        <div className='investigationadding'>
                          <div className='investigationinner'>
                            <input className='investigationinput' type='date'  value={val.procedure_date? val.procedure_date.slice(0, 10): ""}  onChange={(e) => {
                              const selectedDate = e.target.value; 
                              changingmulti( "procedures", index, 'procedure_date', selectedDate)
                            }} />
                          </div>
                          </div>
                          
                        
                        </div>



                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <RiChatHistoryFill  className='text-xl'/>
                          <p className='investigationtopic'>Surgeon Name</p>
                        </div>

                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.surgeon_name} onChange={(e) => changingmulti("procedures", index, 'surgeon_name', e.target.value.toUpperCase())}  />
                          <button onClick={() => changingmulti("procedures", index, 'surgeon_name', "Nill")}>Nill?</button>
                        </div></div>
                      </div>

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Anaesthetist</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.anastetist_name} onChange={(e) => changingmulti("procedures", index, 'anastetist_name', e.target.value)}  />
                          <button onClick={() => changingmulti("procedures", index, 'anastetist_name', "Nill")}>Nill?</button></div></div>
                      </div>

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Assist surgeon</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.assistant_surgeon_name} onChange={(e) => changingmulti("procedures", index, 'assistant_surgeon_name', e.target.value)}  />
                          <button onClick={() => changingmulti("procedures", index, 'assistant_surgeon_name', "Nill")}>Nill?</button></div></div>
                      </div>

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Findings</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.findings} onChange={(e) => changingmulti("procedures", index, 'findings', e.target.value)}  />
                          <button onClick={() => changingmulti("procedures", index, 'findings', "Nill")}>Nill?</button></div></div>
                      </div>
                    </div>
                    <div div className='flex flex-col gap-10 w-1/2' >

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Surgery</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.surgery} onChange={(e) => changingmulti("procedures", index, 'surgery', e.target.value)}  />
                          <button onClick={() => changingmulti("procedures", index, 'surgery', "Nill")}>Nill?</button></div></div>
                      </div>

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Anastesia</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.anaesthesia} onChange={(e) => changingmulti("procedures", index, 'anaesthesia', e.target.value)}  />
                          <button onClick={() => changingmulti("procedures", index, 'anaesthesia', "Nill")}>Nill?</button></div></div>
                      </div>

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Post Operative</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.post_operative} onChange={(e) => changingmulti("procedures", index, 'post_operative', e.target.value)}  />
                          <button onClick={() => changingmulti("procedures", index, 'post_operative', "Nill")}>Nill?</button></div></div>
                      </div>

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Operative notes</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.operative_notes} onChange={(e) => changingmulti("procedures", index, 'operative_notes', e.target.value)}  />
                          <button onClick={() => changingmulti("procedures", index, 'operative_notes', "Nill")}>Nill?</button></div></div>
                      </div>

                      <div className='investigationfirstdiv'>
                        <div className='items-center  flex  gap-2'>
                          <FaBookMedical   className='text-xl'/>
                          <p className='investigationtopic'>Implants</p>
                        </div>
                        <div className='investigationadding'>
                        <div className='investigationinner'>
                          <input className='investigationinput' value={val.implants} onChange={(e) => changingmulti("procedures", index, 'implants', e.target.value)}  />
                          <button onClick={() => changingmulti("procedures", index, 'implants', "Nill")}>Nill?</button></div></div>
                      </div>

                      
                    </div>
                    <div>
                    <button  onClick={() => addmulti("procedures", { procedure_date: "", surgeon_name: "", anastetist_name: "", assistant_surgeon_name:"", findings :"", implants:"", operative_notes:"", post_operative:"", surgery:"", anaesthesia:""  })}><IoMdAddCircle className='addingcom'/></button>
                    <button disabled={draft.procedures.length === 1} onClick={() => removemulti("procedures", index)}><IoMdRemoveCircle className='removecom'/></button>
                    </div>
                    </div>
                  ))
                }
            
       
      </div>

           

      <div className='shadow-lg shadow-gray-200 p-10  mt-32  border rounded-md border-gray-300  w-full flex flex-col gap-4'>
                <div className='title'>
                  <BsClipboard2DataFill className='text-2xl'/>
                  <p className='topichead flex gap-2'>Treatment<span>Given</span></p>
                </div>

                  <div className='investigationadding'>
                    <div className='flex pe-28 bg-gray-600 text-white'>
                      <p  className='medicineheading'>Medicine</p>
                      <p  className='medicineheading'>Qty</p>
                      <p  className='medicineheading'>Dosage</p>
                      <p  className='medicineheading'>Route</p>
                      <p  className='medicineheading '>Frequency</p>
                    
                        
                    </div>
                    {
                      draft.treatment_given.map((val, index) => (
                        <div className='investigationinner ' key={index}>

                          <input className='investigationinput' placeholder='Medicine' value={val.medicine} onChange={(e) => changingmulti("treatment_given", index, 'medicine', e.target.value.toUpperCase())}  />
                          <input className='investigationinput' placeholder='Qty' value={val.qty} onChange={(e) => changingmulti("treatment_given", index, 'qty', e.target.value)}  />
                          
                          <select className='investigationinput' placeholder="Dosage" value={val.dosage} onChange={(e) => changingmulti("treatment_given", index, 'dosage', e.target.value.toUpperCase())}>
                                <option className='text-gray-600' value="">Choose Dosage</option>
                                {dosage.map((dos, i) => (
                                  <option key={i} value={dos}>{dos}</option>
                                ))}


                              </select>
                          <select className='investigationinput' placeholder="Route" value={val.route} onChange={(e) => changingmulti("treatment_given", index, 'route', e.target.value.toUpperCase())} >
                                <option value="">Choose Route</option>
                                {rote.map((dos, i) => (
                                  <option key={i} value={dos}>{dos}</option>
                                ))}
                          </select>


                          <input list="medicalfrequency"  className='investigationinput' placeholder='Frequency' value={val.frequency} onChange={(e) => changingmulti("treatment_given", index, 'frequency',  e.target.value.toUpperCase())}  />
                          <datalist id="medicalfrequency">
                              {mediactionfrequency.map((opt, i) => (
                                <option key={i} value={opt} />
                              ))}
                            </datalist>


                          
                        <div className="gap-2 w-fit flex"> <button onClick={() => addmulti("treatment_given",{medicine_name : "", qty:"", dose :"", route :"", frequency :"",  } )}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.treatment_given.length === 1} onClick={() => removemulti("treatment_given", index)}><IoMdRemoveCircle className='removecom'/></button></div>
                        </div>
                      ))
                    }
                  </div>
                </div>


                <div className='shadow-lg shadow-gray-200 p-10 mt-32  border rounded-md border-gray-300  w-full flex flex-col gap-4'>
                    <div className='title'>
                      <BsClipboard2DataFill className='text-2xl'/>
                      <p className='topichead'>Condition At Discharge</p>
                    </div>

                    <div className='flex flex-wrap gap-2 justify-around'>
                    {fields.map((field) => (
                      <div key={field} className="flex items-center w-[22%] mb-5">
                        <p className="w-20 gap-3">{field}</p>
                        <CreatableSelect
                          isMulti
                          className='w-full'
                          placeholder={`Select or type ${field}`}
                          value={(val2[field] || []).map(item => ({ label: item, value: item }))}
                          onChange={(selectedOptions) => {
                            const updatedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                            changingmultee("condition_at_discharge", field, updatedValues);
                          }}
                          onCreateOption={(inputValue) => {
                            const updatedValues = [...(val2[field] || []), inputValue];
                            changingmultee("condition_at_discharge", field, updatedValues);
                          }}
                          options={fieldOptions[field] || []} 
                        />
                      </div>
                    ))}
                  </div>
              </div>




                <div className='shadow-lg shadow-gray-200 p-10  mt-32  border rounded-md border-gray-300  w-full flex flex-col gap-4'>
              <div className='title'>
                <BsClipboard2DataFill className='text-2xl'/>
                <p className='topichead flex gap-2'>Advice<span>on</span><span>Discharge</span></p>
              </div>

                <div className='investigationadding'>
                  <div className='flex pe-28 text-white bg-gray-700'>
                    <p  className='medicineheading'>Medicine</p>
                    <p  className='medicineheading'>QTY</p>
                    <p  className='medicineheading'>Dosage</p>
                    <p  className='medicineheading'>Route</p>
                    <p  className='medicineheading '>Frequency</p>
                    <p  className='medicineheading '>Food Timing</p>
                    <p  className='medicineheading'>Duration</p>
                  
                      
                  </div>
                  {
                    draft.advice_medication.map((val, index) => (
                      <div className='investigationinner ' key={index}>

                        <input className='investigationinput' placeholder='Medicine' value={val.medicine_name} onChange={(e) => changingmulti("advice_medication", index, 'medicine_name',  e.target.value)}  />
                        <input className='investigationinput' placeholder='Qty' value={val.qty} onChange={(e) => changingmulti("advice_medication", index, 'qty',  e.target.value)}  />
                        <select className='investigationinput' value={val.dose} onChange={(e) => changingmulti("advice_medication", index, 'dose',  e.target.value)}>
                              <option className='text-gray-600' value="">Choose Dosage</option>
                              {dosage.map((dos, i) => (
                                  <option key={i} value={dos}>{dos}</option>
                                ))}
                            </select>
                        <select className='investigationinput' placeholder='Route' value={val.route} onChange={(e) => changingmulti("advice_medication", index, 'route',  e.target.value)}>
                              <option value="">Choose Route</option>
                              {rote.map((dos, i) => (
                                  <option key={i} value={dos}>{dos}</option>
                                ))}
                        </select>

                        {/* <select className='investigationinput' placeholder='Frequency' value={val.frequency} onChange={(e) => changingmulti("advice_medication", index, 'frequency',  e.target.value)} >
                              <option value="">Choose Route</option>
                              <option value="BD">BD</option>
                              <option value="TDS">TDS</option>
                              <option value="OD">OD</option>
                              <option value="HS">HS</option>
                              <option value="STAT">STAT</option>
                              <option value="SOS">SOS</option>
                              <option value="4th Hourly">4th Hourly</option>
                              <option value="6th Hourly">6th Hourly</option>
                              
                        </select> */}


                        <input list="medicalfrequency"  className='investigationinput' placeholder='Frequency' value={val.frequency} onChange={(e) => changingmulti("advice_medication", index, 'frequency',  e.target.value.toUpperCase())}  />
                          <datalist id="medicalfrequency">
                              {mediactionfrequency.map((opt, i) => (
                                <option key={i} value={opt} />
                              ))}
                            </datalist>


                        <select className='investigationinput' placeholder='' value={val.food_timing} onChange={(e) => changingmulti("advice_medication", index, 'food_timing',  e.target.value)} >
                              <option value="">Choose Timing</option>
                              <option value="BEFORE_FOOD">BEFOR FOOD</option>
                              <option value="AFTER_FOOD">AFTER FOOD</option>
                              <option value="EMPTY_STOMACH">EMPTY STOMACH</option>
                              <option value="AT_BED_TIME">AT BED TIME</option>
                              <option value="WEEKLY_ONCES">WEEKLY ONCES</option>
                        </select>



                       







                        <input list="medicalduration"  className='investigationinput' placeholder='Duration' value={val.duration} onChange={(e) => changingmulti("advice_medication", index, 'duration',  e.target.value.toUpperCase())}  />
                        <datalist id="medicalduration">
                            {mediactionduration.map((opt, i) => (
                              <option key={i} value={opt} />
                            ))}
                          </datalist>

                       <div className="gap-2 w-fit flex"> <button onClick={() => addmulti("advice_medication",{medicine_name : "", qty :"", dose :"", route :"", frequency :"", duration :""  } )}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.advice_medication.length === 1} onClick={() => removemulti("advice_medication", index)}><IoMdRemoveCircle className='removecom'/></button></div>
                      </div>
                    ))
                  }
                </div>

                <div className='mt-16 flex justify-between gap-10' >
          
                  <div className='flex flex-col gap-10 w-1/2'>

                    <div className='investigationfirstdiv '>
                        <div className='items-center  flex  gap-2'>
                            <RiChatHistoryFill  className='text-xl'/>
                            <p className='investigationtopic '>Diet</p>
                        </div>
                        
                        <div className='investigationadding'>
                          {
                            draft.diet.map((val, index) => (
                              <div className='investigationinner' key={index}>
                                <input className='investigationinput' value={val} onChange={(e) => changingsingle("diet", index, e.target.value)}  />
                                <button onClick={() => changingsingle("diet", index, "Nill")}>Nill?</button>
                                <button onClick={() => addsingle("diet")}><IoMdAddCircle className='addingcom'/></button>
                                <button disabled={draft.diet.length === 1} onClick={() => removemulti("diet", index)}><IoMdRemoveCircle className='removecom'/></button>
                              </div>
                            ))
                          }
                        </div>
                    </div>

                    <div className='investigationfirstdiv '>
                    <div className='items-center  flex  gap-2'>
                            <FaBookMedical   className='text-xl'/>
                            <p className='investigationtopic '>Followup</p>
                        </div>
                        
                        <div className=' investigationadding'>
                          {
                            draft.followup.map((val, index) => (
                              <div className='investigationinner' key={index}>
                                <input className='investigationinput' value={val} onChange={(e) => changingsingle("followup", index, e.target.value)}  />
                                <button onClick={() => changingsingle("followup", index, "Nill")}>Nill?</button>
                                <button onClick={() => addsingle("followup")}><IoMdAddCircle className='addingcom'/></button>
                                <button disabled={draft.followup.length === 1} onClick={() => removemulti("followup", index)}><IoMdRemoveCircle className='removecom'/></button>
                              </div>
                            ))
                          }
                        </div>
                    </div>

                  </div>

                  <div className='flex flex-col gap-10 w-1/2'>

                      <div className='investigationfirstdiv '>
                          <div className='items-center  flex  gap-2'>
                              <FaHandHoldingMedical     className='text-xl'/>
                              <p className='investigationtopic  '>Instructions<span className='pl-2'>Given</span></p>
                          </div>
                          
                          <div className=' investigationadding'>
                            {
                              draft.instructions.map((val, index) => (
                                <div className='investigationinner' key={index}>
                                  <input className='investigationinput' value={val} onChange={(e) => changingsingle("instructions", index, e.target.value)}  />
                                  <button onClick={() => changingsingle("instructions", index, "Nill")}>Nill?</button>
                                  <button onClick={() => addsingle("instructions")}><IoMdAddCircle className='addingcom'/></button>
                                  <button disabled={draft.instructions.length === 1} onClick={() => removemulti("instructions", index)}><IoMdRemoveCircle className='removecom'/></button>
                                </div>
                              ))
                            }
                          </div>
                      </div>
                  </div>
                </div>


            </div>





       {(showgyn || draft.zzzb) && <>
        <div className='eachtopicmargin' >
        <div className='flex gap-4 my-9'>
          <h6>Gynocology Department</h6> 
          <button onClick={() => {setshowgyn(false),setdraft((pre) => ({...pre, zzzb: false}) ), toast.success("Gynocology Department Removed") }}><FaTrash className='removecom'/></button>
        </div>

        <div className='flex justify-between gap-10 ' >
        
        <div className='flex flex-col gap-10 w-1/2'>
          <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Obstetric<span className='pl-2'>History</span></p>
                <div className='investigationadding'>
                  {
                    draft.gyn_obstetric_history.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("gyn_obstetric_history", index, e.target.value)}  />
                        <button onClick={() => changingsingle("gyn_obstetric_history", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("gyn_obstetric_history")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.gyn_obstetric_history.length === 1} onClick={() => removemulti("gyn_obstetric_history", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Mestrual<span className='pl-2'>History</span></p>
                <div className='investigationadding'>
                  {
                    draft.gyn_menstrual_history.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("gyn_menstrual_history", index, e.target.value)}  />
                        <button onClick={() => changingsingle("gyn_menstrual_history", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("gyn_menstrual_history")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.gyn_menstrual_history.length === 1} onClick={() => removemulti("gyn_menstrual_history", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Blood<span className='pl-2'>Group</span></p>
                <div className='investigationadding'>
                  
                    
                      <div className='investigationinner' >
                      <select className='w-full'
                          value={draft.gyn_bloodgroup}
                          onChange={(e) =>
                            setdraft((pre) => ({ ...pre, gyn_bloodgroup: e.target.value }))
                          }
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                        
                      </div>
                
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Laproscopy<span className='pl-2'></span></p>
                <div className='investigationadding'>
                  {
                    draft.gyn_laproscopy.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("gyn_laproscopy", index, e.target.value)}  />
                        <button onClick={() => changingsingle("gyn_laproscopy", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("gyn_laproscopy")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.gyn_laproscopy.length === 1} onClick={() => removemulti("gyn_laproscopy", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Indication<span className='pl-2'></span></p>
                <div className='investigationadding'>
                  {
                    draft.gyn_indicators.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("gyn_indicators", index, e.target.value)}  />
                        <button onClick={() => changingsingle("gyn_indicators", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("gyn_indicators")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.gyn_indicators.length === 1} onClick={() => removemulti("gyn_indicators", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>


        </div>

        <div className='flex flex-col gap-10 w-1/2'>
          <div className='investigationfirstdiv '>
              <p className='investigationtopic  '>LMP<span className='pl-2'>Date</span></p>
              <div className='investigationadding'>
                
                    <div className='investigationinner' >
                    <input className='w-full' type='date' value={draft.gyn_lmp? draft.gyn_lmp.slice(0, 10) : ""  }     onChange={(e) => {
                      const selectedDate = e.target.value; 
                      setdraft((pre) => ({...pre, gyn_lmp: selectedDate}) )
                    }} placeholder='LMP' />
                    </div>
              </div>
          </div>

          <div className='investigationfirstdiv '>
              <p className='investigationtopic  '>EDD<span className='pl-2'>Date</span></p>
              <div className='investigationadding'>
                
                    <div className='investigationinner' >
                      <input className='w-full' type='date' value={draft.gyn_edd? draft.gyn_edd.slice(0, 10) : "" } onChange={(e) => {   
                        const selectedDate = e.target.value; 
                        setdraft((pre) => ({...pre, gyn_edd: selectedDate}) )}}
                         placeholder='EDD' />
                    </div>
              </div>
          </div>

          <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Marital<span className='pl-2'>History</span></p>
                <div className='investigationadding'>
                  {
                    draft.gyn_marital_history.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("gyn_marital_history", index, e.target.value)}  />
                        <button onClick={() => changingsingle("gyn_marital_history", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("gyn_marital_history")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.gyn_marital_history.length === 1} onClick={() => removemulti("gyn_marital_history", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Hysteroscopy<span className='pl-2'></span></p>
                <div className='investigationadding'>
                  {
                    draft.gyn_hysteroscopy.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("gyn_hysteroscopy", index, e.target.value)}  />
                        <button onClick={() => changingsingle("gyn_hysteroscopy", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("gyn_hysteroscopy")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.gyn_hysteroscopy.length === 1} onClick={() => removemulti("gyn_hysteroscopy", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>


            
        </div>

        

        </div>

</div>
       </>}

       {(showobs || draft.zzzc) && <>
        <div className='eachtopicmargin' >
        <div className='flex gap-4 my-9'>
          <h6>Obstetric and Gynocology Department</h6> 
          <button onClick={() => {setshowobs(false), setdraft((pre) => ({...pre, zzzc: false}) ), toast.success("Obstetric Department Removed") }}><FaTrash className='removecom'/></button>
        </div>

        <div className='flex justify-between gap-10 ' >
          
          <div className='flex flex-col gap-10 w-1/2'>
            <div className='investigationfirstdiv '>
                  <p className='investigationtopic '>Obstetrics<span className='pl-2'>History</span></p>
                  <div className='investigationadding'>
                    {
                      draft.obs_obstetric_history.map((val, index) => (
                        <div className='investigationinner' key={index}>
                          <input className='investigationinput' value={val} onChange={(e) => changingsingle("obs_obstetric_history", index, e.target.value)}  />
                          <button onClick={() => changingsingle("obs_obstetric_history", index, "Nill")}>Nill?</button>
                          <button onClick={() => addsingle("obs_obstetric_history")}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.obs_obstetric_history.length === 1} onClick={() => removemulti("obs_obstetric_history", index)}><IoMdRemoveCircle className='removecom'/></button>
                        </div>
                      ))
                    }
                  </div>
              </div>

              <div className='investigationfirstdiv '>
                  <p className='investigationtopic '>Menstrual<span className='pl-2'>History</span></p>
                  <div className='investigationadding'>
                    {
                      draft.obs_menstrual_history.map((val, index) => (
                        <div className='investigationinner' key={index}>
                          <input className='investigationinput' value={val} onChange={(e) => changingsingle("obs_menstrual_history", index, e.target.value)}  />
                          <button onClick={() => changingsingle("obs_menstrual_history", index, "Nill")}>Nill?</button>
                          <button onClick={() => addsingle("obs_menstrual_history")}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.obs_menstrual_history.length === 1} onClick={() => removemulti("obs_menstrual_history", index)}><IoMdRemoveCircle className='removecom'/></button>
                        </div>
                      ))
                    }
                  </div>
              </div>

              <div className='investigationfirstdiv '>
                    <p className='investigationtopic '>Delivery<span className='pl-2'>mode</span></p>
                    <div className='investigationadding'>
                      {
                        draft.obs_mode_of_delivery.map((val, index) => (
                          <div className='investigationinner' key={index}>
                            <input className='investigationinput' value={val} onChange={(e) => changingsingle("obs_mode_of_delivery", index, e.target.value)}  />
                            <button onClick={() => changingsingle("obs_mode_of_delivery", index, "Nill")}>Nill?</button>
                            <button onClick={() => addsingle("obs_mode_of_delivery")}><IoMdAddCircle className='addingcom'/></button>
                            <button disabled={draft.obs_mode_of_delivery.length === 1} onClick={() => removemulti("obs_mode_of_delivery", index)}><IoMdRemoveCircle className='removecom'/></button>
                          </div>
                        ))
                      }
                    </div>
                </div>

            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>LMP<span className='pl-2'>Date</span></p>
                <div className='investigationadding'>
                  
                      <div className='investigationinner' >
                      <input className='w-full'  type='date' value={draft.obs_lmp? draft.obs_lmp.slice(0, 10) : "" } onChange={(e) => {      
                        const selectedDate = e.target.value; 
                        setdraft((pre) => ({...pre, obs_lmp: selectedDate}) )}
                        } placeholder='LMP' />
                      </div>
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>EDD<span className='pl-2'>Date</span></p>
                <div className='investigationadding'>
                  
                      <div className='investigationinner' >
                      <input className='w-full' type='date' value={draft.obs_edd? draft.obs_edd.slice(0, 10) : "" } onChange={(e) => {   
                       const selectedDate = e.target.value; 
                        setdraft((pre) => ({...pre, obs_edd: selectedDate}) )}}
                         placeholder='EDD' />
                      </div>
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Blood<span className='pl-2'>Group</span></p>
                <div className='investigationadding'>
                  
                    
                      <div className='investigationinner' >
                      <select className='w-full'
                          value={draft.obs_bloodgroup}
                          onChange={(e) =>
                            setdraft((pre) => ({ ...pre, obs_bloodgroup: e.target.value }))
                          }
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                        
                      </div>
                
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Baby<span className='pl-2'>Gender</span></p>
                <div className='investigationadding'>
                  
                    
                      <div className='investigationinner' >
                      <select className='w-full' value={draft.obs_baby_gender} onChange={(e) => setdraft((pre) => ({...pre, obs_baby_gender: e.target.value}))}>
                          <option value="">Choose Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        
                      </div>
                
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Delivery<span className='pl-2'>Date</span></p>
                <div className='investigationadding'>
                  
                      <div className='investigationinner' >
                      <input className='w-full' type='date' value={draft.obs_delivery_date? draft.obs_delivery_date.slice(0, 10) : ""} onChange={(e) => {
                        const selectedDate = e.target.value; 
                        setdraft((pre) => ({...pre, obs_delivery_date: selectedDate}) )}}
                         placeholder='Delivery Date' />
                      </div>
                </div>
            </div>
            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Laproscopy<span className='pl-2'></span></p>
                <div className='investigationadding'>
                  {
                    draft.obs_laproscopy.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("obs_laproscopy", index, e.target.value)}  />
                        <button onClick={() => changingsingle("obs_laproscopy", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("obs_laproscopy")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.obs_laproscopy.length === 1} onClick={() => removemulti("obs_laproscopy", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Indication<span className='pl-2'></span></p>
                <div className='investigationadding'>
                  {
                    draft.obs_indicators.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("obs_indicators", index, e.target.value)}  />
                        <button onClick={() => changingsingle("obs_indicators", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("obs_indicators")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.obs_indicators.length === 1} onClick={() => removemulti("obs_indicators", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>




         </div>

          <div className='flex flex-col gap-10 w-1/2'>
            <div className='investigationfirstdiv '>
                    <p className='investigationtopic '>Gravida<span className='pl-2'></span></p>
                    <div className='investigationadding'>
                      {
                        draft.obs_gravida.map((val, index) => (
                          <div className='investigationinner' key={index}>
                            <input className='investigationinput' value={val} onChange={(e) => changingsingle("obs_gravida", index, e.target.value)}  />
                            <button onClick={() => changingsingle("obs_gravida", index, "Nill")}>Nill?</button>
                            <button onClick={() => addsingle("obs_gravida")}><IoMdAddCircle className='addingcom'/></button>
                            <button disabled={draft.obs_gravida.length === 1} onClick={() => removemulti("obs_gravida", index)}><IoMdRemoveCircle className='removecom'/></button>
                          </div>
                        ))
                      }
                    </div>
                </div>

                <div className='investigationfirstdiv '>
                    <p className='investigationtopic '>Parity<span className='pl-2'></span></p>
                    <div className='investigationadding'>
                      {
                        draft.obs_parity.map((val, index) => (
                          <div className='investigationinner' key={index}>
                            <input className='investigationinput' value={val} onChange={(e) => changingsingle("obs_parity", index, e.target.value)}  />
                            <button onClick={() => changingsingle("obs_parity", index, "Nill")}>Nill?</button>
                            <button onClick={() => addsingle("obs_parity")}><IoMdAddCircle className='addingcom'/></button>
                            <button disabled={draft.obs_parity.length === 1} onClick={() => removemulti("obs_parity", index)}><IoMdRemoveCircle className='removecom'/></button>
                          </div>
                        ))
                      }
                    </div>
                </div>

                <div className='investigationfirstdiv '>
                    <p className='investigationtopic '>Live<span className='pl-2'>Birth</span></p>
                    <div className='investigationadding'>
                      {
                        draft.obs_live_birth.map((val, index) => (
                          <div className='investigationinner' key={index}>
                            <input className='investigationinput' value={val} onChange={(e) => changingsingle("obs_live_birth", index, e.target.value)}  />
                            <button onClick={() => changingsingle("obs_live_birth", index, "Nill")}>Nill?</button>
                            <button onClick={() => addsingle("obs_live_birth")}><IoMdAddCircle className='addingcom'/></button>
                            <button disabled={draft.obs_live_birth.length === 1} onClick={() => removemulti("obs_live_birth", index)}><IoMdRemoveCircle className='removecom'/></button>
                          </div>
                        ))
                      }
                    </div>
                </div>

                

                <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Baby<span className='pl-2'>Weight</span></p>
                <div className='investigationadding'>
                  
                      <div className='investigationinner' >
                      <input className='investigationinput' value={draft.obs_baby_weight.replace(" kg", "")} onChange={(e) => setdraft((pre) => ({...pre, obs_baby_weight: `${e.target.value} kg`}) )} placeholder='Baby Weight' />
                      </div>
                </div>
            </div>

            <div className='investigationfirstdiv '>
                    <p className='investigationtopic '>APPGAR<span className='pl-2'></span></p>
                    <div className='investigationadding'>
                      {
                        draft.obs_apgar.map((val, index) => (
                          <div className='investigationinner' key={index}>
                            <input className='investigationinput' value={val} onChange={(e) => changingsingle("obs_apgar", index, e.target.value)}  />
                            <button onClick={() => changingsingle("obs_apgar", index, "Nill")}>Nill?</button>
                            <button onClick={() => addsingle("obs_apgar")}><IoMdAddCircle className='addingcom'/></button>
                            <button disabled={draft.obs_apgar.length === 1} onClick={() => removemulti("obs_apgar", index)}><IoMdRemoveCircle className='removecom'/></button>
                          </div>
                        ))
                      }
                    </div>
                </div>

                <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Abortion<span className='pl-2'></span></p>
                <div className='investigationadding'>
                  
                      <div className='investigationinner' >
                      <input className='investigationinput' value={draft.obs_abortion} onChange={(e) => setdraft((pre) => ({...pre, obs_abortion: e.target.value}) )} placeholder='Abortion' />
                      <button onClick={(e) => setdraft((pre) => ({...pre, obs_abortion: "Nill"}) )}>Nill?</button>
                      </div>
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Marital<span className='pl-2'>History</span></p>
                <div className='investigationadding'>
                  {
                    draft.obs_marital_history.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("obs_marital_history", index, e.target.value)}  />
                        <button onClick={() => changingsingle("obs_marital_history", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("obs_marital_history")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.obs_marital_history.length === 1} onClick={() => removemulti("obs_marital_history", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Hysteroscopy<span className='pl-2'></span></p>
                <div className='investigationadding'>
                  {
                    draft.obs_hysteroscopy.map((val, index) => (
                      <div className='investigationinner' key={index}>
                        <input className='investigationinput' value={val} onChange={(e) => changingsingle("obs_hysteroscopy", index, e.target.value)}  />
                        <button onClick={() => changingsingle("obs_hysteroscopy", index, "Nill")}>Nill?</button>
                        <button onClick={() => addsingle("obs_hysteroscopy")}><IoMdAddCircle className='addingcom'/></button>
                        <button disabled={draft.obs_hysteroscopy.length === 1} onClick={() => removemulti("obs_hysteroscopy", index)}><IoMdRemoveCircle className='removecom'/></button>
                      </div>
                    ))
                  }
                </div>
            </div>
                          
          </div>
        </div>
        </div>
        </>}

      
        {(showivf || draft.zzzd) && <>
          <div className='eachtopicmargin' >
            <div className='flex gap-4 my-9'>
              <h6>IVF Department</h6> 
              <button onClick={() => {setshowivf(false), setdraft((pre) => ({...pre, zzzd: false}) ), toast.success("IVF Department Removed") }}><FaTrash className='removecom'/></button>
            </div>

            <div className='flex justify-between gap-10 ' >
          
              <div className='flex flex-col gap-10 w-1/2'>
              <div className='investigationfirstdiv '>
                  <p className='investigationtopic '>Obstetrics<span className='pl-2'>History</span></p>
                  <div className='investigationadding'>
                    {
                      draft.ivf_obstetric_history.map((val, index) => (
                        <div className='investigationinner' key={index}>
                          <input className='investigationinput' value={val} onChange={(e) => changingsingle("ivf_obstetric_history", index, e.target.value)}  />
                          <button onClick={() => changingsingle("ivf_obstetric_history", index, "Nill")}>Nill?</button>
                          <button onClick={() => addsingle("ivf_obstetric_history")}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.ivf_obstetric_history.length === 1} onClick={() => removemulti("ivf_obstetric_history", index)}><IoMdRemoveCircle className='removecom'/></button>
                        </div>
                      ))
                    }
                  </div>
              </div>

              <div className='investigationfirstdiv '>
                  <p className='investigationtopic '>Menstrual<span className='pl-2'>History</span></p>
                  <div className='investigationadding'>
                    {
                      draft.ivf_menstrual_history.map((val, index) => (
                        <div className='investigationinner' key={index}>
                          <input className='investigationinput' value={val} onChange={(e) => changingsingle("ivf_menstrual_history", index, e.target.value)}  />
                          <button onClick={() => changingsingle("ivf_menstrual_history", index, "Nill")}>Nill?</button>
                          <button onClick={() => addsingle("ivf_menstrual_history")}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.ivf_menstrual_history.length === 1} onClick={() => removemulti("ivf_menstrual_history", index)}><IoMdRemoveCircle className='removecom'/></button>
                        </div>
                      ))
                    }
                  </div>
              </div>

              <div className='investigationfirstdiv '>
                  <p className='investigationtopic '>Pregnency<span className='pl-2'>Test</span></p>
                  <div className='investigationadding'>
                    {
                      draft.ivf_pregnancy_test.map((val, index) => (
                        <div className='investigationinner' key={index}>
                          <input className='investigationinput' value={val} onChange={(e) => changingsingle("ivf_pregnancy_test", index, e.target.value)}  />
                          <button onClick={() => changingsingle("ivf_pregnancy_test", index, "Nill")}>Nill?</button>
                          <button onClick={() => addsingle("ivf_pregnancy_test")}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.ivf_pregnancy_test.length === 1} onClick={() => removemulti("ivf_pregnancy_test", index)}><IoMdRemoveCircle className='removecom'/></button>
                        </div>
                      ))
                    }
                  </div>
              </div>

              <div className='investigationfirstdiv '>
                  <p className='investigationtopic '>AMH<span className='pl-2'>Level</span></p>
                  <div className='investigationadding'>
                    {
                      draft.ivf_amh_level.map((val, index) => (
                        <div className='investigationinner' key={index}>
                          <input className='investigationinput' value={val} onChange={(e) => changingsingle("ivf_amh_level", index, e.target.value)}  />
                          <button onClick={() => changingsingle("ivf_amh_level", index, "Nill")}>Nill?</button>
                          <button onClick={() => addsingle("ivf_amh_level")}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.ivf_amh_level.length === 1} onClick={() => removemulti("ivf_amh_level", index)}><IoMdRemoveCircle className='removecom'/></button>
                        </div>
                      ))
                    }
                  </div>
              </div>

              <div className='investigationfirstdiv '>
                  <p className='investigationtopic  '>Partner<span className='pl-2'>Name</span></p>
                  <div className='investigationadding'>
                    
                        <div className='investigationinner' >
                        <input className='investigationinput' value={draft.ivf_partner_name} onChange={(e) => setdraft((pre) => ({...pre, ivf_partner_name: e.target.value}) )} placeholder='Partner name' />
                        <button onClick={() => setdraft((pre) => ({...pre, ivf_partner_name: "Nill"}) )}>Nill?</button>
                        </div>
                  </div>
              </div>

              <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>LMP<span className='pl-2'>Date</span></p>
                <div className='investigationadding'>
                  
                      <div className='investigationinner' >
                      <input className='w-full' type='date' value={draft.ivf_lmp? draft.ivf_lmp.slice(0, 10) : "" } onChange={(e) => {          
                        const selectedDate = e.target.value; 
                        setdraft((pre) => ({...pre, ivf_lmp: selectedDate}) )}} 
                        placeholder='LMP' />
                      </div>
                </div>
            </div>

            <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>EDD<span className='pl-2'>Date</span></p>
                <div className='investigationadding'>
                  
                      <div className='investigationinner' >
                      <input className="w-full" type='date' value={draft.ivf_edd? draft.ivf_edd.slice(0, 10) : "" } onChange={(e) => {      
                        const selectedDate = e.target.value; 
                        setdraft((pre) => ({...pre, ivf_edd: selectedDate}) )}}
                         placeholder='EDD' />
                      </div>
                </div>
            </div>

         

           




              </div>
                    
              <div className='flex flex-col gap-10 w-1/2'>

              <div className='investigationfirstdiv '>
                  <p className='investigationtopic '>Antra<span className='pl-2'>Follicle</span></p>
                  <div className='investigationadding'>
                    {
                      draft.ivf_antrafolicle.map((val, index) => (
                        <div className='investigationinner' key={index}>
                          <input className='investigationinput' value={val} onChange={(e) => changingsingle("ivf_antrafolicle", index, e.target.value)}  />
                          <button onClick={() => changingsingle("ivf_antrafolicle", index, "Nill")}>Nill?</button>
                          <button onClick={() => addsingle("ivf_antrafolicle")}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.ivf_antrafolicle.length === 1} onClick={() => removemulti("ivf_antrafolicle", index)}><IoMdRemoveCircle className='removecom'/></button>
                        </div>
                      ))
                    }
                  </div>
              </div>

              <div className='investigationfirstdiv '>
                  <p className='investigationtopic '>Previous<span className='pl-2'>IVF</span><span className='pl-2'>Attempt</span></p>
                  <div className='investigationadding'>
                    {
                      draft.ivf_previous_ivf_attempt.map((val, index) => (
                        <div className='investigationinner' key={index}>
                          <input className='investigationinput' value={val} onChange={(e) => changingsingle("ivf_previous_ivf_attempt", index, e.target.value)}  />
                          <button onClick={() => changingsingle("ivf_previous_ivf_attempt", index, "Nill")}>Nill?</button>
                          <button onClick={() => addsingle("ivf_previous_ivf_attempt")}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.ivf_previous_ivf_attempt.length === 1} onClick={() => removemulti("ivf_previous_ivf_attempt", index)}><IoMdRemoveCircle className='removecom'/></button>
                        </div>
                      ))
                    }
                  </div>
              </div>

              <div className='investigationfirstdiv '>
                  <p className='investigationtopic '>Treatment<span className='pl-2'>Protocol</span><span className='pl-2'></span></p>
                  <div className='investigationadding'>
                    {
                      draft.ivf_treatment_protocol.map((val, index) => (
                        <div className='investigationinner' key={index}>
                          <input className='investigationinput' value={val} onChange={(e) => changingsingle("ivf_treatment_protocol", index, e.target.value)}  />
                          <button onClick={() => changingsingle("ivf_treatment_protocol", index, "Nill")}>Nill?</button>
                          <button onClick={() => addsingle("ivf_treatment_protocol")}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.ivf_treatment_protocol.length === 1} onClick={() => removemulti("ivf_treatment_protocol", index)}><IoMdRemoveCircle className='removecom'/></button>
                        </div>
                      ))
                    }
                  </div>
              </div>

              <div className='investigationfirstdiv '>
                  <p className='investigationtopic '>Outcom<span className='pl-2'></span><span className='pl-2'></span></p>
                  <div className='investigationadding'>
                    {
                      draft.ivf_outcome.map((val, index) => (
                        <div className='investigationinner' key={index}>
                          <input className='investigationinput' value={val} onChange={(e) => changingsingle("ivf_outcome", index, e.target.value)}  />
                          <button onClick={() => changingsingle("ivf_outcome", index, "Nill")}>Nill?</button>
                          <button onClick={() => addsingle("ivf_outcome")}><IoMdAddCircle className='addingcom'/></button>
                          <button disabled={draft.ivf_outcome.length === 1} onClick={() => removemulti("ivf_outcome", index)}><IoMdRemoveCircle className='removecom'/></button>
                        </div>
                      ))
                    }
                  </div>
              </div>

              

              <div className='investigationfirstdiv '>
                  <p className='investigationtopic  '>Partner<span className='pl-2'>Age</span></p>
                  <div className='investigationadding'>
                    
                        <div className='investigationinner' >
                        <input className='investigationinput' value={draft.ivf_partner_age} onChange={(e) => setdraft((pre) => ({...pre, ivf_partner_age: e.target.value}) )} placeholder='Partner name' />
                        <button onClick={() => setdraft((pre) => ({...pre, ivf_partner_age: "Nill"}) )}>Nill?</button>
                        </div>
                  </div>
              </div>

              <div className='investigationfirstdiv '>
                <p className='investigationtopic  '>Blood<span className='pl-2'>Group</span></p>
                <div className='investigationadding'>
                  
                    
                      <div className='investigationinner' >
                      <select
                          className='w-full'
                          value={draft.ivf_bloodgroup}
                          onChange={(e) =>
                            setdraft((pre) => ({ ...pre, ivf_bloodgroup: e.target.value }))
                          }
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                        
                      </div>
                
                </div>
            </div>


              </div>
            </div>

          </div> 
          </>}

     

    </div>

   


{/* ===============================================================================================================================================================================================
=============================================================================================================================================================================================== */}





      

     


      
  <div className='my-16 flex flex-col gap-16 '>
    <div className='bg-teal-500 hover:shadow-teal-400 flex justify-center transition-all duration-200 shadow-lg  text-white text-center rounded-lg  text-2xl  '>
      <button className='flex py-4 px-20 items-center gap-2 outline-none' onClick={ dodraft}>Save Draft <FaSave /></button> 
    </div>

    <div className='bg-gray-800 hover:shadow-gray-600 flex justify-center transition-all duration-200 shadow-lg text-white text-center  text-2xl rounded-lg'>
      <button className='flex py-4 px-20 items-center gap-2 outline-none' disabled={!blockai} onClick={dogenerate}>Generate Summary <FaMagic /></button>  
    </div>
  </div>



    <Dialog open={showconfirmdraft || showconfirmgenrate} onClose={() => clear()} >
      <div className="digone" aria-hidden="true" />
      <div className="digtwo">
          <Dialog.Panel className="digthree">
          <Dialog.Title className=" digtitle">
              <FaQuestionCircle   className='text-6xl text-amber-600'/>
              <p className='text-3xl '>Are Sure  to modify Draft</p>
          </Dialog.Title>
          <div className='pb-8  flex justify-evenly'>
              <div className='digno'>
                  <button className='diginnerbut' onClick={showconfirmdraft? nodraft : nogenerate} >
                  No<FaThumbsDown className='text-xl'/>
              </button></div>

              <div className='digyes'>
                  <button disabled={!moving} className='diginnerbut' onClick={showconfirmdraft? submitcomplaints : sendtoai} >
                  {showconfirmdraft ? "Save Draft" : "Generate Summary"}<FaThumbsUp  className='text-xl'/>
              </button></div>
          </div>
          </Dialog.Panel>
      </div>
  </Dialog>



    </div>
  )
}

export default Draft;
