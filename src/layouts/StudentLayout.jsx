import { Outlet, Link } from "react-router-dom";
import "../assets/css/pages/student.css";
import SideBar from "../components/student/SideBar";
import Header from "../components/student/Header";
export default function StudentLayout() {
  return (
    <div className="containerr">
      <SideBar />
      <div className="right">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
