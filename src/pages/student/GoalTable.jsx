import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faBullseye,
  faBook,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";

const GoalTable = () => {
  const questions = [
    "What is your goal for Week 1?",
    "What is your goal for Week 2?",
    "What is your goal for Week 3?",
  ];

  const renderRow = (question, rowIndex) => (
    <tr key={rowIndex}>
      <td className="border p-3 font-medium">{question}</td>
      {[...Array(3)].map((_, index) => (
        <td key={index} className="border p-3">
          <textarea
            placeholder="Enter your goal..."
            className="w-full p-2 border rounded resize-none focus:outline-none focus:border-blue-500"
            rows={3}
          ></textarea>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="max-w-4xl w-full mx-auto">
      <h2 className="text-center text-2xl font-bold mb-6">Semester Goals</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 font-bold">QUESTION</th>
            <th className="border p-3 font-bold">IT ENGLISH</th>
            <th className="border p-3 font-bold">SPEAKING</th>
            <th className="border p-3 font-bold">TOPIC</th>
          </tr>
        </thead>
        <tbody>{questions.map((q, i) => renderRow(q, i))}</tbody>
      </table>
    </div>
  );
};

const Goal = () => (
  <div classname='body'>
    <GoalTable />
  </div>
);
export default Goal;
