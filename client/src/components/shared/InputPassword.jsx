import { Inputz } from '@components/core';
import React, { useState } from 'react';

const InputPassword = (props) => {
  const { ...prop } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Inputz type={showPassword ? 'text' : 'password'} {...prop} />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-0 top-5 flex px-4 text-form focus:outline-none"
      >
        {showPassword ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8V4m0 0h-4m4 0h.01" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default InputPassword;
