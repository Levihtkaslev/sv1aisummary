import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  
  const token = localStorage.getItem("token");
  if(!token){
    return <Navigate to="/login" replace/>
  }

  try {
    const userrole = localStorage.getItem("userrole")
    if(allowedRoles.includes(userrole)){
      return children;
    }else{
      return <Navigate to="/unauthorized" replace />;
    }
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
