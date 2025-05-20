import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";

export default function ShowClassStudy() {
  const { week_track_id } = useParams();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Không tìm thấy token");
        setLoading(false);
        return;
      }

      // Decode token để lấy user_id
      const userPayload = parseJwt(token);
      if (!userPayload) {
        console.error("Token không hợp lệ hoặc không giải mã được");
        setLoading(false);
        return;
      }

      const user_id = userPayload.id || userPayload.sub;
      if (!user_id) {
        console.error("Không tìm thấy user_id trong token");
        setLoading(false);
        return;
      }

      const weekTrackId = week_track_id || localStorage.getItem("week_track_id") || 1;
      const semester_id = localStorage.getItem("semester_id");

      const params = {
        user_id,
        week_track_id: weekTrackId,
        subject_id: 1,
      };

      if (semester_id) params.semester_id = parseInt(semester_id);

      const response = await axios.get(
        "http://127.0.0.1:8000/api/show-selfstudyplan",
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const result = response.data;
      console.log("Kết quả API classplan:", result);

      if (Array.isArray(result)) {
        setRows(result);
      } else if (Array.isArray(result.data)) {
        setRows(result.data);
      } else if (Array.isArray(result.self_study_plans)) {
        setRows(result.self_study_plans);
      } else {
        console.error("API classplan không trả về mảng hợp lệ");
        setRows([]);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [week_track_id]);



  return (
    <div className="max-w-5xl mx-auto">
      {/* Buttons */}
      <div className="mb-2 flex gap-2">
        <NavLink
          to="/teacher/class_study"
          className={({ isActive }) =>
            `bg-[#73aeff] text-white px-4 py-2 rounded-lg hover:bg-[#7a9ab6] ${isActive ? 'bg-orange-400' : ''}`
          }
        >
          In Class
        </NavLink>
        <NavLink
          to="/teacher/self_study"
          className={({ isActive }) =>
            `bg-[#73aeff] text-white px-4 py-2 rounded-lg hover:bg-[#7a9ab6] ${isActive ? 'bg-orange-400' : ''}`
          }
        >
          Self Study
        </NavLink>
      </div>

      {/* In-Class Header */}
      <div className="bg-[#73aeff] py-2 rounded flex justify-center items-center">
        <h2 className="text-center text-lg font-semibold">Self-Study</h2>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
        {loading ? (
          <p className="text-center p-4 text-gray-500">Loading...</p>
        ) : rows.length === 0 ? (
          <p className="text-center p-4 text-gray-500">No data available.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-[#e0edf6] text-gray-700 text-sm font-semibold">
              <tr>
                <th className="px-4 py-3 text-left border border-gray-300">Date</th>
                <th className="px-4 py-3 text-left border border-gray-300">Subject</th>
                <th className="px-4 py-3 text-left border border-gray-300">What I Learned</th>
                <th className="px-4 py-3 text-left border border-gray-300">Time Allocation</th>
                <th className="px-4 py-3 text-left border border-gray-300">Resources</th>
                <th className="px-4 py-3 text-left border border-gray-300">Activities</th>
                <th className="px-4 py-3 text-left border border-gray-300">Follow Plan</th>
                <th className="px-4 py-3 text-left border border-gray-300">Concentration</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm border border-gray-300">
              {rows.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#f5f9fc]"}>
                  <td className="px-4 py-2 whitespace-nowrap border border-gray-300">{row.date}</td>
                  <td className="px-4 py-2 whitespace-nowrap font-medium text-gray-800 border border-gray-300">{row.subject_id}</td>
                  <td className="px-4 py-2 max-w-xs border border-gray-300">{row.lesson_learn}</td>
                  <td className="px-4 py-2 max-w-xs text-red-700 border border-gray-300">{row.time_spend}</td>
                  <td className="px-4 py-2 max-w-xs border border-gray-300">{row.learning_resource}</td>
                  <td className="px-4 py-2 text-green-600 font-semibold border border-gray-300">{row.learning_activities}</td>
                  <td className="px-4 py-2 text-green-600 font-semibold border border-gray-300">{row.in_solve  ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 text-green-600 font-semibold border border-gray-300">{row.concentration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
