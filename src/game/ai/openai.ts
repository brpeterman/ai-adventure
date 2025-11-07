import OpenAI from 'openai';
import { PLAYER_RESPONSE_SCHEMA, type AiService, type PlayerAction, type PlayerActionResponse } from './index.ts';

export class OpenAiService implements AiService {
    readonly client: OpenAI;

    constructor() {
        this.client = new OpenAI({
            /*
            If we're running client-side, `process` will be undefined and we'll crash.
            This is a good thing! OpenAI calls should only ever happen from the server side.
            */
            apiKey: process.env['OPENAI_API_KEY'],
        });
    }

    async executePlayerAction(instructions: string, input: PlayerAction) {
        const response = await this.client.responses.parse({
            model: 'gpt-5',
            instructions,
            input: JSON.stringify(input),
            text: {
                format: {
                    name: "PlayerActionResponse",
                    type: "json_schema",
                    schema: PLAYER_RESPONSE_SCHEMA,
                }
            },
        });

        console.log(`AI response: ${JSON.stringify(response, null, 2)}`);

        return response.output_parsed as unknown as PlayerActionResponse;
    }
}