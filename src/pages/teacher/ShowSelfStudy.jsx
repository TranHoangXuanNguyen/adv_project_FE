import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import WeekNavigation from "../../components/teacher/WeekNavigation";

export default function ShowSelfStudy() {
  const { studentId, selectedWeek } = useParams();

  const [showInfor, setShowInfor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeeklySelfStudyPlan = async () => {
      if (!studentId || !selectedWeek) {
        setError("Missing student ID or week ID");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://127.0.0.1:8000/api/show-selfstudyplan",
          {
            params: {
              user_id: studentId,
              week_track_id: selectedWeek,
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
  }, [studentId, selectedWeek]);

  return (
    <div className="main-content">
      {/* Navigation buttons */}
      <WeekNavigation studentId={studentId} selectedWeek={selectedWeek} />

      {/* Title */}
      <div className="bg-blue-100 py-2 rounded-lg shadow">
        <h2 className="d flex justify-content-center text-xl font-bold text-blue-800">
          📚 Self Study
        </h2>
      </div>

      {/* Loading/Error */}
      {loading && <p className="text-gray-600">Loading data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Data Table */}
      {!loading && !error && (
        <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-50 text-gray-700">
              <tr>
                <th className="px-4 py-2 border text-blue-900">
                  <span className="text-sm mr-1 "></span> StudyDate 
                </th>
                <th className="px-4 py-2 border text-blue-900">
                  <span className="text-sm mr-1"></span> Subject
                </th>
                <th className="px-4 py-2 border text-blue-900">
                  <span className="text-sm mr-1"></span> Learned
                </th>
                <th className="px-4 py-2 border text-blue-900">
                  <span className="text-sm mr-1"></span> Time
                </th>
                <th className="px-4 py-2 border text-blue-900">
                  <span className="text-sm mr-1"></span> Resources
                </th>
                <th className="px-4 py-2 border text-blue-900">
                  <span className="text-sm mr-1"></span> Activities
                </th>
                <th className="px-4 py-2 border text-blue-900">
                  <span className="text-sm mr-1"></span> Follow/Plan
                </th>
                <th className="px-4 py-2 border text-blue-900">
                  <span className="text-sm mr-1"></span> Concentration
                </th>
              </tr>
            </thead>

            <tbody>
              {showInfor.length > 0 ? (
                showInfor.map((infor, index) => (
                  <tr key={index} className="hover:bg-gray-50 ">
                    <td className="px-4 py-2 border">{infor.date}</td>
                    <td className="px-4 py-2 border">
                      {infor.subject?.subject_name || infor.subject_id}
                    </td>
                    <td className="px-4 py-2 border">{infor.lesson_learn}</td>
                    <td className="px-4 py-2 border">{infor.time_spend}</td>
                    <td className="px-4 py-2 border">
                      {infor.learning_resource}
                    </td>
                    <td className="px-4 py-2 border">
                      {infor.learning_activities}
                    </td>
                    <td className="px-4 py-2 border">
                      {infor.in_solve ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2 border">{infor.concentration}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-4 text-gray-500 border"
                  >
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Back link */}
      <div className="mt-6">
        <NavLink
          to={`/teacher/viewGoals/${studentId}`}
          className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium"
        >
          ← Back to Goals
        </NavLink>
      </div>
    </div>
  );
}
