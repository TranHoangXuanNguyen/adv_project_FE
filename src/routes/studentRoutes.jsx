import StudentLayout from '../layouts/StudentLayout';
import ArchivedClass from '../pages/student/ArchivedClass';
import Profile from '../pages/student/Profile';
import Student from '../pages/student/MyGoals';
import MyJournal from '../pages/student/MyJournal';



const studentRoutes = {
  path: '/student',
  element: <StudentLayout />,
  children: [
    { index: true, element: <Student /> },
    { path: 'archivedClass', element: <ArchivedClass /> },
    { path: 'profile', element: <Profile /> },
    { path: 'myJournal', element: <MyJournal /> },

  ],
};

export default studentRoutes;