// NewGoalForm.jsx
import React, { useState } from "react";
import axios from "axios";

export default function NewGoalForm({ subjects, semesterId, studentId, onGoalAdded }) {
  const [formData, setFormData] = useState({
    subject_id: "",
    course_expected: "",
    teacher_expected: "",
    themselves_expected: "",
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const { subject_id, course_expected, teacher_expected, themselves_expected } = formData;

    if (!subject_id) return alert("Please select a subject.");
    if (!course_expected && !teacher_expected && !themselves_expected)
      return alert("Please fill at least one goal field.");

    try {
      await axios.post("http://127.0.0.1:8000/api/semester-goals", {
        goals: [
          {
            semester_id: semesterId,
            student_id: parseInt(studentId),
            subject_id: parseInt(subject_id),
            course_expected,
            teacher_expected,
            themselves_expected,
          },
        ],
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      onGoalAdded(parseInt(subject_id), { course_expected, teacher_expected, themselves_expected });

      setFormData({
        subject_id: "",
        course_expected: "",
        teacher_expected: "",
        themselves_expected: "",
      });

      alert("Added successfully!");
    } catch (error) {
      console.error("Failed to add goal:", error);
      alert("Failed to add new goal.");
    }
  };

  return (
    <div className="mt-2 p-4 border rounded bg-yellow-50">
      <div className="grid grid-cols-4 gap-2">
        <select
          value={formData.subject_id}
          onChange={(e) => handleChange("subject_id", e.target.value)}
          className="col-span-1 px-2 py-1 border border-gray-300 rounded"
        >
          <option value="">-- Select Subject --</option>
          {subjects.map((subj) => (
            <option key={subj.subject_id} value={subj.subject_id}>
              {subj.subject_name}
            </option>
          ))}
        </select>
        {["course_expected", "teacher_expected", "themselves_expected"].map((field) => (
          <textarea
            key={field}
            value={formData[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded resize-none"
            placeholder={`Nhập ${field.replace(/_/g, " ")}`}
            rows={3}
          />
        ))}
      </div>
      <div className="flex justify-end mt-2">
        <button
          onClick={handleSubmit}
          className="bg-[#72afff] text-white px-4 py-2 rounded hover:bg-blue-300"
        >
          Save New Goal
        </button>
      </div>
    </div>
  );
}
