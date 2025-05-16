import React, { useState, useEffect } from "react";
import { FaUniversity } from "react-icons/fa";
import axios from "axios";

export default function AddClass() {
  const [className, setClassName] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [semesterName, setSemesterName] = useState("");
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/class");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/student");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleAddClass = async () => {
    const token = localStorage.getItem("token");
    if (!className.trim()) {
      alert("Class name is required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/class",
        { name: className },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newClass = {
        id: response.data.id,
        name: className,
        current_semester: { semester_name: "N/A" },
        student_count: 0,
      };
      setClasses((prev) => [...prev, newClass]);
      setClassName("");
      alert("Class created successfully");
    } catch (error) {
      alert("Error creating class");
    }
  };

  const handleOpenModal = (cls) => {
    setSelectedClass(cls);
    setShowModal(true);
  };

  const handleAddStudent = async () => {
    console.log("Selected Student ID:", selectedStudentId);
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:8000/api/class/${selectedClass.class_id}/students`,
        { student_ids: [selectedStudentId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchClasses();
      alert("Student added to class!");
    } catch (error) {
      alert("Error adding student");
    }
  };

  const handleAddSemester = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:8000/api/class/${selectedClass.class_id}/semester`,
        { semester_name: semesterName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Semester created!");
    } catch (error) {
      alert("Error creating semester");
    }
  };

  const handleAddSubject = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:8000/api/semesters/${selectedClass.current_semester.semester_id}/subject`,
        { subject_name: subjectName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    fetchClasses();
      alert("Subject created!");
    } catch (error) {
      alert("Error creating subject");
    }
  };

  return (
    <div className="col-md-9 content">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h4 className="student-titlte">Class Manager</h4>
      </div>
      <div className="input-add mb-4">
        <input
          type="text"
          className="form-control me-4"
          placeholder="Enter class name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700"
          onClick={handleAddClass}
        >
          Create new class
        </button>
      </div>
      <hr className="mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls.class_id}
            className="bg-white shadow-md rounded-lg p-4 flex items-start gap-4"
          >
            <div
              className="bg-red-800 text-white p-4 rounded-xl shadow-lg cursor-pointer"
              onClick={() => handleOpenModal(cls)}
            >
              <FaUniversity className="text-3xl" />
            </div>
            <div>
              <p className="font-semibold">Class: {cls.name}</p>
              <p>Semester: {cls.current_semester?.semester_name || "N/A"}</p>
              <p>Total students: {cls.student_count}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">
              Manage: {selectedClass.name}
            </h3>

            <div className="mb-4">
              <label className="block font-medium">Add Student</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
              >
                <option value="">-- Select Student --</option>
                {students.map((student) => (
                  <option key={student.user_id} value={student.user_id}>
                    {student.name}
                  </option>
                ))}
              </select>
              <button
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
                onClick={handleAddStudent}
              >
                Add
              </button>
            </div>

            <div className="mb-4">
              <label className="block font-medium">New Semester</label>
              <input
                type="text"
                value={semesterName}
                onChange={(e) => setSemesterName(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
              />
              <button
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
                onClick={handleAddSemester}
              >
                Create
              </button>
            </div>

            <div className="mb-4">
              <label className="block font-medium">New Subject</label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
              />
              <button
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
                onClick={handleAddSubject}
              >
                Create
              </button>
            </div>

            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
