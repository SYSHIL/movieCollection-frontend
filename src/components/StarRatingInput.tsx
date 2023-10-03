import React, { useState } from 'react';

interface StarRatingInputProps {
  value: number; // Correctly typed as a number
  onChange: (newValue: number) => void;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({ value, onChange }) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleStarClick = (starValue: number) => {
    onChange(starValue);
  };

  const handleStarMouseEnter = (starValue: number) => {
    setHoveredStar(starValue);
  };

  const handleStarMouseLeave = () => {
    setHoveredStar(null);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-2xl ${
            star <= (hoveredStar || value) ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarMouseEnter(star)}
          onMouseLeave={handleStarMouseLeave}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRatingInput;
