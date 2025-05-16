import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherViewGoals = () => {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [goalList, setGoalList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fakeFetchSemesters = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { semester_id: 1, semester_name: "Semester 1" },
          { semester_id: 2, semester_name: "Semester 2" },
          { semester_id: 3, semester_name: "Semester 3" },
        ]);
      }, 300);
    });
  };

  useEffect(() => {
    fakeFetchSemesters().then((data) => {
      setSemesters(data);
      if (data.length > 0) {
        setSelectedSemester(data[0].semester_id);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedSemester) {
      fetchGoals(selectedSemester);
    }
  }, [selectedSemester]);

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

  const handleSemesterChange = (e) => {
    setSelectedSemester(parseInt(e.target.value));
  };

  return (
    <div className="min-h-screen">
      <div className="mb-4">
        <label htmlFor="semester" className="block text-lg font-bold mb-2">
          Select Semester
        </label>
        <select
          id="semester"
          value={selectedSemester || ""}
          onChange={handleSemesterChange}
          className="p-3 border border-blue-500 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-300"
        >
          {semesters.map((sem) => (
            <option key={sem.semester_id} value={sem.semester_id}>
              {sem.semester_name}
            </option>
          ))}
        </select>
      </div>

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

export default TeacherViewGoals;