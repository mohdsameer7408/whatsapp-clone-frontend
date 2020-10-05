import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/Chat.css";
import axios from "../config/axios";
import { useStateValue } from "../StateProvider";

function Chat(props) {
  const [{ rooms, user }, dispatch] = useStateValue();
  const [room, setRoom] = useState(null);
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setRoom(rooms.filter((room) => room._id === roomId)[0]);
    setSeed(Math.floor(Math.random() * 5000));
  }, [rooms, roomId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`/rooms/${roomId}/`, {
      text: message,
      user: user.email.split("@", 1)[0],
    });
    setMessage("");
  };

  return room ? (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_headerInfo">
          <h3>{room ? room.name : "Room Name"}</h3>
          <p>
            {room ? new Date(room.updatedAt).toUTCString() : "Last seen..."}
          </p>
        </div>
        <div className="chat_header_Right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {room &&
          room.messages.map((message) => (
            <p
              className={`chat_message ${
                message.user === user.email.split("@", 1)[0] && "chat_receiver"
              }`}
              key={message._id}
            >
              <span className="chat_name">{message.user}</span>
              {message.text}
              <span className="chat_timeStamp">
                {new Date(message.timestamps).toUTCString()}
              </span>
            </p>
          ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form action="" method="POST">
          <input
            type="text"
            placeholder="Type a message"
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Sent a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  ) : (
    <div className="chat">
      <h3 style={{ margin: "auto" }}>Select a chat to start a conversation!</h3>
    </div>
  );
}

export default Chat;
