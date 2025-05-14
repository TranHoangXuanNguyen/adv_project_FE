import { Outlet, Link } from "react-router-dom";
import "../assets/css/pages/student.css";
import SideBar from "../components/teacher/SideBar";
import Header from "../components/teacher/Header";
export default function TeacherLayout() {
  return (
    <div className="container">
      <SideBar />
      <div className="right">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
