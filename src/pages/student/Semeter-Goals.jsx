import React, { useState, useEffect } from "react";
import axios from "axios";

const fakeFetchSemesters = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { semester_id: 1, semester_name: "Semester 1" },
        { semester_id: 2, semester_name: "Semester 2" },
      ]);
    }, 500);
  });
};

const fakeFetchSubjects = (semester_id) => {
  const data = {
    1: [
      { subject_id: 1, subject_name: "IT English" },
      { subject_id: 2, subject_name: "Speaking" },
      { subject_id: 3, subject_name: "Programming" },
    ],
    2: [
      { subject_id: 4, subject_name: "Math" },
      { subject_id: 5, subject_name: "Physics" },
      { subject_id: 6, subject_name: "Chemistry" },
    ],
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data[semester_id] || []);
    }, 500);
  });
};

const GoalTable = () => {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [courses, setCourses] = useState([]);
  const [goalData, setGoalData] = useState({});
  const [error, setError] = useState("");

  // Fetch semesters
  useEffect(() => {
    fakeFetchSemesters().then((data) => {
      setSemesters(data);
      if (data.length > 0) {
        setSelectedSemester(data[0].semester_id);
      }
    });
  }, []);

  // Fetch subjects and restore goal data from localStorage
  useEffect(() => {
    if (selectedSemester) {
      fakeFetchSubjects(selectedSemester).then((data) => {
        setCourses(data);

        // Restore goal data from localStorage for the selected semester
        const savedData = localStorage.getItem(
          `goalData_semester_${selectedSemester}`
        );
        if (savedData) {
          setGoalData(JSON.parse(savedData));
        } else {
          setGoalData({});
        }
      });
    }
  }, [selectedSemester]);

  // Update goalData in localStorage whenever it changes
  useEffect(() => {
    if (selectedSemester) {
      localStorage.setItem(
        `goalData_semester_${selectedSemester}`,
        JSON.stringify(goalData)
      );
    }
  }, [goalData, selectedSemester]);

  const handleInputChange = (e, courseId) => {
    setGoalData({
      ...goalData,
      [courseId]: {
        ...goalData[courseId],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(parseInt(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    const payload = Object.entries(goalData)
      .filter(([courseId, goals]) => {
        return (
          goals.course_expected?.trim() &&
          goals.teacher_expected?.trim() &&
          goals.themselves_expected?.trim()
        );
      })
      .map(([courseId, goals]) => ({
        subject_id: parseInt(courseId),
        semester_id: selectedSemester,
        course_expected: goals.course_expected.trim(),
        teacher_expected: goals.teacher_expected.trim(),
        themselves_expected: goals.themselves_expected.trim(),
      }));

    if (payload.length === 0) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/semester-goals",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API response:", response.data);
      alert("Goals saved to the database successfully!");

      // Clear goal data from localStorage and reset the form
      // localStorage.removeItem(`goalData_semester_${selectedSemester}`);
    } catch (error) {
      console.error("Error submitting goals:", error.response || error);
      setError(
        error.response?.data?.message ||
          "Failed to save goals. Please try again."
      );
    }
  };

  return (
    <div className=" p-2 pl-12">
      <div className="mb-4">
        <label htmlFor="semester" className="block mb-1 font-semibold">
          Select Semester
        </label>
        <select
          id="semester_id"
          value={selectedSemester || ""}
          onChange={handleSemesterChange}
          className="border p-2 rounded"
        >
          {semesters.map((sem) => (
            <option key={sem.semester_id} value={sem.semester_id}>
              {sem.semester_name}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-300 p-3 font-semibold text-left">
                COURSE
              </th>
              <th className="border border-gray-300 p-3 font-semibold text-left">
                What is your goal in this course?
              </th>
              <th className="border border-gray-300 p-3 font-semibold text-left">
                What I expect from the teacher & instructor?
              </th>
              <th className="border border-gray-300 p-3 font-semibold text-left">
                What I expect from myself?
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.subject_id} className="bg-white hover:bg-gray-50">
                <td className="border border-gray-300 p-3 font-medium text-gray-800">
                  {course.subject_name}
                </td>
                {[...Array(3)].map((_, index) => (
                  <td key={index} className="border border-gray-300 p-3">
                    <textarea
                      name={
                        index === 0
                          ? "course_expected"
                          : index === 1
                          ? "teacher_expected"
                          : "themselves_expected"
                      }
                      placeholder="Enter your goal..."
                      value={
                        goalData[course.subject_id]?.[
                          index === 0
                            ? "course_expected"
                            : index === 1
                            ? "teacher_expected"
                            : "themselves_expected"
                        ] || ""
                      }
                      onChange={(e) => handleInputChange(e, course.subject_id)}
                      className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                      rows={3}
                    ></textarea>
                  </td>
                ))}
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No courses available for this semester.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200"
        >
          Save Goals
        </button>
      </form>
    </div>
  );
};

export default GoalTable;
