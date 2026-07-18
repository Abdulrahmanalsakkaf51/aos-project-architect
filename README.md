# AOS Project Architect

AOS Project Architect is a Work & Productivity application that turns a genuine real-world problem into a structured human–AI project. It combines GPT-5.6 with defined AI Partner roles and explicit human approval boundaries to produce practical plans, risks, milestones, and reusable organizational knowledge.

Built for **OpenAI Build Week 2026** by **Abdulrahman Alsakkaf / ALSAKKAF Systems**.

> “Every solution begins with a problem, every problem becomes a project, every project creates knowledge, and every piece of knowledge strengthens AOS.”

## Live Demo

- **Application:** [https://aos-project-architect.vercel.app/](https://aos-project-architect.vercel.app/)
- **Source:** [https://github.com/Abdulrahmanalsakkaf51/aos-project-architect](https://github.com/Abdulrahmanalsakkaf51/aos-project-architect)

The application is deployed on Vercel and has been manually tested successfully in production with the included food-bank sample.

## The Problem

Real organizational problems are often described informally, then split across disconnected notes, decisions, tasks, risks, and conversations. This makes it difficult to establish ownership, expose uncertain assumptions, protect decisions that require human judgment, or preserve useful knowledge after the work ends.

## The Solution

AOS Project Architect asks for four focused inputs:

- the problem;
- who is affected;
- the desired outcome;
- constraints or limitations.

It transforms those inputs into a consistent project blueprint. Strategy, knowledge capture, risk review, and human accountability are represented as distinct roles rather than being blended into one generic AI response.

## How It Works

1. The user completes the four project fields or loads the included sample.
2. The browser sends those four fields to the server-side `POST /api/architect` route.
3. Zod validates, trims, and strictly limits the input before any model request.
4. The route calls the OpenAI Responses API with `gpt-5.6` and a structured project schema.
5. Structured Outputs return a typed result matching the five interface sections.
6. The browser renders the result with a visible **Generated with GPT-5.6 · Human review required** label.
7. The Human Collaborator reviews assumptions, approvals, risks, and consequential decisions.

## Generated Output

Every successful generation contains:

1. **Project Brief** — title, problem statement, affected people, desired outcome, success measures, and constraints.
2. **Partner Assignments** — responsibilities and tasks for Atlas, The Librarian, Guardian, and the Human Collaborator.
3. **Action Plan** — prioritized workstreams, owners, tasks, milestones, and intended outcomes.
4. **Risks and Human Approvals** — risks, mitigations, assumptions, and decisions requiring explicit human approval.
5. **Knowledge Card** — summary, lessons, reusable knowledge, unanswered questions, and future use.

## Human–AI Roles

- **Atlas** handles strategy, priorities, and milestones.
- **The Librarian** records assumptions, decisions, and reusable organizational knowledge.
- **Guardian** identifies risk, privacy and safety concerns, and human-approval boundaries.
- **The Human Collaborator** corrects assumptions, approves major decisions, authorizes external actions, and remains accountable.

## Key Features

- Responsive, accessible interface for desktop and mobile.
- Four-field problem-definition workflow with an included sample project.
- GPT-5.6 project generation through a server-only route.
- Five consistently structured result sections.
- Visible loading, timeout, refusal, rate-limit, and safe error states.
- Disabled controls during generation to prevent simultaneous repeated submissions.
- Human approvals and assumptions shown directly in the result.
- No user accounts, database, payments, analytics, email, or unrelated integrations.

## Technical Architecture

- **Framework:** Next.js App Router
- **Interface:** React, TypeScript, and plain CSS
- **Server endpoint:** Next.js route handler at `POST /api/architect`
- **AI SDK:** official OpenAI JavaScript SDK
- **Validation and output contract:** Zod
- **AI endpoint:** OpenAI Responses API
- **Model:** `gpt-5.6`
- **Structured Outputs:** `openai.responses.parse()` with `zodTextFormat`
- **Deployment:** Vercel

The browser never receives the OpenAI API key. It sends validated project fields to the application’s server route, which performs the model request and returns only the parsed structured project.

## How GPT-5.6 Is Used

The server supplies a system instruction defining the AOS purpose, partner responsibilities, core principle, uncertainty rules, human accountability, and requirement for practical professional output. The request uses:

- model `gpt-5.6`;
- low reasoning effort;
- `store: false`;
- a maximum of 3,000 output tokens;
- a 120-second application timeout;
- `maxRetries: 0`;
- Structured Outputs through the shared Zod schema.

The model is instructed not to invent unavailable facts, to identify uncertainty as assumptions, not to claim external actions have occurred, and to keep consequential decisions with humans.

## How Codex Was Used

Codex CLI supported the implementation workflow by:

- creating the project foundation documents;
- building the responsive Next.js prototype;
- implementing the structured schema;
- connecting the server-side Responses API route;
- adding validation, error handling, timeout, and cost controls;
- diagnosing and correcting the CSS build issue;
- diagnosing the first 45-second timeout;
- increasing the timeout to 120 seconds;
- reducing the output ceiling to 3,000 tokens;
- running production builds and TypeScript checks;
- helping document the project.

Codex assisted with implementation and verification. Product direction, credentials, live testing, deployment decisions, and final acceptance remained human-controlled.

## Key Human Decisions

Abdulrahman Alsakkaf personally decided:

- the original AOS concept and core principle;
- the product scope;
- the Work & Productivity use case;
- the Atlas, Librarian, Guardian, and Human Collaborator roles;
- the human-approval model;
- which features were excluded to keep the prototype focused;
- the visual and product direction;
- the final acceptance of the generated workflow.

## Build Week Scope

### Existing before Build Week

- ALSAKKAF Systems branding;
- the wider AOS vision;
- the core AOS principle;
- AI Partner role concepts;
- earlier planning documents.

### Created during Build Week

- the standalone Next.js application;
- the interface and user flow;
- GPT-5.6 integration;
- structured schemas and the project-generation route;
- validation and safety controls;
- testing;
- deployment;
- competition documentation.

See [BUILD_WEEK_SCOPE.md](BUILD_WEEK_SCOPE.md) for the project’s scope record.

## Security and Cost Controls

- The API key is read only in the server route through `process.env.OPENAI_API_KEY`.
- Input is limited to exactly four required text fields; unknown fields are rejected.
- Zod trims input and enforces per-field minimum and maximum lengths.
- The route checks both declared and actual request size, with an 8,000-byte body limit.
- A simple in-memory prototype limiter permits five requests per client identifier per ten minutes.
- Both browser buttons are disabled while generation is active.
- The OpenAI request uses a 120-second timeout and a 3,000-token output ceiling.
- Automatic SDK retries are disabled, so one click cannot silently create repeated billable attempts.
- `store: false` is set on the Responses API request.
- Refusal, missing output, timeout, authentication, rate-limit, credit availability, and server failures return non-sensitive messages.
- Generated content always requires human review.

These are prototype safeguards. The application is not presented as production-ready for sensitive organizational data.

## Local Installation

Requirements: Git, a supported Node.js environment, npm, and an OpenAI API key.

```powershell
git clone https://github.com/Abdulrahmanalsakkaf51/aos-project-architect.git
cd aos-project-architect
npm.cmd install
```

## Environment Variables

Create a root-level `.env.local` file containing only your private key assignment:

```dotenv
OPENAI_API_KEY=their_private_key
```

Replace `their_private_key` with your own key. Never commit `.env.local`, expose its value in browser code, or share it publicly. The repository includes `.env.example` as a safe template.

## Running Locally

```powershell
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000).

Selecting **Architect My Project** makes a live API request and may consume project credit. Loading the sample only fills the form and does not call the API.

## Production Deployment

The public application is deployed on Vercel:

[https://aos-project-architect.vercel.app/](https://aos-project-architect.vercel.app/)

For an equivalent deployment, connect the GitHub repository to Vercel and configure `OPENAI_API_KEY` as a protected server-side environment variable in the deployment settings. Do not prefix it with `NEXT_PUBLIC_`; browser-exposed variables are not appropriate for secrets.

## Sample Input

The included sample describes a community food bank:

- **Problem:** The food bank relies on spreadsheets and phone calls, causing duplicate work and delayed deliveries.
- **Affected people:** Coordinators, volunteers, partner stores, and families waiting for essential deliveries.
- **Desired outcome:** A reliable coordination process that reduces missed deliveries and provides a shared view of priorities.
- **Constraints:** A small volunteer team, limited budget, mixed technical confidence, sensitive household information, and an eight-week pilot window.

The sample was used for the first successful local GPT-5.6 test and for successful production testing.

## Testing Instructions for Judges

1. Open the [live application](https://aos-project-architect.vercel.app/).
2. Click **Load Sample Project** or complete all four fields.
3. Click **Architect My Project** once.
4. Wait up to two minutes.
5. Review all five generated sections.
6. Confirm the **Generated with GPT-5.6 · Human review required** label appears.

Please avoid repeated clicks or unnecessary generations because API availability, rate limits, and remaining project credit can affect the result.

## Known Limitations

- Generation may take around one to two minutes.
- The in-memory rate limiter is prototype-level and may reset across serverless instances.
- No user accounts or persistent project database exist.
- Generated plans have not been independently verified.
- Consequential decisions require human review.
- API availability and remaining project credit can affect generation.

## Human Review and Responsible Use

AOS Project Architect provides project-planning support, not autonomous organizational authority. Generated facts, assumptions, priorities, risk ratings, mitigations, and actions must be reviewed by an accountable person. The Human Collaborator must approve consequential decisions and authorize external actions.

Do not submit confidential, regulated, or highly sensitive organizational data to this prototype. Before real-world use, apply appropriate legal, privacy, security, accessibility, and domain-specific review.

## Repository Structure

```text
app/
  api/architect/route.ts   Server-only Responses API endpoint
  globals.css              Responsive interface and state styling
  layout.tsx               App Router layout and metadata
  page.tsx                 Input workflow and structured result rendering
lib/
  project-schema.ts        Shared Zod input and output schemas
.env.example               Safe environment-variable template
AGENTS.md                   Repository working rules
BUILD_WEEK_SCOPE.md         Pre-existing concepts and Build Week scope
PROJECT_BRIEF.md            Product concept, inputs, outputs, and roles
TASKS.md                    Implementation progress record
LICENSE                     MIT License
package.json                Scripts and required dependencies
README.md                   Submission documentation
```

## License

This project is available under the [MIT License](LICENSE).

Copyright © 2026 Abdulrahman Alsakkaf.