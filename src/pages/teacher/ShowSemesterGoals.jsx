import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import "../../assets/css/pages/showSemesterGoals.css";

const ShowSemesterGoals = () => {
  const { studentId } = useParams();
  const [semesterId, setSemesterId] = useState(null);
  const [goalList, setGoalList] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [weeks, setWeeks] = useState([]); // State cho tuần
  const [selectedWeek, setSelectedWeek] = useState(""); // Tuần được chọn
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lấy semester ID từ localStorage
  useEffect(() => {
    const storedSemesterId = localStorage.getItem("sem_id");
    if (storedSemesterId) {
      setSemesterId(storedSemesterId);
    } else {
      setError("Không tìm thấy học kỳ trong localStorage.");
    }
  }, []);

  // Lấy subjects và goals khi có semesterId và studentId
  useEffect(() => {
    if (semesterId && studentId) {
      fetchSubjects(semesterId);
      fetchGoals(semesterId, studentId);
    }
  }, [semesterId, studentId]);

  // Lấy danh sách tuần từ localStorage
  useEffect(() => {
  const students = JSON.parse(localStorage.getItem("students_data") || "[]");

  // Lọc đúng student theo studentId
  const student = students.find((s) => String(s.user_id) === String(studentId));

  if (student && student.week_tracks) {
    const uniqueWeeks = [...new Set(student.week_tracks.map((w) => w.week_track_id))];
    setWeeks(uniqueWeeks);
  } else {
    setWeeks([]);
  }
}, [studentId]);


  const fetchSubjects = async (semesterId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://127.0.0.1:8000/api/semesters/${semesterId}/subjects`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubjects(res.data || []);
    } catch (err) {
      console.error("Lỗi lấy subjects:", err);
      setError("Không lấy được danh sách môn học.");
    }
  };

  const fetchGoals = async (semesterId, studentId) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://127.0.0.1:8000/api/semester-goals?semester_id=${semesterId}&student_id=${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGoalList(res.data?.data || []);
    } catch (err) {
      console.error("Lỗi lấy goals:", err);
      setError("Không lấy được mục tiêu học kỳ.");
    } finally {
      setLoading(false);
    }
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(
      (sub) => String(sub.subject_id) === String(subjectId)
    );
    return subject ? subject.subject_name : "N/A";
  };

  return (
    <div className="min-h-screen p-2">
      <h2 className=" d-flex flex justify-content-center text-3xl font-bold bg-[#72afff] p-2 shadow-md">
        Semester Goals
      </h2>

      

      {loading ? (
        <p className="text-center text-gray-600">Đang tải mục tiêu...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-[#e0f2ff]">
              <tr>
                <th className="border px-4 py-3 text-left">Subject</th>
                <th className="border px-4 py-3">Course Goal</th>
                <th className="border px-4 py-3">Expect from Teacher</th>
                <th className="border px-4 py-3">Expect from Themselves</th>
              </tr>
            </thead>
            <tbody>
              {goalList.length > 0 ? (
                goalList.map((goal, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="p-4 border font-bold">
                      {getSubjectName(goal.subject_id)}
                    </td>
                    <td className="p-4 border">{goal.course_expected}</td>
                    <td className="p-4 border">{goal.teacher_expected}</td>
                    <td className="p-4 border">{goal.themselves_expected}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    Không có dữ liệu mục tiêu cho học sinh này.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Nút điều hướng */}
      {/* Dropdown chọn tuần */}
      <div className="mt-4 mb-6 bg-blue-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-blue-700">Week tracking:</h3>
        {weeks.length > 0 ? (
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              -- Select Week --
            </option>
            {weeks.map((weekName, idx) => (
              <option key={idx} value={weekName}>
                {weekName}
              </option>
            ))}
          </select>
        ) : (
          <p>have no data.</p>
        )}
      </div>
      <div className="flex justify-start gap-4 mt-6">
        <NavLink
          to={selectedWeek ? `/teacher/class_study/${studentId}/${selectedWeek}` : "#"}
          className={`text-white font-semibold px-4 py-2 rounded-lg shadow ${
            selectedWeek
              ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={(e) => {
            if (!selectedWeek) e.preventDefault();
          }}
        >
          Week In Class
        </NavLink>

        <NavLink
          to={selectedWeek ? `/teacher/self_study/${studentId}/${selectedWeek}` : "#"}
          className={`text-white font-semibold px-4 py-2 rounded-lg shadow ${
            selectedWeek
              ? "bg-green-500 hover:bg-green-600 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={(e) => {
            if (!selectedWeek) e.preventDefault();
          }}
        >
          Week Self Study
        </NavLink>
      </div>
    </div>
  );
};

export default ShowSemesterGoals;
