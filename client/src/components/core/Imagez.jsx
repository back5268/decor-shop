import React from 'react';

const Imagez = (props) => {
  const { className = "h-10 w-10", ...prop } = props;

  return (
    <div className={`relative rounded-md ${className}`}>
      <img
        className={`rounded-md object-cover object-center ${className}`}
        {...prop}
      />
      <span className="absolute top-0 left-0 w-full h-full bg-primary opacity-15"></span>
    </div>
  );
};

export default Imagez;
