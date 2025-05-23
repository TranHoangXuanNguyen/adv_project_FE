import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import UserDetail from '../pages/admin/UserDetail';
import AddStudent from '../pages/admin/AddStudent';
import AddTeacher from '../pages/admin/AddTeacher'
import AddClass from '../pages/admin/AddClass';
const adminRoutes = {
  path: '/admin',
  element: <AdminLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    {path:'addstudent',element:<AddStudent/>},
    {path:'addclass',element:<AddClass/>},
    {path:'addteacher',element:<AddTeacher/>},
    { path: 'users/:id', element: <UserDetail /> },
  ],
};

export default adminRoutes;
