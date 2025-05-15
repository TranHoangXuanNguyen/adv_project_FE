import StudentLayour from '../layouts/StudentLayout';
import MyClass from '../pages/student/MyClass';
import StudentList from '../pages/student/StudentList';
import WeekInfor from '../pages/student/WeekInfor';
import WeekList from '../pages/student/CardList';
import SemesterGoals from '../pages/student/Semeter-Goals';
const studentRoutes = {
  path: '/student',
  element: <StudentLayour />,
  children: [
    { index: true, element: <MyClass /> },
    { path:'class', element: <MyClass /> },
    { path:'student-list', element: <StudentList /> },
    { path:"weekinfo/:id", element:<WeekInfor /> },
    { path: 'weeklist', element: <WeekList /> },
    { path: 'Semester-Goals', element: <SemesterGoals /> },

    // { path: 'users/:id', element: <UserDetail /> },
  ],
};

export default studentRoutes;



