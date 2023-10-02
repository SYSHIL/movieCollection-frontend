import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateMovie = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveMovie = () => {
    const data = {
      title,
      author,
      publishYear,
      rating
    };
    setLoading(true);
    axios
      .post('https://movie-collection-backend-bl3t-iv0bq1c5j-syshils-projects.vercel.app/movie/create', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Movie Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Movie</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border rounded-lg shadow-lg p-6 max-w-md mx-auto'>
        <div className='my-4'>
          <label className='text-lg text-gray-700'>Title:</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border border-gray-400 rounded px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-lg text-gray-700'>Director:</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border border-gray-400 rounded px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-lg text-gray-700'>Publish Year:</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border border-gray-400 rounded px-4 py-2 w-full'
          />
        </div>
      <div className='my-4'>
      <label className='text-lg text-gray-700'>Rating out of 10:</label>
      <input
        type='number'
        value={rating}
        onChange={(e) => {
          const inputValue = e.target.value;
          if (inputValue === '' || (parseFloat(inputValue) >= 0 && parseFloat(inputValue) <= 10)) {
            setRating(inputValue); // Convert input value to string before setting
          }
        }}
        className='border border-gray-400 rounded px-4 py-2 w-full'
        />
      </div>
        <button
          className='px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-500 transition'
          onClick={handleSaveMovie}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateMovie;
