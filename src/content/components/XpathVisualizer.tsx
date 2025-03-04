import React, { useEffect, useState, useRef } from 'react';
import { IXpathData } from '../models/interfaces';

interface Props {
  xpath: IXpathData[];
}

const XpathVisualizer: React.FC<Props> = ({ xpath }) => {
  const [isHover, setIsHover] = useState(false);
  const [currentHoverXpath, setCurrentHoverXpath] = useState<IXpathData | null>(null);

  function mouseEnterHandler(index: number) {
    setCurrentHoverXpath(xpath[index]);
    setIsHover(true);
  }

  function mouseLeaveHandler() {
    setCurrentHoverXpath(null);
    setIsHover(false);
  }

  return (
    <>
      {xpath.map((d, index) => (
        <span
          key={index}
          className="hover:bg-red-400 select-all"
          onMouseEnter={() => mouseEnterHandler(index)}
          onMouseLeave={() => mouseLeaveHandler()}
          onDragStart={() => false}
        >
          {d.value}
        </span>
      ))}
      <div className={`fixed top-0 left-0 ${isHover ? '' : 'hidden'}`}>
        {currentHoverXpath &&
          currentHoverXpath.sizes.map((size, index) => (
            <div
              key={index}
              className="absolute bg-blue-300/50"
              style={{
                left: `${size.left}px`,
                top: `${size.top}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
              }}
            ></div>
          ))}
      </div>
    </>
  );
};

export default XpathVisualizer;
