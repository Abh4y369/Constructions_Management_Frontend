import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutApi } from "../Services/allApis";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutApi();
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return <nav className="bg-green-900 border-b border-white/10 shadow-lg shadow-forest-900/15">
    <div className="container mx-auto max-w-7xl px-5 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold tracking-tight text-white">Construction Project Management</h1>
      <button onClick={handleLogout} className="border border-white/20 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md text-sm font-medium">Logout</button>
    </div>
  </nav>;
};

export default Navbar;
