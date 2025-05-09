import React, { useState } from 'react';
import { Link } from 'react-router-dom';  

const Card = ({ isAddCard, title, startDate, endDate, goals, onAddCard }) => {
    if (isAddCard) {
      return (
        <div
          className="bg-pink-200 rounded-2xl p-4 shadow-md flex justify-center items-center text-4xl cursor-pointer w-72 h-48"
          onClick={onAddCard}
        >
          <span>+</span>
        </div>
      );
    }
  
    return (
      <Link to={`/weekinfo/${title}`}>
        <div className="bg-pink-200 rounded-2xl py-1 px-3 shadow-md w-72 h-48 flex flex-col justify-between">
          <h3 className="text-lg font-semibold p-0">{title}</h3>
          <hr className="border-t border-black opacity-20" />
          <p className="text-sm pt-2">Start day: {startDate}</p>
          <p className="text-sm pb-4">End day: {endDate}</p>
          <hr className="border-t border-black opacity-20" />
          <h4 className="text-md font-semibold">Goals</h4>
          <div className="flex flex-col space-y-2">
            {goals.slice(0, 2).map((goal, index) => (
              <span key={index} className="text-md">{`${index + 1}. ${goal}`}</span>
            ))}
          </div>
        </div>
      </Link>
    );
  };

const CardFormModal = ({ onAddNewCard, onCancel }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [goalInput, setGoalInput] = useState('');
  const [goals, setGoals] = useState([]);

  const handleGoalChange = (e) => {
    setGoalInput(e.target.value);
  };

  const handleAddGoal = () => {
    if (goalInput.trim() !== '') {
      setGoals([...goals, goalInput]);
      setGoalInput('');
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
        <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
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
                  onChange={handleGoalChange}
                  placeholder="Enter a goal"
                />
                <button
                  type="button"
                  onClick={handleAddGoal}
                  className="bg-blue-500 text-white px-3 rounded"
                >
                  Add Goal
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addNewCard = (newCard) => {
    setCards([newCard, ...cards]);
    setShowModal(false);
  };

  return (
    <div className="flex flex-wrap gap-5">
      <Card isAddCard onAddCard={() => setShowModal(true)} />
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          startDate={card.startDate}
          endDate={card.endDate}
          goals={card.goals}
        />
      ))}
      {showModal && (
        <CardFormModal
          onAddNewCard={addNewCard}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const WeekList = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <CardList />
    </div>
  );
};

export default WeekList;
