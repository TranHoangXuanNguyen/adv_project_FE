// import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/Home';
import WeekInfor from '../pages/student/WeekInfor';
import WeekList from '../pages/student/CardList';
import Goal from '../pages/student/GoalTable';

const studentRoutes = {
  path: '/',
//   element: <PublicLayout />,
  children: [
    { index: true, element: <Home /> },
    { path:"weekinfo/:id", element:<WeekInfor /> },
    { path: 'weeklist', element: <WeekList /> },
    { path: 'Goal', element: <Goal /> },



  ],
};

export default studentRoutes;