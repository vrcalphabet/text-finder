import React, { useEffect, useState, useRef } from 'react';
import Draggable from './Draggable';
import Entry from './Entry';
import { INodeData, IXpathData } from '../models/interfaces';
import Button from './Button';
import XpathVisualizer from './XpathVisualizer';

interface Props {
  currentOverlay: INodeData | null;
  isOverlayVisible: boolean;
  rootRef: React.RefObject<HTMLElement | null>;
}

const defaultOverlay: INodeData = {
  target: document.body,
  xpath: [],
  title: void 0,
  placeholder: void 0,
  textContent: void 0,
  sizes: [],
};

const Panel: React.FC<Props> = ({ currentOverlay, isOverlayVisible, rootRef }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setPanel(panelRef.current);
  }, []);

  function buttonClickHandler(): void {
    if (currentOverlay) {
      console.log('[text-finder] ', currentOverlay.target);
    }
  }
  
  if (!currentOverlay) {
    currentOverlay = defaultOverlay;
  }

  function getFullXpath(nodeData: IXpathData[]): string {
    return nodeData.map((node) => node.value).join('');
  }

  const xpath = getFullXpath(currentOverlay.xpath);
  const title = currentOverlay.title ?? '';
  const placeholder = currentOverlay.placeholder ?? '';
  const textContent = currentOverlay.textContent ?? '';

  return (
    <div
      ref={panelRef}
      className={`w-96 right-2.5 p-5 space-y-2.5 fixed bottom-2.5 bg-black/90 rounded-xl border border-solid border-gray-500/50 ${
        isOverlayVisible ? '' : 'hidden'
      }`}
    >
      <Draggable target={panel} />
      <Entry title="XPath" value={xpath}>
        <XpathVisualizer xpath={currentOverlay.xpath} />
      </Entry>
      <Entry title="[title]" value={title}>{title}</Entry>
      <Entry title="[placeholder]" value={placeholder}>{placeholder}</Entry>
      <Entry title="textContent" value={textContent}>{textContent}</Entry>
      <Button value="Output Target to Log" onClick={buttonClickHandler} />
    </div>
  );
};

export default Panel;
