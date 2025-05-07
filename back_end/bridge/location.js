const express = require("express");
const {postlocation, getlocation, putlocation, deletelocation  } = require("../destination/location")
const router = express.Router();

router.post("/location",postlocation);
router.get("/location", getlocation);
router.put("/location/:id", putlocation);
router.delete("/location/:id", deletelocation);

module.exports = router;