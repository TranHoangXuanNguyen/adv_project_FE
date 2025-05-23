import React, { useState } from "react";

function Achievements() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);

  const handleAddClick = () => {
    setShowForm(true);
    setTitle("");
    setImage(null);
  };

  const handleSave = () => {
    if (!title || !image) return;
    setItems([...items, { title, image: URL.createObjectURL(image) }]);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setTitle("");
    setImage(null);
  };

  return (
    <div className="p-8">
      <div className="flex gap-4 flex-wrap">
        {/* Add Card */}
        <div
          onClick={handleAddClick}
          className="w-64 h-60 bg-red-100 rounded-xl flex justify-center items-center shadow cursor-pointer hover:scale-105 transition"
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl font-bold text-gray-500">
            +
          </div>
        </div>

        {/* Achievement Cards */}
        {items.map((item, index) => (
          <div key={index} className="w-64 h-60 relative rounded-xl shadow overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <h3 className="text-white text-lg font-semibold text-center text-shadow">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="mt-6 bg-white p-4 shadow rounded-xl w-96">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded mb-3"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Achievements;