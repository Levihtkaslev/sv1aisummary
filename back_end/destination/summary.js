const summarycol = require("../collections/summary");

exports.postsummary = async(req, res) => {

    try {
        
        const {uhid, encounter, summary,  doneby,  doctor, createdtime, lastmodified, status, patient_name} = req.body;

        if(!uhid || !encounter || !summary){
            return res.status(400).json({
                error: "UHID or ENCOUNTER Missing",
              });
        } 

        let existinguhid = await summarycol.findOne({uhid});

        if(existinguhid){
            let existingencounter = existinguhid.summarydetail.find((e) => e.encounter === encounter)

            if(existingencounter){
                existingencounter.patient_name = patient_name
                existingencounter.uhid = uhid
                existingencounter.encounter = encounter;
                existingencounter.summary = summary;
                existingencounter.doneby = doneby || existingencounter.doneby; 
                existingencounter.doctor = doctor || existingencounter.doctor;
                existingencounter.createdtime = createdtime || existingencounter.createdtime;
                existingencounter.lastmodified = lastmodified || existingencounter.lastmodified
                existingencounter.status =  status || existingencounter.status
                existingencounter.count = existingencounter.count+1
            }else{
                existinguhid.summarydetail.push({
                    encounter, summary,  doneby, doctor, uhid, createdtime, lastmodified
                 })
            }

            await existinguhid.save();
            return res.json({
                message: "Summary saved successfully",
                data: existinguhid,
              });
        }else{
            const newsummary = new summarycol({uhid, summarydetail: [{
                patient_name : patient_name,
                uhid : uhid,
                encounter : encounter,
                summary : summary,
                doneby : doneby, 
                doctor : doctor,
                createdtime : createdtime,
                lastmodified : lastmodified
            }]})
            await newsummary.save();
            return res.json({
                message: "New patient encounter created successfully",
                data: newsummary,
            });
        }

    } catch (error) {
        console.error("Error saving patient information:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.getsummary = async (req, res) => {
    const { from, to } = req.query;
  
    if (!from || !to) {
      return res.status(400).json({ message: "from and to date required" });
    }
  
    try {
      const result = await summarycol.aggregate([
        { $unwind: "$summarydetail" },
        {
          $match: {
            "summarydetail.createdtime": {
              $gte: new Date(from),
              $lte: new Date(to)
            }
          }
        },
        {
          $group: {
            _id: "$_id",
            uhid: { $first: "$uhid" },
            summarydetail: { $push: "$summarydetail" }
          }
        }
      ]);

      const encounterList = [];

        result.forEach((item) => {
            const uhid = item.uhid;
            item.summarydetail.forEach((detail) => {
            encounterList.push({
                patient_name : detail.patient_name,
                uhid,
                encounter: detail.encounter,
                doneby : detail.doneby,
                doctor: detail.doctor,
                status: detail.status,
                createdtime: detail.createdtime,
                summary : detail.summary,
                lastmodified : detail.lastmodified,
                count : detail.count
            });
            });
        });
        res.json({ data: encounterList });

    } catch (error) {
      console.error("Error filtering summary:", error);
      res.status(500).json({ message: "Error filtering data" });
    }
  }

  exports.getsummaryuhid = async(req, res) => {
    try {
        const {uhid} = req.params;

        const existinguhid = await summarycol.findOne({uhid})
        if(!existinguhid){
            return res.json({
                message : "No uhid is there"
            })
        }

        const getsummary = await summarycol.findOne({uhid})
        res.json({
            message : "Data fetched successfuly",
            getsummary
        })

    } catch (error) {
        console.log("Error while getting summaries", error)
    }
}

exports.getsummarybydoneby = async (req, res) => {
    try {
        const { doneby } = req.params;

        const summaries = await summarycol.find(
           
          
        );

        if (summaries.length === 0) {
            return res.status(404).json({ message: "No records found for this doneby" });
        }

        const filteredSummaries = summaries.flatMap(summary =>
            summary.summarydetail.filter(detail => detail.doneby === doneby)
        );

        res.json({
            message: "Doneby data fetched successfully",
            data: filteredSummaries
        });

    } catch (error) {
        console.log("Error fetching doneby:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.getsummarybydoctorby = async (req, res) => {
    try {
      const { doctor } = req.params;
      const { from, to } = req.query;
  
      const fromDate = new Date(from);
      const toDate = new Date(to);
  
      const summaries = await summarycol.find();
  
      const filteredSummaries = summaries.flatMap(summary =>
        summary.summarydetail.filter(detail =>
          detail.doctor?.trim().toLowerCase() === doctor.trim().toLowerCase() &&
          new Date(detail.createdtime) >= fromDate &&
          new Date(detail.createdtime) <= toDate
        ).map(detail => ({
          patient_name : detail.patient_name,
          uhid: summary.uhid,
          encounter: detail.encounter,
          doctor: detail.doctor,
          status: detail.status,
          createdtime: detail.createdtime,
          summary : detail.summary,
          lastmodified : detail.lastmodified
        }))
      );
  
      if (filteredSummaries.length === 0) {
        return res.status(404).json({ message: "No records found for this doctor in the given range" });
      }
  
      res.json({
        message: "Doctor-specific data fetched successfully",
        data: filteredSummaries
      });
  
    } catch (error) {
      console.error("Error fetching doctor summaries:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  exports.getsummarybyencounterby =  async (req, res) => {
    try {
        const { encounter } = req.params;

        const summaries = await summarycol.find(
           
          
        );

        if (summaries.length === 0) {
            return res.status(404).json({ message: "No records found for this doneby" });
        }

        const filteredSummaries = summaries.flatMap(summary =>
            summary.summarydetail.filter(detail => detail.encounter === encounter)
        );

        res.json({
            message: "Doneby data fetched successfully",
            data: filteredSummaries
        });

    } catch (error) {
        console.log("Error fetching doneby:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

