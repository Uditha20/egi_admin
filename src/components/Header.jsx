import axios from "axios";
import React from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

const logout = async () => {
  try {
    const logOut = await axios.get("/user/logout");
    if (logOut.data) {
      // console.log(logOut.data.message);
      window.location.href = "http://localhost:3000/"
    }
  } catch (err) {
    console.log(err.message);
  }
};

function Header({ OpenSidebar }) {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right">
        <BsPersonCircle className="icon" size={25} onClick={logout} style={{cursor:'pointer'}} />
      </div>
    </header>
  );
}

export default Header;
