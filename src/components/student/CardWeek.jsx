// components/Card.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/joy/CircularProgress";

const Card = ({
  isAddCard,
  title,
  startDate,
  endDate,
  goals,
  week_track_id,
  onAddCard,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleCardClick = () => {
    localStorage.setItem(
      "selectedCard",
      JSON.stringify({ title, startDate, endDate, goals, week_track_id })
    );
  };

  const calculateProgress = (goals) => {
    const total = goals.length;
    const completed = goals.filter((goal) => goal.status === 1).length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const percent = calculateProgress(goals || []);

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
    <Link
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      to={`/student/weekinfo/${week_track_id}`}
      onClick={handleCardClick}
    >
      <div className="bg-[#fdefee] rounded-2xl py-1 px-3 shadow-md w-72 h-48 flex flex-col justify-between">
        {isHovered ? (
          <div className="flex flex-col items-center justify-center p-3">
            <CircularProgress
              size="lg"
              variant="solid"
              color="success"
              thickness={20}
              determinate
              value={percent}
              sx={{
                "--CircularProgress-size": "150px",
                "--CircularProgress-progressThickness": "26px",
                "--CircularProgress-trackThickness": "26px",
                "--CircularProgress-trackColor": "#cecece",
                "--CircularProgress-progressColor": "#4caf50",
                "& > *": {
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  color: "#4caf50",
                },
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                padding: "8px",
                borderRadius: "50%",
              }}
            >
              {percent}%
            </CircularProgress>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold p-0">{title}</h3>
            <hr className="border-t border-black opacity-20" />
            <p className="text-md pt-2">Start day: {startDate}</p>
            <p className="text-md pb-4">End day: {endDate}</p>
            <hr className="border-t border-black opacity-20" />
            <h4 className="text-md font-semibold">Goals</h4>
            <div className="flex flex-col space-y-2">
              {goals.slice(0, 2).map((goal, index) => (
                <span key={goal.id} className="text-md">
                  {`${index + 1}. ${goal.description}`}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
