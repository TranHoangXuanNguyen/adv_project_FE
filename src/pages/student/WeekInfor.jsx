import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faUser,
  faBullseye,
  faBook,
  faFolder
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => (
  <div className="w-[250px] bg-gradient-to-b from-[#00aaff] to-[#0077cc] text-white p-5 flex flex-col">
    <div className="flex items-center mb-5">
      <FontAwesomeIcon icon={faBars} className="text-xl mr-2" />
      <img src="..src/assets/img/pnlogo.png" alt="Logo" className="w-10 h-10 rounded-full mr-2" />
      <h3 className="text-2xl font-semibold">JOURNAL</h3>
    </div>
    <hr className="border border-white/50 my-3" />
    <ul className="space-y-5 mt-3">
      <li className="flex items-center cursor-pointer hover:bg-white/20 p-2 rounded">
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        Profile
      </li>
      <li className="flex items-center cursor-pointer hover:bg-white/20 p-2 rounded">
        <FontAwesomeIcon icon={faBullseye} className="mr-2" />
        My Goals
      </li>
      <li className="flex items-center cursor-pointer hover:bg-white/20 p-2 rounded">
        <FontAwesomeIcon icon={faBook} className="mr-2" />
        My Journal
      </li>
      <li className="flex items-center cursor-pointer hover:bg-white/20 p-2 rounded">
        <FontAwesomeIcon icon={faFolder} className="mr-2" />
        Archived Class
      </li>
    </ul>
  </div>
);

const WeeklyForm = () => {
  const { id } = useParams();
  const [weekData, setWeekData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('selectedCard'));
    if (data) {
      setWeekData({
        title: data.title,
        startDate: data.startDate,
        endDate: data.endDate,
        goals: data.goals.map((g) => ({ description: g })),
      });
    }
  }, []);
  
  if (!weekData) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 m-12 flex-grow">
      <h4 className="text-lg font-medium">Weekly Information</h4>
      <h2 className="text-2xl text-blue-800 font-bold mt-3">{weekData.title}</h2>
      <span className="block text-gray-500 mt-1">
        From {weekData.startDate} to {weekData.endDate}
      </span>
      <div className="mt-9">
        <h3 className="text-lg font-semibold mb-4">Goals this week</h3>
        {weekData.goals.map((goal, i) => (
          <div key={i} className="flex justify-between items-center mb-4">
            <label>{goal.description}</label>
            <input type="checkbox" className="w-5 h-5 accent-blue-500" />
          </div>
        ))}
      </div>
      <a
        href="#"
        className="inline-block mt-6 px-5 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition"
      >
        Go to journal page &rarr;
      </a>
    </div>
  );
};

const WeekInfor = () => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 p-8">
      <WeeklyForm />
    </div>
  </div>
);

export default WeekInfor;
