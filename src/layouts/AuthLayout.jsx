import { Outlet } from 'react-router-dom';
import '../assets/css/layouts/auth.css'; 
export default function AdminLayout() {
  return (
    <div className='screen'>
      <main><Outlet /></main>
    </div>
  );
}
 