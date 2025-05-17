import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../assets/css/pages/classjournal.css";
import axios from "axios";
// import { useParams } from "react-router-dom";

const ClassJournal = () => {
  const { id } = useParams(); // week_track_id
  const user_id = localStorage.getItem("user_id");

  const [showForm, setShowForm] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [ShowInfor, setShowInfor] = useState([]);
  const [formData, setForm] = useState({
    user_id: "",
    subject_id: "",
    week_track_id: "",
    date: "",
    lesson_learn: "",
    difficult: "",
    plan_to_improve: "",
    in_solve: false,
    self_assessment: "",
  });

  // Set week_track_id khi id thay đổi
  useEffect(() => {
    if (id) {
      setForm((prev) => ({
        ...prev,
        week_track_id: id,
      }));
    }
  }, [id]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const semester_id = localStorage.getItem("semester_id");
      try {
        const res = await axios.get(
          `http://localhost:8000/api/semesters/${semester_id}/subjects`
        );
        setSubjects(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy môn học:", error);
      }
    };
    const fetchWeeklyClassPlan = async () => {
      const user_id = localStorage.getItem("user_id");
      if (!user_id || !id) return;

      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/weekly/class-plan",
          {
            params: {
              user_id: user_id,
              week_track_id: id,
            },
          }
        );
        console.log("API response data:", res.data);

        // Nếu res.data là object, cần lấy đúng mảng bên trong
        // Ví dụ: res.data.data hoặc res.data.class_plans hoặc cái gì đó
        const dataArray = Array.isArray(res.data)
          ? res.data
          : res.data.data || []; // Thay đổi theo cấu trúc API thật

        setShowInfor(dataArray);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu weekly class plan:", error);
      }
    };

    fetchSubjects();
    fetchWeeklyClassPlan();
  }, [id]);

  const openForm = () => {
    const user_id = localStorage.getItem("user_id") || "";
    setForm((prev) => ({
      ...prev,
      user_id,
    }));
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      in_solve: formData.in_solve ? 1 : 0,
      week_track_id: parseInt(formData.week_track_id, 10),
      user_id: parseInt(formData.user_id, 10),
      subject_id: parseInt(formData.subject_id, 10),
      self_assessment: parseInt(formData.self_assessment, 10),
    };

    console.log("Payload gửi lên API:", payload);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/classplan",
        payload
      );
      setShowInfor((prev) => [...prev, res.data]);
      setForm((prev) => ({
        ...prev,
        date: "",
        subject_id: "",
        lesson_learn: "",
        difficult: "",
        plan_to_improve: "",
        in_solve: false,
        self_assessment: "",
      }));
      setShowForm(false);
    } catch (error) {
      console.error("Lỗi khi lưu class plan:", error.response || error);
    }
  };

  return (
    <div className="main-content">
      <div className="top-controls">
        <div className="tab-buttons">
          <button type="button" className="btn-class">
            In class
          </button>
          <button type="button" className="btn-class">
            Self study
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th colSpan={6} className="in-class-header">
                IN CLASS
              </th>
            </tr>
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
            {ShowInfor.map((infor, index) => (
              <tr key={index}>
                <td>{infor.date}</td>
                <td>{infor.subject?.subject_name || "N/A"}</td>
                <td>{infor.lesson_learn}</td>
                <td>{infor.difficult}</td>
                <td>{infor.plan_to_improve}</td>
                <td>{infor.in_solve ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="form-add-btn">
          <button type="button" className="btn-class-add" onClick={openForm}>
            <i className="fa-solid fa-plus" />
          </button>
        </div>

        {showForm && (
          <div className="popup-overlay">
            <div className="form-container popup-form">
              <div className="form-title">
                <span className="title-text">Learning Notes</span>
                <button
                  type="button"
                  className="button-exist"
                  onClick={closeForm}
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject_id">Subject</label>
                    <select
                      name="subject_id"
                      value={formData.subject_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select Subject --</option>
                      {subjects.map((subj) => (
                        <option key={subj.subject_id} value={subj.subject_id}>
                          {subj.subject_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="lesson_learn">What I learned today</label>
                    <textarea
                      id="lesson_learn"
                      name="lesson_learn"
                      value={formData.lesson_learn}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="difficult">Challenges faced</label>
                    <textarea
                      id="difficult"
                      name="difficult"
                      value={formData.difficult}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="self_assessment">Self Assessment</label>
                    <select
                      id="self_assessment"
                      name="self_assessment"
                      value={formData.self_assessment}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select Level --</option>
                      <option value="1">1 - Chưa tốt</option>
                      <option value="2">2 - Tạm ổn</option>
                      <option value="3">3 - Tốt</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="plan_to_improve">How to solve</label>
                    <textarea
                      id="plan_to_improve"
                      name="plan_to_improve"
                      value={formData.plan_to_improve}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="in_solve">Problem solved</label>
                    <br />
                    <input
                      type="checkbox"
                      id="in_solve"
                      name="in_solve"
                      checked={formData.in_solve}
                      onChange={handleChange}
                    />
                    <label htmlFor="in_solve"> Yes</label>
                  </div>
                </div>

                <button type="submit" className="submit-btn">
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassJournal;
