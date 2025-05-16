
export default studentRoutes;
import ArchivedClass from '../pages/student/ArchivedClass';
import Profile from '../pages/student/Profile';
import Student from '../pages/student/MyGoals';
import MyJournal from '../pages/student/MyJournal';
import StudentLayout from '../layouts/StudentLayout';
import StudentLayour from '../layouts/StudentLayout';
import MyClass from '../pages/student/MyClass';
import StudentList from '../pages/student/StudentList';
import WeekInfor from '../pages/student/WeekInfor';
import SemesterGoals from '../pages/student/Semeter-Goals';
import ClassJournal from '../pages/student/ClassJournal';
import WeekList from '../pages/student/CardList';
import Goal from '../pages/student/GoalTable';
const studentRoutes = {
  path: '/student',
  element: <StudentLayour />,
  children: [
    { index: true, element: <MyClass /> },
    { path:'class', element: <MyClass /> },

    { path:'student-list', element: <StudentList /> },
    // { path:"weekinfo/:id", element:<WeekInfor /> },
    // { path: 'weeklist', element: <WeekList /> },
    // { path: 'Goal', element: <Goal /> },
    { path: 'classjournal', element: <ClassJournal /> },
    { path:"weekinfo/:id", element:<WeekInfor /> },
    { path: 'weeklist', element: <WeekList /> },

    { path: 'my-journal', element: <WeekList /> },
    { path: 'Semester-goals', element: <SemesterGoals /> },
    { path: 'goal', element: <Goal /> },
        { path: 'archivedClass', element: <ArchivedClass /> },
    { path: 'profile', element: <Profile /> },
    { path: 'myJournal', element: <MyJournal /> },


    // { path: 'users/:id', element: <UserDetail /> },
  ],
};

export default studentRoutes;



