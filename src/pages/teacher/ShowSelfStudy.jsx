import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";

export default function ShowSelfStudy() {
  const { studentId, weekId } = useParams(); // LẤY student_id và weekId từ URL

  const [showInfor, setShowInfor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeeklySelfStudyPlan = async () => {
      if (!studentId || !weekId) {
        setError("Missing student ID or week ID");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token"); // hoặc cách bạn lưu token
        const res = await axios.get(
          "http://127.0.0.1:8000/api/show-selfstudyplan",
          {
            params: {
              user_id: studentId,
              week_track_id: weekId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.self_study_plans) {
          setShowInfor(res.data.self_study_plans || []);
        } else {
          setError(res.data.message || "Failed to load data");
          setShowInfor([]);
        }
      } catch (error) {
        console.error("Error fetching self-study data:", error);
        setError("Failed to load data.");
        setShowInfor([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklySelfStudyPlan();
  }, [studentId, weekId]);

  return (
    <div className="main-content">
      <div className="mb-2 flex gap-2">
        <NavLink
          to={`/teacher/class_study/${studentId}/${weekId}`}
          className={({ isActive }) =>
            `bg-[#73aeff] text-white px-4 py-2 rounded-lg hover:bg-[#7a9ab6] ${
              isActive ? "bg-orange-400" : ""
            }`
          }
        >
          In Class
        </NavLink>
        <NavLink
          to={`/teacher/self_study/${studentId}/${weekId}`}
          className={({ isActive }) =>
            `bg-[#73aeff] text-white px-4 py-2 rounded-lg hover:bg-[#7a9ab6] ${
              isActive ? "bg-orange-400" : ""
            }`
          }
        >
          Self Study
        </NavLink>
      </div>

      <div className="bg-[#73aeff] py-2 rounded flex justify-center items-center">
        <h2 className="text-center text-lg font-semibold">Self Study</h2>
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300">Date</th>
                <th className="px-4 py-2 border border-gray-300">Subject</th>
                <th className="px-5 py-2 border border-gray-300">Learned</th>
                <th className="px-4 py-2 border border-gray-300">Time</th>
                <th className="px-4 py-2 border border-gray-300">Resources</th>
                <th className="px-4 py-2 border border-gray-300">Activities</th>
                <th className="px-2 py-2 border border-gray-300">
                  Follow/Plan
                </th>
                <th className="px-2 py-2 border border-gray-300">
                  Concentration
                </th>
              </tr>
            </thead>
            <tbody>
              {showInfor.length > 0 ? (
                showInfor.map((infor, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border border-gray-300">
                      {infor.date}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {infor.subject?.subject_name || infor.subject_id}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {infor.lesson_learn}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {infor.time_spend}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {infor.learning_resource}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {infor.learning_activities}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {infor.in_solve ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {infor.concentration}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
