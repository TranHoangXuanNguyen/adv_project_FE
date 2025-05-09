// import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import WeekInfor from '../pages/student/WeekInfor';
import WeekList from '../pages/student/CardList';

const studentRoutes = {
  path: '/',
//   element: <PublicLayout />,
  children: [
    { index: true, element: <Home /> },
    { path: 'about', element: <About /> },
    { path:"weekinfo/:id", element:<WeekInfor /> },
    { path: 'weeklist', element: <WeekList /> },


  ],
};

export default studentRoutes;