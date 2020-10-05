import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/SidebarChat.css";
import axios from "../config/axios";

function SidebarChat({ addNewChat, _id, name, messages }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const handleAddNewChat = () => {
    const room = prompt("Enter a room name:");

    if (room) {
      axios.post("/rooms/new/", {
        name: room,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/room/${_id}`}>
      <div className="sidebar_chat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebar_chatInfo">
          <h2>{name}</h2>
          <p>
            {messages.length
              ? `${messages[messages.length - 1].user}: ${
                  messages[messages.length - 1].text
                }`
              : "No messages yet"}
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebar_chat" onClick={handleAddNewChat}>
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
