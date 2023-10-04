import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { BiUserCircle } from 'react-icons/bi';
// Define the type for a song object
interface Song {
  _id: string;
  title: string;
  author: string;
  rating: number;
  subscribers : number;
  url : string;
}

const defaultSong: Song = {
  _id: '',
  title: '',
  author: '',
  rating: 0,
  subscribers : 0,
  url : ''
};





const ShowSong = () => {
  const [song, setSong] = useState<Song>(defaultSong);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://movie-collection-backend-bl3t.vercel.app/song/${id}`)
      .then((response) => {
        setSong(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Song</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{song.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{song.author}</span>
          </div>
        
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Rating</span>
            {Array.from({ length: song.rating }, (_, index) => (
              <span key={index} className='text-yellow-400'>&#9733;</span>
            ))}
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Subscribers</span>
            <span>{song.subscribers}</span>
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <BiUserCircle className='text-red-300 text-2xl' />
            <a href={song.url} target="_blank" rel="noopener noreferrer" className='my-1 text-blue-500 underline'>
                Click here to listen
            </a>
          </div>
         
    
        </div>
      )}
    </div>
  );
};

export default ShowSong;