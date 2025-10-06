import { useState, useRef, useEffect } from "react";
import { ArrowUp, Edit2, Trash2, Menu, X, PlusCircle } from "lucide-react";
import { useChat } from "./ChatContext";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatBotPage() {
  const {
    chats = [],
    currentChat,
    messages = [],
    selectChat,
    addMessage,
    createChat,
    renameChat,
    deleteChat,
    loading,
  } = useChat();

  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addMessage("user", input);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-blue-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="w-64 bg-blue-700 text-white border-r shadow-lg flex flex-col fixed md:static z-40 h-full"
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b border-blue-500">
          <h2 className="font-bold text-lg">Chats</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white hover:text-blue-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* ✅ New Chat Button */}
        <button
          onClick={createChat}
          className="flex items-center justify-center gap-2 m-3 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg text-white text-sm font-medium shadow-md transition"
        >
          <PlusCircle size={18} />
          New Chat
        </button>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {Array.isArray(chats) &&
            chats.map((chat) => (
              <div
                key={chat._id}
                className={`flex justify-between items-center p-3 cursor-pointer transition-colors ${
                  currentChat?._id === chat._id
                    ? "bg-blue-600 font-semibold"
                    : "hover:bg-blue-600"
                }`}
              >
                <span onClick={() => selectChat(chat)}>{chat.title}</span>
                <div className="flex gap-2">
                  <Edit2
                    size={16}
                    className="hover:text-gray-300"
                    onClick={() => {
                      const newTitle = prompt("Rename chat:", chat.title);
                      if (newTitle) renameChat(chat._id, newTitle);
                    }}
                  />
                  <Trash2
                    size={16}
                    className="hover:text-red-300"
                    onClick={() => deleteChat(chat._id)}
                  />
                </div>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col md:ml-0 ml-0">
        {/* Top bar with sidebar toggle */}
        <div className="bg-blue-200 p-3 flex items-center gap-3 shadow-md">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-blue-900 font-semibold text-lg">
            {currentChat?.title || "New Chat"}
          </h1>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={`flex ${
                  msg.sender === "user" || msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-2 py-1 rounded-2xl max-w-xl text-sm shadow-md ${
                    msg.sender === "user" || msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-blue-900 rounded-bl-none border"
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-lg text-sm"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="bg-blue-200 px-1 rounded">
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.text || msg.content}
                  </ReactMarkdown>
                </div>
              </motion.div>
            ))}

            {/* AI Typing Animation */}
            {loading && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start px-4 py-2 max-w-xs bg-white border rounded-xl rounded-bl-none text-blue-700 text-sm gap-1 shadow-md"
              >
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={scrollRef}></div>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t bg-white flex gap-2 sticky bottom-0 z-30"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center justify-center shadow"
          >
            <ArrowUp size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
