import StudentLayour from '../layouts/StudentLayout';
import MyClass from '../pages/student/MyClass';
import StudentList from '../pages/student/StudentList';
const studentRoutes = {
  path: '/student',
  element: <StudentLayour />,
  children: [
    { index: true, element: <MyClass /> },
    { path:'class', element: <MyClass /> },
    { path:'student-list', element: <StudentList /> },

    // { path: 'users/:id', element: <UserDetail /> },
  ],
};

export default studentRoutes;
