import TeacherLayout from '../layouts/TeacherLayout';
import ArchivedClass from '../pages/teacher/ArchivedClass';
import Profile from '../pages/teacher/Profile';
import Student from '../pages/teacher/Student';


const teacherRoutes = {
  path: '/teacher',
  element: <TeacherLayout />,
  children: [
    { index: true, element: <Student /> },
    { path: 'archivedClass', element: <ArchivedClass /> },
    { path: 'profile', element: <Profile /> },
  ],
};

export default teacherRoutes;