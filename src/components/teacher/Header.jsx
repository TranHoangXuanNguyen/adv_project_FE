import React from "react";
import avatar from "../../assets/img/avatar.jpg";

function Header() {
  return (
    <div className="top">
      <div className="top-box">
        <div className="search">
          <input type="text" placeholder="Search here" />
        </div>
        <div className="icon">
          <div className="icon-details">
            <div className="avatar">
              <img src={avatar} alt="Anh" />
            </div>
          </div>
          <div className="icon-details">
            <i className="fa-regular fa-bell" />
          </div>
          <div className="icon-details">
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
