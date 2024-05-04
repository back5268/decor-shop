import React from 'react';

const Logo = (props) => {
  const { height = '[40px]' } = props;
  return (
    <div className="flex justify-center">
      <div className={`h-${height}`}>
        <img src="/images/logo.png" alt="Logo" className={`h-${height}`} />
      </div>
    </div>
  );
};

export default Logo;
