import React, { useEffect, useState } from "react";
import axios from "axios";
import SemesterGoal_Row from "../../components/student/SemesterGoal_Row";
import "../../assets/css/pages/semesterGoals.css";

export default function SemesterGoals() {
  const studentId = localStorage.getItem("user_id");
  const [semesterId, setSemesterId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [goals, setGoals] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const storedSemesterId = localStorage.getItem("semester_id");
      if (!storedSemesterId) {
        setLoading(false);
        return;
      }

      const semId = parseInt(storedSemesterId);
      setSemesterId(semId);

      try {
        // Lấy danh sách môn theo semester
        const subjectRes = await axios.get(
          `http://127.0.0.1:8000/api/semesters/${semId}/subjects`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        // Lấy goal hiện tại của student theo semester
        const goalRes = await axios.get(
          `http://127.0.0.1:8000/api/semester-goals?semester_id=${semId}&student_id=${studentId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        setSubjects(subjectRes.data);

        // Map goals theo subject_id để dễ lấy
        const goalsData = {};
        (goalRes.data.data || []).forEach((goal) => {
          goalsData[goal.subject_id] = {
            course_expected: goal.course_expected || "",
            teacher_expected: goal.teacher_expected || "",
            themselves_expected: goal.themselves_expected || "",
          };
        });
        setGoals(goalsData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
      setLoading(false);
    };
    init();
  }, [studentId]);

  const handleInputChange = (subjectId, field, value) => {
    setGoals((prev) => ({
      ...prev,
      [subjectId]: {
        ...prev[subjectId],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
     console.log("semesterId:", semesterId);
  console.log("studentId:", studentId);
  if (!semesterId) {
    alert("Semester ID is missing.");
    return;
  }
  if (!studentId) {
    alert("Student ID is missing.");
    return;
  }

  const goalsToSave = Object.entries(goals)
    .map(([subjectId, goal]) => ({
      semester_id: semesterId,
      student_id: parseInt(studentId),
      subject_id: parseInt(subjectId),
      ...goal,
    }))
    .filter(
      (g) =>
        (g.course_expected || "").trim() ||
        (g.teacher_expected || "").trim() ||
        (g.themselves_expected || "").trim()
    );

  if (goalsToSave.length === 0) {
    alert("Please enter at least one goal before saving.");
    return;
  }

  try {
    await axios.put(
      "http://127.0.0.1:8000/api/semester-goals",
      { goals: goalsToSave },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    alert("Goals saved successfully!");
  } catch (error) {
    console.error("Failed to save goals:", error);
    alert("Failed to save goals.");
  }
};


  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!semesterId)
    return (
      <p className="text-center mt-4 text-red-500">No semester selected.</p>
    );

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-center items-center bg-[#72afff] text-white py-2 rounded-t-lg">
        <h1 className="text-center text-lg font-semibold">Semester Goals</h1>
      </div>

      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1 text-center">Subject</th>
            <th className="border px-2 py-1">Course Goal</th>
            <th className="border px-2 py-1">Teacher's Expectation</th>
            <th className="border px-2 py-1">Self Expectation</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <SemesterGoal_Row
              key={subject.subject_id}
              subject={subject}
              goal={goals[subject.subject_id] || {
                course_expected: "",
                teacher_expected: "",
                themselves_expected: "",
              }}
              onInputChange={handleInputChange}
            />
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-3">
        <button
          onClick={handleSave}
          className="bg-[#fea500] text-black px-4 py-2 rounded hover:bg-yellow-300"
        >
          Save All Goals
        </button>
      </div>
    </div>
  );
}
