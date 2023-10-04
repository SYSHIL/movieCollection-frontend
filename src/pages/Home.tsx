import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';

import './Home.css';
import SongsTable from '../components/home/SongsTable';
import SongCard from '../components/home/SongCard'
// Define the type for a song object
interface Song {
  _id: string;
  title: string;
  author: string;
  rating: number;
  subscribers : number;
  url : string;
}

const Home = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // Default sorting by rating
  const [showType, setShowType] = useState('tabcarle')
  useEffect(() => {
    setLoading(true);
    axios
      .get('https://movie-collection-backend-bl3t.vercel.app/song/list')
      .then((response) => {
        console.log(response.data.songs)
        setSongs(response.data.songs);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Function to handle sorting based on the selected option
  const handleSort = (option: string) => {
    const sortedSongs = [...songs];
    if (option === 'rating') {
      sortedSongs.sort((a, b) => b.rating - a.rating);

    } 
    else if (option === 'subscribers') {
      sortedSongs.sort((a, b) => b.subscribers - a.subscribers);
    }
    else if (option === 'title') {
      sortedSongs.sort((a, b) => a.title.localeCompare(b.title));
    } 
    setSongs(sortedSongs);
    setSortBy(option);
  };

  return (
    <div className='p-4 background-image'>
  <div className='text-center mb-8'>
    <h1 className='text-4xl font-bold'>My music playlist</h1>
  </div>
  <div className='flex justify-between items-center'>
    <Link to='songs/create' className="flex items-center">
      <h1 className='text-2xl'>Add new song</h1> {/* Increase the text size here */}
      <MdOutlineAddBox className='text-sky-800 text-3xl' />
    </Link>
  </div>
  <div className='flex justify-center items-center gap-x-4 mb-4'>
    <button
      className={`${
        showType === 'table' ? 'bg-sky-600' : 'bg-sky-300'
      } hover:bg-sky-600 px-4 py-2 rounded-lg`}
      onClick={() => setShowType('table')}
    >
      Table View
    </button>
    <button
      className={`${
        showType === 'card' ? 'bg-sky-600' : 'bg-sky-300'
      } hover:bg-sky-600 px-4 py-2 rounded-lg`}
      onClick={() => setShowType('card')}
    >
      Card View
    </button>
  </div>
  <div className='my-4'>
    <label htmlFor='sortDropdown' className='text-2xl mr-2'> {/* Increase the text size here */}
      Sort By:
    </label>
    <select
      id='sortDropdown'
      value={sortBy}
      onChange={(e) => handleSort(e.target.value)}
    >
      <option value='rating'>Rating</option>
      <option value='title'>Title</option>
      <option value='subscribers'>Listeners</option>

    </select>
  </div>
  {loading ? (
    <Spinner />
  ) : showType === 'table' ? (
    <SongsTable songs={songs} />
  ) : (
    <SongCard songs={songs} />
  )}
</div>

)};

export default Home;
