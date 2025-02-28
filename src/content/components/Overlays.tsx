import React, { useEffect, useState, useRef } from 'react';
import Mousetrap from 'mousetrap';
import { INodeData } from '../models/interfaces';
import NodeFinder from '../models/NodeFinder';
import NodeSelector from '../models/OverlaySelector';

interface Props {
  shadowRoot: ShadowRoot;
  setCurrentOverlay: (value: INodeData | null) => void;
  isOverlayVisible: boolean;
  setIsOverlayVisible: (value: boolean) => void;
  setRoot: (value: HTMLElement | null) => void;
}

const Overlays: React.FC<Props> = ({
  shadowRoot,
  setCurrentOverlay,
  isOverlayVisible,
  setIsOverlayVisible,
  setRoot,
}) => {
  const [nodes, setNodes] = useState<INodeData[]>([]);
  const [hoverGroupId, setHoverGroupId] = useState<number | null>(null);
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);

  useEffect(() => {
    Mousetrap.bind('alt+g', () => {
      findNodes(document.body);
      setRoot(document.body);
      return false;
    });

    Mousetrap.bind('alt+h', () => {
      const root = document.querySelector<HTMLElement>('div#app > main')!;
      findNodes(root);
      setRoot(root);
      return false;
    });

    Mousetrap.bind('esc', () => {
      setIsOverlayVisible(false);
      return false;
    });
  }, []);

  function findNodes(root: HTMLElement): void {
    setIsOverlayVisible(false);
    setTimeout(() => {
      const foundNodes = NodeFinder.getInstance().findNodes(root);
      setNodes(foundNodes);
      setIsOverlayVisible(true);
    }, 0);
  }

  function containerMouseMoveHandler(event: React.MouseEvent): void {
    const overlay = NodeSelector.select(shadowRoot, event.clientX, event.clientY);
    if (!overlay) {
      setHoverGroupId(null);
    } else {
      const groupId = +overlay.dataset.groupId!;
      setHoverGroupId(groupId);
    }
  }

  function containerClickHandler(event: React.MouseEvent): void {
    const overlay = NodeSelector.select(shadowRoot, event.clientX, event.clientY);
    if (!overlay) {
      setActiveGroupId(null);
      setCurrentOverlay(null);
    } else {
      const groupId = +overlay.dataset.groupId!;
      setActiveGroupId(groupId);
      setCurrentOverlay(nodes[groupId]);
    }
  }

  return (
    <div
      className={`w-full h-full fixed bg-white/15 ${isOverlayVisible ? '' : 'hidden'}`}
      onMouseMove={containerMouseMoveHandler}
      onClick={containerClickHandler}
    >
      {nodes.map((node, index) => (
        <div key={`group-${index}`} data-group-id={index}>
          {node.sizes.map((size, innerIndex) => (
            <div
              key={`overlay-${index}-${innerIndex}`}
              data-overlay-id={innerIndex}
              className={`absolute cursor-pointer border border-solid ${
                activeGroupId === index || hoverGroupId === index
                  ? 'bg-white/25 border-white/50'
                  : 'bg-red-500/25 border-red-500/50'
              }`}
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

export default Overlays;
