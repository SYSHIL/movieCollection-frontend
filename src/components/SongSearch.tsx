import React, { useState } from 'react';
import axios from 'axios';

interface Track {
  name: string;
  artist: string;
  album: string;
  listeners: number; // Change the type to number
  url: string;
}

const SongSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const API_KEY = '30719978c1c8108fbde6ae15c6dacfa9';

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchTerm}&api_key=${API_KEY}&format=json`
      );
      const { track } = response.data.results.trackmatches;
      setSearchResults(track.slice(0, 5)); // Get the top 5 results
    } catch (error) {
      console.error('Error searching for songs:', error);
    }
  };

  return (
    <div>
      <h2>Search for Songs</h2>
      <div>
        <input
          type="text"
          placeholder="Enter song name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {searchResults.map((song, index) => (
          <div key={index} className="song-card">
            <h3>{song.name}</h3>
            <p>Artist: {song.artist}</p>
            <p>Album: {song.album}</p>
            <p>Listeners: {song.listeners}</p>
            <p>URL: {song.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongSearch;
