import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditSong = () => {

  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://movie-collection-backend-bl3t.vercel.app/song/${id}`)
    .then((response) => {
        setRating(response.data.rating)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  }, [])
  
  const handleEditSong = () => {
    // Validate the rating to be between 0 and 5
    const parsedRating = parseFloat(rating);
    if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
      // Display an alert if the rating is not valid
      window.alert('Rating must be a number between 0 and 5');
      return;
    }
  
    const data = {
      rating: parsedRating // Use the parsed rating value
    };
  
    setLoading(true);
    axios
      .put(`https://movie-collection-backend-bl3t.vercel.app/song/update/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Song Edited successfully', { variant: 'success' });
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
      <h1 className='text-3xl my-4'>Change rating</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
  
     
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Rating</label>
          <input
            type='number'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditSong}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditSong