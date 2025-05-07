const pdf = require("pdf-parse");
require('dotenv').config();
const axios = require('axios');
const PdfParse = require("pdf-parse");

const kranium_userID = process.env.KRANIUM_USERID;
const kranium_password = process.env.KRANIUM_PASSWORD;
const kranium_baseurl = process.env.KRANIUM_BASE_URL;


exports.kranitoken = async(req, res) => {


    try {
        const tokenget = await axios.post(`${kranium_baseurl}users/login`,{
            username : kranium_userID,
            password : kranium_password
        });
        if (tokenget.data.status && tokenget.data.data.token) {
            const token = tokenget.data.data.token;
            /* console.log("token", token) */
            res.json({ token });
          } else {
            res.status(401).json({ success: false, message: "Token not received" });
          }
    } catch (error) {
        console.error("Error", error)
    }
}

exports.kranidemograph =  async(req, res) => {
    const uhid  = req.params.uhid
    const {token} = req.body
    try {
        const patinfo = await axios.get(`${kranium_baseurl}patients/info/${uhid}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });

        if(patinfo.data.status){
            const data = patinfo.data.data
            res.json({
                 data : data 
            })
        }else{
            throw new Error("Patient data not found");
        }
    } catch (error) {
        
    }
}

exports.kraniumlab =  async(req, res) => {
        const encounter = req.params.encounter
        const {token} = req.body
        try {
          const response = await axios.get(`${kranium_baseurl}reports/combined-lab-reports/${encounter}`, {
            headers : {
                Authorization : `Bearer ${token}`
            }
          });
      
          
          if(response.data.status && Array.isArray(response.data.data) && response.data.data.length > 0){
            const data = response.data.data[0].lab_report_url || "no lab report for this patient"
            res.json({
                 data : data 
            })
        }else{
            res.json({ data: "No lab report available for this patient." });
        }
      
        } catch (error) {
          console.error("Error  fetching data:", error);
        }
      
}

const { URL } = require('url'); 

exports.kraniumlabtext = async (req, res) => {
  const encounter = req.params.encounter;
  const { token } = req.body;

  try {
    const response = await axios.get(`${kranium_baseurl}reports/combined-lab-reports/${encounter}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data.status && Array.isArray(response.data.data) && response.data.data.length > 0) {
      const data = response.data.data[0].lab_report_url || "";

     /*  console.log("laburl", data); */

      
      let isValidURL = true;
      try {
        new URL(data);
      } catch (e) {
        isValidURL = false;
      }

      if (!isValidURL) {
        return res.json({ data: "No lab report for this patient." });
      }

      try {
        const responsetwo = await axios.get(data, {
          responseType: 'arraybuffer'
        });

        const pdfcontent = Buffer.from(responsetwo.data);
        const datatext = await PdfParse(pdfcontent);
        const extractedtext = datatext.text;

        console.log("extracted", extractedtext);

        res.json({
          text: extractedtext
        });

      } catch (error) {
        console.error("Error fetching PDF:", error);
        res.status(500).json({ error: "Failed to read lab report PDF." });
      }

    } else {
      res.json({ data: "No lab report available for this patient." });
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching lab report data." });
  }
};
