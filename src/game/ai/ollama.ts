import ollama from "ollama";
import { type AiService, type PlayerAction } from "./index.ts";
import type { GameState } from "../state/game-state.ts";
import type { Definition } from "typescript-json-schema";
import { formatActionText } from "../context/index.ts";

export class OllamaService implements AiService {
    private readonly storytellerModel: string;
    private readonly analyticalModel: string;

    constructor(params: {
        storytellerModel: string,
        analyticalModel: string,
    }) {
        this.storytellerModel = params.storytellerModel;
        this.analyticalModel = params.analyticalModel;
    }

    async executePlayerAction(instructions: string, input: PlayerAction) {
        const response = await ollama.generate({
            model: this.storytellerModel,
            system: instructions,
            prompt: JSON.stringify({
                history: this._playerActionToPrompt(input),
                gameState: input.currentState,
                stateScema: input.stateSchema,
            }),
            stream: false,
            options: {
                num_predict: 4096,
            },
        });
        return response.response;
    }

    async updateStateFromAction(instructions: string, currentState: GameState, stateSchema: Definition, action: string): Promise<GameState> {
        const response = await ollama.generate({
            model: this.analyticalModel,
            system: instructions,
            prompt: JSON.stringify({
                gameState: currentState,
                action,
                stateSchema
            }),
            stream: false,
            format: stateSchema,
        });
        return JSON.parse(response.response) as unknown as GameState;
    }

    private _playerActionToPrompt(action: PlayerAction) {
        if (action.actionText?.length > 0) {
            return `${action.storyContext}\n\n> ${formatActionText(action.actionText)}\n\n}`;
        }
        return action.storyContext;
    }
}