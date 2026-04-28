# Personal AI Agent

A personal AI assistant that lives in your iMessage. Text it like a contact and it gets things done.

## Stack

- **Runtime** — Bun
- **Server** — Hono
- **Messaging** — SendBlue (iMessage API)
- **Local LLM** — LM Studio
- **Tools** — Composio *(coming soon)*
- **Memory** — Convex *(coming soon)*

## How it works

```
You send iMessage
      ↓
SendBlue receives it and hits your webhook
      ↓
Hono server parses the message
      ↓
Agent loop runs (LM Studio or cloud provider)
      ↓
Response sent back via SendBlue
```

## Getting started

### Prerequisites

- [Bun](https://bun.sh) installed
- [LM Studio](https://lmstudio.ai) running with a model loaded and local server enabled
- [ngrok](https://ngrok.com) account
- [SendBlue](https://sendblue.com) account with an active number

### Setup

1. Clone the repo and install dependencies

```bash
bun install
```

2. Copy `.env.example` to `.env` and fill in your keys

```bash
cp .env.example .env
```

3. Run the server

```bash
bun run src/index.ts
```

On startup the server will:
- Spin up an ngrok tunnel
- Register the tunnel URL as your SendBlue webhook automatically

## Environment variables

```
SENDBLUE_API_API_KEY=
SENDBLUE_API_API_SECRET=
SENDBLUE_GIVEN_NUMBER=
NGROK_AUTHTOKEN=
LM_API_TOKEN=
```

## Roadmap

- [ ] Conversation history via Convex
- [ ] Conversation summarization
- [ ] Agent loop with tool calling
- [ ] Composio tool integrations
- [ ] Cloud LLM provider support (Anthropic, OpenAI)