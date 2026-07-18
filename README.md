# AOS Project Architect

**OpenAI Build Week 2026 · Work & Productivity**

AOS Project Architect turns a real-world problem into a structured human–AI project. A user describes the problem, affected people, desired outcome, and constraints. The application generates a Project Brief, Partner Assignments, an Action Plan, Risks and Human Approvals, and a reusable Knowledge Card.

The project uses four complementary roles:

- **Atlas:** strategy, priorities, and milestones;
- **The Librarian:** assumptions, decisions, and reusable knowledge;
- **Guardian:** risks, privacy concerns, and human-approval requirements;
- **The Human Collaborator:** approval of important decisions and external actions.

> “Every solution begins with a problem, every problem becomes a project, every project creates knowledge, and every piece of knowledge strengthens AOS.”

## Current Status

Stage 3 connects the responsive Next.js interface to the OpenAI Responses API with the official JavaScript SDK and the `gpt-5.6` model. GPT-5.6 was manually tested successfully using the included food-bank sample, producing all five structured project sections without a visible error. AI-generated content remains unverified and always requires human review.

## How It Works

The browser sends only the four project fields to `POST /api/architect`. A server-only route validates and trims the input, then calls the Responses API. Structured Outputs combine a shared Zod schema with `openai.responses.parse()` and `zodTextFormat`, so the five result sections receive a predictable typed object instead of free-form text.

The API key is read only inside the server route through `process.env.OPENAI_API_KEY`. It is never included in browser code or returned in errors. The request uses low reasoning effort, disables response storage, limits output tokens, applies a 120-second prototype timeout, and disables automatic SDK retries to reduce unexpected cost.

## Local Setup

1. Copy `.env.example` to a new `.env.local` file.
2. Replace the placeholder in `.env.local` with your own OpenAI API key. Never commit this file or share its value.
3. Install dependencies and start the development server:

```powershell
npm.cmd install
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000), load the sample or enter a project, and select **Architect My Project**. This is the only action that should make a live API request.

## Security, Cost, and Review Boundaries

- Input accepts exactly four text fields with per-field and total-body length limits.
- A basic in-memory limiter allows five requests per client identifier per ten minutes.
- The browser disables both actions during generation to prevent simultaneous submissions.
- Server requests have a 120-second prototype timeout, no automatic retries, and a 3,000-token output limit. The longer timeout gives GPT-5.6 time to create all five structured sections, while the lower output ceiling helps control latency and cost.
- Responses are not stored by the API request (`store: false`).
- Errors sent to the browser are deliberately non-sensitive.
- The Human Collaborator remains accountable for approvals, assumptions, and external actions.

The in-memory rate limiter is prototype protection only. It resets when the server restarts, is not shared across multiple server instances, and relies on proxy-provided client information. A production deployment needs a trusted distributed rate limiter and stronger abuse controls.

## Build Week Work

The standalone web application, source code, interface, GPT-5.6 integration, structured project-generation workflow, validation, safety boundaries, and build verification are new Build Week work. The ALSAKKAF Systems brand, wider AOS concept, core principle, role concepts, and earlier planning existed before Build Week; see [BUILD_WEEK_SCOPE.md](BUILD_WEEK_SCOPE.md).

## How Codex Was Used

Codex assisted with repository setup, the responsive interface, the shared Zod contract, server-route implementation, safety checks, documentation, and production-build verification. Human review defines the project direction and remains required for credentials, live API testing, consequential decisions, deployment, and competition submission.

See [PROJECT_BRIEF.md](PROJECT_BRIEF.md), [BUILD_WEEK_SCOPE.md](BUILD_WEEK_SCOPE.md), and [TASKS.md](TASKS.md) for the project definition and progress.