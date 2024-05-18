import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import ChatArea from "../components/ChatArea";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Banner goBackPath={"/apppage"} />
      <div className="text-2xl font-semibold text-center py-4 mb-4 bg-white shadow">
        Chat
      </div>
      <div className="flex h-full">
        <Sidebar onSelectChat={setSelectedChatId} />
        <ChatArea chatId={selectedChatId} />
      </div>
    </div>
  );
};

const Sidebar = ({ onSelectChat }) => {
  const [userId, setUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState([]); // Default to an empty array
  const [curUser, setCurUser] = useState(null);
  const { user } = useAuthContext();
  const { users, getUser, getAllUsers, getUserChats, BASE_URL } = useGlobalContext();

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.id) {
        const fetchedUser = await getUser(user.id);
        setCurUser(fetchedUser);
        const userChats = await getUserChats(user["id"]);

        setChats(userChats || []); // Ensure userChats is an array, default to empty array if falsy
      } else {
        console.log("User data is not available.");
      }
    };
    fetchUser();
  }, [user]);

  useEffect(() => {
    getAllUsers().catch((error) =>
      console.error("Error fetching users:", error)
    );
  }, []); // Only on component mount

  const handleUserChange = async (e) => {
    let newUserId = e.target.value;
    setUserId(newUserId); // Update the user ID
    if (newUserId) {
      const userDetails = await getUser(newUserId); // Fetch the user details based on ID
      setSelectedUser(userDetails); // Store the user details
    } else {
      setSelectedUser(null); // Reset if no user is selected
    }
  };

  const handleCreateChat = async () => {
    if (userId && selectedUser) {
      try {
        const response = await axios.post(
          `${BASE_URL}/chat`,
          {
            members: [curUser, selectedUser],
          }
        );
        setChats((prevChats) => [...prevChats, response.data]); // Use prevChats to ensure correct state updates
        setUserId("");
        setSelectedUser(null); // Clear the selected user after creating the chat
      } catch (error) {
        console.error("Failed to create chat:", error);
      }
    }
  };

  return (
    <div className="w-1/4 bg-white p-5 overflow-y-auto shadow-lg space-y-4">
      <div>
        <select
          className="form-select block w-full mt-1 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md shadow-sm"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="">Select a User</option>
          {(users || []).map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} 
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleCreateChat}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Chat
      </button>
      <button
        onClick={() => getAllUsers()}
        className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Refresh List
      </button>
      <div>
        <h3 className="text-lg font-semibold">Active Chats</h3>
        {Array.isArray(chats) && chats.length > 0 ? (
          chats.map((chat, index) => (
            <div
              onClick={() => onSelectChat(chat._id)}
              key={index}
              className="p-2 my-1 hover:bg-blue-100 cursor-pointer rounded shadow"
            >
              {chat.members.map((member) => member["name"]).join(", ")}
            </div>
          ))
        ) : (
          <div className="text-gray-500">No chats available</div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
