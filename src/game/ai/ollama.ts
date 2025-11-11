import ollama from "ollama";
import { type AiService, type PlayerAction } from "./index.ts";
import type { GameState } from "../state/game-state.ts";
import type { Definition } from "typescript-json-schema";

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
            prompt: JSON.stringify(input),
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
        console.log(`Analytical AI Response: ${JSON.stringify(response, null, 2)}`);
        return JSON.parse(response.response) as unknown as GameState;
    }
}