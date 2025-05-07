import axios from "axios";


const Kraniumgate = async() => {

    const backendurl = import.meta.env.VITE_BACKEND_BASURL;
    try {
        const response = await axios.get(`${backendurl}/kranium-token`)
        console.log("res", response)

        if(response.data.token){
            console.log("res", response.data.token)
            const token = response.data.token;
            console.log("token", token)
            localStorage.setItem("kranium_token", token);
            return token;
        }else{
            throw new Error("Token not found");
        }
    } catch (error) {
        console.error("Login failed", error);
        return null;
    }
}

export default Kraniumgate;