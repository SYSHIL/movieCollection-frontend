import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import StarRatingInput from '../components/StarRatingInput';

const CreateSong = () => {
  // const [title, setTitle] = useState('');
  // const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // State for selected song and search results
  const [selectedSong, setSelectedSong] = useState<any>(null); // Add type assertion here
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const API_KEY = '30719978c1c8108fbde6ae15c6dacfa9';

  useEffect(() => {
    // Automatically select the top search result when search results change
    if (searchResults.length > 0) {
      setSelectedSong(searchResults[0]);
    }
  }, [searchResults]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchTerm}&api_key=${API_KEY}&format=json`
      );
      const { trackmatches } = response.data.results;

      // Set the top 5 search results to the state
      setSearchResults(trackmatches.track.slice(0, 5));
    } catch (error) {
      console.error('Error searching for songs:', error);
    }
  };

  const handleSaveSong = () => {
    if (!selectedSong) {
      enqueueSnackbar('Please select a song', { variant: 'error' });
      return;
    }
  
    const data = {
      title: selectedSong.name,
      author: selectedSong.artist,
      subscribers : selectedSong.listeners,
      url : selectedSong.url,
      rating,

    };
    setLoading(true);
  
    // Make a POST request to your backend API with the data
    axios
      .post('https://movie-collection-backend-bl3t.vercel.app/song/create', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Song Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.error(error);
      });
  };
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Song</h1>
      {loading ? <Spinner /> : ''}

      {/* Search bar */}
      <div className='my-4'>
        <label className='text-lg text-gray-700'>Search for Songs:</label>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border border-gray-400 rounded px-4 py-2 w-full'
        />
        <button
          className='px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-500 transition'
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Display selected song details */}
      {selectedSong && (
        <div className='my-4'>
          <h2 className='text-xl font-semibold'>Selected Song:</h2>
          <h3>Title: {selectedSong.name}</h3>
          <p>Artist: {selectedSong.artist}</p>
          <p>Album: {selectedSong.album}</p>
          <p>Listeners: {selectedSong.listeners}</p>
          <p>URL: {selectedSong.url}</p>
        </div>
      )}

      {/* Rest of your CreateSong component */}
      <div className='flex flex-col border rounded-lg shadow-lg p-6 max-w-md mx-auto'>
        <div className='my-4'>
          <label className='text-lg text-gray-700'>Rating out of 5:</label>
          <StarRatingInput
            value={rating}
            onChange={(newRating: number) => setRating(newRating)}
          />
        </div>
        <button
          className='px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-500 transition'
          onClick={handleSaveSong}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateSong;
