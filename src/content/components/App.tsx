import React, { useEffect, useState, useRef } from 'react';
import Styles from './Styles';
import Overlays from './Overlays';
import Panel from './Panel';
import { INodeData } from '../models/interfaces';

interface Props {
  shadowRoot: ShadowRoot;
}

const App: React.FC<Props> = ({ shadowRoot }) => {
  const root = useRef<HTMLElement>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [currentOverlay, setCurrentOverlay] = useState<INodeData | null>(null);

  return (
    <>
      <Styles />
      <Overlays
        shadowRoot={shadowRoot}
        setCurrentOverlay={setCurrentOverlay}
        isOverlayVisible={isOverlayVisible}
        setIsOverlayVisible={setIsOverlayVisible}
        rootRef={root}
      />
      <Panel currentOverlay={currentOverlay} isOverlayVisible={isOverlayVisible} rootRef={root} />
    </>
  );
};

export default App;
