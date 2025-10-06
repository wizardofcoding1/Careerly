import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Youtube } from 'lucide-react';

export default function SearchBar() {
  let [search, setSearch] = useState("");
  const navigate = useNavigate();

  let handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Navigate to /results page with search query parameter
    navigate(`/Careerly-Video?query=${encodeURIComponent(search)}`);
  }

  return (
    <div className='bg-white shadow-md rounded-2xl flex flex-col px-2'>
      <div className='px-3 flex flex-row items-center'>
        <Youtube className='mt-4 text-red-600 w-8 h-8' />
        <h2 className='text-2xl font-bold mt-2 mx-1'>Youtube</h2>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 items-center justify-center p-3'>
        <TextField 
          id="outlined-basic" 
          label="Search" 
          variant="outlined" 
          onChange={handleChange} 
          value={search} 
          required 
          className="w-full"
        />
        <button 
          type="submit"
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 w-fit'
        >
          Find
        </button>
      </form>
    </div>
  );
}
