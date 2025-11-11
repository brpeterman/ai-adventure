import express from "express";
import ViteExpress from "vite-express";
import { AiController, OllamaService } from "../game/ai/index.ts";
import ApiHandler from "./api-handler.ts";

const API_PORT = 3000;
const OLLAMA_STORYTELLER_MODEL = process.env['OLLAMA_STORYTELLER_MODEL']!;
const OLLAMA_ANALYTICAL_MODEL = process.env['OLLAMA_ANALYTICAL_MODEL']!;

const app = express();
app.use(express.json());

const apiHandler = new ApiHandler({
    aiController: new AiController({
        aiService: new OllamaService({
            storytellerModel: OLLAMA_STORYTELLER_MODEL,
            analyticalModel: OLLAMA_ANALYTICAL_MODEL,
        }),
    })
});

app.post("/api/action", async (request, response) => {
    await apiHandler.executePlayerAction(request, response);
});

ViteExpress.listen(app, API_PORT, () => console.log(`Started API server on port ${API_PORT}.`));
