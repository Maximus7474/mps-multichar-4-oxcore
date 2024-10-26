import { useEffect, useState } from 'react';
import { isEnvBrowser } from './utils/misc';
import { useNuiEvent } from './hooks/useNuiEvent';
import Identity from './pages/Identity';
import DevDrawer from './utils/DevDrawer';
import Multichar from './pages/MultiChar';

import { Character } from '@overextended/ox_core';

function App() {
  const [visible, setVisible] = useState<boolean>(isEnvBrowser());
  const [page, setPage] = useState<string>('identity');
  const [charSlots, setCharSlots] = useState<number>(1);
  const [characters, setCharacters] = useState<Character[]>([]);

  useNuiEvent('setVisible', (data: { visible?: boolean, page?: string }) => {
    setVisible(data.visible || false);
    if (data.page) setPage(data.page);
  });

  useNuiEvent('setConfig', (data: {maxSlots: number}) => {
    setCharSlots(data.maxSlots);
  });

  useNuiEvent('setData', (data: {characters?: Character[]}) => {
    if (data.characters) setCharacters(data.characters);
  });

  if (isEnvBrowser()) {
    useEffect(() => {
      setTimeout(() => {
        setCharacters([
          {
            charId: 1,
            stateId: "IJ0221",
            firstName: "Maximus",
            lastName: "Prime",
            x: 411.69232177734375,
            y: -1628.4000244140625,
            z: 29.2799072265625,
            heading: 243.77952575683594,
            lastPlayed: "26/10/2024"
          }
        ])
      }, 1000);
    }, []);
  };

  return (
    <>
      {visible && (
        <div className="nui-wrapper">
          {page === 'identity' && <Identity setPage={setPage} canReturn={characters.length > 0} />}
          {page === 'multichar' && <Multichar setPage={setPage} characters={characters} charSlots={charSlots} />}
        </div>
      )}
      {isEnvBrowser() && <DevDrawer page={page} setPage={setPage} />}
    </>
  );
}

export default App;
