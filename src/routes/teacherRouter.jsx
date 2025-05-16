import TeacherLayout from '../layouts/TeacherLayout';
import ArchivedClass from '../pages/teacher/ArchivedClass';
import Profile from '../pages/teacher/Profile';
// import ShowClassStudy from '../pages/teacher/ShowClassStudy';
import Student from '../pages/teacher/Student';
// import ShowSelfStudy from '../pages/teacher/ShowSelfStudy';



const teacherRoutes = {
  path: '/teacher',
  element: <TeacherLayout />,
  children: [
    { index: true, element: <Student /> },
    { path: 'archivedClass', element: <ArchivedClass /> },
    { path: 'profile', element: <Profile /> },
    // { path: 'class_study', element: <ShowClassStudy /> },
    // { path: 'self_study', element: <ShowSelfStudy /> },


  ],
};

export default teacherRoutes;