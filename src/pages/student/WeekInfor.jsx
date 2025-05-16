import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faUser,
  faBullseye,
  faBook,
  faFolder
} from '@fortawesome/free-solid-svg-icons';


const WeeklyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // thêm dòng này
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
    <div>
          <button
        onClick={() => navigate('/student/my-journal')}
        className="inline-block mt-6 px-5 py-2 bg-red-900 text-white rounded hover:bg-red-800 transition mr-4"
      >
        Back
      </button>
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

      {/* Nút đến trang Journal */}
      <a
        href="#"
        className="inline-block mt-6 px-5 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition mr-4"
      >
        Go to journal page &rarr;
      </a>

      {/* Nút trở về WeekList */}
    </div>
     
    </div>
  );
};


const WeekInfor = () => (
  <div className="flex h-screen">
    <div className="flex-1 p-8">
      <WeeklyForm />
    </div>
  </div>

);

export default WeekInfor;
