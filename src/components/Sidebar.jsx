import React, { useEffect } from "react";
import "../assets/css/Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, Avatar, Button } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "../StateProvider";
import axios from "../config/axios";
import Pusher from "pusher-js";
import { auth } from "../config/firebase";

function Sidebar() {
  const [{ rooms, user }, dispatch] = useStateValue();

  const fetchRooms = () => {
    axios.get("/rooms/sync/").then((response) => {
      dispatch({
        type: "ADD_ROOMS",
        payload: {
          rooms: response.data,
        },
      });
    });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    const pusher = new Pusher("17927f8f600679dcc53f", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("rooms");
    channel.bind("inserted", (newRoom) => {
      fetchRooms();
    });

    // return () => {
    //   channel.unbind_all();
    //   channel.unsubscribe();
    // };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_headerLeft">
          <Avatar src={user?.photoURL} />
          <Button onClick={() => auth.signOut()}>Sign Out</Button>
        </div>
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input
            type="text"
            placeholder="Search or start a new chat"
            name="search"
            id="search"
          />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {rooms.map(({ _id, name, messages }) => (
          <SidebarChat key={_id} _id={_id} name={name} messages={messages} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
