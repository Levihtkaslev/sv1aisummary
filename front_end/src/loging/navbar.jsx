import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Draft</Link>
        <Link to="/location" className="hover:underline">Location</Link>
        <Link to="/user-role" className="hover:underline">Roles</Link>
        <Link to="/users" className="hover:underline">Users</Link>
      </div>
      <button onClick={handlelogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
    </nav>
  );
};

export default Navbar;
