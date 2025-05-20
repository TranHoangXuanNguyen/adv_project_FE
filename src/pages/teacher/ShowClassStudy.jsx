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
        "http://127.0.0.1:8000/api/show-classplan",
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
      } else if (Array.isArray(result.class_plans)) {
        setRows(result.class_plans);
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
            `bg-[#73aeff] text-white px-4 py-2 rounded-lg hover:bg-[#7a9ab6] ${
              isActive ? "bg-orange-400" : ""
            }`
          }
        >
          In Class
        </NavLink>
        <NavLink
          to="/teacher/self_study"
          className={({ isActive }) =>
            `bg-[#73aeff] text-white px-4 py-2 rounded-lg hover:bg-[#7a9ab6] ${
              isActive ? "bg-orange-400" : ""
            }`
          }
        >
          Self Study
        </NavLink>
      </div>

      {/* In-Class Header */}
      <div className="bg-[#73aeff] py-2 rounded flex justify-center items-center">
        <h2 className="text-center text-lg font-semibold">In-Class</h2>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
        {loading ? (
          <p className="text-center p-4 text-gray-500">Loading...</p>
        ) : rows.length === 0 ? (
          <p className="text-center p-4 text-gray-500">No data found</p>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Skill/Subject</th>
                <th className="px-6 py-3">What I learned today</th>
                <th className="px-6 py-3">Challenges faced</th>
                <th className="px-6 py-3">How to solve</th>
                <th className="px-6 py-3">Problem solved</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4">{item.date || "N/A"}</td>
                  {/* Nếu item có đối tượng subject hoặc subjects thì hiển thị tên subject */}
                  <td className="px-6 py-4">
                    {item.subjects?.subject_name ||
                      item.subject?.subject_name ||
                      item.subject_name ||
                      "N/A"}
                  </td>
                  <td className="px-6 py-4">{item.lesson_learn || "N/A"}</td>
                  <td className="px-6 py-4">{item.self_assessment || "N/A"}</td>
                  <td className="px-6 py-4">{item.difficult || "N/A"}</td>
                  <td className="px-6 py-4">{item.in_solve ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
