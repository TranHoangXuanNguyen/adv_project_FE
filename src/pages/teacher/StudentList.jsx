import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/pages/student.css";
import avatar from "../../assets/img/avatar.jpg";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function StudentList() {
  const { id } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    console.log("ID:", id);
    axios
      .get(`http://127.0.0.1:8000/api/class/${id}`)
      .then((response) => {
        console.log("API data:", response.data.data); // kiểm tra dữ liệu
        setStudents(response.data.data.students); // Giả sử dữ liệu sinh viên nằm trong trường "students"
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
            <b>Students Management</b>
          </p>
          <p className="pr-5 font-weight-bold">{students.length} Students</p>
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
                    <p className="infor-name">
                      {student.email.length > 15
                        ? student.email.slice(0, 15) + "..."
                        : student.email}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/teacher/viewGoals/${student.user_id}`}
                  className="student-details"
                >
                    <p>
                      <i className="fas fa-hand-pointer"></i>
                    </p>
                    <h5 className=" pe-4 pl-4">Detail</h5>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
