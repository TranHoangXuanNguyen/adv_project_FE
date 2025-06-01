import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Chat = () => {
  const teacherId = localStorage.getItem("user_id");
  const { studentId, selectedWeek } = useParams();
  console.log("Teacher ID:", teacherId);
  console.log("Student ID:", studentId);
  console.log("Week ID:", selectedWeek);
  const [messages, setMessages] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    console.log("Sending message:", inputValue);
    axios
      .post("http://localhost:8000/api/send-notification", {
        receiver: studentId,
        content: inputValue,
        sender: teacherId,
        week_id: selectedWeek,
      })
      .then((response) => {
        console.log("Help request sent successfully:", response.data);
        setInputValue("");
      })
      .catch((error) => {
        setInputValue("");
        console.error("Error sending help request:", error);
        alert("Error sending help request");
      });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.header}>Send message</div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter message..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};
const styles = {
  container: {
    zIndex: 1000,
    position: "fixed",
    right: "30px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    backgroundColor: "#444",
    color: "white",
    padding: "15px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
  messages: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    backgroundColor: "#f9f9f9",
  },
  message: {
    padding: "10px 15px",
    borderRadius: "18px",
    marginBottom: "10px",
    maxWidth: "70%",
    wordWrap: "break-word",
  },
  userMessage: {
    backgroundColor: "#444",
    marginLeft: "auto",
    borderBottomRightRadius: "0",
  },
  botMessage: {
    backgroundColor: "white",
    marginRight: "auto",
    borderBottomLeftRadius: "0",
    boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
  },
  inputContainer: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#f0f0f0",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    outline: "none",
  },
  button: {
    backgroundColor: "#444",
    color: "white",
    border: "none",
    borderRadius: "20px",
    padding: "0 20px",
    marginLeft: "10px",
    cursor: "pointer",
  },
};

export default Chat;
