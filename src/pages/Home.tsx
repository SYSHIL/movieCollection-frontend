import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import {BsInfoCircle} from 'react-icons/bs'
import {AiOutlineEdit} from 'react-icons/ai'
import './Home.css'; // Use './' to specify the current directory
// Define the type for a movie object
interface Movie {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
  rating: number;
}


const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://movie-collection-backend-bl3t-iv0bq1c5j-syshils-projects.vercel.app/movie/list')
      .then((response) => {
        setMovies(response.data.movies);
        setLoading(false);
        console.log(response.data)
      })
      .catch((error)=>{
        console.error('Error fetching data:',error)
        setLoading(false)
      })
  }, []);

  return (
    <div className='p-4 background-image'>
      <div className='text-center mb-8'>
      <h1 className='text-4xl font-bold'>Welcome to Rotten tomatoes!</h1>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Catalogue</h1>
        <Link to='movies/create'>
          <h1>Post movie review </h1>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>
                No
              </th>
              <th className='border border-slate-600 rounded-md'>
                Title
              </th>
              <th className='border border-slate-600 rounded-md'>
                Director
              </th>
              <th className='border border-slate-600 rounded-md '>
                Release Year
              </th>
              <th className='border border-slate-600 rounded-md '>
                Rating out of 10
              </th>
              <th className='border border-slate-600 rounded-md'>
                Actions
              </th>
            </tr>
            
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={movie._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {movie.title}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {movie.author}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {movie.publishYear}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {movie.rating}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/movies/details/${movie._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800'/>
                    </Link>
                    <Link to={`/movies/edit/${movie._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600'/>
                    </Link>
                    <Link to={`/movies/delete/${movie._id}`}>
                      <AiOutlineEdit className='text-2xl text-red-600'/>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
