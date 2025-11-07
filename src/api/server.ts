import express from "express";
import ViteExpress from "vite-express";
import { AiController, OpenAiService } from "../game/ai/index.ts";
import ApiHandler from "./api-handler.ts";

const API_PORT = 3000;

const app = express();
app.use(express.json());

const apiHandler = new ApiHandler({
    aiController: new AiController({
        aiService: new OpenAiService()
    })
});

app.post("/api/action", async (request, response) => {
    await apiHandler.executePlayerAction(request, response);
});

ViteExpress.listen(app, API_PORT, () => console.log(`Started API server on port ${API_PORT}.`));
