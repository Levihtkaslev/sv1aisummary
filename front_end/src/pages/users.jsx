import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { BiSolidHome } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";

const User = () => {

    const [userlist, setuserlist] = useState([]);
    const [locationlist, setlocationlist] = useState([]);
    const [rolelist, setrolelist] = useState([]);
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [userrole, setuserrole] = useState("")
    const [userid, setuserid] = useState("")
    const [location, setlocation] = useState("")
    const [status, setstatus] = useState("");
    const [edituser, setedituser] = useState(false)
    const [userinfo, setuserinfo] = useState([])
    const [search, setsearch] = useState("")
    const [showdialogdel, setshowdialogdel] = useState(false);
    const [showdialogadd, setshowdialogadd] = useState(false);
    const navigate = useNavigate();
    const backendurl = import.meta.env.VITE_BACKEND_BASURL;

    useEffect(() => {
        fetchuser();
        fetchlocation();
        fetchrole();
    },[search])


    const fetchuser = async () => {
        try {
          const response = await axios.get(`${backendurl}/user`);
          console.log("Users Response:", response.data);
    
          if (response.data && response.data.data) {
            const responses = response.data.data
            console.log("res", response)

            const filter = responses.filter(res => {
                const searchuser = search === "" || res.username.toLowerCase().includes(search.toLowerCase()) || res.userid.toLowerCase().includes(search.toLowerCase());
                return(searchuser)
            })
            setuserlist(filter.reverse());

          } else {
            console.log("No location data found");
          }
        } catch (error) {
            toast.error(error)
          console.error("Error while fetching locations:", error);
        }
      };

    const fetchlocation = async () => {
        try {
          const response = await axios.get(`${backendurl}/location`);
          console.log("Location Response:", response.data);
    
          if (response.data && response.data.data) {
            setlocationlist(response.data.data);

          } else {
            console.log("No location data found");
          }
        } catch (error) {
          console.error("Error while fetching locations:", error);
        }
      };

      const fetchrole = async () => {
        try {
          const response = await axios.get(`${backendurl}/role`);
          console.log("Role Response:", response.data);
    
          if (response.data && response.data.data) {
            setrolelist(response.data.data);

          } else {
            console.log("No role data found");
          }
        } catch (error) {
          console.error("Error while fetching role:", error);
        }
      };

    const createuser = async () => {
        if(!username && !status && !password && !userrole && !userid && !location){
            toast.error("Mandotory Field missing")
            return
        }

        try {
            await axios.post(`${backendurl}/user`, {
                username, status, password, userrole, userid, location
            });
            clear()
            fetchuser();
            fetchlocation();
            fetchrole();
            toast.success("User Created Successfully")
        } catch (error) {
            
            console.log("Error creating location", error)
        }
    }


     const deleteuser = async() => {
        try {
            await axios.delete(`${backendurl}/user/${userinfo._id}`)
            fetchuser();
            fetchlocation();
            fetchrole();
            clear()
            toast.success("User Deleted Successfully")
        } catch (error) {
            toast.error("Error Deleting User")
            console.log("Error while deleting data", error)
        }
    }  

    const updateuser = async () => {
        try {
            await axios.put(`${backendurl}/user/${userinfo._id}`, {
                username, status, password, userrole, userid, location
            });
            clear()
            fetchuser();
            fetchlocation();
            fetchrole();
            seteditloc(false)
            toast.success("User Updated Successfully")
        } catch (error) {
            toast.error("Error update User")
            console.log("Error creating location", error)
        }
    }



    const update = (e) => {
        setedituser(true)
        setusername(e.username);
        setpassword(e.password);
        setuserrole(e.userrole?._id);
        setuserid(e.userid)
        setlocation(e.location?._id)
        setstatus(e.status)
        setuserinfo(e)
        setshowdialogadd(true)
    }

    const clear = () => {
        setedituser(false)
        setusername("");
        setpassword("");
        setuserrole("");
        setuserid("")
        setlocation("")
        setstatus("")
        setsearch("")
        setshowdialogdel(false)
        setshowdialogadd(false)
    }

    const showconfirmdel = (e) => {
        setuserinfo(e)
        setshowdialogdel(true)
    }

    const showconfirmadd = ()=> {
        setshowdialogadd(true)
       
    }

    return (
        <div className='first'>
            

             <div className='heading1'>
                <p className='headtitle'>User</p>
                <div className='bread'>
                    <>
                    <><BiSolidHome /></>
                    <p className='breadunder' onClick={() => navigate("/")}>Dashboard</p>
                    </>
                    <>/ </>
                    <>
                    <div className='text-gray-500'>user</div>
                    </>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div className='searchouter'> 
                    <input className='searchinner' value={search} onChange={(e) => setsearch(e.target.value)} placeholder='Search user' />
                    <CiSearch />
                </div>
                <div className='p-3 bg-teal-400 rounded-lg text-base text-white hover:bg-teal-500 transition-all duration-200'>
                    <button className='flex items-center gap-2 outline-none' onClick={() => showconfirmadd()}>Add User <BiSolidMessageSquareAdd className='text-white text-xl'/></button>
                </div>
            </div>
        
            
            {
                <div className='table1'>
                <table className = "table2">
                    <thead className='thead'>
                        <tr className='py-14'>
                            <th className='thd'>S.no</th>
                            <th className='thd'>User Name</th>
                            <th className='thd'>User Id</th>
                            <th className='thd'>Password</th>
                            <th className='thd'>Role</th>
                            <th className='thd'>Location</th>
                            <th className='thd'>Status</th>
                            <th className='thd'>Update</th>
                            <th className='thd'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userlist.map((loc, index) => (
                                <tr key={index} className={`py-14 h-12  ${index % 2 === 0 ? 'bg-white': 'bg-gray-100'} hover:bg-gray-200 transition-all duration-300`}>
                                    <td className='tbd'>{index+1}</td>
                                    <td className='tbd'>{loc.username}</td>
                                    <td className='tbd'>{loc.userid}</td>
                                    <td className='tbd'>{loc.password}</td>
                                    <td className='tbd'>{loc.userrole?.rolename || "No Role"}</td>
                                    <td className='tbd'>{loc.location?.locationname || "No Location"}</td>
                                    <td className={`${loc.status === "active"? "text-teal-500" : "text-red-500" } text-center text-base`}>{loc.status}</td>
                                    <td className='tbd'>{
                                        <button onClick={() => update(loc)} ><FaUserEdit className='update' /></button>
                                        }</td>
                                    <td className='tbd'>{
                                        <button  onClick={() => showconfirmdel(loc)}  ><MdDeleteForever className='delete'/></button>
                                        }</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>
                
            }

            <Dialog open={showdialogdel} onClose={() => clear()} >
                <div className="digone" aria-hidden="true" />
                <div className="digtwo">
                    <Dialog.Panel className="digthree">
                    <Dialog.Title className=" digtitle">
                        <BsFillTrash3Fill  className='text-6xl text-amber-600'/>
                        <p className='text-3xl '>Are Sure  to Delete Location?</p>
                    </Dialog.Title>
                    <div className='pb-8  flex justify-evenly'>
                        <div className='digno'>
                            <button className='diginnerbut' onClick={() => clear()} >
                            No<FaThumbsDown className='text-xl'/>
                        </button></div>

                        <div className='digyes'>
                            <button className='diginnerbut' onClick={() => deleteuser()} >
                            Yes<FaThumbsUp  className='text-xl'/>
                        </button></div>
                    </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
                        
                        
            <Dialog open={showdialogadd} onClose={() => {}} >
                <div className="digone" aria-hidden="true" />
                <div className="digtwo">
                    <Dialog.Panel onClick={(e) => e.stopPropagation()} className="digthree">
                    <Dialog.Title className=" digtitle">
                        <FaQuestionCircle   className='text-6xl text-amber-600'/>
                        <p className='text-3xl '>Are Sure  to Modify User?</p>
                        
                    </Dialog.Title>

                    <Dialog.Description className="py-6 px-12 text-gray-600 flex justify-center gap-6 flex-col">

                        <div className='flex  justify-between gap-6 items-center '>
                            <p className='w-1/2 text-xl'>User Name</p>
                            <input className='digiinput'  value={username} onChange={(e) => setusername(e.target.value)} placeholder='User Name' />
                        </div>
                        <div className='flex  justify-between gap-6 items-center '>
                            <p className='w-1/2 text-xl'>Password</p>
                            <input className='digiinput' value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' />
                        </div>
                        <div className='flex  justify-between gap-6 items-center '>
                            <p className='w-1/2 text-xl'>User Id</p>
                            <input className='digiinput' disabled={edituser}  value={userid} onChange={(e) => setuserid(e.target.value)} placeholder='User id' />
                        </div>

                        <div className='flex justify-between  gap-6 items-center '>
                            <p className='w-1/2 text-xl'>Select Location</p>
                            <select className='outline-none' value={location} onChange={(e) => setlocation(e.target.value)}>
                                <option value="">Location</option>
                                {
                                    locationlist.map((e, index)=> (
                                        <option key={index} value={e._id}>{e.locationname}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='flex justify-between  gap-6 items-center '>
                            <p className='w-1/2 text-xl'>Select Role</p>
                            <select className='outline-none' value={userrole} onChange={(e) => setuserrole(e.target.value)}>
                                <option value="">Role</option>
                                {
                                    rolelist.map((e, index)=> (
                                        <option key={index} value={e._id}>{e.rolename}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='flex justify-between  gap-6 items-center '>
                            <p className='w-1/2 text-xl'>Select Status</p>
                            <select className='outline-none' value={status} onChange={(e) => setstatus(e.target.value)}>
                                <option value="">Choose Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </Dialog.Description>

                    
                    <div className='py-8  flex justify-evenly'>
                        <div className='digno'>
                            <button className='diginnerbut'  onClick={() => clear()} >
                            No<FaThumbsDown className='text-xl'/>
                        </button></div>

                        <div className='digyes'>
                            <button className='diginnerbut'  onClick={edituser ? updateuser :createuser } >
                                { edituser? "Update" : "Create"}<FaThumbsUp  className='text-xl'/>
                            </button>
                        </div>
                    </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
                        
            
        </div>
    );
}

export default User;