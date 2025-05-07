const express = require("express");
const { postsummary,getsummary, getsummaryuhid, getsummarybydoneby, getsummarybydoctorby, getsummarybyencounterby  } = require("../destination/summary")
const router = express.Router();

router.post("/summary", postsummary);
router.get("/summary/filter", getsummary);
router.get("/summary/:uhid", getsummaryuhid);
router.get("/summary/doneby/:doneby", getsummarybydoneby);
router.get("/summary/doctor/:doctor", getsummarybydoctorby);
router.get("/summary/encounter/:encounter", getsummarybyencounterby);

module.exports = router;