const express = require("express");
const {kranitoken, kranidemograph, kraniumlab, kraniumlabtext } = require("../destination/kranium")
const router = express.Router();

router.get("/kranium-token",kranitoken);
router.post("/kranium-demographic/:uhid", kranidemograph);
router.post("/pdf/:encounter", kraniumlab);
router.post("/pdftext/:encounter", kraniumlabtext)

module.exports = router;