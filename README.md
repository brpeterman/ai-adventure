# AI Adventure

This is a toy project that provides an interface for having an AI run an adventure for you. It's slightly different from other offerings in that it tries to keep track of some structured state (like a map, inventory, and player stats). The effectiveness of this state tracking varies *heavily* based on the model.

## Configuration

You'll need two AI models installed with [Ollama](https://ollama.com/download).
1. An analytical AI that manages game state transitions.
   - GPT is good at this.
   - Mistral also seems to do okay.
2. A storyteller AI that narrates the adventure.
   - Wayfarer is good at this.

Create a `dev.env` file in the project root and populate it with your models. For example:

```
OLLAMA_STORYTELLER_MODEL=Desmon2D/Wayfarer-12B:latest
OLLAMA_ANALYTICAL_MODEL=mistral:7b
```

## Usage

This project is only configured to run locally and in dev mode, with a local Ollama installation.

1. Run `npm i`.
2. Run `npm run dev`.
3. Go to http://localhost:3000 and play.
