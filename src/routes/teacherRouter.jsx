import TeacherLayour from '../layouts/TeacherLayout';
import StudentList from '../pages/teacher/StudentList';
const teacherRoutes = {
  path: '/teacher',
  element: <TeacherLayour />,
  children: [
    { index: true, element: <StudentList /> }
  ],
};

export default teacherRoutes;



