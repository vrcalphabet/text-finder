import React from 'react';

interface IOverlayProps {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const Overlay: React.FC<IOverlayProps> = ({ left, top, width, height }) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: 'red',
  };

  return <div style={style} />;
};
