# BLOND:ISH Application — Project Context

## What this is
A job application to BLOND:ISH (Vivie-Ann Bakos), founder of Abracadabra Records, delivered via Instagram DM. The DM itself will be short; the substance is a live URL on my portfolio (this folder) with 3 working prototype projects that demonstrate I can build the kind of AI tools and integrations she needs.

## The original DM from her (verbatim, M 15 2026)
> I got another job for someone! It'll start as intern for one month. And then retainer.
>
> I build AI tools and integrations with Claude and notion integrations. Knowledge with automations, mcps, python, cron jobs etc
>
> I just don't have time. So need my AI person to build me tools on the fly and quickly.
>
> If you ever wanted to learn the music business at a fast paced speed with my visionary nerdy brain, this is the best job ever.
>
> Need to be able to start immediately

## The role
- 1-month intern → retainer structure.
- Building AI tools and integrations for her workflow.
- Stack she named: Claude, Notion integrations, MCPs, Python, cron jobs.
- North-star opportunity for me: music industry + my exact existing tech stack.
- Compensation and terms are not a blocker — I'd fly to Ibiza if she asked.

## Who BLOND:ISH / Abracadabra is
BLOND:ISH (Vivie-Ann Bakos) is a touring DJ/producer and founder of Abracadabra Records, an electronic music label. She is a public figure in the dance muindustry. Her brand is visually distinctive — colorful, magical/witchy, festival-coded. Abracadabra Records has its own visual identity worth referencing in the gallery and landing page treatment.

## My background (relevant to her)
- Marketing background: Head of Marketing at Luma Fitness, freelance with Afield Out (outdoor apparel) and Loutra (Klaviyo email flows, now SMS strategy).
- Music industry is my north star — target companies include Goldenvoice, Insomniac, Another Planet Entertainment, NPU Live.
- Live music is core to my identity: recent shows include Rufus Du Sol Pacha Ibiza closing, Skrillex b2b Four Tet, ISOxo H.C.D. at Cow Palace, Prospa b2b Josh Baker at Club Darc.
- I've been building a Claude + Notion + Python + MCP stack for months in my personal `~/life-os` folder. 

## Strategic framing (do not lose this)
- **The DM is short. The site does the heavy lifting.** Don't pack everything into the message.
- **Headline impression target**: "He built cool things for me, and he's a marketer." That's the line she should repeat to her ops person.
- **Marketing/social expertise = supporting context, not lead.** The build is the lead. Marketing is the credibility note alongside.
- **The build IS the strategy.** No separate strategy doc, no Loom walkthrough. The working prototypes ARE the pitch.
- **"Start immediately" is the load-bearing phrase in her message.** The application must demonstrate speed and capability via shipped work, not polish.
- **Action over analysis.** Bikeshedding is the known failure mode. Ship by 5pm regardless of state.

## What I'm building

### Live URL
A new route on my portfolio: `app/blondish/` → renders at `/blondish` on my live Vercel deployment.

### Landing page (`app/blondish/page.tsx`)
- Abracadabra-themed photo gallery as the hero/background.
- A spinning record player UI that auto-plays one of her tracks via **Spotify Web Playback SDK or SoundCloud iframe embed**. **NOT raw audio files** — even though I own her tracks legally on Beatport, that's a personal-use license, not public hosting rights. Embeds are also the music-industry-savvy move because they drive her streams.
- Note: most browsers block autoplay with audio unless triggered by user interaction. Design around this — the record player can spin on load; audio kicks in on click or first user gesture.
- 3 buttons linking to 3 working prototype subroutes.

### Three prototypes
1. **$NRG Portal redesign** (`app/blondish/nrg-portal/`) — confirmed. Will need a quick look at the current $NRG portal before redesigning. Add research notes to its own `BRIEF.md` when we get there.
2. **Unique photo gallery** (`app/blondish/photo-gallery/`) — confirmed. Polished gallery treatment for Abracadabra-branded photography.
3. **TBD** — third prototype is open; will decide after building 1 and 2.

### Notion usage
At least one prototype must use Notion meaningfully. Ideally referencing the new Notion Developer Platform + CLI (I've been reading their help docs and keynote presentations to prep for the official launch). Mention this in the DM only if length allows.

## Constraints
- **Hard ship deadline: 5pm Pacific TODAY (May 16 2026).** Treat as a wall, not a goal.
- Reuse existing portfolio design tokens, fonts, and Tailwind config unless explicitly overridden.
- Don't refactor any code outside the `app/blondish/` folder.
- Don't add new top-level dependencies without flagging me first.
- Don't host raw audio files for the record player — Spotify or SoundCloud embed only.
- Abracadabra branding okay on the landing page background and gallery; the rest of the site should subtly reference her aesthetic without lifting her IP wholesale.

## Tech stack already in place
- Next.js (TypeScript), Tailwind CSS, deployed to Vercel via GitHub.
- Repo: github.com/alex-dimitracopoulos/portfolio.
- Existing `CLAUDE.md` and `AGENTS.md` at repo root — read those for conventions before building anything new.
- `/impeccable` skill installed but `/impeccable teach` has not been run. Use `/impeccable craft` for build sessions today (skipping teach step due to time pressure).

## How to use this file
This file is the reference for everything BLOND:ISH-related. At the start of any new Claude Code session in this folder, read this first. Per-prototype detail lives in each prototype's own `BRIEF.md` (for example, `app/blondish/nrg-portal/BRIEF.md`) — keep this CONTEXT.md focused on the project as a whole, not individual prototypes.
