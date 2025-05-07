import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { BiSolidHome } from "react-icons/bi";
import moment from "moment";
import * as XLSX from "xlsx";
import { FaDownload, FaFileExport  } from "react-icons/fa6";
import { toast } from "react-toastify";


const Doctor = () => {
    const starttime = new Date();
    starttime.setHours(0,0,0,0);
    const endtime = new Date();
    endtime.setHours(23, 59, 59, 999);
    const [dateRange, setDateRange] = useState([starttime, endtime]);

    const [uhid, setuhid] = useState([]);
    const navigate = useNavigate();
    const [search, setsearch] = useState("")
    const backendurl = import.meta.env.VITE_BACKEND_BASURL;

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = uhid.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(uhid.length / rowsPerPage);
  
    const fetchuhid = async (range) => {
      const [fromDate, toDate] = range;
      const toUTCISOString = (date) => {
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      };
  
      try {
  
            const  res = await axios.get(`${backendurl}/draft`,{
                  params : {
                    from: toUTCISOString(fromDate),
                    to: toUTCISOString(toDate),
                  }
              })
          
  
  
  
        console.log("response",res.data)
        const responses = Array.isArray(res.data.data) ? res.data.data : [];
  
          const filter = responses.filter(res => {
          const searchlower = search.toLowerCase();
          const searchuser =
            search === "" ||
            res.doctor.toLowerCase().includes(searchlower.toLowerCase()) ||
            res.uhid?.toString().includes(searchlower) ||
            res.encounter?.toString().includes(searchlower);
          return searchuser;
        });
        
        const sorted = filter.sort((a, b) => new Date(b.createdtime) - new Date(a.createdtime));
        setuhid(sorted);
        
  
        console.log("uhids",uhid)
       
      } catch (error) {
        console.error("Error fetching uhid:", error);
        setuhid([]);
      }
    };

      const exportt = () => {
        if (uhid.length === 0) {
          toast.error("No data Found")
            return;
        }
    
        const worksheet = XLSX.utils.json_to_sheet(uhid);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Items");
        XLSX.writeFile(workbook, "FilteredItems.xlsx");
        toast.success("Document dowloaded Successfully")
    }

    const UsernameCell = ({ userId }) => {
      const [username, setUsername] = useState("Loading...");
    
      useEffect(() => {
        const fetchUsername = async () => {
          try {
            const response = await axios.get(`${backendurl}/user/${userId}`);
            if (response.data?.data?.username) {
              setUsername(response.data.data.username);
            } else {
              setUsername("Unknown");
            }
          } catch (err) {
            setUsername("Error");
          }
        };
    
        if (userId) fetchUsername();
      }, [userId]);
    
      return <>{username}</>;
    };

    

    useEffect(() => {
        fetchuhid(dateRange);
    }, [dateRange, search]);

    const handleEdit = (draftdata) => {
        console.log("draftdata",draftdata )
        navigate("/createdraft", { state: draftdata });
    };

     return (
        <div className='first'>
          
          <div className='heading1'>
              <p className='headtitle'>Draft</p>
              <div className='bread'>
                  <>
                  <><BiSolidHome /></>
                  <p className='breadunder' onClick={() => navigate("/")}>Dashboard</p>
                  </>
                  <>/ </>
                  <>
                  <div className='text-gray-500'>Draft</div>
                  </>
              </div>
          </div>
    
          <div className="secndouter">
          <div className="searchouter">
          <DateRangePicker
            className="w-full"
            value={dateRange}
            onChange={setDateRange}
            placeholder="Select Date Range"
            format="dd-MM-yyyy HH:mm:ss"        
            showTime                      
            defaultValue={[new Date(), new Date()]}
          />

            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm ">Rows :</label>
              <select
                className="cursor-pointer border rounded px-2 py-1 text-sm outline-none"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value));
                  setCurrentPage(1); 
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className='rounded-lg shadow-lg hover:shadow-orange-400 transition-all duration-200'>
              <button className="px-4 py-2 flex items-center gap-2.5" onClick={exportt}>Export <FaDownload /></button> 
            </div>

            <div className='searchouter'>
              <input className='searchinner' value={search} onChange={(e) => setsearch(e.target.value)} placeholder='Search by uhid and encounter' />
              <CiSearch />
            </div>
          </div>
        <div className='table1'>
          <table className='table2'>
            <thead  className='thead'>
              <tr  className='py-14'>
                <th className="thd">S.no</th>
                <th className="thd">Created Time</th>
                <th className="thd">Patient Name</th>
                <th className="thd">UHID</th>
                <th className="thd">Encounter</th>
                <th className="thd">User Name</th>
                <th className="thd">Doctor Name</th>
                <th className="thd">Modified Time</th>
                <th className="thd">Generated?</th>
                <th className="thd">Action</th>
    
              </tr>
            </thead>
            <tbody>
              {Array.isArray(uhid) && uhid.length > 0 ? (
                currentRows.map((item, index) => (
                  <tr onClick={() => handleEdit(item)} key={index} className={`py-14 h-12  ${index % 2 === 0 ? 'bg-white': 'bg-gray-100'} cursor-pointer hover:bg-gray-200 transition-all duration-300`}>
                    <td className="tbd ">{index+1}</td>
                    <td className="tbd">{moment.utc(item.createdtime).format("DD-MM-YYYY hh:mm:ss A")}</td>
                    <td className="tbd ">{item.patient_name}</td>
                    <td className="tbd ">{item.uhid}</td>
                    <td className="tbd">{item.encounter}</td>
                    <td className="tbd"><UsernameCell userId={item.doneby} /></td>
                    <td className="tbd"><UsernameCell userId={item.doctor} /></td>
                    <td className="tbd"> {moment.utc(item.lastmodified).format("DD-MM-YYYY hh:mm:ss A")}</td>
                    <td className={`${item.draftstatus === "Yes"? "text-teal-500" : "text-red-500" } text-center text-base`}>{item.draftstatus}</td>
                    <th className="tbd">
                      <button onClick={() => handleEdit(item)}><FaUserEdit className='update' /></button>
                    </th>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="py-4 text-center text-gray-500">
                    No Draft found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="w-full  justify-center mt-10 flex gap-3 items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 text-sm rounded border ${currentPage === i + 1 ? "bg-gray-700 text-white" : "bg-white hover:bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        
        </div>
      );

}

export default Doctor;