import React from "react";

export default function SemesterGoal_Row({ subject, goal, onInputChange }) {
  const fields = ["course_expected", "teacher_expected", "themselves_expected"];

  return (
    <tr>
      <td className="border px-2 py-1">{subject.subject_name}</td>
      {fields.map((field) => (
        <td key={field} className="border px-2 py-1">
          <textarea
            value={goal?.[field] || ""}
            onChange={(e) =>
              onInputChange(subject.subject_id, field, e.target.value)
            }
            className="w-full px-2 py-1 break-words resize-none"
            rows={3}
            placeholder={`Nhập ${field.replace(/_/g, " ")}`}
          />
        </td>
      ))}
    </tr>
  );
}
