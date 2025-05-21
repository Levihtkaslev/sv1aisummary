import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdEditDocument } from "react-icons/md";
import { RiSaveFill } from "react-icons/ri";
import { MdBookmarkAdded } from "react-icons/md";
import { Dialog } from "@headlessui/react";
import { FaQuestionCircle } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { MdEditOff } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { MdChangeCircle } from "react-icons/md";
/* import ProgressBar from "react-scroll-progress-bar"; */


import axios from "axios";

const EditSummary = () => {
  const { state: encounterData } = useLocation();
  const [summary, setSummary] = useState(encounterData?.summary || "");
  const uhid = encounterData.uhid;
  const editableRef = useRef(null);
  const navigate = useNavigate();
  const [showboxsave, setshowboxsave] = useState(false)
  const [showboxfinish, setshowboxfinish] = useState(false)
  const [status, setstatus] = useState("")
  const userrole = localStorage.getItem("userrole")
  const [isEditable, setIsEditable] = useState(encounterData?.status === "pending" || userrole === "Admin" );
  const backendurl = import.meta.env.VITE_BACKEND_BASURL;
  const [html, sethtml] = useState("")


  const handleSave = async () => {
    const updatedSummary = editableRef.current.innerHTML;
    const offset = 5.5 * 60 * 60 * 1000; 
    const indianDate = new Date(Date.now() + offset);
    const userid = localStorage.getItem("userid")
  

    const res = await fetch(`${backendurl}/summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uhid: encounterData.uhid,
        patient_name : encounterData.patient_name,
        encounter : encounterData.encounter,
        summary:updatedSummary,
        doneby:userid,
        doctor:encounterData.doctor,
        lastmodified:indianDate,
        status : "pending"
      }),
    });

    sethtml(updatedSummary)
    console.log("summ",html)

    const result = await res.json();
    console.log("Updated:", result);
    toast.success("Summary Updated Sccessfully")
    setshowboxsave(false)
  };  


  const handlefinish = async () => {
    const updatedSummary = editableRef.current.innerHTML;
    const offset = 5.5 * 60 * 60 * 1000; 
    const indianDate = new Date(Date.now() + offset);
    const userid = localStorage.getItem("userid")

    const res = await fetch(`${backendurl}/summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uhid: encounterData.uhid,
        patient_name : encounterData.patient_name,
        encounter : encounterData.encounter,
        summary:updatedSummary,
        doneby:userid,
        doctor:encounterData.doctor,
        lastmodified:indianDate,
        status : "complete"
      }),
    });
    navigate("/")
    deletedraft(uhid)
    const result = await res.json();
    console.log("Updated:", result);
    toast.success("Summary Finished Successfully")
    setshowboxfinish(false)
  };  

    const deletedraft = async (uhid) => {
      try {
        const res = await axios.delete(`${backendurl}/draft/${uhid}`);
        console.log("Deleted:", res.data);
        
      } catch (err) {
        console.error("Delete error:", err);
      }
    };

  const confirmsave = () => {
    setshowboxsave(true)
  }

  const confirmfinish = () => {
    setshowboxfinish(true)
  }


  useEffect(() => {
    if (editableRef.current && summary) {
      editableRef.current.innerHTML = summary;
    }
  }, [isEditable]);

  const copysummary = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(editableRef.current.innerHTML)
        .then(() => {
          toast.success("Summary copied!");
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          toast.error("Copy failed");
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = html;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
  
      try {
        document.execCommand('copy');
        toast.success("Summary copied!");
      } catch (err) {
        console.error('Fallback: Copy failed', err);
        toast.error("Copy failed");
      }
  
      document.body.removeChild(textArea);
    }
  }
  

  return (
    <div className="m-6">
     
      <div className="innerpagehead">
        <p className="innerpagetext">Edit Summary <MdEditDocument /></p>
        <div className="flex gap-12 px-7">
        <div className="copybutton bg-black"> <button    className="flex items-center gap-2 " onClick={copysummary} >Copy <RiSaveFill /></button></div>
          {
            userrole === "Admin" && 
            <div className="savebutton"><button  className="flex items-center gap-2 " onClick={() => handleSave()} >Change Status <MdChangeCircle  /></button></div>
          }
          
          <div className="savebutton"> <button  disabled={!isEditable}  className="flex items-center gap-2 " onClick={() => confirmsave()} >Save <RiSaveFill /></button></div>
          <div className="finishbutton"> <button className="flex items-center gap-2"  onClick={() => confirmfinish()} >Finish <MdBookmarkAdded /></button></div>
        </div>
      </div>

      {!isEditable && (
        <p className="text-red-500 px-12 pt-4 italic text-sm">
          This summary has been finalized and now read-only.
        </p>
      )}

      <div
          className="mt-10 text-lg table border outline-none border-gray-300 rounded p-10 hover:border-blue-400 transition-all duration-200 bg-white min-h-[200px]  summary " 
          ref={editableRef}
          contentEditable={isEditable}
          style={{  pointerEvents: isEditable ? "auto" : "none", backgroundColor: isEditable ? "white" : "#f3f4f6", fontFamily: "Poppins, sans-serif",   lineHeight : 2,}}
        />


     <Dialog open={showboxsave} onClose={() => setshowboxsave(false)} >
                <div className="digone" aria-hidden="true" />
                <div className="digtwo">
                    <Dialog.Panel className="digthree">
                    <Dialog.Title className=" digtitle">
                        <FaQuestionCircle  className='text-6xl text-amber-600'/>
                        <p className='text-3xl '>Are Sure  want to save summary?</p>
                    </Dialog.Title>

                    <Dialog.Description className="mb-4 text-gray-600">
                        <p className="text-base text-center  flex justify-center items-center gap-1.5 pb-2 text-green-600">You can edit after you saved<RiEdit2Fill /></p>
                    </Dialog.Description>
                    <div className='pb-8  flex justify-evenly'>
                        <div className='digno'>
                            <button className='diginnerbut' onClick={() => setshowboxsave(false)} >
                            No<FaThumbsDown className='text-xl'/>
                        </button></div>

                        <div className='digyes'>
                            <button className='diginnerbut' onClick={() => handleSave()} >
                            Yes<FaThumbsUp  className='text-xl'/>
                        </button></div>
                    </div>
                    </Dialog.Panel>
                </div>
            </Dialog>


            <Dialog open={showboxfinish} onClose={() => setshowboxfinish(false)} >
                <div className="digone" aria-hidden="true" />
                <div className="digtwo">
                    <Dialog.Panel className="digthree">
                    <Dialog.Title className=" digtitle">
                        <FaQuestionCircle  className='text-6xl text-amber-600'/>
                        <p className='text-3xl '>Are Sure  want to Submit summary?</p>
                    </Dialog.Title>

                    <Dialog.Description className="mb-4 text-gray-600">
                        <p className="text-base text-center  flex justify-center items-center gap-1.5 pb-2 text-red-600">You cann't edit after you Finished<RiEdit2Fill /></p>
                    </Dialog.Description>
                    <div className='pb-8  flex justify-evenly'>
                        <div className='digno'>
                            <button className='diginnerbut' onClick={() => setshowboxfinish(false)} >
                            No<FaThumbsDown className='text-xl'/>
                        </button></div>

                        <div className='digyes'>
                            <button className='diginnerbut' onClick={() => handlefinish()} >
                            Yes<FaThumbsUp  className='text-xl'/>
                        </button></div>
                    </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
      
    </div>
  );
};

export default EditSummary;
