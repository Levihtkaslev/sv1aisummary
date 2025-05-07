const express = require("express");
const { postrole, getrole, putrole, deleterole } = require("../destination/role")
const router = express.Router();

router.post("/role",postrole);
router.get("/role", getrole);
router.put("/role/:id", putrole);
router.delete("/role/:id", deleterole);

module.exports = router;