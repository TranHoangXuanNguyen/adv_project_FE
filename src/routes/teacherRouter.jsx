import TeacherLayout from '../layouts/TeacherLayout';
import ArchivedClass from '../pages/teacher/ArchivedClass';
import Profile from '../pages/teacher/Profile';
import ShowClassStudy from '../pages/teacher/ShowClassStudy';
import ShowSelfStudy from '../pages/teacher/ShowSelfStudy';
// import TeacherViewGoals from '../pages/teacher/TeacherviewGoals';
import HelpRequest from '../pages/teacher/HelpRequest';
import CLass from '../pages/teacher/Class';
import ShowSemesterGoals from '../pages/teacher/ShowSemesterGoals';
import SemesterGoalManager from '../pages/student/Semeter-Goals';
import TNotification from '../pages/teacher/Tnotification';
import StudentList from '../pages/teacher/StudentList';


const teacherRoutes = {
  path: '/teacher',
  element: <TeacherLayout />,
  children: [
    { index: true, element: <CLass /> },
    { path: 'archivedClass', element: <ArchivedClass /> },
    { path: 'profile', element: <Profile /> },
    { path: 'viewGoals/:studentId', element: < ShowSemesterGoals /> },
    { path: 'class_study/:studentId/:weekId', element: <ShowClassStudy /> },
    { path: 'self_study/:studentId/:weekId', element: <ShowSelfStudy /> },
    { path: 'notifications', element: <TNotification /> },
    { path: 'class', element: <CLass /> },
    { path: 'archivedClass', element: <ArchivedClass /> },
    { path: 'profile', element: <Profile /> },
    { path: "helpRequest", element: <HelpRequest /> },
    { path: 'viewGoals', element: <ShowSemesterGoals /> },
    { path: 'class_study', element: <ShowClassStudy /> },
    { path: 'self_study', element: <ShowSelfStudy /> },
    { path: 'notifications', element: <TNotification /> },
    { path: 'class/:id', element: <StudentList /> },





  ],
};


export default teacherRoutes;


