import { PLAYER_ACTION_INSTRUCTIONS, type AiService, type PlayerActionResponse } from "./index.ts"
import { getGameStateJsonSchema, type GameState } from "../state/index.ts";

/**
 * AiController is the interface all external calls to AI services go through.
 * It orchestrates setting up prompts and aggregating context.
 */
export class AiController {
    readonly aiService: AiService;

    constructor(params: {
        aiService: AiService,
    }) {
        this.aiService = params.aiService;
    }

    async executePlayerAction(params: {
        actionText: string,
        initialState: GameState,
        initialContext: string
    }): Promise<PlayerActionResponse> {
        return await this.aiService.executePlayerAction(PLAYER_ACTION_INSTRUCTIONS, {
            actionText: params.actionText,
            currentState: params.initialState,
            stateSchema: getGameStateJsonSchema(),
            storyContext: params.initialContext,
        });
    }
}