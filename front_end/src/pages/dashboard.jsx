import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { BiSolidHome } from "react-icons/bi";
import { ThreeCircles  } from 'react-loader-spinner'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const Dashboard = () => {

  const starttime = new Date();
  starttime.setHours(0,0,0,0);

  const endtime = new Date();
  endtime.setHours(23, 59, 59, 999);
  const [dateRange, setDateRange] = useState([starttime, endtime]);
  const [encounters, setEncounters] = useState([]);
  const [draft, setdraft] = useState([]);
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid")
  const backendurl = import.meta.env.VITE_BACKEND_BASURL;

  const fetchEncounters = async (range) => {
    const [fromDate, toDate] = range;
      const toUTCISOString = (date) => {
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      };
    const userrole = localStorage.getItem("userrole")

    try {

        let res;

        if(userrole === "Doctor"){
            res = await axios.get(`${backendurl}/summary/doctor/${userid}`,{
                params : {
                  from: toUTCISOString(fromDate),
                  to: toUTCISOString(toDate),
                }
            })
        }else{
            res = await axios.get(`${backendurl}/summary/filter`, {
                params: {
                  from: toUTCISOString(fromDate),
                  to: toUTCISOString(toDate),
                },
              });
        }



      console.log("response",res.data)
      const responses = Array.isArray(res.data.data) ? res.data.data : [];

    /*   const filter = responses.filter(res => {
        const searchlower = search.toLowerCase();
        const searchuser = search === "" || res.doctor.toLowerCase().includes(searchlower.toLowerCase()) || res.uhid?.toString().includes(searchlower) || res.encounter?.toString().includes(searchlower);
        return(searchuser)
    }) */
   
      setEncounters(responses);

      console.log("encounter",encounters)
     
    } catch (error) {
      console.error("Error fetching encounters:", error);
      setEncounters([]);
    }
  };

  const fetchdraft = async (range) => {
    const [fromDate, toDate] = range;
      const toUTCISOString = (date) => {
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      };

    try {

       

       
           const res = await axios.get(`${backendurl}/draft`,{
                params : {
                  from: toUTCISOString(fromDate),
                  to: toUTCISOString(toDate),
                }
            })



      console.log("response",res.data)
      const responses = Array.isArray(res.data.data) ? res.data.data : [];
      setdraft(responses);

      console.log("encounter",draft)
     
    } catch (error) {
      console.error("Error fetching draft:", error);
      setdraft([]);
    }
  };

  useEffect(() => {
    fetchEncounters(dateRange);
    fetchdraft(dateRange)
  }, [dateRange]);


   const summarydatas = [
    {
      name : "Total Summary", value : encounters.length
    },
    {
      name : "Pending Summary", value : encounters.filter((e) => e.status === "pending").length
    },
    {
      name : "Completed Summary", value : encounters.filter((e) => e.status === "complete").length
    },

  ] 

  const draftdatas = [
    {
      name : "Total Draft", value : draft.length
    },
    {
      name : "Pending Draft", value : draft.filter((e) => e.draftstatus === "No").length
    },
    {
      name : "Completed Draft", value : draft.filter((e) => e.draftstatus === "Yes").length
    },

  ] 
  const COLORS = [  '#0974c3','#f46f2c','#00C49F',];

  return (
    <div className="m-6 ">
        <div className='heading1'>
          <p className='headtitle'>Welcome Dashboard</p>
              <div className='bread'>
                  <>
                  <><BiSolidHome /></>
                  <p className='breadunder' onClick={() => navigate("/")}>Dashboard</p>
                  </>
                  <>/ </>
                  <>
                  <div className='text-gray-500 text-sm'>Dashboard</div>
                  </>
              </div>
        </div>
      
      <div className=" flex justify-start py-20">
        <DateRangePicker  value={dateRange} onChange={setDateRange} placeholder="Select Date Range"  format="dd-MM-yyyy" style={{ width: 300 }} defaultValue={[new Date(), new Date()]}/>
      </div>







      <div className=" flex justify-evenly">

      
      <div>
        <p className="text-xl text-center">Summary Data</p>
        <PieChart width={400} height={400}>
          
            <Pie
              data={summarydatas}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              label
              dataKey="value"
            >
             <Cell fill={COLORS[0]}/>
             <Cell fill={COLORS[1]}/>
             <Cell fill={COLORS[2]}/>
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div>
        <p className="text-xl text-center">Draft Data</p>
          <PieChart width={400} height={400}>
            <Pie
              data={draftdatas}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              label
              dataKey="value"
            >
             <Cell fill={COLORS[0]}/>
             <Cell fill={COLORS[1]}/>
             <Cell fill={COLORS[2]}/>
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          </div>


      

      </div>
    </div>
  );
};

export default Dashboard;













 {/*  <div className="dashbox1">
          
          <h3 className="flex justify-between">
              <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H6L2 22V4C2 2.9 2.9 2 4 2Z" fill="#364153"/>
                <path d="M6 5H18V7H6V5Z" fill="white"/>
                <path d="M6 9H14V11H6V9Z" fill="white"/>
                <path d="M6 13H10V15H6V13Z" fill="white"/>
              </svg>

              <p className="text-gray-600">{encounters.length}</p>
             
          </h3>
          
            <div className="dashbox2">
              
                <p> Total Summary</p>
                <div className="dashline"></div>
              
            </div>
          
        </div> */}

         {/*  <div className="dashbox1">
          
            <h3 className="flex justify-between ">
            <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#364153"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z" fill="white"/>
            </svg>

                <p className="text-gray-600">{encounters.filter((e) => e.status === "pending").length}</p>
              </h3> 

              <div className="dashbox2">
              
                <p> Pending Summary</p>
                <div className="dashline"></div>
              
            </div>
          
       </div> */}

      {/*  <div  className="dashbox1">
          <h3 className="flex justify-between">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px" fill="#364153">
              <path d="M25,2C12.318,2,2,12.318,2,25c0,12.683,10.318,23,23,23c12.683,0,23-10.317,23-23C48,12.318,37.683,2,25,2z M35.827,16.562	L24.316,33.525l-8.997-8.349c-0.405-0.375-0.429-1.008-0.053-1.413c0.375-0.406,1.009-0.428,1.413-0.053l7.29,6.764l10.203-15.036	c0.311-0.457,0.933-0.575,1.389-0.266C36.019,15.482,36.138,16.104,35.827,16.562z"/>
            </svg>
            <p className="text-gray-600">{encounters.filter((e) => e.status === "complete").length}</p>
          </h3>
          <div className="dashbox2">
              
              <p className=""> Complete Summary</p>
              <div className="dashline"></div>
            
          </div>
      </div> */}