import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/layouts/teacher.css";
import { Link } from "react-router-dom";
export default function Class() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/class");

        console.log("Toàn bộ response:", response); // Debug

        // Xử lý nhiều định dạng response khác nhau
        let classesData = response.data;

        // Nếu response có cấu trúc { data: [...] }
        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          classesData = response.data.data;
        }
        // Nếu response là array trực tiếp
        else if (Array.isArray(response.data)) {
          classesData = response.data;
        }
        // Nếu response là object có thể convert thành array
        else if (typeof response.data === "object" && response.data !== null) {
          classesData = Object.values(response.data);
        }

        // Kiểm tra lần cuối
        if (Array.isArray(classesData)) {
          setFolders(
            classesData.map((item) => ({
              name: item.name || item.className || item,
              student_count: item.student_count,
              class_id: item.class_id, // Xử lý nhiều định dạng tên
              bgColor: "#E8F0F7",
            }))
          );
        } else {
          throw new Error("Dữ liệu không phải mảng");
        }
      } catch (error) {
        console.error("Chi tiết lỗi:", {
          error: error.message,
          response: error.response?.data,
          config: error.config,
        });
        alert(`Lỗi: ${error.message || "Không thể tải dữ liệu"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);
  if (loading) return <div>Loading...</div>;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Class</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {folders.map((folder) => (
          <Link
            key={folder.class_id}
            to={`/teacher/class/${folder.class_id}`}
            onClick={() => {
              localStorage.setItem("class_id", folder.class_id);
            }}
            className="folder-card cursor-pointer"
          >
            <h3 className="text-md font-semibold mb-3">{folder.name}</h3>
            <div className="flex gap-2 mb-8">
              <img
                src="https://i.pinimg.com/736x/a2/b6/3f/a2b63f96c4954e47ff840d861f419532.jpg"
                className="w-8 h-8 rounded-full border shadow"
                alt="Student"
              />
              <img
                src="https://i.pinimg.com/736x/9c/72/64/9c72644522ad8869b05da35bb0c12e9e.jpg"
                className="w-8 h-8 rounded-full border shadow"
                alt="Student"
              />
              <img
                src="https://i.pinimg.com/736x/86/0b/f2/860bf2146b774f039046ea0edd566c37.jpg"
                className="w-8 h-8 rounded-full border shadow"
                alt="Student"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {folder.student_count} Students
              </p>
            </div>
            <div className="absolute bottom-3 right-3 w-6 h-6">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <rect x="3" y="3" width="18" height="18" rx="3" fill="black" />
                <rect x="7" y="6" width="10" height="2" rx="1" fill="white" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
