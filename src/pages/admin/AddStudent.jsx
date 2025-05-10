import { useState } from "react";
import axios from "axios";

const AddStudent = () => {
  const [email, setEmail] = useState("");
  const [students, setStudents] = useState([]);

  const handleAddStudent = async () => {
    if (!email) return alert("Email is required");
    try {
      const response = await axios.post("http://localhost:8000/api/student", {
        email,
      });
      console.log(response.data); 
      setStudents([...students, response.data]);
      setEmail("");
    } catch (error) {
      console.error("Error adding student: ", error);
    }
  };

  const onChange = (e) => {
    setEmail(e.target.value);
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
          onChange={onChange}
        />
        <button className="btn btn-danger" onClick={handleAddStudent}>
          Add new student
        </button>
      </div>
      <hr className="custom-divider mb-4 mt-3" />

      <div className="student-card-big">
        <h4 className="mb-4 student-titlte">Student information</h4>
        {students.map((student, index) => (
          <div key={index} className="student-card">
            <div className="student-name">{student.name || "No name"}</div>
            <div className="student-info-row">
              <div className="label">Class Name:</div>
              <div className="value">{student.className || "N/A"}</div>
            </div>
            <div className="student-info-row">
              <div className="label">Email Address:</div>
              <div className="value">{student.email}</div>
            </div>
            <div className="actions mt-2">
              <span className="btn-delete"><i className="fa fa-trash" /> DELETE</span>
              <span className="btn-edit"><i className="fa-solid fa-pen-to-square" /> EDIT</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddStudent;
