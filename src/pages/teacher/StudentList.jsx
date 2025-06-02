import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/pages/student.css";
import avatar from "../../assets/img/avatar.jpg";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function StudentList() {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    console.log("ID:", id);
    getStudentByClassId(id);
    getWeeklyGoalsByClassId(id);
  }, []);

  const getWeeklyGoalsByClassId = async (classId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/quantity/${classId}`
      );
      console.log("Weekly goals:", response.data);
      setQuantity(response.data);
    } catch (error) {
      console.error("Error fetching weekly goals:", error);
      return [];
    }
  };

  const getStudentByClassId = async (classId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/class/${classId}/students`
      );
      setStudents(response.data.data.students);
      console.log("Students:", response.data.data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
      return [];
    }
  };

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
              <div
                className="student"
                key={index}
                style={{
                  color:
                    quantity - student.weekly_goal_count > 0
                      ? "red"
                      : "inherit",
                }}
              >
                <div className="infor">
                  <div className="infor-logo">
                    <div className="logo-student">
                      <img src={avatar} alt="avatar" />
                    </div>
                  </div>
                  <div className="infor-name">
                    <h2>{student.name}</h2>
                    <p>{student.email}</p>
                    <p>
                      Missing weekly goal:{" "}
                      {Math.max(0, quantity - student.weekly_goal_count)}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/teacher/viewGoals/${student.user_id}`}
                  className="student-details"
                >
                  <p>
                    <i className="fa-solid fa-hand-pointer" />
                  </p>
                  <h5>Detail</h5>
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
