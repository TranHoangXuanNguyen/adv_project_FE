// GoalTable.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SemesterGoal_Row from "../../components/student/SemesterGoal_Row";
import NewGoalForm from "../../components/student/NewGoalForm";

export default function SemesterGoals() {
  const studentId = localStorage.getItem("user_id");
  const [semesterId, setSemesterId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [goals, setGoals] = useState({});
  const [loading, setLoading] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => {
    const init = async () => {
      const storedId = localStorage.getItem("semester_id");
      if (!storedId) return setLoading(false);

      const id = parseInt(storedId);
      setSemesterId(id);

      try {
        const [subjectRes, goalRes] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/semesters/${id}/subjects`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(
            `http://127.0.0.1:8000/api/semester-goals?semester_id=${id}&student_id=${studentId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
        ]);

        setSubjects(subjectRes.data);

        const goalsData = {};
        (goalRes.data.data || []).forEach((goal) => {
          goalsData[goal.subject_id] = {
            course_expected: goal.course_expected || "",
            teacher_expected: goal.teacher_expected || "",
            themselves_expected: goal.themselves_expected || "",
          };
        });
        setGoals(goalsData);
      } catch (err) {
        console.error("Error loading data:", err);
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
    const goalList = Object.entries(goals)
      .map(([subjectId, goal]) => ({
        semester_id: semesterId,
        student_id: parseInt(studentId),
        subject_id: parseInt(subjectId),
        ...goal,
      }))
      .filter(
        (g) =>
          g.course_expected.trim() ||
          g.teacher_expected.trim() ||
          g.themselves_expected.trim()
      );

    if (goalList.length === 0) return alert("No goals to save.");

    try {
      await axios.put(
        "http://127.0.0.1:8000/api/semester-goals",
        { goals: goalList },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Saved successfully!");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Save failed.");
    }
  };

  const handleGoalAdded = (subjectId, newGoalData) => {
    setGoals((prev) => ({
      ...prev,
      [subjectId]: newGoalData,
    }));
    setShowNewForm(false);
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
            <th className="border px-2 py-1">Subject</th>
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
              goal={goals[subject.subject_id]}
              onInputChange={handleInputChange}
            />
          ))}
        </tbody>
      </table>
      {showNewForm && (
        <NewGoalForm
          subjects={subjects}
          semesterId={semesterId}
          studentId={studentId}
          onGoalAdded={handleGoalAdded}
        />
      )}
      <div className="flex justify-between mt-3">
        <button
          onClick={handleSave}
          className="bg-[#fea500] text-black px-4 py-2 rounded hover:bg-yellow-300"
        >
          Save All Goals
        </button>
        {!showNewForm ? (
          <button
            onClick={() => setShowNewForm(true)}
            className="bg-[#72afff] text-white px-4 py-2 rounded hover:bg-blue-300"
          >
            + Add New Goal
          </button>
        ) : (
          <button
            onClick={() => setShowNewForm(false)}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
