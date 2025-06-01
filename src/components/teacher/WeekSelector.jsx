const WeekSelector = ({ weeks, selectedWeek, setSelectedWeek, weekInfo }) => {
  const arrayValues = Object.values(weekInfo);
  console.log(arrayValues);
  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow-sm border">
      <label className="block text-sm font-medium text-blue-700 mb-1">
        📅 Select a Week:
      </label>
      {weeks.length > 0 ? (
        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
          className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          <option value="" disabled>
            -- Choose Week --
          </option>
          {arrayValues.map((item) => (
            <option
              key={item.week_track_id}
              value={parseInt(item.week_track_id)}
            >
              {item.week_name}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-gray-500">No data available.</p>
      )}
    </div>
  );
};

export default WeekSelector;
