# Neo Branding Studio

## Overview

AI-powered prompt generator for creating brand assets via RoboNeo.com. Users fill out a brand brief, and the AI generates precise creative prompts in real-time via streaming (SSE), section by section.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 20
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion
- **Backend**: Express 5 (API server)
- **AI**: OpenAI via Replit AI Integrations (GPT model, SSE streaming)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (ESM bundle)

## Structure

```text
workspace/
├── Artefact/               # Deployable applications
│   ├── roboneo-generator/  # React frontend (Vite, port 5000)
│   └── api-server/         # Express API server (port 3000)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   ├── db/                 # Drizzle ORM schema + DB connection
│   ├── integrations-openai-ai-server/  # OpenAI server integration
│   └── integrations-openai-ai-react/   # OpenAI React integration
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml     # pnpm workspace config (Artefact/*, lib/*, etc.)
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## Running the App

The workflow runs both services:
- **Backend**: `PORT=3000 pnpm --filter @workspace/api-server run dev` (builds then starts)
- **Frontend**: `PORT=5000 BASE_PATH=/ pnpm --filter @workspace/roboneo-generator run dev`

The Vite dev server proxies `/api` requests to `http://localhost:3000`.

## Key Environment Variables

- `AI_INTEGRATIONS_OPENAI_BASE_URL` — Replit AI Integration base URL
- `AI_INTEGRATIONS_OPENAI_API_KEY` — Replit AI Integration key
- `DATABASE_URL` — PostgreSQL connection string (provided by Replit)
- `PORT` — Port for each service
- `BASE_PATH` — Base URL path for the frontend

## Modules Available

| # | Module | Status |
|---|--------|--------|
| 01 | Brand Identity (Logo, Palette, Typography, Brand Guidelines) | Available |
| 02 | Visual Content (Product, Lifestyle, Detail, Before/After, Try-On, Carousel) | Available |
| 03 | Video Content (Reels, TikTok, YouTube Shorts) | Coming Soon |
| 04-10 | Additional modules | Coming Soon |

## Database

Schema in `lib/db/src/schema/`:
- `conversations` table
- `messages` table

Push schema changes: `pnpm --filter @workspace/db run push`

## API Routes

All routes mounted at `/api`:
- `GET /api/health`
- `POST /api/openai/enhance-prompts` — Module 01 Brand Identity (SSE)
- `POST /api/openai/enhance-prompts-visual` — Module 02 Visual Content (SSE)
- `POST /api/openai/enhance-prompts-video` — Module 03 Video Content (SSE)
