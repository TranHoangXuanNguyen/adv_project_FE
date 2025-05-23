import { NavLink } from 'react-router-dom';
import { FaList, FaUser, FaBullseye , FaArrowRightFromBracket, FaBookOpen } from 'react-icons/fa6';
import pnlogo from "../../assets/img/pnlogo.png";

export default function SideBar() {
  return (
    <div className="w-1/6 h-screen flex flex-col items-center bg-gradient-to-b from-sky-400 to-indigo-500 rounded-lg">
      {/* Title */}
      <div className="w-11/12 h-16 border-b border-white mb-8 flex items-center text-white">
        <div className="w-8 h-8 mr-2 flex items-center justify-center rounded-full">
          <FaList className="text-xl" />
        </div>
        <div className="w-8 h-8 mr-2 flex items-center justify-center bg-white rounded-full">
          <img src={pnlogo} alt="PNV Logo" className="w-full h-full rounded-full" />
        </div>
        <div className="w-40 h-8 flex items-center font-bold text-xl">JOURNAL</div>
      </div>

      {/* Categories */}
      <div className="w-full space-y-2">
        {[
          { 
            icon: <FaUser />, 
            text: 'Profile',
            to: '/student/profile'
          },
          { 
            icon: <FaBullseye  />, 
            text: 'My Goals',
            to: '/student/Semester-Goals'
          },
          { 
            icon: <FaBookOpen />,  
            text: 'My Journal',
            to: '/student/my-journal'
          },
          { 
            icon: <FaArrowRightFromBracket />, 
            text: 'Archived Class',
            to: '/student/archivedClass'
          }
        ].map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            end={item.to === '/student'}
            className={({ isActive }) => 
              `w-full h-12 flex items-center cursor-pointer transition-colors ${
                isActive 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white hover:bg-orange-400'
              }`
            }
          >
            <div className="w-8 h-8 ml-3 flex items-center justify-center">
              {item.icon}
            </div>
            <div className="w-40 h-8 ml-3 flex items-center text-lg">
              {item.text}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

