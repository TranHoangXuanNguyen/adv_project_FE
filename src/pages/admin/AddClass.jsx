import React, { useState, useEffect } from "react";
import { FaUniversity } from "react-icons/fa";
import axios from "axios";

export default function AddClass() {
  const [className, setClassName] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState([]);
  const [semesterName, setSemesterName] = useState("");
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}0/api/class`);
      setClasses(response.data.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/student`);
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
        `${process.env.REACT_APP_API_URL}/api/class`,
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
        `${process.env.REACT_APP_API_URL}/api/class/${selectedClass.class_id}/students`,
        { student_ids: selectedStudentId },
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
        `${process.env.REACT_APP_API_URL}/api/class/${selectedClass.class_id}/semester`,
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
        `${process.env.REACT_APP_API_URL}/api/semesters/${selectedClass.current_semester.semester_id}/subject`,
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
    <div className="col-md-9 w-full content">
      <div className="d-flex justify-content-start align-items-start mb-5">
        <h4 className="student-titlte text-2xl">Class Manager</h4>
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
          onClick={handleAddClass}>
          Create new class
        </button>
      </div>
      <hr className="mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div  key={cls.class_id}
          className="bg-white shadow-md rounded-lg p-4 flex items-start gap-4 hover:shadow-xl transition-shadow duration-300" >
          
            <div
              className="bg-blue-400 text-white p-4 rounded-xl shadow-md cursor-pointer hover:bg-blue-700 transition-colors duration-300"
              onClick={() => handleOpenModal(cls)}    >
              <FaUniversity className="text-3xl" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Class: {cls.name}</p>
              <p className="text-gray-600">Semester: {cls.current_semester?.semester_name || "N/A"}</p>
              <p className="text-gray-600">Total students: {cls.student_count}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <div className="bg-white rounded-2xl p-8 w-full max-w-4xl shadow-lg relative">
    
            {/* Nút X đóng góc phải */}
            <button
              className="absolute top-6 right-8 text-red-500 hover:text-red-700 text-4xl font-bold"
              onClick={() => setShowModal(false)}     >      ×  </button>

            {/* Tiêu đề canh giữa */}
            <div className="flex justify-center mb-3">
              <h3 className="text-2xl font-bold text-black-800">
                Manage: {selectedClass.name}
              </h3>
       </div>
          {/* Add multiple students */}
          <div className="mb-6">
          <label className="block font-medium text-gray-800 mb-2 ">Add Students:</label>

          <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm max-h-60 overflow-y-auto space-y-2">
            {students.map((student) => (
              <label  key={student.user_id}  className="flex items-center space-x-3 cursor-pointer text-gray-700 hover:bg-gray-100 rounded-lg px-2 py-1 transition"
              >
                <input
                  type="checkbox"
                  value={student.user_id}
                  checked={selectedStudentId.includes(student.user_id)}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setSelectedStudentId((prev) => e.target.checked ? [...prev, value] : prev.filter((id) => id !== value)
                    );
                  }}
                  className="accent-blue-500"
                />
                <span className="text">{student.name}</span>
              </label>
            ))}
          </div>

          <button  onClick={handleAddStudent}
            className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-xl shadow transition duration-300"
          >
            ➕ Add Selected Students
          </button>
      </div>


          {/* Semester and Subject side-by-side */}
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex-1">
              <label className="block font-medium text-black-700 mb-1 ">New Semester:</label>
              <input
                type="text"
                value={semesterName}
                onChange={(e) => setSemesterName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <button
                className="mt-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow  mt-4"
                onClick={handleAddSemester}
              >
                Create
              </button>
            </div>

            <div className="flex-1">
              <label className="block font-medium text-gray-700 mb-1 ">New Subject:</label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <button
                className="mt-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow  mt-4"
                onClick={handleAddSubject}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
            )}
          </div>
        );
      }
