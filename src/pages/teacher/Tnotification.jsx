import React from 'react';
import { useState } from 'react';
export default function TNotification() {
    const [activeButton, setActiveButton] = useState('All');

  const notifications = [
    {
      id: 1,
      message: "Deadline in 2 days!",
      details: "Your Learning Journal Week 4 is due this Friday. Don't forget to complete it.",
      date: "Apr 25, 2025, 8:00 AM",
      type: "warning",
    },
    {
      id: 2,
      message: "You missed a deadline!",
      details: "The deadline for your Reflection Essay has passed. Please...",
      date: "Apr 24, 2025, 8:00 AM",
      type: "error",
    },
    {
      id: 3,
      message: "Deadline in 2 days!",
      details: "Your Learning Journal Week 4 is due this Friday. Don't forget to complete it.",
      date: "Apr 25, 2025, 8:00 AM",
      type: "warning",
    },
    {
      id: 4,
      message: "You were mentioned by Ms. Linh!",
      details: "Ms. Linh mentioned you in the class discussion about grammar rules. Click to reply.",
      date: "Apr 25, 2025, 11:30 AM",
      type: "info",
    },
  ];

  const Notification = ({ notification }) => {
    return (
        <div className='d-flex justify-content-end'>

      <div className={`p-4 mb-4 rounded-lg ${notification.type === "error" ? "bg-red-100 text-red-700" : notification.type === "warning" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
        <h3 className="font-semibold">{notification.message}</h3>
        <p>{notification.details}</p>
        <span className="text-sm text-gray-500">{notification.date}</span>
        <div className="mt-2 d-flex justify-content-end">
          <button className="text-blue-500 hover:underline">View task</button>
          {notification.type === "info" && (
            <button className="text-blue-500 hover:underline ml-4">Reply</button>
          )}
        </div>
      </div>
        </div>

    );
  };

  return (
   <div className="max-w-lg p-6 bg-white shadow-lg rounded-lg absolute right-0 mr-4 h-[80vh] overflow-y-auto">
    <div className='flex items-center justify-between'>
      <h2 className="text-2xl font-bold mb-2">Notifications</h2>
      <span className='cursor-pointer text-gray-900'>⋮</span>
    </div>
      <div className='flex mb-3'>
      <button
        className={`border rounded-[14px] p-2 ${activeButton === 'All' ? 'border-blue-500 bg-blue-100' : 'border-transparent'} hover:border-blue-500 hover:bg-blue-100`}
        onClick={() => setActiveButton('All')}
      >
        All
      </button>
      <button
        className={`ml-4 border rounded-[14px] p-2 ${activeButton === 'Unread' ? 'border-blue-500 bg-blue-100' : 'border-transparent'} hover:border-blue-500 hover:bg-blue-100`}
        onClick={() => setActiveButton('Unread')}
      >
        Unread
      </button>
      <button
        className={`ml-4 border rounded-[14px] p-2 ${activeButton === 'Read' ? 'border-blue-500 bg-blue-100' : 'border-transparent'} hover:border-blue-500 hover:bg-blue-100`}
        onClick={() => setActiveButton('Read')}
      >
        Read
      </button>
    </div>
      {notifications.map(notification => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
