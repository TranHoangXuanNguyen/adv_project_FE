import React from "react";
import logo from "../../assets/img/pnlogo.png";
import { Link } from "react-router-dom";
function SideBar() {
  return (
    <div className="left">
      <div className="title">
        <div className="logo-title">
          <i className="fa-solid fa-list" />
        </div>
        <div className="logo-pnv">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text-title">JOURNAL</div>
      </div>
      <div className="cate">
        <Link to="/student/profile" className="cate-details">
          <div className="logo-cate">
            <i className="fa-solid fa-user" />
          </div>
          <div className="text-cate">Profile</div>
        </Link>

        <Link to="/student/goal" className="cate-details">
          <div className="logo-cate">
            <i className="fa-solid fa-bullseye" />
          </div>
          <div className="text-cate">My Goals</div>
        </Link>

        <Link to="/student/my-journal" className="cate-details">
          <div className="logo-cate">
            <i className="fa-solid fa-book" />
          </div>
          <div className="text-cate">My Journal</div>
        </Link>

        <Link to="/student/profile" className="cate-details">
          <div className="logo-cate">
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </div>
          <div className="text-cate">Archived Class</div>
        </Link>


      </div>
    </div>
  );
}

export default SideBar;
