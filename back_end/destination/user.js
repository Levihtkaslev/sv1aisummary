const userinfo = require("../collections/users");
/* const JWT_SECRET = "your_secret_key_here"; */
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");

exports.postuser = async(req, res) => {
    const { username, password, userid, userrole, location, status } = req.body;
    try {
        if(!username || !password || !userid || !userrole || !location || !status){
            return res.status(400).json({
                message : "Need all data"
            })
        }

       /*  if (!Array.isArray(location)) {
            return res.status(400).json({ message: "Locations must be an array of location IDs" });
        } */

        const existinguser = await userinfo.findOne({userid});
        if (existinguser) {
            return res.status(400).json({ message: "User ID already exists. Choose a different one." });
        }

        const createuser = new userinfo({ username, password, userid, userrole, location, status })
        await createuser.save();
        return res.json({
            message: "New user created successfully",
            data: createuser,
        })
    } catch (error) {
        console.error("Error while creating user : ", error)
        res.json({
            message : "Error while creating user"
        })
    }
}

exports.getuser = async(req, res) => {
    try {
        const getuser = await userinfo.find().populate("location").populate("userrole");
        res.json({
            message : "Fetched successfully",
            data : getuser
        })
    } catch (error) {
        console.error("Error while updating user role:", error);
        return res.json({
            message : "There was a error"
        })
    }
}

exports.getparticularuser = async(req, res) => {
    const {userid} = req.params;
    try {
        const getuser = await userinfo.findOne({userid});
        res.json({
            message : "Fetched successfully",
            data : getuser
        })
    } catch (error) {
        console.error("Error Getting user:", error);
        return res.json({
            message : "There was a error"
        })
    }
}

exports.putuser = async(req, res) => {
    const {id} = req.params;
    const {username, password, userid, userrole, location, status} = req.body;

    try {
        
        if(!id){
            return res.json({
                message : "Please provide object id"
            })
        }

        const finduser = await userinfo.findById(id)

        if (!finduser) {
            return res.status(404).json({
              message: "User not found",
            });
          }

        finduser.username = username || finduser.username; 
        finduser.password = password || finduser.password;
        finduser.userid = userid || finduser.userid;
        finduser.userrole = userrole || finduser.userrole;
        finduser.location = location || finduser.location;
        finduser.status = status || finduser.status;

        await finduser.save();

        return res.json({
            message: "User updated successfully",
            data: finduser, 
          });
    } catch (error) {
        console.error("Error while updating user role:", error);
        return res.json({
            message : "Error while updating userrole"
        })
    }
}

exports.deleteuser = async(req, res) => {
    const {id} = req.params;

    try {

        const finduser = await userinfo.findById(id)
        if (!finduser) {
            return res.status(404).json({
              message: "User not found",
            });
          }

        await userinfo.findByIdAndDelete(id)
        res.json({
            message : "Deleted successfully"
        })
    } catch (error) {
        console.log("error while deleting id", error)
    }
} 

exports.login = async(req, res) => {
    try {
        
        const { userid, password} = req.body;
        const user = await userinfo.findOne({userid}).populate("userrole")
        if (!user) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ userid : user.userid, userrole: user.userrole.rolename }, JWT_SECRET);
        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error("Error while login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}