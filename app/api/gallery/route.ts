import { Client } from "@notionhq/client"
import { NextResponse } from "next/server"
import type { GalleryRelease } from "@/app/blondish/gallery/data"

const DATA_SOURCE_ID = process.env.NOTION_GALLERY_DATA_SOURCE_ID ?? ""

let inFlight: Promise<GalleryRelease[]> | null = null
let cache: { data: GalleryRelease[]; ts: number } | null = null
const TTL = process.env.NODE_ENV === "production" ? 300_000 : 30_000

async function fetchReleases(): Promise<GalleryRelease[]> {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const results: GalleryRelease[] = []
  let cursor: string | undefined

  do {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await (notion.dataSources as any).query({
      data_source_id: DATA_SOURCE_ID,
      sorts: [{ property: "Date", direction: "ascending" }],
      start_cursor: cursor,
      page_size: 100,
    })

    for (const page of res.results) {
      if (page.object !== "page" || !("properties" in page)) continue
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const p = page.properties as Record<string, any>

      const title: string = p["Name"]?.title?.[0]?.plain_text ?? ""
      const artist: string = p["Artist"]?.rich_text?.[0]?.plain_text ?? ""
      const src: string = p["ImageUrl"]?.url ?? ""
      const dateStr: string = p["Date"]?.date?.start ?? ""

      let month = ""
      let year = 0
      if (dateStr) {
        const d = new Date(dateStr)
        month = d.toLocaleString("en-US", { month: "long" })
        year = d.getFullYear()
      }

      results.push({
        id: String(page.id).replace(/-/g, ""),
        title,
        artist,
        src,
        date: dateStr,
        month,
        year,
      })
    }

    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined
  } while (cursor)

  return results
}

async function getWithCache(): Promise<GalleryRelease[]> {
  const now = Date.now()
  if (cache && now - cache.ts < TTL) return cache.data

  if (!inFlight) {
    inFlight = fetchReleases()
      .then((data) => {
        cache = { data, ts: Date.now() }
        inFlight = null
        return data
      })
      .catch((err) => {
        inFlight = null
        throw err
      })
  }

  return inFlight
}

export async function GET() {
  if (!process.env.NOTION_TOKEN || !DATA_SOURCE_ID) {
    return NextResponse.json(
      { error: "NOTION_TOKEN or NOTION_GALLERY_DATA_SOURCE_ID not configured" },
      { status: 503 }
    )
  }

  try {
    const releases = await getWithCache()
    return NextResponse.json({ releases, total: releases.length })
  } catch {
    return NextResponse.json({ error: "Failed to fetch gallery data" }, { status: 500 })
  }
}
