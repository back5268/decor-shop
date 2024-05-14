import React from 'react';

const Logo = (props) => {
  const { size = '8', className = '' } = props;

  return (
    <div className={`flex gap-4 justify-center items-center font-bold text-2xl ${className}`}>
      <div className={`h-${size}`}>
        <img src="/images/logo.png" alt="Logo" className={`h-${size}`} />
      </div>
      <span>Decor.Day</span>
    </div>
  );
};

export default Logo;
