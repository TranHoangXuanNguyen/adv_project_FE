import { useParams, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import WeekNavigation from "../../components/teacher/WeekNavigation";
import Chat from "../../components/common/Chat";

const ShowClassStudy = () => {
  const { studentId, selectedWeek } = useParams();

  const [showInfor, setShowInfor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchWeeklyClassPlan = async () => {
      if (!studentId || !selectedWeek) {
        setError("Missing student ID or week ID");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://127.0.0.1:8000/api/weekly/class-plan",
          {
            params: {
              user_id: parseInt(studentId),
              week_track_id: parseInt(selectedWeek),
            },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          setShowInfor(res.data.data || []);
        } else {
          setError(res.data.message || "Failed to load data");
          setShowInfor([]);
        }
      } catch (error) {
        console.error("Error fetching weekly class plan:", error);
        setError("Failed to load data.");
        setShowInfor([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyClassPlan();
  }, [studentId, selectedWeek]);

  return (
    <div className="main-content">
      {/* Navigation Tabs */}
      <WeekNavigation studentId={studentId} selectedWeek={selectedWeek} />

      {/* Chat Component */}
      <button
        onClick={() => setShowChat(!showChat)}
        style={{
          display: "inline-block",
          padding: "8px 20px",
          backgroundColor: "#444",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          margin: "20px",
          position: "fixed",
          right: "20px",
          top: "80px",
        }}
      >
        {showChat ? "Hide chat" : "Show chat"}
      </button>
      {showChat && (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <Chat />
        </div>
      )}
      {/* Title */}
      <div className="bg-blue-100 py-2 rounded-lg shadow">
        <h2 className="d flex justify-content-center text-xl font-bold text-blue-800">
          📚 In Class Study
        </h2>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-blue-600">Loading data...</p>}
      {error && <p className="text-red-500 font-medium">{error}</p>}

      {/* Data Table */}
      {!loading && !error && (
        <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-50 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">📅Study Date</th>
                <th className="px-4 py-2 border">📘 Skill/Subject</th>
                <th className="px-4 py-2 border">📖 What I learned</th>
                <th className="px-4 py-2 border">⚠️ Challenges</th>
                <th className="px-4 py-2 border">💡 How to solve</th>
                <th className="px-4 py-2 border">✅ Solved?</th>
              </tr>
            </thead>
            <tbody>
              {showInfor.length > 0 ? (
                showInfor.map((infor, index) => (
                  <tr key={infor.id || index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{infor.date}</td>
                    <td className="px-4 py-2 border">
                      {infor.subject?.subject_name || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">{infor.lesson_learn}</td>
                    <td className="px-4 py-2 border">{infor.difficult}</td>
                    <td className="px-4 py-2 border">
                      {infor.plan_to_improve}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {infor.in_solve ? "✔️" : "❌"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center px-4 py-4 text-gray-500 border"
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
};

export default ShowClassStudy;
