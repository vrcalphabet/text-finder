import React, { useEffect, useState, useRef } from 'react';
import Draggable from './Draggable';
import Entry from './Entry';
import { INodeData } from '../models/interfaces';
import XPathGenerator from '../models/XpathGenerator';
import Button from './Button';

interface Props {
  currentOverlay: INodeData | null;
  isOverlayVisible: boolean;
  rootRef: React.RefObject<HTMLElement | null>;
}

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

  return (
    <div
      ref={panelRef}
      className={`w-96 right-2.5 p-5 space-y-2.5 fixed bottom-2.5 bg-black/90 rounded-xl border border-solid border-gray-500/50 ${
        isOverlayVisible ? '' : 'hidden'
      }`}
    >
      <Draggable target={panel} />
      <Entry title="XPath" value={currentOverlay?.xpath ?? ''} />
      <Entry title="[title]" value={currentOverlay?.title ?? ''} />
      <Entry title="[placeholder]" value={currentOverlay?.placeholder ?? ''} />
      <Entry title="textContent" value={currentOverlay?.textContent ?? ''} />
      <Button value="Output Target to Log" onClick={buttonClickHandler} />
    </div>
  );
};

export default Panel;
