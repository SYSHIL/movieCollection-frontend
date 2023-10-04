import SongSingleCard from './SongSingleCard';

const SongsCard = ({ songs }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {songs.map((item) => (
        <SongSingleCard key={item._id} song={item} />
      ))}
    </div>
  );
};

export default SongsCard;