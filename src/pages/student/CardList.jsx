import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const user_id = localStorage.getItem("user_id");
const Card = ({
  isAddCard,
  title,
  startDate,
  endDate,
  goals,
  week_track_id,
  onAddCard,
}) => {
  const handleCardClick = () => {
    // Lưu thông tin card vào localStorage
    localStorage.setItem(
      "selectedCard",
      JSON.stringify({ title, startDate, endDate, goals, week_track_id })
    );
  };

  if (isAddCard) {
    return (
      <div
        className="bg-[#fdefee] rounded-2xl p-4 shadow-md w-72 h-48 relative cursor-pointer flex justify-center items-center"
        onClick={onAddCard}
      >
        <div className="absolute w-16 h-16 bg-white rounded-full flex justify-center items-center">
          <span className="text-4xl text-[#9a7677]">+</span>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/student/weekinfo/${week_track_id}`} onClick={handleCardClick}>
      <div className="bg-[#fdefee] rounded-2xl py-1 px-3 shadow-md w-72 h-48 flex flex-col justify-between">
        <h3 className="text-lg font-semibold p-0">{title}</h3>
        <hr className="border-t border-black opacity-20" />
        <p className="text-md pt-2">Start day: {startDate}</p>
        <p className="text-md pb-4">End day: {endDate}</p>
        <hr className="border-t border-black opacity-20" />
        <h4 className="text-md font-semibold">Goals</h4>
        <div className="flex flex-col space-y-2">
          {goals.slice(0, 2).map((goal, index) => (
            <span key={index} className="text-md">{`${
              index + 1
            }. ${goal}`}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

const CardFormModal = ({ onAddNewCard, onCancel }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [goals, setGoals] = useState([]);

  const handleGoalChange = (e) => {
    setGoalInput(e.target.value);
  };

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
        <form
          onSubmit={handleSubmit}
          className="h-full flex flex-col justify-between"
        >
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
                  className="bg-blue-500 text-white px-3 py-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
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
  const [classInfo, setClassInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const class_id = localStorage.getItem("class_id");
        const semester_id = localStorage.getItem("semester_id");
        const user_id = localStorage.getItem("user_id");

        if (!class_id || !semester_id) {
          setErrorMessage(
            "Bạn chưa được xếp lớp hoặc lớp chưa có kỳ học nào. Không thể nhập journal."
          );
          return;
        }

        // Cập nhật thông tin lớp học vào state
        setClassInfo({
          class_id,
          semester_id,
        });

        // Gọi API lấy dữ liệu weekly goals
        const res = await axios.get(
          `http://127.0.0.1:8000/api/weekly-goals/${user_id}`
        );
        console.log("API response data:", res.data);
        const transformed = res.data.map((item) => ({
          title: item.week_name,
          startDate: item.start_day,
          endDate: item.end_day,
          goals: item.weekly_goals?.map((goal) => goal.task_des) || [],
          week_track_id: item.week_track_id,
        }));

        setCards(transformed);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        setErrorMessage(
          "Không thể lấy dữ liệu weekly goals hoặc thông tin lớp học."
        );
      }
    };

    fetchData();
  }, []);

  const addNewCard = async (newCard) => {
    try {
      const { title, startDate, endDate, goals } = newCard;
      localStorage.setItem("selectedCard", newCard);
      const trackingResponse = await axios.post(
        "http://localhost:8000/api/weekly-tracking",
        {
          user_id: user_id,
          week_name: title,
          semester_id: classInfo.semester_id,
          start_day: startDate,
          end_day: endDate,
        }
      );
      const trackingData = trackingResponse.data.data;
      const weekTrackId = trackingData.week_track_id;
      for (const goal of goals) {
        await axios.post("http://localhost:8000/api/weekly-goal", {
          user_id: user_id,
          semester_id: classInfo.semester_id,
          week_track_id: weekTrackId,
          task_des: goal,
          start_day: startDate,
          end_day: endDate,
          status: false,
        });
      }

      // Cập nhật giao diện
      setCards((prev) => [
        {
          title,
          startDate,
          endDate,
          goals,
        },
        ...prev,
      ]);
      setShowModal(false);
    } catch (error) {
      console.error("Lỗi khi tạo weekly tracking và goals:", error);
      alert("Thêm tuần học thất bại.");
    }
  };

  return (
    <div className="py-5 pl-10">
      {errorMessage ? (
        <div className="text-red-500 font-semibold text-lg">{errorMessage}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <Card isAddCard onAddCard={() => setShowModal(true)} />
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              startDate={card.startDate}
              endDate={card.endDate}
              goals={card.goals}
              week_track_id={card.week_track_id}
            />
          ))}
          {showModal && (
            <CardFormModal
              onAddNewCard={addNewCard}
              onCancel={() => setShowModal(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default CardList;
