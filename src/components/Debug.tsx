import type { GameState } from "../game/state/index.ts";

interface DebugProps {
    readonly gameState: GameState;
}

const Debug = (props: DebugProps) => {
    return <section id="debug">
        <pre id="game-state-debug">{ JSON.stringify(props.gameState, null, 2) }</pre>
    </section>
}

export default Debug;