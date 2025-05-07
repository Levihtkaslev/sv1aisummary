import axios from "axios";
import { toast } from "react-toastify";


const Kraniumpatinfo = async(uhid) => {

     console.log("2nd UHID", uhid) 
     const backendurl = import.meta.env.VITE_BACKEND_BASURL;
    const token = localStorage.getItem("kranium_token");
   /*  console.log("token", token)  */
    try {
        const response = await axios.post(`${backendurl}/kranium-demographic/${uhid}`,{
            token
        })
        console.log("res", response)

        if(response.data.data){ 
            console.log("data", response.data.data) 
            const krandata = response.data.data;
             console.log("krandata", krandata) 
            return krandata;
        }else{
           /*  toast.error("No Patient data found") */
            throw new Error("Data not found");
        }
    } catch (error) {
      /*   toast.error("Failed to fetch data") */
        console.error("Failed to fetch patient information", error);
        return null;
    }
}

export default Kraniumpatinfo;