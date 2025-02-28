import React, { useEffect, useState, useRef } from 'react';

interface Props {
  value: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ value, onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;