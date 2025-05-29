import { useSubmit } from "react-router-dom";

function LogoutBtn() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_role");
    localStorage.removeItem("class_id");
    localStorage.removeItem("semester_id");

    // Chuyển hướng về trang login
    window.location.href = "/";
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutBtn;
