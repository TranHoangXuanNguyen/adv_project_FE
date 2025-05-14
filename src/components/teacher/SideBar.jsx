import React from "react";
import logo from "../../assets/img/pnlogo.png";

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
        <div className="cate-details">
          <div className="logo-cate">
            <i className="fa-solid fa-user" />
          </div>
          <div className="text-cate">Profile</div>
        </div>
        <div className="cate-details">
          <div className="logo-cate">
            <i class="fa-solid fa-users"></i>
          </div>
          <div className="text-cate">Students</div>
        </div>
        <div className="cate-details">
          <div className="logo-cate">
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </div>
          <div className="text-cate">Archived Class</div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
