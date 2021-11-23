import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const user_session = localStorage.getItem("USER_SESSION");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user_session) {
      setUser(JSON.parse(user_session));
    }
  }, [user_session]);

  const handleLogout = () => {
    localStorage.removeItem("USER_SESSION");
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500  h-screen">
      <nav className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-white-500  rounded m-2"
        >
          Logout
        </button>
      </nav>
      <h1 className=" text-white font-normal text-3xl pl-4">
        Welcome {user?.username}
      </h1>
    </div>
  );
}
