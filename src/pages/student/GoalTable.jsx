import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faUser,
  faBullseye,
  faBook,
  faFolder
} from '@fortawesome/free-solid-svg-icons';
const Sidebar = () => (
  <div className="w-[250px] bg-gradient-to-b from-[#00aaff] to-[#0077cc] text-white p-5 flex flex-col">
    <div className="flex items-center mb-5">
      <FontAwesomeIcon icon={faBars} className="text-xl mr-2" />
      <img src="..src/assets/img/pnlogo.png" alt="Logo" className="w-10 h-10 rounded-full mr-2" />
      <h3 className="text-2xl font-semibold">JOURNAL</h3>
    </div>
    <hr className="border border-white/50 my-3" />
    <ul className="space-y-5 mt-3">
      <li className="flex items-center cursor-pointer hover:bg-white/20 p-2 rounded">
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        Profile
      </li>
      <li className="flex items-center cursor-pointer hover:bg-white/20 p-2 rounded">
        <FontAwesomeIcon icon={faBullseye} className="mr-2" />
        My Goals
      </li>
      <li className="flex items-center cursor-pointer hover:bg-white/20 p-2 rounded">
        <FontAwesomeIcon icon={faBook} className="mr-2" />
        My Journal
      </li>
      <li className="flex items-center cursor-pointer hover:bg-white/20 p-2 rounded">
        <FontAwesomeIcon icon={faFolder} className="mr-2" />
        Archived Class
      </li>
    </ul>
  </div>
);
const GoalTable = () => {
  const questions = [
    "What is your goal for Week 1?",
    "What is your goal for Week 2?",
    "What is your goal for Week 3?"
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
        <tbody>
          {questions.map((q, i) => renderRow(q, i))}
        </tbody>
      </table>
    </div>
  );
};

const Goal = () => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 p-8">
      <GoalTable />
    </div>
  </div>
);
export default Goal;
