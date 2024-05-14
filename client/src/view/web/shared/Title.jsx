import React from 'react';

const Title = ({ label }) => {
  return (
    <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-border after:mt-0.5 after:flex-1 after:border-t after:border-border mb-4">
      <h2 className="flex justify-center font-bold uppercase text-xl mx-6">{label}</h2>
    </div>
  );
};

export default Title;
