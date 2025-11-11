import PlayerInput from './components/PlayerInput.tsx';
import History from './components/History.tsx'
import { useState } from 'react';
import type { GameState } from './game/state/game-state.ts';
import Debug from './components/Debug.tsx';
import Setup from './components/Setup.tsx';

const INITIAL_GAME_STATE: GameState = {
  player: {
    location: {
      x: 0,
      y: 0,
    },
    stats: {
      healthPoints: 10,
      maximumHealthPoints: 10,
      strength: Math.floor(Math.random() * 5 + 8),
      intellect: Math.floor(Math.random() * 5 + 8),
      fortitude: Math.floor(Math.random() * 5 + 8),
    },
    inventory: {
      items: [],
    }
  },
  map: {
    locations: [{
      coords: { x: 0, y: 0 },
      description: ""
    }],
  }
};

function App() {
  const [context, setContext] = useState("");
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [actionsEnabled, setActionsEnabled] = useState(true);
  const [setupState, setSetupState] = useState({ aiInstructions: "", persistentContext: ""});

  const submitAction = async (input: string) => {
    setActionsEnabled(false);
    const response = await fetch("http://localhost:3000/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        context,
        action: input,
        gameState,
        persistentContext: setupState.persistentContext,
        additionalInstructions: setupState.aiInstructions,
      })
    });
    const body = await response.json();
    setContext(context + body.context);
    setGameState(body.gameState);
    setActionsEnabled(true);
  };

  const initializeGame = (params: {
    storyIntro: string,
    persistentContext: string,
    aiInstructions: string,
  }) => {
    setSetupState({
      aiInstructions: params.aiInstructions,
      persistentContext: params.persistentContext,
    });
    setContext(params.storyIntro);
  };

  return (
    <div id="app-container" className="
      bg-gray-50
      dark:bg-gray-900
      text-black
      dark:text-white
      w-dvw
      h-dvh">
        <div id="layout-container" className="
          flex-row
          max-w-10/12
          m-auto">
          {!context && (
            <Setup onStart={initializeGame}/>
          )}
          {context && (
            <>
              <div className="flex-1">
                <History context={context}/>
              </div>
              <div className="mt-2">
                <PlayerInput submitCallback={submitAction} actionsEnabled={actionsEnabled}/>
              </div>
              <div className="flex-1">
                <Debug gameState={gameState} expanded={false}/>
              </div>
            </>
          )}
        </div>
    </div>
  )
}

export default App
