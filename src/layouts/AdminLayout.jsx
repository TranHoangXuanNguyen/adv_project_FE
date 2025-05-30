import { Outlet, Link } from 'react-router-dom';
import '../assets/css/layouts/admin.css'
import SideBar from '../components/admin/SideBar'
export default function AdminLayout() {
  return(<div className="container-fluid">
    <div className="row">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
   <div className="w-full pl-[16.67%]">
     <div className="flex justify-center items-start h-full">
  <Outlet />
</div>
        </div>
    </div>
  </div>)
  
}
