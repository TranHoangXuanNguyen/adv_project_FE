import React, { useState } from 'react';

export default function TNotification() {
  const [activeButton, setActiveButton] = useState('All');

  // 🔹 Giả lập dữ liệu từ DB
  const dbNotifications = [
    {
      id: 1,
      sender_id: 2,
      receiver_id: 1,
      content: "Your assignment 'Intro to AI' is due tomorrow!",
      created_at: "2025-05-22T08:00:00Z",
    },
    {
      id: 2,
      sender_id: 3,
      receiver_id: 1,
      content: "You missed the submission for 'Week 5 Reflection'.",
      created_at: "2025-05-20T08:00:00Z",
    },
    {
      id: 3,
      sender_id: 5,
      receiver_id: 1,
      content: "Ms. Linh mentioned you in 'Discussion on Grammar Rules'.",
      created_at: "2025-05-23T11:00:00Z",
    },
     {
      id: 4,
      sender_id: 5,
      receiver_id: 1,
      content: "Ms. Linh mentioned you in 'Discussion on Grammar Rules'.",
      created_at: "2025-05-23T11:00:00Z",
    },
     {
      id: 5,
      sender_id: 5,
      receiver_id: 1,
      content: "Ms. Linh mentioned you in 'Discussion on Grammar Rules'.",
      created_at: "2025-05-23T11:00:00Z",
    }
  ];

  const notifications = dbNotifications.map(n => {
    let type = "info";
    if (n.content.toLowerCase().includes("due")) type = "warning";
    else if (n.content.toLowerCase().includes("missed")) type = "error";

    return {
      id: n.id,
      message: n.content.split(" ").slice(0, 5).join(" ") + "...",
      details: n.content,
      date: new Date(n.created_at).toLocaleString("en-US", {
        month: "short", day: "numeric", year: "numeric",
        hour: "numeric", minute: "numeric", hour12: true
      }),
      type,
    };
  });

  const Notification = ({ notification }) => {
  const colorMap = {
    error: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700"
  };

  return (
    <div className={`group mb-3 p-3 rounded-xl ${colorMap[notification.type]} shadow-sm`}>
      <div className='flex items-center justify-between'>
        <h3 className="font-semibold text-lg">{notification.message}</h3>
        <span className='cursor-pointer text-gray-900 text-xl'>⋮</span>
      </div>

      {/* Chi tiết - hiển thị 1 dòng bình thường, mở rộng khi hover */}
      <p className="text-md mt-1 line-clamp-1 group-hover:line-clamp-none transition-all duration-200">
        {notification.details}
      </p>

      {/* Date - chỉ hiện khi hover */}
      <div className="text-sm text-gray-500 mt-1 hidden group-hover:block transition-opacity duration-200">
        {notification.date}
      </div>

      {/* Buttons - chỉ hiện khi hover */}
      <div className="mt-2 flex justify-end space-x-4 hidden group-hover:flex transition-opacity duration-200">
        <button className="text-blue-500 hover:underline text-sm">View task</button>
        {notification.type === "info" && (
          <button className="text-blue-500 hover:underline text-sm">Reply</button>
        )}
      </div>
    </div>
  );
};

  return (
    <div className="p-4 bg-white shadow-lg  rounded-xl h-[85vh] overflow-y-auto">
      <div className='flex items-center justify-between mb-3'>
        <h2 className="text-2xl font-bold text-justify-center">Notifications</h2>
      </div>

      {/* Filter buttons */}
      <div className='flex space-x-4 mb-3'>
        {["All", "Unread", "Read"].map(type => (
          <button
            key={type}
            className={`px-4 py-1 rounded-2xl text-sm border ${activeButton === type ? 'border-blue-500 bg-blue-100 text-blue-700' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
            onClick={() => setActiveButton(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Notification list */}
      {notifications.map(notification => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
