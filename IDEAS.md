# Portfolio Ideas

A parking lot for things to add to the site later. Nothing here is being built right now.

How to use: add an idea under **Backlog** with a one-line summary and any notes. When
work starts on one, move it to **In progress**. When it ships, move it to **Done**.

## Backlog

<!-- Template:
### Idea title
- **What:** one-line summary
- **Why:** what it adds for visitors
- **Notes:** links, references, open questions
-->

### Taste page (public swipefile, Notion as CMS)
- **What:** A `/taste` page that works as a personal swipefile. Designs, images, and
  references I like, browsable by anyone who visits the site.
- **Why:** Shows visitors my eye and influences, not just finished work. Also gives me
  one place to collect references I'd otherwise lose in bookmarks and screenshots.
- **CMS:** A Notion database is the source of truth. Adding a row in Notion should make
  the item appear on the live site, already in the right layout, with no code change.
- **Notes:**
  - Notion database columns to plan for: title, image/file, source URL, tags or
    category, short note on why I like it, date added, a "published" checkbox so
    drafts don't go live.
  - Fetch via the Notion API (integration token shared with the database). Render
    server-side in the App Router and use ISR (time-based revalidation) or a Notion
    webhook hitting `revalidatePath("/taste")` so updates land without a redeploy.
  - Notion-hosted file URLs expire after about an hour, so either revalidate often
    enough, proxy images through `next/image`, or copy uploads to Vercel Blob / an
    image host at fetch time.
  - Layout ideas: masonry grid, filter by tag, click to open a detail with the source
    link and my note. Keep the format strict so every item looks consistent.
  - Open questions: one database for everything or a category per section? Do I
    want to credit original creators on each card?

## In progress

## Done
