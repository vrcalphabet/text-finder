import React, { useEffect, useState, useRef } from 'react';
import InjectionObserver from '../models/InjectionObserver';

const Styles: React.FC = () => {
  const [styles, setStyles] = useState<Element[]>([]);

  useEffect(() => {
    InjectionObserver.observe(document.head, () => {
      const styles = document.head.querySelectorAll('style[data-vite-dev-id]');
      setStyles([...styles]);
      return false;
    });
  }, []);

  return (
    <>
      {styles.map((style, index) => (
        <style key={index}>{style.textContent}</style>
      ))}
    </>
  );
};

export default Styles;
