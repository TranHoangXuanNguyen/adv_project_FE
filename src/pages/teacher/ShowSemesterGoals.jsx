import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowSemesterGoals = () => {
  const [goalList, setGoalList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const semesterId = localStorage.getItem("semester_id");
    if (semesterId) {
      fetchGoals(semesterId);
    } else {
      setError("No semester ID found in localStorage.");
    }
  }, []);

  const fetchGoals = async (semesterId) => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/semester-goals?semester_id=${semesterId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGoalList(response.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err.response || err);
      setError("Failed to fetch goals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Semester Goals</h2>

      {loading ? (
        <p className="text-gray-600">Loading goals...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Course Goal</th>
                <th className="border px-4 py-2">Expect from Teacher</th>
                <th className="border px-4 py-2">Expect from Themselves</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(goalList) && goalList.length > 0 ? (
                goalList.map((goal, idx) => (
                  <tr key={idx} className="hover:bg-blue-100 transition duration-200">
                    <td className="p-4 border">{goal.subject?.subject_name}</td>
                    <td className="p-4 border">{goal.course_expected}</td>
                    <td className="p-4 border">{goal.teacher_expected}</td>
                    <td className="p-4 border">{goal.themselves_expected}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    No goal data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowSemesterGoals;
