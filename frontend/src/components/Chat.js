import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css"
import {Layout} from "antd";
import io from "socket.io-client";
import {Button} from "antd";

function Chat({ socket, username, room }) {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };



    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div
                                className="message"
                                id={username === messageContent.author ? "other" : "you"}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}


function ChatLayoutOuter({username,childId}){
    const socket= io.connect("http://localhost:3001") ;
    socket.emit("join_room", childId);

    return(
        <ChatLayout socket={socket} username={username} childId={childId} />
    )


}

function ChatLayout({socket,username,childId}) {

    const [showChat, setShowChat] = useState(true);


    return (
        <>

            <Layout style={{
                // backgroundColor: "green",
                width: "300px",
                marginLeft: "75%",
                opacity: showChat ? 1 : 0
            }}>
                <Chat socket={socket} username={username} room={childId}/>
            </Layout>

            <Button
                style={{
                    width: "300px",
                    marginLeft: "75%",
                }}
                type="primary"
                onClick={() => setShowChat(!showChat)}
                // onClick={() => console.log(1)}
            >
                chat here
            </Button>
        </>
    );


}

export default ChatLayoutOuter;
