import React, { useEffect, useState } from 'react';
import { INodeData } from './interfaces';
import NodeFinder from './NodeFinder';
import Mousetrap from 'mousetrap';
import '../styles/overlay.css';
import NodeSelector from './NodeSelector';

const OverlayContainer: React.FC = () => {
  const [nodes, setNodes] = useState<INodeData[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);

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
    });
  }, []);

  function containerClickHandler(event: React.MouseEvent): void {
    const overlay = NodeSelector.select(event.clientX, event.clientY);
    if (!overlay) return;

    const group = overlay.parentElement!;
    setActiveGroupId(+group.dataset.groupId!);
  }

  return (
    <div className="overlay-container" hidden={!isVisible} onClick={containerClickHandler}>
      {nodes.map((node, index) => (
        <div key={`group-${index}`} data-group-id={index} className={`overlay-container__group ${activeGroupId === index ? 'overlay-container__group--active' : ''}`}>
          {node.sizes.map((size, innerIndex) => (
            <div
              key={`overlay-${index}-${innerIndex}`}
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
