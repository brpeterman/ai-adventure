import type { Request, Response } from "express";
import type { AiController } from "../game/ai/index.ts";
import { integrateContext } from "../game/context/index.ts";
import { mergeGameStates } from "../game/state/index.ts";

export default class ApiHandler {
    readonly aiController: AiController;

    constructor(params: {
        aiController: AiController,
    }) {
        this.aiController = params.aiController;
    };

    async executePlayerAction(request: Request, response: Response) {
        // Validate
        const requestData = request.body;
        if (!requestData.action) {
            throw new Error("action is required");
        }
        if (!requestData.gameState) {
            throw new Error("gameState is required");
        }
        if (!requestData.context) {
            throw new Error("context is required");
        }
        const actionText = requestData.action;
        const initialState = requestData.gameState;
        const initialContext = requestData.context;
        const persistentContext = requestData.persistentContext ?? "";
        const additionalInstructions = requestData.additionalInstructions ?? "";

        // Execute
        const aiResponse = await this.aiController.executePlayerAction({
            actionText,
            initialState,
            initialContext,
            persistentContext,
            additionalInstructions,
        });

        // Aggregate
        const newContext = integrateContext({
            initialContext,
            action: actionText,
            newContext: aiResponse.textDescription,
        });
        const newState = mergeGameStates(initialState, aiResponse.gameState);

        // Respond
        response.send({
            context: newContext,
            gameState: newState,
        });
    }
}