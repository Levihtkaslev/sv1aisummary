import axios from "axios";
import Kraniumgate from "./kranitoken";

const Kranilab = async(encounter) => {
    console.log("labencount ")

    const backendurl = import.meta.env.VITE_BACKEND_BASURL;
    try {
        const token = await Kraniumgate();
        console.log("lab :", token)
        const response = await axios.post(`${backendurl}/pdf/${encounter}`,{
            token
        })
        console.log("res", response)

        if(response.data.data){
            console.log("data", response.data.data) 
            const krandata = response.data.data;
             console.log("krandata", krandata) 
            return krandata;
        }else{
            throw new Error("Data not found");
        }
    } catch (error) {
        console.error("Failed to fetch lab information", error);
        return null;
    }
}

export default Kranilab;