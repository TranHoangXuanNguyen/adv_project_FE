import StudentLayour from '../layouts/StudentLayout';
import MyClass from '../pages/student/MyClass';
import StudentList from '../pages/student/StudentList';
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
    { path:"weekinfo/:id", element:<WeekInfor /> },
    { path: 'my-journal', element: <WeekList /> },
    { path: 'goal', element: <Goal /> },

    // { path: 'users/:id', element: <UserDetail /> },
  ],
};

export default studentRoutes;



