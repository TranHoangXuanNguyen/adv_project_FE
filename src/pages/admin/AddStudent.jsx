import { useState, useEffect } from "react";
import axios from "axios";

const AddStudent = () => {
  const [email, setEmail] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/student");
      setStudents(response.data); 
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Lỗi khi tải danh sách học sinh");
    }
  };

  const handleAddStudent = async () => {
    if (!email) return alert("Email is required");

    try {
      const response = await axios.post("http://localhost:8000/api/users", {
        email,
        role: "student", // nếu cần phân biệt
      });

      alert("Student added successfully");
      setEmail("");
      fetchStudent(); // cập nhật danh sách sau khi thêm
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message || "Error occurred";
        alert("Error: " + message);
      } else {
        alert("Can not connect to server");
      }
    }
  };

  return (
    <div className="col-md-9 content">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h4 className="student-titlte">Add new student</h4>
        <i className="fa fa-user-circle fa-2x header-icon" />
      </div>

      <div className="input-add mb-4">
        <input
          type="text"
          className="form-control me-4"
          placeholder="Enter student email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-danger" onClick={handleAddStudent}>
          Add new student
        </button>
      </div>

      <hr className="custom-divider mb-4 mt-3" />

      <div className="student-card-big">
        <h4 className="mb-4 student-titlte">Student information</h4>

        {students.length === 0 && <p>No students available.</p>}

        {students.map((student, index) => (
          <div key={index} className="student-card">
            <div className="student-name">{student.name || "No name"}</div>
            <div className="student-info-row">
              <div className="label">Class Name:</div>
              <div className="value">{student.class?.name || "N/A"}</div>
            </div>
            <div className="student-info-row">
              <div className="label">Email Address:</div>
              <div className="value">{student.email}</div>
            </div>
            <div className="actions mt-2">
              <span className="btn-delete">
                <i className="fa fa-trash" /> DELETE
              </span>
              <span className="btn-edit">
                <i className="fa-solid fa-pen-to-square" /> EDIT
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddStudent;
