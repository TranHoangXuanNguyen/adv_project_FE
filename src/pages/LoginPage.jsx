import { FaUser, FaLock } from "react-icons/fa";
import pnlogo from "../assets/img/pnlogo.png"; // Đảm bảo đường dẫn chính xác
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { login } from "../services/AuthService";
import axios from "axios";
import {
  messaging,
  getToken,
  onMessage,
  firebaseConfig,
} from "../services/FireBaseConfig";
export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user_role = localStorage.getItem("user_role");
    if (user_role) {
      switch (user_role) {
        case "admin":
          navigate("/admin");
          break;
        case "student":
          navigate("/student");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        default:
          navigate("/");
      }
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { token, decodedToken } = await login(email, password);
      console.log("Token:", token);
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", decodedToken.id);
      localStorage.setItem("user_role", decodedToken.role);
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/students/${decodedToken.id}/class-info`)
        .then((response) => {
          const original = response.data?.data?.original;

          if (original?.class && original?.semester) {
            localStorage.setItem("class_id", original.class.class_id);
            localStorage.setItem("semester_id", original.semester.semester_id);
          } else {
            console.warn("Missing class or semester info", original);
          }
        });

      const fcmToken = await getToken(messaging, {
        vapidKey: firebaseConfig.vapidKey,
      });
      if (fcmToken) {
        fetch(`${process.env.REACT_APP_API_URL}/api/fcm-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            token: fcmToken,
            device_info: "Chrome on Ubuntu",
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error(err));
      } else {
        console.warn("No FCM token available");
      }

      console.log(decodedToken);

      switch (decodedToken.role) {
        case "admin":
          navigate("/admin");
          break;
        case "student":
          navigate("/student");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError(err.message || "Wrong email or password");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-b from-sky-400 to-sky-100 text-white flex flex-col items-center justify-center p-10 relative">
          <div className="absolute top-4 left-4 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 bg-white rounded-full"></div>
          <h2 className="text-3xl font-bold mb-4">Hello, Welcome!</h2>
          <p className="text-lg text-center">
            We’re glad to have you back. Please sign in to continue.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <div className="flex justify-center mb-4">
            <img src={pnlogo} alt="Logo" />
          </div>
          <h3 className="text-2xl font-semibold text-center mb-6">Login</h3>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-10 border-b border-gray-300 focus:outline-none py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 border-b border-gray-300 focus:outline-none py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600"
            >
              Log in
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="text-center mt-4 text-sm text-gray-500">
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
