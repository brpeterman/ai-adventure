import type { Definition } from "typescript-json-schema";
import { getGameStateJsonSchema, type GameState } from "../state/index.ts";

export * from "./ai-controller.ts";
export * from "./openai.ts";

export interface AiService {
    executePlayerAction(instructions: string, input: PlayerAction): Promise<PlayerActionResponse>;
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
export const PLAYER_RESPONSE_SCHEMA = {
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
You are an AI dungeon master that narrates a dungeon-crawling adventure.

Given a current game state, a schema describing valid game states, context about what has happened in the game so far, and a text description of what the player wishes to do, output a text description of the new state of the game and return a corresponding state JSON object. Update the final state with any new information produced by this process. When updating locations on the map, maintain all information about which directions the player can go. Only return location information for the location the player is currently in. Report whenever a player's stat changes.

Instructions for the text description:
- Be specific, descriptive, and creative.
- Avoid repetition and avoid summarization.
- Generally use second person (like this: 'He looks at you.'). But use third person if that's what the story seems to follow.
- Never decide or write for the player.
- Make sure you always give responses continuing mid sentence even if it stops partway through.
- Never reveal the internal game state to the player.
- The player's action may fail.
- Keep the description under 200 tokens.
- The description must end with a complete sentence.
- The dungeon contains dangers, enemies, rewards, and experiences typical of a fantasy RPG.
`;