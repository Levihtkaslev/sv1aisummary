import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";
import React, { useState } from "react";
import { BiSolidLocationPlus } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserGear } from "react-icons/fa6";
import { FaRectangleList } from "react-icons/fa6";
import { PiListStarFill } from "react-icons/pi";
import { IoLogOut } from "react-icons/io5";
import { Dialog } from "@headlessui/react";
import { FaQuestionCircle } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";
import { BsFillTrash3Fill } from "react-icons/bs";
import logo from "/src/assets/sparkai2.png"


const Layout = ({ children }) => {

    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("/");
    const userid = localStorage.getItem("userid")
    const [showdialog, setshowdialog] = useState(false);

    const userrole = localStorage.getItem("userrole")
    const logout = () => {
        localStorage.removeItem("token");
        setshowdialog(false)
        navigate("/login");
      };

    const showconfirm = () => {
      setshowdialog(true)
    }

  return (
    <div className="flex h-screen">
      <div className="w-72 rounded-r-lg shadow-xl  bg-gray-800 text-white p-4 flex flex-col justify-between">
        <div>
        <p className="flex w-full text-2xl justify-start items-center font-bold my-6 mx-2">
          <img src={logo}   alt="Logo" className="h-10 w-10"/>PFRC<span className="text-gray-800">_</span><span >Summary</span>
        </p>
        <nav className="flex flex-col space-y-1">

            {
                userrole === "Admin" && (
                    <>
                       
                       <div
                          onClick={() => setActiveMenu("/")}
                          className={`rounded-lg  px-3 flex gap-3 justify-start items-center text-base transition-all duration-200 ${
                            activeMenu === "/" ? "bg-pink-600 text-white" : "hover:bg-pink-600 text-white"
                          }`}
                        >
                          <MdSpaceDashboard className="text-xl" />
                          <Link to="/" className="w-full p-3 " style={{ textDecoration: "none", color: "inherit" }}>
                            Dashboard
                          </Link>
                        </div>


                        <div
                          onClick={() => setActiveMenu("/createdraft")}
                          className={`rounded-lg px-3 flex gap-3 justify-start items-center text-base transition-all duration-200 ${
                            activeMenu === "/createdraft" ? "bg-pink-600 text-white" : "hover:bg-pink-600 text-white"
                          }`}
                        >
                          <RiDraftFill  className="text-xl" />
                          <Link to="/createdraft" className="w-full  p-3" style={{ textDecoration: "none", color: "inherit" }}>
                            Create Draft
                          </Link>
                        </div>


                        <div
                          onClick={() => setActiveMenu("/location")}
                          className={`rounded-lg px-3  flex gap-3 justify-start items-center text-base transition-all duration-200 ${
                            activeMenu === "/location" ? "bg-pink-600 text-white" : "hover:bg-pink-600 text-white"
                          }`}
                        >
                          <BiSolidLocationPlus  className="text-xl" />
                          <Link to="/location" className="w-full  p-3" style={{ textDecoration: "none", color: "inherit" }}>
                            Location
                          </Link>
                        </div>

                        <div
                          onClick={() => setActiveMenu("/user-role")}
                          className={`rounded-lg px-3 w-full flex gap-3 justify-start items-center text-base transition-all duration-200 ${
                            activeMenu === "/user-role" ? "bg-pink-600 text-white" : "hover:bg-pink-600 text-white"
                          }`}
                        >
                          <MdAdminPanelSettings  className="text-xl" />
                          <Link to="/user-role" className="w-full  p-3" style={{ textDecoration: "none", color: "inherit" }}>
                            Admin Role
                          </Link>
                        </div>

                        <div
                          onClick={() => setActiveMenu("/users")}
                          className={`rounded-lg px-3  flex gap-3 justify-start items-center text-base transition-all duration-200 ${
                            activeMenu === "/users" ? "bg-pink-600 text-white" : "hover:bg-pink-600 text-white"
                          }`}
                        >
                          <FaUserGear  className="text-xl" />
                          <Link to="/users" className="w-full  p-3" style={{ textDecoration: "none", color: "inherit" }}>
                            Users
                          </Link>
                        </div>

                        <div
                          onClick={() => setActiveMenu("/draft")}
                          className={`rounded-lg px-3  flex gap-3 justify-start items-center text-base transition-all duration-200 ${
                            activeMenu === "/draft" ? "bg-pink-600 text-white" : "hover:bg-pink-600 text-white"
                          }`}
                        >
                          <FaRectangleList  className="text-xl" />
                          <Link to="/draft"className="w-full  p-3"  style={{ textDecoration: "none", color: "inherit" }}>
                            Draft
                          </Link>
                        </div>

                        <div
                          onClick={() => setActiveMenu("/summary")}
                          className={`rounded-lg px-3  flex gap-3 justify-start items-center text-base transition-all duration-200 ${
                            activeMenu === "/summary" ? "bg-pink-600 text-white" : "hover:bg-pink-600 text-white"
                          }`}
                        >
                          <PiListStarFill  className="text-xl" />
                          <Link to="/summary"className="w-full  p-3"  style={{ textDecoration: "none", color: "inherit" }}>
                          Summary
                          </Link>
                        </div>
                    </>
                )
            }

            {
                userrole === "Doctor" && (
                    <>
                        <div
                          onClick={() => setActiveMenu("/")}
                          className={`rounded-lg px-3  flex gap-3 justify-start items-center text-base transition-all duration-200 ${
                            activeMenu === "/" ? "bg-pink-600 text-white" : "hover:bg-pink-600 text-white"
                          }`}
                        >
                          <MdSpaceDashboard className="text-base" />
                          <Link to="/"className="w-full  p-3"  style={{ textDecoration: "none", color: "inherit" }}>
                            Dashboard
                          </Link>
                        </div>


                        <div
                          onClick={() => setActiveMenu("/summary")}
                          className={`rounded-lg px-3  flex gap-3 justify-start items-center text-base transition-all duration-200 ${
                            activeMenu === "/summary" ? "bg-pink-600 text-white" : "hover:bg-pink-600 text-white"
                          }`}
                        >
                          <PiListStarFill  className="text-base" />
                          <Link to="/summary"className="w-full  p-3"  style={{ textDecoration: "none", color: "inherit" }}>
                          Summary
                          </Link>
                        </div>
                    </>
                )
            }

            {
                userrole === "Staff" && (
                    <>
                        <div
                          onClick={() => setActiveMenu("/")}
                          className={`rounded-lg px-3  flex gap-3 justify-start items-center text-base transition-all duration-200 ${
                            activeMenu === "/" ? "bg-pink-600 text-white" : "hover:bg-pink-600 text-white"
                          }`}
                        >
                          <MdSpaceDashboard className="text-base" />
                          <Link to="/"className="w-full  p-3"  style={{ textDecoration: "none", color: "inherit" }}>
                            Dashboard
                          </Link>
                        </div>

                        
                        <div
                          onClick={() => setActiveMenu("/createdraft")}
                          className={`rounded-lg px-3  flex gap-3 justify-start items-center text-base transition-all duration-200 ${
                            activeMenu === "/createdraft" ? "bg-pink-600 text-white" : "hover:bg-pink-600 text-white"
                          }`}
                        >
                          <RiDraftFill  className="text-base" />
                          <Link to="/createdraft"className="w-full  p-3"  style={{ textDecoration: "none", color: "inherit" }}>
                            Create Draft
                          </Link>
                        </div>

                        <div
                          onClick={() => setActiveMenu("/users")}
                          className={`rounded-lg px-3  flex gap-3 justify-start items-center text-base transition-all duration-200 ${
                            activeMenu === "/users" ? "bg-pink-600 text-white" : "hover:bg-pink-600 text-white"
                          }`}
                        >
                          <FaUserGear  className="text-xl" />
                          <Link to="/users"className="w-full  p-3"  style={{ textDecoration: "none", color: "inherit" }}>
                            Users
                          </Link>
                        </div>
                        

                        <div
                          onClick={() => setActiveMenu("/draft")}
                          className={`rounded-lg px-3  flex gap-3 justify-start items-center text-base transition-all duration-200 ${
                            activeMenu === "/draft" ? "bg-pink-600 text-white" : "hover:bg-pink-600 text-white"
                          }`}
                        >
                          <FaRectangleList  className="text-xl" />
                          <Link to="/draft"className="w-full  p-3"  style={{ textDecoration: "none", color: "inherit" }}>
                            Draft
                          </Link>
                        </div>


                        <div
                          onClick={() => setActiveMenu("/summary")}
                          className={`rounded-lg px-3  flex gap-3 justify-start items-center text-base transition-all duration-200 ${
                            activeMenu === "/summary" ? "bg-pink-600 text-white" : "hover:bg-pink-600 text-white"
                          }`}
                        >
                          <PiListStarFill  className="text-base" />
                          <Link to="/summary"className="w-full  p-3"  style={{ textDecoration: "none", color: "inherit" }}>
                          Summary
                          </Link>
                        </div>
                    </>
                )
            }
          
          
        </nav>
        </div>
        <div className="flex flex-col items-center space-y-2">
          
          <p>{userrole}</p>
          <p>{userid}</p>
          <div className=" bg-red-700 hover:bg-orange-700 transition-all duration-200 tex-base justify-center  rounded flex items-center gap-3 w-full"><button className="py-2 items-center justify-center w-full flex gap-2 " onClick={() => showconfirm()} >Logout<IoLogOut className="text-xl"/></button></div>
        </div>
        
      </div>

      
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>
      </div>




      <Dialog open={showdialog} onClose={() => setshowdialog(false)} className="">
          <div className="digone" aria-hidden="true" />
          <div className="digtwo">
              <Dialog.Panel className="digthree">
              <Dialog.Title className=" digtitle">
                  <FaQuestionCircle  className='text-6xl text-amber-600'/>
                  <p className='text-3xl '>Are Sure  to Log out?</p>
              </Dialog.Title>
              <div className='pb-8  flex justify-evenly'>
                  <div className='digno'>
                      <button className='diginnerbut' onClick={() => setshowdialog(false)} >
                      No<FaThumbsDown className='text-xl'/>
                  </button></div>

                  <div className='digyes'>
                      <button className='diginnerbut' onClick={() => logout()} >
                      Sure!<FaThumbsUp  className='text-xl'/>
                  </button></div>
              </div>
              </Dialog.Panel>
          </div>
      </Dialog>
    </div>
  );
};

export default Layout;
