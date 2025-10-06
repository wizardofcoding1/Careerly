
import React from "react";
import { Search } from "lucide-react"; // optional, if you want an icon

export default function SearchBar({ searchTerm, setSearchTerm, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center w-full max-w-xl mx-auto mt-2 mb-8"
    >
      <div className="flex w-full bg-white rounded-full shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search videos..."
          className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          <Search size={18} />
          Search
        </button>
      </div>
    </form>
  );
}
