import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { BiSolidHome } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Dialog } from "@headlessui/react";
import { FaQuestionCircle } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { toast } from "react-toastify";

const Location = () => {

    const [location, setlocation] = useState([]);
    const [locationname, setlocationname] = useState("")
    const [status, setstatus] = useState("");
    const [editloc, seteditloc] = useState(false)
    const [locinfo, setlocinfo] = useState([])
    const [search, setsearch] = useState("")
    const [showdialogdel, setshowdialogdel] = useState(false);
    const [showdialogadd, setshowdialogadd] = useState(false);
    const backendurl = import.meta.env.VITE_BACKEND_BASURL;

    useEffect(() => {
        fetchlocation()
    },[search])

    const fetchlocation = async () => {
        try {
          const response = await axios.get(`${backendurl}/location`);
          console.log("Response:", response.data);
    
          if (response.data && response.data.data) {
            const data = response.data.data;
            const filter = data.filter(loc => {
                const searching = search === "" ||  loc.locationname.toLowerCase().includes(search.toLowerCase())
                return(searching)
            })
            setlocation(filter.reverse());

          } else {
            console.log("No location data found");
          }
        } catch (error) {
          console.error("Error while fetching locations:", error);
        }
      };

    const createlocation = async () => {
        try {
            await axios.post(`${backendurl}/location`, {
                locationname, status
            });
            clear()
            fetchlocation()
            toast.success("Location Created Successflly")
            
        } catch (error) {
             toast.error("Error create Location")
            console.log("Error creating location", error)
        }
    }


     const deletelocation = async() => {
        try {
            await axios.delete(`${backendurl}/location/${locinfo._id}`)
            fetchlocation();
            clear()
            toast.success("Location Deleted Successflly")
        } catch (error) {
             toast.error("Error Delete Location")
            console.log("Error while deleting data", error)
        }
    }  

    const updatelocation = async () => {
        try {
            await axios.put(`${backendurl}/location/${locinfo._id}`, {
                locationname, status
            });
            clear()
            fetchlocation()
            seteditloc(false)
            toast.success("Location Updated Successflly")
        } catch (error) {
             toast.error("Error Updating Location")
            console.log("Error creating location", error)
        }
    }



    const update = (e) => {
        setshowdialogadd(true)
        seteditloc(true)
        setlocationname(e.locationname);
        setstatus(e.status)
        setlocinfo(e)
        seteditloc(false)
    }

    const clear = () => {
        setlocationname("")
        setstatus("")
        setsearch("")
        setshowdialogdel(false)
        setshowdialogadd(false)
    }

    const showconfirmdel = (e) => {
        setlocinfo(e)
        setshowdialogdel(true)
    }

    const showconfirmadd = (e)=> {
        setlocinfo(e)
        setshowdialogadd(true)
        setlocationname(e.locationname);
        setstatus(e.status)
    }

    

    return (
        <div className='first'>
            <div className='heading1'>
                <p className=' headtitle'>Location</p>
                <div className='bread'>
                    <>
                    <><BiSolidHome /></>
                    <p className='breadunder' onClick={() => navigate("/")}>Dashboard</p>
                    </>
                    <>/ </>
                    <>
                    <div className='text-gray-500'>Location</div>
                    </>
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <div className='searchouter'> 
                    <input className='searchinner ' value={search} onChange={(e) => setsearch(e.target.value)} placeholder='Search Location' />
                    <CiSearch />
                 </div>
                 <div className='p-3 bg-teal-400 rounded-lg text-base text-white hover:bg-teal-500 transition-all duration-200'>
                    <button className='flex items-center gap-2 outline-none' onClick={() => showconfirmadd()}>Add Location <BiSolidMessageSquareAdd className='text-white text-xl'/></button>
                 </div>
            </div>





            
            
            {
                <div className='table1'>
                <table className='table2'>
                    <thead className='thead'>
                        <tr className='py-14'>
                            <th className='thd' >S.no</th>
                            <th className='thd' >Location Name</th>
                            <th className='thd' >Status</th>
                            <th className='thd' >Update</th>
                            <th className='thd' >Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            location.map((loc, index) => (
                                <tr key={index} className={`py-14 h-12  ${index % 2 === 0 ? 'bg-white': 'bg-gray-100'} hover:bg-gray-200 transition-all duration-300`}>
                                    <td className='tbd'>{index+1}</td>
                                    <td className='tbd'>{loc.locationname}</td>
                                    <td className={`${loc.status === "active"? "text-teal-500" : "text-red-500" } text-center text-base`}>{loc.status}</td>
                                    <td className='tbd'>{
                                        <button onClick={() => update(loc)}><FaUserEdit className='update' /></button>
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


            <Dialog open={showdialogdel} onClose={() => clear()} className="">
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
                            <button className='diginnerbut' onClick={() => deletelocation()} >
                            Yes<FaThumbsUp  className='text-xl'/>
                        </button></div>
                    </div>
                    </Dialog.Panel>
                </div>
            </Dialog>


            <Dialog open={showdialogadd} onClose={() => clear()} className="">
                <div className="digone" aria-hidden="true" />
                <div className="digtwo">
                    <Dialog.Panel className="digthree">
                    <Dialog.Title className=" digtitle">
                        <FaQuestionCircle   className='text-6xl text-amber-600'/>
                        <p className='text-3xl '>Are Sure  to Modify Location?</p>
                        
                    </Dialog.Title>

                    <Dialog.Description className="py-6  text-gray-600 flex justify-center gap-6">
                        <div className='flex  justify-center gap-6 items-center '>
                            <p className='text-xl'>Location Name</p>
                            <input className='digiinput' value={locationname} onChange={(e) => setlocationname(e.target.value)} placeholder='Location Name' />
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
                            <button className='diginnerbut'  onClick={editloc ? updatelocation :createlocation } >
                                { editloc? "Update" : "Create"}<FaThumbsUp  className='text-xl'/>
                            </button>
                        </div>
                    </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
            
        </div>
    );
}

export default Location;