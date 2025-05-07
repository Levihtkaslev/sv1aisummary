import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Draft from './pages/draft'
import Location from './pages/location'
import Role from './pages/role'
import User from './pages/users'
import Summary from './pages/aisummary';
import Doctor from "./pages/draftlist";
import Staff from "./pages/summary";
import Login from "./loging/login";
import ProtectedRoute from "./loging/protect";
import Layout from "./loging/layout";
import Dashboard from "./pages/dashboard";
import Unauthorized from "./loging/unathorized";
import Editsummary from "./pages/editsummer";
import Kraniumgate from "./kranium/kranitoken";
import { useEffect } from "react";
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  useEffect(() => {
    const token = localStorage.getItem("kranium_token");
    if(!token){
      Kraniumgate();
    }
  },[]);

  return (
    <>

    <Router>
    <ToastContainer theme='dark' position='top-center' autoClose={2000} hideProgressBar={false} newestOnTop={true} closeOnClick transition={Bounce} draggable/>
      <Routes>
        <Route path='/' element={<ProtectedRoute allowedRoles={["Admin", "Doctor", "Staff"]}><Layout>< Dashboard /></Layout></ProtectedRoute>}/>
        <Route path='/createdraft' element={<ProtectedRoute allowedRoles={["Admin", "Staff"]}><Layout>< Draft /></Layout></ProtectedRoute>}/>
        <Route path='/ai-summariztion' element={<ProtectedRoute allowedRoles={["Admin", "Staff"]}><Layout>< Summary /></Layout></ProtectedRoute>} />
        <Route path='/edit-summary' element={<ProtectedRoute allowedRoles={["Admin","Staff", "Doctor"]}><Layout>< Editsummary /></Layout></ProtectedRoute>} />
        <Route path='/location' element={<ProtectedRoute allowedRoles={["Admin"]}><Layout>< Location /></Layout></ProtectedRoute>}/>
        <Route path='/user-role' element={<ProtectedRoute allowedRoles={["Admin"]}><Layout>< Role /></Layout></ProtectedRoute>}/>
        <Route path='/users' element={<ProtectedRoute allowedRoles={["Admin", "Staff"]}><Layout>< User /></Layout></ProtectedRoute>}/>
        <Route path='/draft' element={<ProtectedRoute allowedRoles={["Admin", "Staff"]}><Layout>< Doctor /></Layout></ProtectedRoute>}/>
        <Route path='/summary' element={<ProtectedRoute allowedRoles={["Admin", "Staff", "Doctor"]}><Layout>< Staff /></Layout></ProtectedRoute>}/>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </>
  )
}

export default App