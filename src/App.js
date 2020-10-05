import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { auth } from "./config/firebase";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ rooms, user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          payload: {
            user: authUser,
          },
        });
      } else {
        dispatch({
          type: "SET_USER",
          payload: {
            user: null,
          },
        });
      }
    });
  }, [user]);

  return (
    <div className="app">
      <Router>
        {user ? (
          <div className="app_body">
            <Sidebar />
            <Switch>
              <Route path="/room/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </div>
        ) : (
          <Login />
        )}
      </Router>
    </div>
  );
}

export default App;
