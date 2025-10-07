// src/Components/Layout/AI/ChatContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const { user } = useUser();
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  
  // Configure axios to always include the Clerk user ID in headers
  useEffect(() => {
    if (user) {
      axios.defaults.headers.common['clerk-user-id'] = user.id;
    }
  }, [user]);

  // Load all chats
  const fetchChats = async () => {
  try {
    const res = await axios.get("https://careerly-1.onrender.com/api/chat");
    if (Array.isArray(res.data)) {
      setChats(res.data);
      if (!currentChat && res.data.length > 0) {
        setCurrentChat(res.data[0]);
        setMessages(res.data[0].messages || []);
      }
    } else {
      console.error("Chats API did not return an array", res.data);
      setChats([]);
    }
  } catch (err) {
    console.error("Failed to fetch chats:", err);
    setChats([]);
  }
};

  // Select chat
  // Select chat
const selectChat = async (chat) => {
  try {
    // Fetch the latest chat data from the server
    const response = await axios.get(`https://careerly-1.onrender.com/api/chat/${chat._id}`);
    const freshChat = response.data;
    
    // Update current chat with fresh data
    setCurrentChat(freshChat);
    
    // Make sure we're properly handling all messages regardless of sender
    if (Array.isArray(freshChat.messages)) {
      setMessages(freshChat.messages);
    } else {
      console.error("Chat messages is not an array:", freshChat.messages);
      setMessages([]);
    }
  } catch (error) {
    console.error("Error fetching chat data:", error);
    // Fallback to using the provided chat object
    setCurrentChat(chat);
    if (Array.isArray(chat.messages)) {
      setMessages(chat.messages);
    } else {
      setMessages([]);
    }
  }
};

  // Add message to DB & update local messages
  const addMessage = async (role, content) => {
    if (!currentChat) return;
    setMessages((prev) => [...prev, { sender: role, text: content }]);
    try {
      const res = await axios.post(`https://careerly-1.onrender.com/api/chat/${currentChat._id}/message`, {
        role,
        content,
      });
      const aiMessage = res.data.messages.slice(-1)[0];
      if (role === "user") {
        setMessages((prev) => [...prev, { sender: "ai", text: aiMessage.content }]);
      }
      
      // Refresh the chat list to update chat names/titles
      fetchChats();
    } catch (err) {
      console.error("AI response error:", err);
    }
  };

  // Create new chat
  const createChat = async () => {
    try {
      const res = await axios.post("https://careerly-1.onrender.com/api/chat/new");
      setChats((prev) => [res.data, ...prev]);
      setCurrentChat(res.data);
      setMessages([]);
    } catch (err) {
      console.error("Failed to create chat:", err);
    }
  };

  // Rename chat
  const renameChat = async (chatId, title) => {
    try {
      const res = await axios.patch(`https://careerly-1.onrender.com/api/chat/${chatId}/rename`, { title });
      setChats((prev) => prev.map((c) => (c._id === chatId ? res.data : c)));
      if (currentChat?._id === chatId) setCurrentChat(res.data);
      
      // Refresh the chat list
      fetchChats();
    } catch (err) {
      console.error("Failed to rename chat:", err);
    }
  };

  // Delete chat
  const deleteChat = async (chatId) => {
  try {
    await axios.delete(`https://careerly-1.onrender.com/api/chat/${chatId}`); // your backend delete call

    // Remove from local state
    setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));

    // ✅ If we are currently viewing the deleted chat, reset currentChat and messages
    if (currentChat?._id === chatId) {
      setCurrentChat(null);
      setMessages([]); // clear chat window
    }
  } catch (error) {
    console.error("Error deleting chat:", error);
  }
};

  useEffect(() => {
    // Only fetch chats when user is authenticated
    if (user) {
      fetchChats();
    }
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        messages,
        selectChat,
        addMessage,
        createChat,
        renameChat,
        deleteChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
