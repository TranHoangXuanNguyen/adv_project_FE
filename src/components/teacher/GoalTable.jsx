import "../../assets/css/pages/showSemesterGoals.css";

const GoalTable = ({ goalList, getSubjectName }) => {
  return (
    <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
      <table className="min-w-full text-md text-left">
        <thead className="bg-[#dbeaff] text-gray-700">
          <tr>
            <th className="px-4 py-3 border text-blue-900">Subject</th>
            <th className="px-4 py-3 border text-blue-900">Course Goal</th>
            <th className="px-4 py-3 border text-blue-900">Expect From Teacher</th>
            <th className="px-4 py-3 border text-blue-900">Expect From Themselves</th>
          </tr>
        </thead>
        <tbody>
          {goalList.length > 0 ? (
            goalList.map((goal, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-4 border font-bold">{getSubjectName(goal.subject_id)}</td>
                <td className="px-4 py-4 border">{goal.course_expected}</td>
                <td className="px-4 py-4 border">{goal.teacher_expected}</td>
                <td className="px-4 py-4 border">{goal.themselves_expected}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500 border">
                No goals found for this student.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GoalTable;
