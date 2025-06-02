import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faBullseye,
  faBook,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";

const WeeklyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [weekData, setWeekData] = useState(null);

  const handleStatusChange = async (goalId, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/weekly-goal/${goalId}`, {
        status: newStatus,
      });

      // Cập nhật trong local state
      const updatedGoals = weekData.goals.map((goal) =>
        goal.id === goalId ? { ...goal, status: newStatus } : goal
      );
      setWeekData((prev) => ({ ...prev, goals: updatedGoals }));
    } catch (error) {
      console.error(
        "Lỗi khi cập nhật trạng thái goal:",
        error?.response?.data || error.message
      );
      alert(
        "Không thể cập nhật trạng thái. Có thể ID không tồn tại hoặc server lỗi."
      );
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedCard"));
    console.log("Data from localStorage:", data);
    if (data) {
      setWeekData({
        title: data.title,
        startDate: data.startDate,
        endDate: data.endDate,
        goals:
          data.goals?.map((goal) => ({
            id: goal.id,
            description: goal.description,
            status: goal.status,
          })) || [],
      });
    }
  }, []);

  if (!weekData) return <p>Loading...</p>;

  return (
    <div>
      <button
        onClick={() => navigate("/student/my-journal")}
        className="inline-block mt-6 px-5 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition mr-4"
      >
        Back
      </button>
      <div className="bg-white rounded-lg shadow-lg p-8 mt-4 flex-grow">
     <div className="w-full flex justify-center">
          <h2 className="text-2xl font-bold text-black-700 text-center">
            Weekly Information
          </h2>
      </div>

        <h4 className="text-xl text-blue-800 font-bold mt-3">
          {weekData.title}
        </h4>
        <span className="block text-black-500 mt-1">
          From {weekData.startDate} to {weekData.endDate}
        </span>
        <div className="mt-9">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">Goals this week</h3>
          {weekData.goals.map((goal) => (
            <div
              key={goal.id}
              className="flex justify-between items-center mb-4"
            >
              <label>{goal.description}</label>
              <input
                type="checkbox"
                className="w-5 h-5 accent-blue-500"
                checked={goal.status == 1}
                onChange={(e) =>
                  handleStatusChange(goal.id, e.target.checked ? 1 : 0)
                }
              />
            </div>
          ))}
        </div>

        {/* Nút đến trang Journal */}
        <div className="flex justify-end mt-8">
        <a
          onClick={() => navigate("journal")}
          className="inline-block mt-6 px-5 py-2 bg-red-500 text-white rounded hover:bg- red-300 transition"
        >
          Go to journal page &rarr;
        </a>
      </div>
        {/* Nút trở về WeekList */}
      </div>
    </div>
  );
};

const WeekInfor = () => (
  <div className="flex h-screen">
    {/* <Sidebar /> */}
    <div className="flex-1 p-8">
      <WeeklyForm />
    </div>
  </div>
);

export default WeekInfor;
