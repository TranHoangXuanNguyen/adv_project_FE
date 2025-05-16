import { useEffect, useState } from "react";
import axios from "axios";

const GoalTable = () => {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [goals, setGoals] = useState([]);

  const fakeFetchSemesters = () => {
    return Promise.resolve([
      { semester_id: 1, semester_name: "Semester 1" },
      { semester_id: 2, semester_name: "Semester 1" },
      { semester_id: 3, semester_name: "Semester 1" },
    ]);
  };

  const fakeFetchSubjects = (semester_id) => {
    const data = {
      1: [
        { subject_id: 1, subject_name: "Math" },
        { subject_id: 2, subject_name: "Science" },
      ],
      2: [
        { subject_id: 3, subject_name: "Math" },
        { subject_id: 4, subject_name: "Science" },
      ],
      3: [
        { subject_id: 5, subject_name: "Math" },
        { subject_id: 6, subject_name: "Science" },
      ],
    };
    return Promise.resolve(data[semester_id] || []);
  };

  const handleSelectSemester = (e) => {
    const semesterId = parseInt(e.target.value);
    setSelectedSemester(semesterId);
  };

  const handleChange = (subjectId, field, value) => {
    const updatedGoals = goals.map((goal) =>
      goal.subject_id === subjectId ? { ...goal, [field]: value } : goal
    );
    setGoals(updatedGoals);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = goals.map((goal) => ({
        ...goal,
        semester_id: selectedSemester, // Add semester_id here
      }));

      await axios.post(
        "http://127.0.0.1:8000/api/semester-goals",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const fetchSavedGoals = async (semester_id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://127.0.0.1:8000/api/semester-goals?semester_id=${semester_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const savedGoals = res.data;

      if (savedGoals.length > 0) {
        setGoals(savedGoals);
        const uniqueSubjects = savedGoals.map(g => ({
          subject_id: g.subject_id,
          subject_name: g.subject_name || "Unknown"
        }));
        setSubjects(uniqueSubjects);
      } else {
        const subjectList = await fakeFetchSubjects(semester_id);
        setSubjects(subjectList);
        const newGoals = subjectList.map((subject) => ({
          semester_id: semester_id,
          subject_id: subject.subject_id,
          course_expected: "",
          teacher_expected: "",
          themselves_expected: "",
        }));
        setGoals(newGoals);
      }
    } catch (error) {
      console.error("Error fetching saved goals:", error);
    }
  };

  useEffect(() => {
    fakeFetchSemesters().then(setSemesters);
  }, []);

  useEffect(() => {
    if (selectedSemester) {
      fetchSavedGoals(selectedSemester);
    }
  }, [selectedSemester]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Set Your Semester Goals</h1>
      <div className="mb-4">
        <label className="mr-2 font-medium">Select Semester:</label>
        <select
          value={selectedSemester || ""}
          onChange={handleSelectSemester}
          className="border rounded px-2 py-1"
        >
          <option value="" disabled>Select</option>
          {semesters.map((sem) => (
            <option key={sem.semester_id} value={sem.semester_id}>
              {sem.semester_name}
            </option>
          ))}
        </select>
      </div>

      {subjects.length > 0 && (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">Subject</th>
              <th className="border px-2 py-1">Course Expected</th>
              <th className="border px-2 py-1">Teacher Expected</th>
              <th className="border px-2 py-1">Your Own Expected</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => {
              const goal = goals.find((g) => g.subject_id === subject.subject_id);
              return (
                <tr key={subject.subject_id}>
                  <td className="border px-2 py-1">{subject.subject_name}</td>
                  <td className="border px-2 py-1">
                    <input
                      value={goal?.course_expected || ""}
                      onChange={(e) =>
                        handleChange(subject.subject_id, "course_expected", e.target.value)
                      }
                      className="w-full px-1 border rounded"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      value={goal?.teacher_expected || ""}
                      onChange={(e) =>
                        handleChange(subject.subject_id, "teacher_expected", e.target.value)
                      }
                      className="w-full px-1 border rounded"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      value={goal?.themselves_expected || ""}
                      onChange={(e) =>
                        handleChange(subject.subject_id, "themselves_expected", e.target.value)
                      }
                      className="w-full px-1 border rounded"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {subjects.length > 0 && (
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Goals
        </button>
      )}
    </div>
  );
};

export default GoalTable;