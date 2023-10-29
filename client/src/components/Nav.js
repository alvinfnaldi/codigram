import React from "react";
import { useNavigate } from "react-router-dom";
import AddPost from "./AddPost";
import { SiCoda } from "react-icons/si"
import { MdLogout } from "react-icons/md"

const Nav = () => {
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigateTo("/login");
  };

  return (
    <div className="m-auto">
      <div className="nav navbar d-flex justify-content-end mx-2 align-items-center">
        <h3 style={{fontFamily: 'Merriweather'}}><SiCoda/>odigram</h3>
        <button onClick={handleLogout} className="btn btn-danger ms-auto">
          <MdLogout/>Logout
        </button>
      </div>
      <div className="position-fixed w-25 mx-2 my-3 z-1">
        <AddPost />
      </div>
    </div>
  );
};

export default Nav;
