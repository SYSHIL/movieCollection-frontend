import React from 'react';
import SongSingleCard from './SongSingleCard';
interface Song {
    _id: string;
    title: string;
    author: string;
    subscribers: number;
    url: string;
    // Add other properties if needed
  }
interface SongsCardProps {
  songs: Song[]; // songs is an array of Song objects
}

const SongsCard: React.FC<SongsCardProps> = ({ songs }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {songs.map((item: Song) => (
        <SongSingleCard key={item._id} song={item} />
      ))}
    </div>
  );
};

export default SongsCard;
