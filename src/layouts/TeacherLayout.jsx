import { Outlet } from 'react-router-dom';
import Sidebar from '../components/teacher/SideBar';
import Header from '../components/teacher/Header';
export default function TeacherLayout() {
  return (
    <div className="bg-gray-50">
      {/* Container */}
      <div className="flex h-screen">
        <Sidebar />      
        {/* Main Content Area */}
        <div className="flex-1 p-8 pl-12 overflow-auto">
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}