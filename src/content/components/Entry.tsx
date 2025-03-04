import React, { useEffect, useState, useRef } from 'react';
import Copy from './Copy';
import { INodeData } from '../models/interfaces';

interface Props {
  title: string;
  value: string;
  children: React.ReactNode;
}

const Entry: React.FC<Props> = ({ title, value, children }) => {
  return (
    <div>
      <h2 className="text-xl select-none">{title}</h2>
      <Copy fillColor="white" value={value} />
      <div className="h-14 p-0.5 pr-18 relative border border-solid border-gray-500 cursor-text whitespace-nowrap overflow-x-auto">
        {children}
      </div>
    </div>
  );
};

export default Entry;
