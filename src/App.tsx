import './App.css'
import PlayerInput from './components/PlayerInput.tsx'
import History from './components/History.tsx'
import { useState } from 'react';
import type { GameState } from './game/state/game-state.ts';
import Debug from './components/Debug.tsx';

const INITIAL_CONTEXT = "You awaken in a dimly-lit room made entirely of stone. The air tastes damp, and torches flicker on the east and west walls. You don't remember why you're here.";
const INITIAL_GAME_STATE: GameState = {
  player: {
    location: {
      x: 0,
      y: 0,
    },
    stats: {
      healthPoints: 10,
      maximumHealthPoints: 10,
    }
  },
  map: {
    locations: [{
      coords: { x: 0, y: 0 },
      description: "An unremarkable dungeon room. There are exits to the north, south, east, and west."
    }],
  }
};

function App() {
  const [context, setContext] = useState(INITIAL_CONTEXT);
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  const submitAction = async (input: string) => {
    const response = await fetch("http://localhost:3000/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        context,
        action: input,
        gameState,
      })
    });
    const body = await response.json();
    setContext(body.context);
    setGameState(body.gameState);
  };

  return (
    <>
      <History context={context}/>
      <PlayerInput submitCallback={submitAction}/>
      <Debug gameState={gameState}/>
    </>
  )
}

export default App
