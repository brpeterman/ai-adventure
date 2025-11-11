import { PLAYER_ACTION_INSTRUCTIONS, type AiService, type PlayerActionResponse } from "./index.ts"
import { getGameStateJsonSchema, type GameState, type MapCoordinates } from "../state/index.ts";

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
        initialContext: string,
        persistentContext: string,
        additionalInstructions: string,
    }): Promise<PlayerActionResponse> {
        // Prune the locations to only those that are relevant to the current context
        const relevantLocations = params.initialState.map.locations.filter(location => this._isLocal(location.coords, params.initialState.player.location));
        const prunedState = {
            ...params.initialState,
            map: {
                ...params.initialState.map,
                locations: relevantLocations,
            },
        };

        const fullInstructions = this._mergeInstructions(PLAYER_ACTION_INSTRUCTIONS, params.additionalInstructions);
        const fullContext = this._mergeContext(params.initialContext, params.persistentContext);

        return await this.aiService.executePlayerAction(fullInstructions, {
            actionText: params.actionText,
            currentState: prunedState,
            stateSchema: getGameStateJsonSchema(),
            storyContext: fullContext,
        });
    }

    private _isLocal(locationCoords: MapCoordinates, playerCoords: MapCoordinates): boolean {
        const distance = Math.sqrt(
            Math.pow(locationCoords.x - playerCoords.x, 2) +
            Math.pow(locationCoords.y - playerCoords.y, 2)
        );
        return distance <= 1;
    }

    private _mergeInstructions(defaultInstruction: string, additionalInstructions: string) {
        return `${defaultInstruction}\n${additionalInstructions}`;
    }

    private _mergeContext(storyContext: string, persistentContext: string) {
        return `${persistentContext}\n\n${storyContext}`;
    }
}