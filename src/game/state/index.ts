import { generateSchema, getProgramFromFiles, type Definition } from "typescript-json-schema";
import { resolve } from "path";
import type { GameState, Location } from "./game-state.ts";

export * from "./game-state.ts";

let gameStateSchema: Definition | null = null;
export function getGameStateJsonSchema(): Definition {
    if (gameStateSchema != null) {
        return gameStateSchema;
    }
    const program = getProgramFromFiles(
        [resolve("./src/game/state/game-state.ts")],
    );
    gameStateSchema = generateSchema(program, "GameState", {
        noExtraProps: true,
        required: true,
    });
    if (!gameStateSchema) {
        throw new Error("Failed to generate game state schema but there was no exception thrown.");
    }
    return gameStateSchema;
};


export function mergeGameStates(initialState: GameState, newState: GameState) {
    const mergedState = {
        ...newState,
    };
    const newLocationsMap = newState.map.locations.reduce((collection: {[k: string]: Location}, location) => {
        collection[`${location.coords.x},${location.coords.y}`] = location;
        return collection;
    }, {});
    for (let location of initialState.map.locations) {
        if (!Object.keys(newLocationsMap).includes(`${location.coords.x},${location.coords.y}`)) {
            mergedState.map.locations.push(location);
        }
    }
    return mergedState;
}