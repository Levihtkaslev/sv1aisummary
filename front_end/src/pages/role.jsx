import { useEffect, useState } from 'react'
import axios from 'axios'
import { CiSearch } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BiSolidHome } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { FaQuestionCircle } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { PiGreaterThan } from "react-icons/pi";
import { toast } from "react-toastify";

const Role = () => {

    const [role, setrole] = useState([]);
    const [rolename, setrolename] = useState("")
    const [status, setstatus] = useState("");
    const [editrole, seteditrole] = useState(false)
    const [roleinfo, setroleinfo] = useState([])
    const [search, setsearch] = useState("")
    const [showdialogdel, setshowdialogdel] = useState(false);
    const [showdialogadd, setshowdialogadd] = useState(false);
    const navigate = useNavigate();
    const backendurl = import.meta.env.VITE_BACKEND_BASURL;

    useEffect(() => {
        fetchrole();
    },[search])

    const fetchrole = async () => {
        try {
          const response = await axios.get(`${backendurl}/role`);
          console.log("Response:", response.data);
    
          if (response.data && response.data.data) {
            const data = response.data.data;

            const filter = data.filter(loc => {
                const searchrole = search === "" || loc.rolename.includes(search.toLowerCase())
                return (searchrole)
              }); 
              
              
            setrole(filter.reverse());

          } else {
            console.log("No role data found");
          }
        } catch (error) {
          console.error("Error while fetching role:", error);
        }
      };

    const createrole = async () => {
        try {
            await axios.post(`${backendurl}/role`, {
                rolename, status
            });
            clear()
            await fetchrole()
            toast.success("Role Created Successfully")
        } catch (error) {
             toast.error("Error create Role")
            console.log("Error creating role", error)
        }
    }


     const deleterole = async() => {
        try {
            await axios.delete(`${backendurl}/role/${roleinfo._id}`)
            fetchrole();
            clear()
            toast.success("Role Deleted Successfully")
        } catch (error) {
             toast.error("Error delete Role")
            console.log("Error while deleting data", error)
        }
    }  

    const updaterole = async () => {
        try {
            await axios.put(`${backendurl}/role/${roleinfo._id}`, {
                rolename, status
            });
            clear()
            fetchrole()
            seteditrole(false)
            toast.success("Role Updated Successfully")
        } catch (error) {
             toast.error("Error update role")
            console.log("Error creating role", error)
        }
    }



    const update = (e) => {
        setshowdialogadd(true)
        seteditrole(true)
        setrolename(e.rolename);
        setstatus(e.status)
        setroleinfo(e)
    }

    const clear = () => {
        setrolename("")
        setstatus("")
        setsearch("")
        setshowdialogdel(false)
        setshowdialogadd(false)
        seteditrole(false)
    }

    const showconfirmdel = (e) => {
        setroleinfo(e)
        setshowdialogdel(true)
    }

    const showconfirmadd = ()=> {
        setshowdialogadd(true)
    }

    return (
        <div className='first'>

            <div className='heading1'>
                <p className=' headtitle'>User Role</p>
                <div className='bread'>
                    <>
                    <><BiSolidHome /></>
                    <p className='breadunder' onClick={() => navigate("/")}>Dashboard</p>
                    </>
                    <>/</>
                    <>
                    <div className='text-gray-500'>Role</div>
                    </>
                </div>
            </div>


            
        <div className='flex items-center justify-between'>
           <div className='searchouter'> 
                <input className='searchinner' value={search} onChange={(e) => setsearch(e.target.value)} placeholder='Search Role' />
                <CiSearch />
            </div>
            <div className='p-3 bg-teal-400 rounded-lg text-base text-white hover:bg-teal-500 transition-all duration-200'>
                <button className='flex items-center gap-2 outline-none' onClick={() => showconfirmadd()}>Add Role <BiSolidMessageSquareAdd className='text-white text-xl'/></button>
            </div>
        </div> 
            
 
            
            {
            <div className='table1'>
                <table className='table2'>
                    <thead className='thead'>
                        <tr className='py-14'>
                            <th className='thd'> S.no</th>
                            <th className='thd'>Role Name</th>
                            <th className='thd'>Status</th>
                            <th className='thd'>Update</th>
                            <th className='thd'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            role.map((loc, index) => (
                                <tr key={index} className={`py-14 h-12  ${index % 2 === 0 ? 'bg-white': 'bg-gray-100'} hover:bg-gray-200 transition-all duration-300`}>
                                    <td className='tbd'>{index+1}</td>
                                    <td className='tbd'>{loc.rolename}</td>
                                    <td className={`${loc.status === "active"? "text-teal-500" : "text-red-500" } text-center text-base`}>{loc.status}</td>
                                    <td className=' tbd'>{
                                        <button disabled={true}  onClick={() => update(loc)}><FaUserEdit className='update' /></button>
                                        }</td>
                                    <td className='tbd'>{
                                        <button disabled={true}   onClick={() => showconfirmdel(loc)}  ><MdDeleteForever className='delete'/></button>
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
                            <button className='diginnerbut' onClick={() => deleterole()} >
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
                                    <p className='text-3xl '>Are Sure  to Modify Role?</p>
                                    
                                </Dialog.Title>
            
                                <Dialog.Description className="py-6  text-gray-600 flex justify-center gap-6">
                                    <div className='flex  justify-center gap-6 items-center '>
                                        <p className='text-xl'>Role Name</p>
                                        <input className='digiinput'  value={rolename} onChange={(e) => setrolename(e.target.value)} placeholder='Role Name' />
                                    </div>
                                    <div className='flex justify-center gap-6 items-center '>
                                        <p className='text-xl'>Select Status</p>
                                        <select value={status} onChange={(e) => setstatus(e.target.value)}>
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
                                        <button className='diginnerbut'  onClick={editrole ? updaterole :createrole } >
                                            { editrole? "Update" : "Create"}<FaThumbsUp  className='text-xl'/>
                                        </button>
                                    </div>
                                </div>
                                </Dialog.Panel>
                            </div>
                        </Dialog>
            
        </div>
    );
}

export default Role;