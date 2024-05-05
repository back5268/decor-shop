import React from 'react';

const Imagez = (props) => {
  const { h = '10', w = '10', className = "", ...prop } = props;

  return (
    <div className={`relative rounded-md h-${h} w-${w} ${className}`}>
      <img
        className={`h-${h} w-${w} rounded-md object-cover object-center`}
        {...prop}
      />
      <span className="absolute top-0 left-0 w-full h-full bg-primary opacity-15"></span>
    </div>
  );
};

export default Imagez;
