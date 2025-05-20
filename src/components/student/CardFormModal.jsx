// components/CardFormModal.jsx
import React, { useState } from "react";

const CardFormModal = ({ onAddNewCard, onCancel }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [goals, setGoals] = useState([]);

  const handleAddGoal = () => {
    if (goalInput.trim() !== "") {
      setGoals([...goals, goalInput]);
      setGoalInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && startDate && endDate && goals.length > 0) {
      onAddNewCard({ title, startDate, endDate, goals });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[734px]">
        <h2 className="text-lg font-semibold mb-4">Add New Week</h2>
        <form onSubmit={handleSubmit} className="flex flex-col justify-between">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Dates */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          {/* Goals */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Goals</label>
            <div className="flex flex-col space-y-2">
              {goals.map((goal, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-sm">{index + 1}.</span>
                  <span className="text-sm">{goal}</span>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  placeholder="Enter a goal"
                />
                <button
                  type="button"
                  onClick={handleAddGoal}
                  className="bg-blue-500 text-white px-3 py-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add
            </button>
            <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardFormModal;
