const express = require("express");
const { postdraft, getdraftuhid, getdraft, deletedraft, patchdraft } = require("../destination/draft")
const router = express.Router();

router.post("/draft", postdraft);
router.get("/draft/:uhid", getdraftuhid);
router.get("/draft", getdraft);
router.delete("/draft/:uhid", deletedraft);
router.patch("/draft/:uhid", patchdraft);

module.exports = router;