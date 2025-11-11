import type { Definition } from "typescript-json-schema";
import { getGameStateJsonSchema, type GameState } from "../state/index.ts";

export * from "./ai-controller.ts";
export * from "./openai.ts";
export * from "./ollama.ts";

export interface AiService {
    executePlayerAction(instructions: string, input: PlayerAction): Promise<string>;
    updateStateFromAction(instructions: string, currentState: GameState, stateSchema: Definition, action: string): Promise<GameState>;
};

export type PlayerActionResponse = {
    textDescription: string,
    gameState: GameState,
};

export type PlayerAction = {
    actionText: string,
    storyContext: string,
    stateSchema: Definition,
    currentState: GameState,
};

// I don't love this. Build a more elegant response schema later.
const gameStateSchema = getGameStateJsonSchema();
export const PLAYER_ACTION_RESPONSE_SCHEMA = {
    type: "object",
    required: ["textDescription", "gameState"],
    properties: {
        textDescription: {
            description: "Description of the result of the player's action",
            type: "string",
        },
        gameState: {
            description: "New game state after the player's action has been completed.",
            type: "object",
            required: ["player", "map"],
            properties: {
                player: gameStateSchema.properties?.player,
                map: gameStateSchema.properties?.map,
            },
            additionalProperties: false,
        },
    },
    additionalProperties: false,
    definitions: gameStateSchema.definitions,
};

export const PLAYER_ACTION_INSTRUCTIONS = `
You are an AI dungeon master that narrates a narrative experience.

Given a current game state, a schema describing valid game states, context about what has happened in the game so far, and a text description of what the player wishes to do, output an unstructured text description of the result of the player's action.

Instructions for the output:
- Be specific, descriptive, and creative.
- Avoid repetition and avoid summarization.
- Generally use second person (like this: 'He looks at you.'). But use third person if that's what the story seems to follow.
- > tokens begin player actions. Generating > is forbidden.
- Ensure the player's latest action is mentioned in the output.
- Never generate >.
- Never decide or write for the player.
- Never take actions on behalf of the player.
- Make sure you always give responses continuing mid sentence even if it stops partway through.
- Never reveal the internal game state to the player.
- The player's action may fail if it is appropriate for the story and game state.
- The description must end with a complete sentence.
- Do not report on player stats or inventory unless they change.
- Report whenever a player's stat changes.
- Locations may only have exits in the cardinal directions. Exits are defined by locations adjacent to the player's location on the map.
- Always list the exits.
`;

export const UPDATE_STATE_INSTRUCTIONS = `
You are the state keeper for an adventure game. Your job is to make updates to the state of the game based on a text description of what has just happened. The "player" is referred to as "you" in the text.

Given the current state of the game and an action that has just occurred, parse the action and make relevant updates to the state, then return the updated state.

Whenever the player moves to a new location, update their coordinates and either generate a new location (if the coordinates have not been visited yet) or update an existing location. Moving north increases the y coordinate, moving south decreases the y coordinate, moving east increases the x coordinate, and moving west decreases the x coordinate.

Location descriptions describe the physical location only, not the state of the player. The player ("you") should not be mentioned at all. Location descriptions always include a summary of the exits, labeled by cardinal directions. Location descriptions should be short and succinct. Do not make multiple locations with the same coordinates; instead, combine and summarize them.

When a player picks up or uses an item, update the inventory entry for that item appropriately.
`;