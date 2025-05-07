const role = require("../collections/role");

exports.postrole = async(req, res) => {
    const { rolename, status } = req.body;
    try {
        const existingrole = await role.findOne({rolename});
        if (existingrole) {
            return res.status(400).json({ message: "role already exists. Choose a different one." });
        }
        const createrole = new role({rolename, status})
        await createrole.save();
        res.json({
            message : "Created successfully",
            createrole
        })
    } catch (error) {
        console.log("Error while creating roles", error)
        res.json({
            message : "Error while creating roles"
        })
    }
}

exports.getrole =  async(req, res) => {
    try {
        const getrole = await role.find();
        res.json({
            message : "Fetched successfully",
            data : getrole
        })
    } catch (error) {
        console.error("Error while getting data:", error);
        return res.json({
            message : "There was a error"
        })
    }
}

exports.putrole = async(req, res) => {
    const {id} = req.params;
    const {rolename, status} = req.body;

    try {
        
        if(!id){
            return res.json({
                message : "Please provide object id"
            })
        }

        const findrole = await role.findById(id)

        if (!findrole) {
            return res.status(404).json({
              message: "role not found",
            });
          }

        findrole.rolename = rolename || findrole.rolename; 
        findrole.status = status || findrole.status;
        
        await findrole.save();

        return res.json({
            message: "role updated successfully",
            data: findrole, 
          });
    } catch (error) {
        console.error("Error while updating role:", error);
        return res.json({
            message : "Error while updating role"
        })
    }
}

exports.deleterole =  async(req, res) => {
    const {id} = req.params;

    try {

        const finduser = await role.findById(id)
        if (!finduser) {
            return res.status(404).json({
              message: "role not found",
            });
          }

        await role.findByIdAndDelete(id)
        res.json({
            message : "Deleted successfully"
        })
    } catch (error) {
        console.log("error while deleting id", error)
    }
} 