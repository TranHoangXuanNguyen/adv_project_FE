import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const fields = [
  "Date",
  "Skill/subject",
  "What I learned",
  "Time allocation",
  "Learning resources",
  "Learning activities",
  "Plan & follow plan",
  "Evaluation of my work",
  "Reinforcing learning",
];

export default function MyGoals() {
  const { id } = useParams();
  const user_id = localStorage.getItem("user_id");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    subject_id: "",
    skill: "",
    whatLearned: "",
    time: "",
    resources: "",
    activities: "",
    plan: "",
    evaluation: "",
    reinforce: "",
  });

  const [dataRows, setDataRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([]);

  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/weekly/self-plan",
        {
          params: {
            user_id: user_id,
            week_track_id: id,
          },
        }
      );
      setDataRows(response.data.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    fetchPlans();
    fetchSubjects();
  }, []);

  // Xử lý khi thay đổi form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gửi dữ liệu mới lên server
  const handleAddRow = async () => {
    try {
      setIsLoading(true);
      const postData = {
        user_id: parseInt(user_id),
        subject_id: formData.subject_id,
        week_track_id: parseInt(id),
        lesson_learn: formData.whatLearned,
        time_spend: formData.time,
        learning_resource: formData.resources,
        learning_activities: formData.activities,
        in_solve: formData.plan,
        concentration: formData.evaluation,
        date: formData.date,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/weekly/self-plan",
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Cập nhật danh sách và reset form
      setDataRows([...dataRows, response.data.data]);
      setFormData({
        date: "",
        skill: "",
        whatLearned: "",
        time: "",
        resources: "",
        activities: "",
        plan: "",
        evaluation: "",
        reinforce: "",
      });
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error("Error submitting form:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" max-w-7xl mx-auto">
      {/* Hiển thị lỗi */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {/* Nút chuyển chế độ */}
      <div className="tab-buttons mb-4 flex gap-3">
        <Link to={`/student/weekinfo/${id}/journal`} className="btn-class">
          In class
        </Link>
        <Link to={`/student/weekinfo/${id}/self`} className="btn-class">
          Self study
        </Link>
      </div>

      {/* Bảng dữ liệu */}
      {isLoading ? (
        <div className=" py-4 text-gray-600 text-sm">Loading data...</div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table
            className="min-w-full divide-y divide-gray-200"
            style={{ tableLayout: "fixed" }}
          >
            <thead className="bg-blue-100">
              <tr>
                {fields.map((field, index) => (
                  <th
                    key={index}
                    className=" break-words whitespace-normal px-2 py-1 text-sm"
                    style={{ minWidth: "80px" }}
                  >
                    {field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dataRows.length > 0 ? (
                dataRows.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 text-sm">{row.date}</td>
                    <td className="px-6 py-4 text-sm">
                      {row.skill || row.subject?.name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {row.whatLearned || row.lesson_learn}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {row.time || row.time_spend}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {row.resources || row.learning_resource}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {row.activities || row.learning_activities}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {row.plan || row.in_solve}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {row.evaluation || row.concentration}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {row.reinforce || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={fields.length}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Nút mở form thêm mới */}
      <div className="mt-4">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="text-2xl px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={isLoading}
          >
            +
          </button>
        ) : (
          <div className="mt-4 border p-4 rounded bg-gray-50 shadow">
            <h3 className="text-lg font-semibold mb-3">Add New Entry</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
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
              <textarea
                name="whatLearned"
                value={formData.whatLearned}
                onChange={handleChange}
                placeholder="What I learned"
                className="border p-2 rounded"
                rows={2}
                required
              />
              <input
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="Time allocation"
                className="border p-2 rounded"
                required
              />
              <input
                name="resources"
                value={formData.resources}
                onChange={handleChange}
                placeholder="Learning resources"
                className="border p-2 rounded"
              />
              <textarea
                name="activities"
                value={formData.activities}
                onChange={handleChange}
                placeholder="Learning activities"
                className="border p-2 rounded"
                rows={2}
              />
              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="" disabled>
                  is Solve
                </option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              <select
                name="evaluation"
                value={formData.evaluation}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">Select evaluation</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
              <textarea
                name="reinforce"
                value={formData.reinforce}
                onChange={handleChange}
                placeholder="Reinforcing learning"
                className="border p-2 rounded"
                rows={2}
              />
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleAddRow}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
