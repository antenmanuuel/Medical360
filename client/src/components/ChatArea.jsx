import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useAuthContext } from "../hooks/useAuthContext";


const socket = io("https://medical360-d65d823d7d75.herokuapp.com");
 //const socket =io("http://localhost:5173")

const ChatArea = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { getChat, getMessages } = useGlobalContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (chatId) {
      const fetchMessages = async () => {
        try {
          const messagesFromChat = await getMessages(chatId);
          if (Array.isArray(messagesFromChat)) {
            messagesFromChat.sort(
              (a, b) => new Date(a.sentAt) - new Date(b.sentAt)
            );
            setMessages(messagesFromChat);
          } else {
            setMessages([]);
          }
        } catch (error) {
          console.error("Failed to fetch chat messages:", error);
          setMessages([]);
        }
      };

      fetchMessages();

      const handleMessageReceive = (message) => {
        if (message.chat === chatId) {
          setMessages((prevMessages) =>
            [...prevMessages, message].sort(
              (a, b) => new Date(a.sentAt) - new Date(b.sentAt)
            )
          );
        }
      };

      socket.on("receiveMessage", handleMessageReceive);

      return () => {
        socket.off("receiveMessage", handleMessageReceive);
      };
    }
  }, [chatId, getMessages]);

  const sendMessage = () => {
    if (input && chatId) {
      const message = {
        content: input,
        sender: user.id,
        chat: chatId,
        sentAt: new Date(),
      };
      socket.emit("sendMessage", message);
      setInput("");
    }
  };

  useEffect(() => {
    if (chatId) {
      socket.emit("joinRoom", chatId);
    }
  }, [chatId]);

  return (
    <div className="w-3/4 flex flex-col">
      <div
        className="flex-1 p-5 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 170px)" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`rounded px-4 py-2 max-w-xs mb-2 ${msg.sender === user.id ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-green-500 text-white"}`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex">
          <input
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
