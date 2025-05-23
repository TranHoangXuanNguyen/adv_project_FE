import StudentLayour from '../layouts/StudentLayout';
import MyClass from '../pages/student/MyClass';
import WeekInfor from '../pages/student/WeekInfor';
import Goal from '../pages/student/GoalTable';
import WeekList from '../pages/student/CardList';
import UserDetail from '../pages/admin/UserDetail';
import Archivements from '../pages/student/Archivements';
import CardList from '../pages/student/CardList';




const studentRoutes = {
  path: '/student',
  element: <StudentLayour />,
  children: [
    { index: true, element: <CardList /> },
    { path:'archivements', element: <Archivements /> },
    { path:"weekinfor", element:<WeekInfor/> },
    { path: 'weeklist', element: <WeekList /> },
    { path: 'Goal', element: <Goal /> },

    { path: 'users/:id', element: <UserDetail /> },
  ],
};

export default studentRoutes;



