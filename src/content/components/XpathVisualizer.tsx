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
          onDragStart={() => { console.log('onDragStart'); return false }}
        >
          {d.value}
        </span>
      ))}
      <div className={`fixed top-0 left-0 -z-[1] ${isHover ? '' : 'hidden'}`}>
        {currentHoverXpath?.size && (
          <div
            className="absolute bg-blue-300/50 border border-blue-300"
            style={{
              left: `${currentHoverXpath.size.left}px`,
              top: `${currentHoverXpath.size.top}px`,
              width: `${currentHoverXpath.size.width}px`,
              height: `${currentHoverXpath.size.height}px`,
            }}
          />
        )}
        {currentHoverXpath &&
          currentHoverXpath.otherSizes.map((size, index) => (
            <div
              key={index}
              className="absolute bg-green-300/50 border border-green-300"
              style={{
                left: `${size.left}px`,
                top: `${size.top}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
              }}
            />
          ))}
      </div>
    </>
  );
};

export default XpathVisualizer;
