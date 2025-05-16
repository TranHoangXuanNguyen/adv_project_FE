import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/pages/student.css";
import avatar from "../../assets/img/avatar.jpg";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu sinh viên:", error);
      });
  }, []);

  return (
    <div className="body">
      <div className="body-center">
        <div className="body-center-title">
          <p>
            <b>Students Manager</b>
          </p>
          <p>{students.length} Students</p>
        </div>
        <div className="body-center-list">
          <div className="list-students">
            {students.map((student, index) => (
              <div className="student" key={index}>
                <div className="infor">
                  <div className="infor-logo">
                    <div className="logo-student">
                      <img src={avatar} alt="avatar" />
                    </div>
                  </div>
                  <div className="infor-name">
                    <h2>{student.name}</h2>
                    <p>{student.email}</p>
                  </div>
                </div>
                <div className="student-details">
                  <p>
                    <i className="fa-solid fa-hand-pointer" />
                  </p>
                  <h5>Detail</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
