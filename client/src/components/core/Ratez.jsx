import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconz } from '@heroicons/react/24/solid';

const Ratez = ({ value = 5, className = '' }) => {
  const data = Array.from({ length: 5 }, (_, index) => Math.floor(value) - index - 1);

  return (
    <div className={`flex lg:gap-2 ${className}`}>
      {data.map((datum, index) => {
        if (datum < 0) return <StarIcon key={index} color="red" className={`sm:w-4 w-2`} />;
        else return <StarIconz key={index} color="red" className={`sm:w-4 w-2`} />;
      })}
    </div>
  );
};

export default Ratez;
