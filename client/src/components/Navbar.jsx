import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };


  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">

      <h1 className="text-xl font-bold">
        Task Manager
      </h1>


      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>


    </nav>
  );
}


export default Navbar;