import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import GoalTable from "../../components/teacher/GoalTable";
import WeekSelector from "../../components/teacher/WeekSelector";
import WeekNavigation from "../../components/teacher/WeekNavigation";

const ShowSemesterGoals = () => {
  const { studentId } = useParams();
  const [semesterId, setSemesterId] = useState(null);
  const [goalList, setGoalList] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedSemesterId = localStorage.getItem("sem_id");
    if (storedSemesterId) setSemesterId(storedSemesterId);
    else setError("Semester not found in localStorage.");
  }, []);

  useEffect(() => {
    if (semesterId && studentId) {
      fetchSubjects(semesterId);
      fetchGoals(semesterId, studentId);
    }
  }, [semesterId, studentId]);

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("students_data") || "[]");
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubjects(res.data || []);
    } catch (err) {
      setError("Failed to fetch subjects.");
    }
  };

  const fetchGoals = async (semesterId, studentId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://127.0.0.1:8000/api/semester-goals?semester_id=${semesterId}&student_id=${studentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGoalList(res.data?.data || []);
    } catch {
      setError("Failed to fetch goals.");
    } finally {
      setLoading(false);
    }
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find((sub) => String(sub.subject_id) === String(subjectId));
    return subject ? subject.subject_name : "N/A";
  };

  return (
    <div className="min-h-screen px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold text-blue-600"> Semester Goals</h2>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading goals...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <GoalTable goalList={goalList} getSubjectName={getSubjectName} />
        )}

        <WeekSelector
          weeks={weeks}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
        />

        <WeekNavigation studentId={studentId} selectedWeek={selectedWeek} />
      </div>
    </div>
  );
};

export default ShowSemesterGoals;
