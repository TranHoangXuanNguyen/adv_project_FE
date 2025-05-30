import React, { useState, useEffect } from "react";

function Achievements() {
  // State management
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 7,
  });

  // Fetch images from backend
  const fetchImages = async (page = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:8000/api/images?page=${page}&per_page=${pagination.per_page}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setItems(
        data.data.data.map((item) => ({
          id: item.id,
          title: item.name,
          image: item.url,
          createdAt: item.created_at,
        }))
      );

      setPagination({
        current_page: data.data.current_page,
        last_page: data.data.last_page,
        per_page: data.data.per_page,
        total: data.data.total,
      });
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setError(error.message || "Failed to load images");
    } finally {
      setIsLoading(false);
    }
  };

  // Load images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Handle delete image
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:8000/api/images/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh the list
      await fetchImages(pagination.current_page);
    } catch (error) {
      console.error("Failed to delete image:", error);
      setError(error.message || "Failed to delete image");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle add new image click
  const handleAddClick = () => {
    setShowForm(true);
    setTitle("");
    setImage(null);
    setError(null);
  };

  // Handle save new image
  const handleSave = async () => {
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }
    if (!image) {
      setError("Please select an image");
      return;
    }

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(image.type)) {
      setError("Only JPG, PNG, GIF or WebP images are allowed");
      return;
    }
    if (image.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "my_preset");

      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/dlw4krxkt/image/upload",
        { method: "POST", body: formData }
      );

      if (!uploadRes.ok) {
        throw new Error("Cloudinary upload failed");
      }

      const uploadData = await uploadRes.json();
      console.log("Cloudinary upload response:", uploadData);
      const imageUrl = uploadData.secure_url;

      // Save to backend
      const saveRes = await fetch("http://localhost:8000/api/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: title, url: imageUrl }),
      });

      if (!saveRes.ok) {
        throw new Error("Failed to save image data");
      }

      // Refresh the list
      await fetchImages(pagination.current_page);
      setShowForm(false);
    } catch (error) {
      console.error("Upload failed:", error);
      setError(error.message || "An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setTitle("");
    setImage(null);
    setError(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Achievements</h1>
      {error && !showForm && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="flex gap-4 flex-wrap">
            {/* Add Card */}
            <div
              onClick={handleAddClick}
              className="w-64 h-60 bg-gray-100 rounded-xl flex justify-center items-center shadow cursor-pointer hover:scale-105 transition hover:bg-gray-200"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl font-bold text-gray-500 mb-2">
                  +
                </div>
                <span className="text-gray-600">Add New Achievement</span>
              </div>
            </div>

            {/* Achievement Cards */}
            {items.map((item) => (
              <div
                key={item.id}
                className="achievement-card"
                style={{
                  position: "relative",
                  width: "16rem", 
                  height: "15rem",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  className="delete-btn"
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    padding: "0.5rem",
                    backgroundColor: "#ef4444",
                    color: "white",
                    borderRadius: "9999px",
                    opacity: "0",
                    transition: "opacity 0.3s ease",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <style jsx>{`
                  .achievement-card:hover .delete-btn {
                    opacity: 1 !important;
                  }
                `}</style>

                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    padding: "0.5rem",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  }}
                >
                  <h3
                    style={{
                      color: "white",
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      textAlign: "center",
                      margin: "0",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "#d1d5db",
                      fontSize: "0.75rem",
                      textAlign: "center",
                      margin: "0",
                    }}
                  >
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {pagination.last_page > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => fetchImages(1)}
                disabled={pagination.current_page === 1}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                &laquo;
              </button>
              <button
                onClick={() => fetchImages(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                &lsaquo;
              </button>

              {Array.from(
                { length: Math.min(5, pagination.last_page) },
                (_, i) => {
                  let pageNum;
                  if (pagination.last_page <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.current_page <= 3) {
                    pageNum = i + 1;
                  } else if (
                    pagination.current_page >=
                    pagination.last_page - 2
                  ) {
                    pageNum = pagination.last_page - 4 + i;
                  } else {
                    pageNum = pagination.current_page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => fetchImages(pageNum)}
                      className={`px-3 py-1 rounded ${
                        pagination.current_page === pageNum
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}

              <button
                onClick={() => fetchImages(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                &rsaquo;
              </button>
              <button
                onClick={() => fetchImages(pagination.last_page)}
                disabled={pagination.current_page === pagination.last_page}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                &raquo;
              </button>
            </div>
          )}

          {/* Add Image Form */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white p-6 rounded-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add New Achievement</h2>

                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter achievement title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isUploading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col w-full h-32 border-2 border-dashed rounded-lg hover:bg-gray-50 hover:border-gray-300 transition">
                        <div className="flex flex-col items-center justify-center pt-7">
                          {image ? (
                            <img
                              src={URL.createObjectURL(image)}
                              alt="Preview"
                              className="h-20 object-contain mb-1"
                            />
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <p className="text-xs text-gray-500 mt-1">
                                Click to upload image
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                          className="opacity-0"
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: JPEG, PNG, GIF, WebP (Max 5MB)
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={handleCancel}
                    disabled={isUploading}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isUploading || !title.trim() || !image}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Achievements;
