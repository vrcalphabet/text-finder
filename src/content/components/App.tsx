import React, { useEffect, useState, useRef } from 'react';
import Styles from './Styles';
import Overlays from './Overlays';
import Panel from './Panel';
import { INodeData } from '../models/interfaces';

interface Props {
  shadowRoot: ShadowRoot;
}

const App: React.FC<Props> = ({ shadowRoot }) => {
  const [root, setRoot] = useState<HTMLElement | null>(null);
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
        setRoot={setRoot}
      />
      <Panel currentOverlay={currentOverlay} isOverlayVisible={isOverlayVisible} root={root} />
    </>
  );
};

export default App;
