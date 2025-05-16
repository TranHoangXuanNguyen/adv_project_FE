import { useState } from "react";
import axios from "axios";
const AddTeacher = () => {
  const [email, setEmail] = useState("");
  const [students, setStudents] = useState([]);
  const handleAddTeacher = async () => {
    if (!email) return alert("Email is required");
    try {
      const response = await axios.post("http://localhost:8000/api/users", {
        email,
        role: "teacher"
      });
      console.log(response.data);
      setStudents([...students, response.data]);
      setEmail("");
      alert("Teacher added successfully");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          alert("You are not a Admin");
        } else {
          alert("Error: " + (error.response.data.message || "Unknown error"));
        }
      } else {
        alert("Can not connect to server, please try again later");
      }
      console.error("Error adding class:", error);
    }
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="col-md-9 content">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h4 className="student-titlte">Add new teacher</h4>
        <i className="fa fa-user-circle fa-2x header-icon" />
      </div>
      <div className="input-add mb-4">
        <input
          type="text"
          className="form-control me-4"
          placeholder="Enter teacher email"
          value={email}
          onChange={onChange}
        />
        <button className="btn btn-danger" onClick={handleAddTeacher}>Add new teacher</button>
      </div>
      <hr className="custom-divider mb-4 mt-3" />
      {/* Duplicate Student Info Cards for demo */}
      <div className="student-card-big">
        <h4 className="mb-4 student-titlte">Teacher information</h4>
        <div className="student-card">
          <div className="student-name">Xuan Nguyen</div>
          <div className="student-info-row">
            <div className="label">Subject:</div>
            <div className="value">English Teacher</div>
          </div>
          <div className="student-info-row">
            <div className="label">Email Address:</div>
            <div className="value">
              nguyen.tran26@student.passerellesnumeriques.com
            </div>
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
      </div>
    </div>
  );
};

export default AddTeacher;
