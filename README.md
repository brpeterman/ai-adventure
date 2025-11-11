# AI Adventure

This is a toy project that provides an interface for having an AI run an adventure for you. It's slightly different from other offerings in that it tries to keep track of some structured state (like a map, inventory, and player stats). The effectiveness of this state tracking varies *heavily* based on the model.

# Usage

This project is only configured to run locally and in dev mode, with a local Ollama installation.

1. Install [Ollama](https://ollama.com/download).
2. Download whatever model you'd like to try.
3. Create a `dev.env` file with a `OLLAMA_MODEL` variable defined for the model you'd like to use.
4. Run `npm i`.
5. Run `npm run dev`.
6. Go to http://localhost:3000 and play.
