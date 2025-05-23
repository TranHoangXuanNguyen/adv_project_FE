import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

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
  const { id } = useParams(); // week_track_id
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
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
  const [dataRows, setDataRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hàm fetch dữ liệu từ API
  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/self-study-plans"
      );
      setDataRows(response.data.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load dữ liệu khi component mount
  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRow = async () => {
    try {
      setIsLoading(true);

      // Chuẩn bị dữ liệu để gửi lên API
      const postData = {
        subject_id: 1, // Bạn cần lấy ID môn học thực tế
        week_track_id: 1, // Bạn cần lấy ID tuần thực tế
        lesson_learn: formData.whatLearned,
        time_spend: formData.time,
        learning_resource: formData.resources,
        learning_activities: formData.activities,
        in_solve: formData.plan,
        concentration: formData.evaluation,
        date: formData.date,
      };

      // Gọi API POST
      const response = await axios.post(
        "http://your-api-domain/api/self-study-plans",
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Nếu có auth
            "Content-Type": "application/json",
          },
        }
      );

      // Cập nhật state với dữ liệu mới từ server
      setDataRows([...dataRows, response.data.data]);

      // Reset form
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
    <div className="p-4">
      {/* Hiển thị lỗi nếu có */}
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* Mode buttons */}
      <div className="mb-4 flex gap-2">
        <Link to={`/student/weekinfo/${id}/journal`} className="btn-class">
          In class
        </Link>
        <Link to={`/student/weekinfo/${id}/self`} className="btn-class">
          Self study
        </Link>
      </div>


      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                {fields.map((field, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-2 py-2 text-center font-medium"
                  >
                    {field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border px-2 py-1">{row.date}</td>
                  <td className="border px-2 py-1">
                    {row.skill || row.subject?.name}
                  </td>
                  <td className="border px-2 py-1">
                    {row.whatLearned || row.lesson_learn}
                  </td>
                  <td className="border px-2 py-1">
                    {row.time || row.time_spend}
                  </td>
                  <td className="border px-2 py-1">
                    {row.resources || row.learning_resource}
                  </td>
                  <td className="border px-2 py-1">
                    {row.activities || row.learning_activities}
                  </td>
                  <td className="border px-2 py-1">
                    {row.plan || row.in_solve}
                  </td>
                  <td className="border px-2 py-1">
                    {row.evaluation || row.concentration}
                  </td>
                  <td className="border px-2 py-1">{row.reinforce || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Nút + để mở form */}
      <div className="mt-4">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="text-2xl px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "+"}
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
                className="input border p-2 rounded"
                required
              />
              <input
                name="skill"
                value={formData.skill}
                onChange={handleChange}
                placeholder="Skill/Subject"
                className="input border p-2 rounded"
                required
              />
              <textarea
                name="whatLearned"
                value={formData.whatLearned}
                onChange={handleChange}
                placeholder="What I learned"
                className="input border p-2 rounded"
                required
                rows={2}
              />
              <input
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="Time allocation (e.g., 2 hours)"
                className="input border p-2 rounded"
                required
              />
              <input
                name="resources"
                value={formData.resources}
                onChange={handleChange}
                placeholder="Learning resources"
                className="input border p-2 rounded"
              />
              <textarea
                name="activities"
                value={formData.activities}
                onChange={handleChange}
                placeholder="Learning activities"
                className="input border p-2 rounded"
                rows={2}
              />
              <textarea
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                placeholder="Plan & follow plan"
                className="input border p-2 rounded"
                rows={2}
              />
              <select
                name="evaluation"
                value={formData.evaluation}
                onChange={handleChange}
                className="input border p-2 rounded"
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
                className="input border p-2 rounded"
                rows={2}
              />
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleAddRow}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
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
