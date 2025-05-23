import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";




const ShowClassStudy = () => {
  const { studentId, weekId } = useParams(); // lấy từ URL




  const [showInfor, setShowInfor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");




  useEffect(() => {
    const fetchWeeklyClassPlan = async () => {
      if (!studentId || !weekId) {
        setError("Missing student ID or week ID");
        return;
      }




      setLoading(true);
      setError("");




      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/weekly/class-plan",
          {
            params: {
              user_id: studentId,
              week_track_id: weekId,
            },
          }
        );




        if (res.data.success) {
          setShowInfor(res.data.data || []);
        } else {
          setError(res.data.message || "Failed to load data");
          setShowInfor([]);
        }
      } catch (error) {
        console.error("Error fetching weekly class plan:", error);
        setError("Failed to load data.");
        setShowInfor([]);
      } finally {
        setLoading(false);
      }
    };




    fetchWeeklyClassPlan();
  }, [studentId, weekId]);




  return (
    <div className="main-content">
      <div className="mb-2 flex gap-2">
        <NavLink
          to={`/teacher/class_study/${studentId}/${weekId}`}
          className={({ isActive }) =>
            `bg-[#73aeff] text-white px-4 py-2 rounded-lg hover:bg-[#7a9ab6] ${
              isActive ? "bg-orange-400" : ""
            }`
          }
        >
          In Class
        </NavLink>
        <NavLink
          to={`/teacher/self_study/${studentId}/${weekId}`}
          className={({ isActive }) =>
            `bg-[#73aeff] text-white px-4 py-2 rounded-lg hover:bg-[#7a9ab6] ${
              isActive ? "bg-orange-400" : ""
            }`
          }
        >
          Self Study
        </NavLink>
      </div>




      <div className="bg-[#73aeff] py-2 rounded flex justify-center items-center">
        <h2 className="text-center text-lg font-semibold">In Class-Study</h2>
      </div>




      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}




      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Skill/Subject</th>
                <th>What I learned today</th>
                <th>Challenges faced</th>
                <th>How to solve</th>
                <th>Problem solved</th>
              </tr>
            </thead>
            <tbody>
              {showInfor.length > 0 ? (
                showInfor.map((infor, index) => (
                  <tr key={index}>
                    <td>{infor.date}</td>
                    <td>{infor.subject?.subject_name || "N/A"}</td>
                    <td>{infor.lesson_learn}</td>
                    <td>{infor.difficult}</td>
                    <td>{infor.plan_to_improve}</td>
                    <td>{infor.in_solve ? "Yes" : "No"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};




export default ShowClassStudy;



