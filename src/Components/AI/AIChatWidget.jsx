import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // Smooth scroll to bottom whenever messages or loading change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Initialize chat automatically when widget opens
  useEffect(() => {
    const initChat = async () => {
      try {
        let id = localStorage.getItem("chatId");

        // Create new chat if none exists
        if (!id) {
          const newChatRes = await axios.post("https://careerly-1.onrender.com/api/chat/new");
          id = newChatRes.data._id;
          localStorage.setItem("chatId", id);
        }

        setChatId(id);

        // Fetch previous messages if any
        const chatRes = await axios.get(`https://careerly-1.onrender.com/api/chat/${id}`);
        setMessages(
          chatRes.data.messages.map((m) => ({
            sender: m.role === "user" ? "user" : "ai",
            text: m.content,
          }))
        );
      } catch (err) {
        console.error("Failed to initialize chat:", err);

        // Clear invalid chatId and retry next open
        localStorage.removeItem("chatId");
        setChatId(null);
        setMessages([]);
      }
    };

    if (isOpen && !chatId) initChat();
  }, [isOpen, chatId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !chatId) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const messageContent = input;
    setInput("");
    setLoading(true);

    try {
      // Send message to backend
      const response = await axios.post(
        `https://careerly-1.onrender.com/api/chat/${chatId}/message`,
        { role: "user", content: messageContent }
      );

      // Extract AI reply
      const aiMessageData = response.data.messages.slice(-1)[0];
      setMessages((prev) => [...prev, { sender: "ai", text: aiMessageData.content }]);
    } catch (err) {
      console.error(err);

      // If chat not found (404), clear chatId and retry
      if (err.response?.status === 404) {
        localStorage.removeItem("chatId");
        setChatId(null);
      }

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error: Unable to get AI response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
      >
        <MessageCircle size={24} />
      </button>

      {/* Mini Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[90%] max-w-sm sm:w-80 bg-white rounded-xl shadow-2xl p-4 border border-gray-300 z-50 flex flex-col animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">AI Chat</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-red-500"
            >
              <X />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto h-40 border border-gray-200 rounded p-2 mb-2 flex flex-col gap-1">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-2 py-1 rounded text-sm max-w-[80%] ${
                  msg.sender === "user"
                    ? "self-end bg-blue-600 text-white rounded-br-none"
                    : "self-start bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* AI Typing Animation */}
            {loading && (
              <div className="self-start bg-gray-200 text-gray-800 px-2 py-1 rounded-bl-none rounded text-sm animate-pulse">
                AI is typing...
              </div>
            )}

            {/* Scroll Reference */}
            <div ref={scrollRef}></div>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center justify-center"
            >
              <ArrowUp size={20} />
            </button>
          </form>

          {/* Open Full Chat */}
          <button
            onClick={() => {
              navigate("/ai-chat");
              setIsOpen(false);
            }}
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition mt-2"
          >
            Open Full Chat
          </button>
        </div>
      )}
    </>
  );
}
