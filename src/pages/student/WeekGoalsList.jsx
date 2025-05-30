// components/CardList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import CardWeek from "../../components/student/CardWeek";
import CardFormModal from "../../components/student/CardFormModal";

const WeekGoalsList = () => {
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [classInfo, setClassInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const user_id = localStorage.getItem("user_id");
      const class_id = localStorage.getItem("class_id");
      const semester_id = localStorage.getItem("semester_id");
      console.log("user_id:", user_id);
      console.log("class_id:", class_id);
      console.log("semester_id:", semester_id);
      if (!class_id || !semester_id) {
        setErrorMessage("Bạn chưa được xếp lớp hoặc lớp chưa có kỳ học nào.");
        return;
      }

      setClassInfo({ class_id, semester_id });

      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/weekly-goals/${user_id}/${semester_id}`
        );
        const transformed = res.data.map((item) => ({
          title: item.week_name,
          startDate: item.start_day,
          endDate: item.end_day,
          goals:
            item.weekly_goals?.map((goal) => ({
              id: goal.week_goal_id,
              description: goal.task_des,
              status: goal.status,
            })) || [],
          week_track_id: item.week_track_id,
        }));
        setCards(transformed);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddNewCard = (newCard) => {
    const newCardWithId = {
      ...newCard,
      goals: newCard.goals.map((desc, idx) => ({
        id: Date.now() + idx,
        description: desc,
        status: 0,
      })),
      week_track_id: `temp-${Date.now()}`,
    };
    setCards([...cards, newCardWithId]);
    setShowModal(false);
  };

  return (
    <div className="p-4">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex flex-wrap gap-4">
        {cards.map((card, index) => (
          <CardWeek key={index} {...card} />
        ))}
        <CardWeek isAddCard onAddCard={() => setShowModal(true)} />
      </div>
      {showModal && (
        <CardFormModal
          onAddNewCard={handleAddNewCard}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default WeekGoalsList;
