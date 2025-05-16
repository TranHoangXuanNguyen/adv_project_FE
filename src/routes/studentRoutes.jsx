import StudentLayour from '../layouts/StudentLayout';
import MyClass from '../pages/student/MyClass';
import StudentList from '../pages/student/StudentList';
import WeekInfor from '../pages/student/WeekInfor';
import WeekList from '../pages/student/CardList';
import SemesterGoals from '../pages/student/Semeter-Goals';
import ClassJournal from '../pages/student/ClassJournal';
import WeekInfor from '../pages/student/WeekInfor';
import WeekList from '../pages/student/CardList';
import Goal from '../pages/student/GoalTable';
const studentRoutes = {
  path: '/student',
  element: <StudentLayour />,
  children: [
    { index: true, element: <MyClass /> },
    { path:'class', element: <MyClass /> },
    { path:'student-list', element: <StudentList /> },
    // { path:"weekinfo/:id", element:<WeekInfor /> },
    // { path: 'weeklist', element: <WeekList /> },
    // { path: 'Goal', element: <Goal /> },
    { path: 'classjournal', element: <ClassJournal /> },
    { path:"weekinfo/:id", element:<WeekInfor /> },
    { path: 'weeklist', element: <WeekList /> },

    { path: 'my-journal', element: <WeekList /> },
    { path: 'Semester-goals', element: <SemesterGoals /> },
    { path: 'goal', element: <Goal /> },

    // { path: 'users/:id', element: <UserDetail /> },
  ],
};

export default studentRoutes;



