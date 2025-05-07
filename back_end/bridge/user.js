const express = require("express");
const { postuser, getuser, putuser, deleteuser, login, getparticularuser } = require("../destination/user")
const router = express.Router();

router.post("/user", postuser);
router.get("/user", getuser);
router.get("/user/:userid", getparticularuser)
router.put("/user/:id", putuser);
router.delete("/user/:id", deleteuser);
router.post("/login", login);


module.exports = router;