# Sankofa - AI-Powered Adinkra Cultural Commerce

Sankofa is an AI-powered platform where users describe feelings, intentions, or life moments in natural language and receive personalized Adinkra symbol suggestions. Users can then customize merchandise (bracelets) with their chosen symbol, name engraving, and Akan day name.

## Architecture

```
Next.js 14 (App Router) Full-Stack
├── Frontend: React + TypeScript + Tailwind CSS + Framer Motion
├── Backend: Next.js API Routes
├── AI: Anthropic Claude via Vercel AI SDK v6 (streaming)
└── Data: In-memory TypeScript datasets (24 Adinkra symbols)
```

### Key Design Decisions

- **AI Integration**: Claude receives the full symbol catalog (~5K tokens) in the system prompt, enabling nuanced reasoning over all symbols simultaneously
- **Streaming**: Uses `streamObject` + `useObject` for progressive rendering of symbol suggestions as they arrive
- **Cultural Safeguards**: Sensitive symbols require explicit user confirmation via a dialog with cultural context
- **No External DB**: Symbol data is static TypeScript—fast, type-safe, zero infrastructure for MVP

## Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  api/interpret/    - AI symbol matching endpoint (streaming)
  api/day-name/     - Akan day name lookup (deterministic)
  customize/        - Product customization page
  page.tsx          - Home page (discover symbols)
components/
  ui/               - Primitives (button, input, badge, skeleton, dialog)
  chat/             - IntentInput
  symbols/          - SymbolCard, SymbolGrid, SensitivityWarning
  customize/        - BraceletPreview, MaterialSelector, DayNameSection
  layout/           - Header
data/
  symbols.ts        - 24 Adinkra symbols with meanings, tags, and metadata
  day-names.ts      - Akan day name mapping (7 days x 2 genders)
schemas/            - Zod schemas for all data types
hooks/              - useInterpretation, useProductConfig
lib/                - Utilities, constants, AI prompts, day name algorithm
public/symbols/     - 24 SVG files for Adinkra symbols
```

## Sample Test Prompts

- "I'm starting a new business and feeling uncertain"
- "I want to honor my grandmother who passed"
- "I'm getting married next month"
- "I need strength for a difficult conversation"
- "I'm celebrating my independence and freedom"

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude (required) |

## Deploy on Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set `ANTHROPIC_API_KEY` in your Vercel project environment variables.

## Phase 2 Roadmap

- [ ] User authentication and session persistence
- [ ] Shopping cart with Stripe checkout
- [ ] Order management and fulfillment
- [ ] Expanded product line (sashes, pendants, prints)
- [ ] Symbol compatibility checker (prevent contradictory pairings in multi-symbol products)
- [ ] Community gallery of user configurations
- [ ] Admin dashboard for order and symbol management
- [ ] Internationalization (Twi, French, Portuguese)
- [ ] Rate limiting via Upstash Redis
- [ ] Analytics and user selection logging (PostgreSQL)
