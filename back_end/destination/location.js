const location = require("../collections/location");

exports.postlocation = async(req, res) => {
    const { locationname, status } = req.body;
    try {
        const existinglocation = await location.findOne({locationname});
        if (existinglocation) {
            return res.status(400).json({ message: "Loaction already exists. Choose a different one." });
        }
        const createlocation = new location({locationname, status})
        await createlocation.save();
        res.json({
            message : "Created successfully",
            createlocation
        })
    } catch (error) {
        console.log("Error while creating departme", error)
        res.json({
            message : "Error while creating location"
        })
    }
}

exports.getlocation =  async(req, res) => {
    try {
        const getlocation = await location.find();
        res.json({
            message : "Fetched successfully",
            data : getlocation
        })
    } catch (error) {
        console.error("Error while getting data:", error);
        return res.json({
            message : "There was a error"
        })
    }
}

exports.putlocation = async(req, res) => {
    const {id} = req.params;
    const {locationname, status} = req.body;

    try {
        
        if(!id){
            return res.json({
                message : "Please provide object id"
            })
        }

        const findlocation = await location.findById(id)

        if (!findlocation) {
            return res.status(404).json({
              message: "location not found",
            });
          }

        findlocation.locationname = locationname || findlocation.locationname; 
        findlocation.status = status || findlocation.status; 
        
        await findlocation.save();

        return res.json({
            message: "User updated successfully",
            data: findlocation, 
          });
    } catch (error) {
        console.error("Error while updating location:", error);
        return res.json({
            message : "Error while updating location"
        })
    }
}

exports.deletelocation = async(req, res) => {
    const {id} = req.params;

    try {

        const finduser = await location.findById(id)
        if (!finduser) {
            return res.status(404).json({
              message: "location not found",
            });
          }

        await location.findByIdAndDelete(id)
        res.json({
            message : "Deleted successfully"
        })
    } catch (error) {
        console.log("error while deleting id", error)
    }
}