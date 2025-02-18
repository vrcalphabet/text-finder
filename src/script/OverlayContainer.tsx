import React, { useEffect, useState } from 'react';
import { INodeData } from './interfaces';
import NodeFinder from './NodeFinder';
import Mousetrap from 'mousetrap';
import '../styles/overlay.css';

const OverlayContainer: React.FC = () => {
  const [nodes, setNodes] = useState<INodeData[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    Mousetrap.bind('alt+h', () => {
      setIsVisible(false);
      setTimeout(() => {
        const foundNodes = NodeFinder.getInstance().findNodes();
        setNodes(foundNodes);
        setIsVisible(true);
      }, 0);
      return false;
    });
    
    Mousetrap.bind('esc', () => {
      setIsVisible(false);
    })
  }, []);

  return (
    <div className="overlay-container" hidden={!isVisible}>
      {nodes.map((node, index) => (
        <div key={`group-${index}`} className="overlay-container__group">
          {node.sizes.map((size, index) => (
            <div
              key={`overlay-${index}`}
              className="overlay-container__overlay"
              style={{
                left: `${size.left}px`,
                top: `${size.top}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default OverlayContainer;
