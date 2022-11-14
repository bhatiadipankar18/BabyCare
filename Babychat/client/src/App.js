import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
    <img src="data:image/jpeg;base64,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"></img>
      {!showChat ? (
        <div className="joinChatContainer">
          <h4>Join the BabyCare Chat</h4>
          <input
            type="text"
            placeholder="Name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Parent/Nanny"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join BabyChat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
