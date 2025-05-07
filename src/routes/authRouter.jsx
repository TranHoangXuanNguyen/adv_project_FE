import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/LoginPage';

const authRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    { index: true, element: <LoginPage /> },
  ],
};

export default authRoutes;
