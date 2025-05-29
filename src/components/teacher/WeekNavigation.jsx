import { NavLink } from "react-router-dom";

const WeekNavigation = ({ studentId, selectedWeek }) => {
  return (
    <div className="flex gap-4 mb-2">
      <NavLink
        to={
          selectedWeek
            ? `/teacher/class_study/${studentId}/${selectedWeek}`
            : "#"
        }
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg font-semibold text-white shadow transition ${
            selectedWeek
              ? `${
                  isActive ? "bg-orange-400" : "bg-[#73aeff] hover:bg-[#7a9ab6]"
                }`
              : "bg-gray-300 cursor-not-allowed"
          }`
        }
        onClick={(e) => !selectedWeek && e.preventDefault()}
      >
        In Class
      </NavLink>

      <NavLink
        to={
          selectedWeek
            ? `/teacher/self_study/${studentId}/${selectedWeek}`
            : "#"
        }
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg font-semibold text-white shadow transition ${
            selectedWeek
              ? `${
                  isActive ? "bg-orange-400" : "bg-[#73aeff] hover:bg-[#7a9ab6]"
                }`
              : "bg-gray-300 cursor-not-allowed"
          }`
        }
        onClick={(e) => !selectedWeek && e.preventDefault()}
      >
        Self Study
      </NavLink>
    </div>
  );
};

export default WeekNavigation;
