import React, { useEffect, useState, useRef } from 'react';
import { FaGrip } from 'react-icons/fa6';

interface Props {
  target: HTMLElement | null;
}

interface Position {
  x: number;
  y: number;
}

const Draggable: React.FC<Props> = ({ target }) => {
  const offsetRef = useRef<Position>({ x: 0, y: 0 });
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  function mouseDownHandler(event: React.MouseEvent): void {
    const rect = target!.getBoundingClientRect();
    offsetRef.current = {
      x: event.clientX - rect.right,
      y: event.clientY - rect.bottom,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    event.preventDefault();
  }

  function mouseMoveHandler(event: MouseEvent): void {
    const x = windowWidth - (event.clientX - offsetRef.current.x);
    const y = windowHeight - (event.clientY - offsetRef.current.y);
    target!.style.right = `${x}px`;
    target!.style.bottom = `${y}px`;
    reposition();
  }

  function mouseUpHandler(): void {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  }

  function reposition(): void {
    const margin = 10;
    const rect = target!.getBoundingClientRect();
    
    if ((windowWidth - margin) < rect.right) {
      target!.style.right = `${margin}px`;
    }
    if (margin > rect.left) {
      target!.style.right = `${windowWidth - rect.width - margin}px`;
    }
    if ((windowHeight - margin) < rect.bottom) {
      target!.style.bottom = `${margin}px`;
    }
    if (margin > rect.top) {
      target!.style.bottom = `${windowHeight - rect.height - margin}px`;
    }
  }

  return (
    <div className="flex justify-center">
      <div className="px-2.5 cursor-all-scroll" onMouseDown={mouseDownHandler}>
        <FaGrip />
      </div>
    </div>
  );
};

export default Draggable;
