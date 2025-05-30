import React, { useState, useEffect } from "react";
import axios from "axios";
const HelpRequestForm = ({ onClose, student_id, week_id }) => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [message, setMessage] = useState("");
  const [teachers, setTeachers] = useState([]);

  const featchTeacher = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/teacher"
      );
      setTeachers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Lỗi khi tải danh sách học sinh");
    }
  };

  useEffect(() => {
    featchTeacher();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTeacher || !message) {
      alert("Please choose teacher and enter the content.");
      return;
    }

    // Send the help request to the server
    axios
      .post("http://localhost:8000/api/send-notification", {
        receiver: selectedTeacher,
        content: message,
        sender: student_id,
        week_id: week_id,
      })
      .then((response) => {
        console.log("Help request sent successfully:", response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error sending help request:", error);
        alert("Error sending help request");
      });

    console.log(
      "Send to:",
      selectedTeacher,
      "Content:",
      message,
      "user id ",
      student_id,
      "week id",
      week_id
    );

    setSelectedTeacher("");
    setMessage("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: 999 }}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
        >
          &times;
        </button>
      <div className="w-full flex justify-center">
        <h2 className="text-xl font-bold mb-4 text-center">Send help request</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Choose teacher:</label>
            <select
              className="w-full border rounded-lg p-2"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">-- Choose teacher --</option>
              {teachers.map((teacher) => (
                <option key={teacher.user_id} value={teacher.user_id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Content:</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your content..."
            />
          </div>
             <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            
            Send
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelpRequestForm;
