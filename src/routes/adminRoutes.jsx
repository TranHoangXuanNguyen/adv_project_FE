import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import UserDetail from '../pages/admin/UserDetail';

const adminRoutes = {
  path: '/admin',
  element: <AdminLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: 'users/:id', element: <UserDetail /> },
  ],
};

export default adminRoutes;
