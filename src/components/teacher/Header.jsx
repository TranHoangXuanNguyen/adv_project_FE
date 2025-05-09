import React from 'react';
import { FaBell, FaArrowRightFromBracket } from 'react-icons/fa6';
import avatarImage from "../../assets/img/pnlogo.png";
export default function Header() {
    return (
        <div className="w-full h-16 flex justify-end items-center">
          <div className="w-1/3 h-3/5 flex justify-around items-center">
            {/* Search */}
            <div className="w-2/5 h-full">
              <input 
                type="text" 
                placeholder="Search here" 
                className="w-full h-[90%] rounded-lg pl-2 focus:outline-none"
              />
            </div>
    
            {/* Icons */}
            <div className="w-1/3 h-full flex justify-between">
              <div className="w-7 h-7 rounded-full bg-black flex justify-center items-center cursor-pointer">
                <img 
                  src={avatarImage} 
                  alt="Avatar" 
                  className="w-3/4 h-3/4 rounded-full border border-white" 
                />
              </div>
              <div className="w-7 h-7 rounded-full bg-black flex justify-center items-center cursor-pointer">
                <FaBell className="text-white" />
              </div>
              <div className="w-7 h-7 rounded-full bg-black flex justify-center items-center cursor-pointer">
                <FaArrowRightFromBracket className="text-white" />
              </div>
            </div>
          </div>
        </div>
      );
    };