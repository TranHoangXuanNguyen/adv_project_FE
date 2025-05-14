import StudentLayour from '../layouts/StudentLayout';
import MyClass from '../pages/student/MyClass';
const studentRoutes = {
  path: '/student',
  element: <StudentLayour />,
  children: [
    { index: true, element: <MyClass /> },
    { path:'class', element: <MyClass /> },
    // { path:"weekinfo/:id", element:<WeekInfor /> },
    // { path: 'weeklist', element: <WeekList /> },
    // { path: 'Goal', element: <Goal /> },

    // { path: 'users/:id', element: <UserDetail /> },
  ],
};

export default studentRoutes;



