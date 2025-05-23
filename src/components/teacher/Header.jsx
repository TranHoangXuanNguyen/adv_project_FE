import React, { useState } from 'react';
import { FaBell, FaArrowRightFromBracket } from 'react-icons/fa6';
import avatarImage from "../../assets/img/pnlogo.png";
import TNotification from '../../pages/teacher/Tnotification';

export default function Header() {
    const [isVisible, setIsVisible] = useState(false);

    const handleBellClick = () => {
        setIsVisible(!isVisible);
    };

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
                    <div className="">
                        <div
                            className="w-7 h-7 rounded-full bg-black flex justify-center items-center cursor-pointer"
                            onClick={handleBellClick}
                        >
                            <FaBell className="text-white" />
                        </div>

                        {/* Hiển thị component TNotification khi click vào chuông */}
                        {isVisible && (
                            <div className=" w-[650px] absolute right-[200px] pt-2 rounded-lg z-10">
                                <TNotification />
                            </div>
                        )}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-black flex justify-center items-center cursor-pointer">
                        <FaArrowRightFromBracket className="text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}