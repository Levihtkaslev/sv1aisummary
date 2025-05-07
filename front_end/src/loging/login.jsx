import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import { BsFillSendFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";


const Login = () => {
  const [userid, setuserid] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [showpass, setshowpass] = useState(false)
  const backendurl = import.meta.env.VITE_BACKEND_BASURL;

  const handlelogin = async () => {
    try {
      console.log("Sending:", { userid, password });
  
      const res = await axios.post(`${backendurl}/login`, {
        userid : userid.trim(),
        password : password.trim()
      });
  
      console.log("Login success:", res.data.token);
      const encodedtoken = res.data.token;

      const decodedtoken = jwtDecode(encodedtoken);
  
      localStorage.setItem("token", encodedtoken);
      localStorage.setItem("userid", decodedtoken.userid);
      localStorage.setItem("userrole", decodedtoken.userrole);
      navigate("/"); 
  
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.error || "Login failed")
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
  <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">

    <div className="md:w-1/2 w-full flex items-center justify-center p-6">
      <img
        src="src/assets/log-removebg-preview.png"
        alt="Logo"
        className="object-contain w-full max-h-64 md:max-h-full"
      />
    </div>

    <div className="md:w-1/2 w-full p-8 flex flex-col justify-center gap-6 bg-white">
      
      <div className="flex flex-col gap-2">
        <label className="text-lg ">User ID</label>
        <input
          className="py-2 px-4 border border-gray-300 rounded-lg shadow-inner focus:outline-none  hover:border hover:border-gray-500 transition-all duration-200"
          placeholder="Enter your user ID"
          onChange={e => setuserid(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg ">Password</label>
        <div className="flex items-center px-4 border border-gray-300 rounded-lg shadow-inner hover:border hover:border-gray-500 transition-all duration-200">
          <input
            className="py-2 w-full focus:outline-none  "
            placeholder="Password"
            type={showpass ? "text" : "password"}
            onChange={e => setpassword(e.target.value)}
          />
          <button onClick={() => setshowpass(pre => !pre)}>
            {showpass ? <FaEye className="text-xl text-gray-600 outline-none" /> : <IoMdEyeOff className="text-xl text-gray-600 outline-none" />}
          </button>
        </div>
      </div>

      {/* Login Button */}
      <div className="mt-4  bg-black text-white rounded-lg hover:bg-white hover:text-black  shadow-lg  transition-all flex items-center justify-center gap-2 text-lg"><button onClick={handlelogin}
        className="py-2 w-full flex gap-2 items-center justify-center outline-none">
        Login <BsFillSendFill />
      </button></div>
    </div>
  </div>
</div>


  );
};

export default Login;
