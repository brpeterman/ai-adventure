import ollama from "ollama";
import { PLAYER_ACTION_RESPONSE_SCHEMA, type AiService, type PlayerAction, type PlayerActionResponse } from "./index.ts";

export class OllamaService implements AiService {
    private readonly model: string;

    constructor(model: string) {
        this.model = model;
    }

    async executePlayerAction(instructions: string, input: PlayerAction) {
        const response = await ollama.generate({
            model: this.model,
            system: instructions,
            prompt: JSON.stringify(input),
            format: PLAYER_ACTION_RESPONSE_SCHEMA,
            stream: false,
            options: {
                num_predict: 4096,
            },
        });
        return JSON.parse(response.response) as unknown as PlayerActionResponse;
    }
}