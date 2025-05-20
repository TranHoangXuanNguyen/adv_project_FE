import React, { useEffect, useState } from "react";
import axios from "axios";

const GoalTable = () => {
  const [semesterId, setSemesterId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [goals, setGoals] = useState({});
  const [loading, setLoading] = useState(true);

  // State cho hàng thêm mới
  const [newGoal, setNewGoal] = useState({
    subject_id: "",
    course_expected: "",
    teacher_expected: "",
    themselves_expected: "",
  });

  useEffect(() => {
    const init = async () => {
      const storedId = localStorage.getItem("semester_id");
      if (!storedId) {
        console.error("No semester ID found in localStorage.");
        setLoading(false);
        return;
      }

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
            `http://127.0.0.1:8000/api/semester-goals?semester_id=${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
        ]);

        setSubjects(subjectRes.data);

        const goalsData = {};
        (goalRes.data?.data || []).forEach((goal) => {
          goalsData[goal.subject_id] = {
            course_expected: goal.course_expected || "",
            teacher_expected: goal.teacher_expected || "",
            themselves_expected: goal.themselves_expected || "",
          };
        });
        setGoals(goalsData);
      } catch (err) {
        console.error("Error initializing data:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

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
    if (!semesterId) return;

    try {
      const goalsArray = Object.entries(goals)
        .map(([subjectId, goal]) => ({
          semester_id: semesterId,
          subject_id: parseInt(subjectId),
          ...goal,
        }))
        .filter(
          (goal) =>
            goal.course_expected.trim() !== "" ||
            goal.teacher_expected.trim() !== "" ||
            goal.themselves_expected.trim() !== ""
        );

      console.log("Goals to save:", JSON.stringify(goalsArray, null, 2));

      if (goalsArray.length === 0) {
        alert("No goal data to save.");
        return;
      }

      await axios.post(
        "http://127.0.0.1:8000/api/semester-goals",
        { goals: goalsArray },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Saved successfully!");
    } catch (error) {
      console.error("Error saving goals:", error);
      if (error.response) {
        alert(
          "Failed to save: " + (error.response.data.message || "Unknown error")
        );
        console.error("Server response:", error.response.data);
      } else {
        alert("Failed to save due to network or unknown error.");
      }
    }
  };

  // Xử lý thay đổi input ở hàng thêm mới
  const handleNewGoalChange = (field, value) => {
    setNewGoal((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Xử lý thêm mới 1 goal
  const handleAddGoal = async () => {
    if (!semesterId) {
      alert("No semester selected.");
      return;
    }
    if (!newGoal.subject_id) {
      alert("Please select a subject.");
      return;
    }

    if (
      !newGoal.course_expected.trim() &&
      !newGoal.teacher_expected.trim() &&
      !newGoal.themselves_expected.trim()
    ) {
      alert("Please fill at least one goal field.");
      return;
    }

    try {
      const postData = {
        goals: [
          {
            semester_id: semesterId,
            subject_id: parseInt(newGoal.subject_id),
            course_expected: newGoal.course_expected,
            teacher_expected: newGoal.teacher_expected,
            themselves_expected: newGoal.themselves_expected,
          },
        ],
      };

      console.log("Adding new goal:", JSON.stringify(postData, null, 2));

      await axios.post("http://127.0.0.1:8000/api/semester-goals", postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setGoals((prev) => ({
        ...prev,
        [newGoal.subject_id]: {
          course_expected: newGoal.course_expected,
          teacher_expected: newGoal.teacher_expected,
          themselves_expected: newGoal.themselves_expected,
        },
      }));

      setNewGoal({
        subject_id: "",
        course_expected: "",
        teacher_expected: "",
        themselves_expected: "",
      });

      alert("Added new goal successfully!");
    } catch (error) {
      console.error("Error adding new goal:", error);
      if (error.response) {
        alert(
          "Failed to add new goal: " +
            (error.response.data.message || "Unknown error")
        );
        console.error("Server response:", error.response.data);
      } else {
        alert("Failed to add new goal due to network or unknown error.");
      }
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!semesterId)
    return (
      <p className="text-center mt-4 text-red-500">No semester selected.</p>
    );

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-center items-center">
        <h1 className="text-center text-lg font-semibold">Semester Goals</h1>
      </div>
      <table className="table-auto border-collapse border border-gray-400 w-full mt-4">
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
            <tr key={subject.subject_id}>
              <td className="border px-2 py-1">{subject.subject_name}</td>
              {[
                "course_expected",
                "teacher_expected",
                "themselves_expected",
              ].map((field) => (
                <td key={field} className="border px-2 py-1">
                  <input
                    type="text"
                    value={goals[subject.subject_id]?.[field] || ""}
                    onChange={(e) =>
                      handleInputChange(
                        subject.subject_id,
                        field,
                        e.target.value
                      )
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
              ))}
            </tr>
          ))}

          {/* Hàng thêm mới */}
          <tr className="bg-yellow-50">
            <td className="border px-2 py-1">
              <select
                value={newGoal.subject_id}
                onChange={(e) =>
                  handleNewGoalChange("subject_id", e.target.value)
                }
                className="w-full px-2 py-1 border border-gray-300 rounded"
              >
                <option value="">-- Select Subject --</option>
                {subjects.map((subj) => (
                  <option key={subj.subject_id} value={subj.subject_id}>
                    {subj.subject_name}
                  </option>
                ))}
              </select>
            </td>
            <td className="border px-2 py-1">
              <input
                type="text"
                value={newGoal.course_expected}
                onChange={(e) =>
                  handleNewGoalChange("course_expected", e.target.value)
                }
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </td>
            <td className="border px-2 py-1">
              <input
                type="text"
                value={newGoal.teacher_expected}
                onChange={(e) =>
                  handleNewGoalChange("teacher_expected", e.target.value)
                }
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </td>
            <td className="border px-2 py-1">
              <input
                type="text"
                value={newGoal.themselves_expected}
                onChange={(e) =>
                  handleNewGoalChange("themselves_expected", e.target.value)
                }
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-between mt-3">
        {" "}
        <button
          onClick={handleSave}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
        >
          {" "}
          Save All Goals{" "}
        </button>
        <button
          onClick={handleAddGoal}
          className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-300"
        >
          Add New Goal
        </button>
      </div>
    </div>
  );
};

export default GoalTable;
