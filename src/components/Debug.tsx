import { useState } from "react";
import type { GameState } from "../game/state/index.ts";

interface DebugProps {
    readonly gameState: GameState;
    readonly expanded: boolean;
}

const Debug = (props: DebugProps) => {
    const [expanded, setExpanded] = useState(props.expanded);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <section id="debug" className="overflow-auto overscroll-contain max-h-100">
            <button
                className="
                    bg-gray-300
                    dark:bg-gray-700
                    text-black
                    dark:text-white
                    border
                    border-black
                    dark:border-white
                    p-2"
                onClick={toggleExpanded}>{ expanded ? "Collapse" : "Expand" } debug info</button>
            <pre
                id="game-state-debug"
                className={`
                    bg-white
                    text-black
                    ${expanded ? " block" : " hidden"}`}>
                    { JSON.stringify(props.gameState, null, 2) 
                }</pre>
        </section>
    );
}

export default Debug;