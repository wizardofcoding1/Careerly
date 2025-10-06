import { Search, XCircle } from "lucide-react";

export default function VideoSearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      {/* Search */}
      <div className="flex items-center bg-white border rounded-full px-4 py-2 shadow-sm w-full sm:w-1/2">
        <Search className="text-gray-500 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search saved videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      {/* Clear Button */}
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="flex items-center gap-1 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-full transition"
        >
          <XCircle size={18} />
          Clear
        </button>
      )}
    </div>
  );
}