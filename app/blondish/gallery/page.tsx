"use client"

import { useEffect, useRef, useCallback } from "react"
import { animate, useMotionValue } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { releases } from "./data"

const BASE_W = 90
const EXPANDED_W = 360
const GAP = 4
const PITCH = BASE_W + GAP

const WIDEN_RANGE = 2.12
const TICK_MIN_H = 28
const TICK_INTENSITY = 8
const TICK_DISTANCE_LIMIT = 6
const TICK_W = 1
const TICK_GAP = 9
const TICK_PITCH = TICK_W + TICK_GAP
const IMG_RENDER_WINDOW = 6
const SCROLL_RANGE = releases.length * PITCH * 1.6
const LINEMARK_HOVER_BONUS_PX = 14

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

function smoothstep(t: number) {
  const c = clamp(t, 0, 1)
  return c * c * (3 - 2 * c)
}

function getLayoutInfo(vw: number) {
  const n = releases.length
  const vpCenter = vw / 2
  const virtualTotal = n * BASE_W + (n - 1) * GAP
  const startOff = vpCenter - BASE_W / 2
  const endOff = -(virtualTotal - vpCenter - BASE_W / 2)
  return { vpCenter, startOff, endOff }
}

function scrollToGalleryX(scrollY: number, vw: number): number {
  const { startOff, endOff } = getLayoutInfo(vw)
  const t = clamp(scrollY / SCROLL_RANGE, 0, 1)
  return lerp(startOff, endOff, t)
}

function galleryXToScroll(x: number, vw: number): number {
  const { startOff, endOff } = getLayoutInfo(vw)
  const t = (x - startOff) / (endOff - startOff)
  return clamp(t, 0, 1) * SCROLL_RANGE
}

function getFocalSlot(galleryX: number, vw: number): number {
  return (vw / 2 - galleryX - BASE_W / 2) / PITCH
}

function cardSize(i: number, focalSlot: number): number {
  const dist = Math.abs(focalSlot - i)
  const u = Math.min(1, dist / WIDEN_RANGE)
  return lerp(BASE_W, EXPANDED_W, smoothstep(1 - u))
}

function cardOpacity(i: number, focalSlot: number): number {
  const dist = Math.abs(focalSlot - i)
  const u = Math.min(1, dist / WIDEN_RANGE)
  return lerp(0.28, 1.0, smoothstep(1 - u))
}

function tickHeight(i: number, focalSlot: number): number {
  const dist = Math.abs(focalSlot - i)
  if (dist > TICK_DISTANCE_LIMIT) return TICK_MIN_H
  const norm = 1 - dist / TICK_DISTANCE_LIMIT
  return TICK_MIN_H + TICK_INTENSITY * (norm * norm)
}

function computeFlexCorrection(focalSlot: number): number {
  const lo = clamp(Math.floor(focalSlot), 0, releases.length - 1)
  const hi = Math.min(lo + 1, releases.length - 1)
  const frac = focalSlot - Math.floor(focalSlot)

  let c = (cardSize(lo, focalSlot) - BASE_W) * (0.5 + 0.5 * frac)
        + (cardSize(hi, focalSlot) - BASE_W) * 0.5 * frac

  const loRange = Math.max(0, lo - Math.ceil(WIDEN_RANGE) - 1)
  for (let j = loRange; j < lo; j++) {
    c += cardSize(j, focalSlot) - BASE_W
  }
  return c
}

// Michelle's exact adaptive spring formula for click navigation
function getClickSpring(distanceCards: number, isMobile: boolean) {
  const d = Math.max(0, Math.abs(distanceCards))
  if (!isMobile) {
    if (d <= 0) return { stiffness: 360, damping: 33 }
    const n = Math.min(1, (d - 1) / 5)
    return { stiffness: Math.round(360 - 265 * n), damping: Math.round(33 + 9 * n) }
  } else {
    if (d <= 0) return { stiffness: 230, damping: 40 }
    const e = Math.min(1, (d - 1) / 5)
    return { stiffness: Math.round(250 - 162 * e), damping: Math.round(40 + 8 * e) }
  }
}

export default function GalleryPage() {
  const n = releases.length

  const galleryX = useMotionValue(0)

  const stripRef = useRef<HTMLDivElement>(null)
  const ticksRef = useRef<(HTMLDivElement | null)[]>([])
  const railRef = useRef<HTMLDivElement>(null)
  const captionTitleRef = useRef<HTMLSpanElement>(null)
  const captionArtistRef = useRef<HTMLSpanElement>(null)
  const dateRef = useRef<HTMLSpanElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const liveRef = useRef<HTMLDivElement>(null)
  const hoverIndexRef = useRef<number | null>(null)
  const hoverLabelRef = useRef<HTMLDivElement>(null)
  const hoverMonthRef = useRef<HTMLSpanElement>(null)
  const hoverYearRef = useRef<HTMLSpanElement>(null)
  const animRef = useRef<ReturnType<typeof animate> | null>(null)
  const isSettingScrollRef = useRef(false)

  const state = useRef({
    currentX: 0,
    focalSlot: 0,
    activeIndex: 0,
    lastActiveIndex: -1,
    rafId: 0,
    reducedMotion: false,
  })

  const applyCaption = useCallback((idx: number) => {
    const r = releases[idx]
    if (!r) return
    if (captionTitleRef.current) captionTitleRef.current.textContent = r.title
    if (captionArtistRef.current) captionArtistRef.current.textContent = r.artist
    if (dateRef.current) {
      dateRef.current.textContent = r.date ? `${r.month}\n${r.year}` : ""
    }
    if (liveRef.current) liveRef.current.textContent = `${r.title} by ${r.artist}`
  }, [])

  const tick = useCallback(() => {
    const s = state.current
    const vw = window.innerWidth

    s.currentX = galleryX.get()

    s.focalSlot = getFocalSlot(s.currentX, vw)
    s.activeIndex = clamp(Math.round(s.focalSlot), 0, n - 1)

    const displayX = s.currentX - computeFlexCorrection(s.focalSlot)
    if (stripRef.current) {
      stripRef.current.style.transform = `translateX(${displayX}px)`
    }

    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i]
      if (!el) continue
      const inWindow = Math.abs(i - s.activeIndex) <= IMG_RENDER_WINDOW
      if (!inWindow) {
        el.style.opacity = "0"
        el.style.width = `${BASE_W}px`
        el.style.height = `${BASE_W}px`
        continue
      }
      const sz = cardSize(i, s.focalSlot)
      el.style.opacity = String(cardOpacity(i, s.focalSlot))
      el.style.width = `${sz}px`
      el.style.height = `${sz}px`
    }

    const railVisibleW = Math.min(vw * 0.92, 720)
    const focalPx = s.focalSlot * TICK_PITCH + TICK_PITCH / 2
    if (railRef.current) {
      railRef.current.style.transform = `translateX(${railVisibleW / 2 - focalPx}px)`
    }

    const hi = hoverIndexRef.current

    if (hoverLabelRef.current) {
      if (hi !== null && hi !== s.activeIndex) {
        const labelLeft = railVisibleW / 2 + (hi - s.focalSlot) * TICK_PITCH
        hoverLabelRef.current.style.opacity = "1"
        hoverLabelRef.current.style.left = `${labelLeft}px`
        if (hoverLabelRef.current.dataset.hi !== String(hi)) {
          hoverLabelRef.current.dataset.hi = String(hi)
          const r = releases[hi]
          if (hoverMonthRef.current) hoverMonthRef.current.textContent = r?.month ?? ""
          if (hoverYearRef.current) hoverYearRef.current.textContent = r?.date ? String(r.year) : ""
        }
      } else {
        hoverLabelRef.current.style.opacity = "0"
      }
    }

    for (let i = 0; i < n; i++) {
      const el = ticksRef.current[i]
      if (!el) continue
      const isActive = i === s.activeIndex
      let h = isActive ? tickHeight(i, s.focalSlot) * 2 : tickHeight(i, s.focalSlot)
      if (hi !== null) {
        const hDist = Math.abs(i - hi)
        if (hDist <= 3) {
          const norm = 1 - hDist / 3
          h += LINEMARK_HOVER_BONUS_PX * norm * norm
        }
      }
      el.style.height = `${h}px`
      el.style.background = isActive ? "#27272a" : "rgba(39,39,42,0.18)"
    }

    if (s.activeIndex !== s.lastActiveIndex) {
      s.lastActiveIndex = s.activeIndex
      applyCaption(s.activeIndex)
    }

    s.rafId = requestAnimationFrame(tick)
  }, [n, applyCaption, galleryX])

  useEffect(() => {
    const s = state.current
    s.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const vw = window.innerWidth
    const { startOff } = getLayoutInfo(vw)
    s.currentX = startOff
    galleryX.set(startOff)
    applyCaption(0)
    s.rafId = requestAnimationFrame(tick)

    const onScroll = () => {
      if (isSettingScrollRef.current) return
      galleryX.set(scrollToGalleryX(window.scrollY, window.innerWidth))
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(s.rafId)
      animRef.current?.stop()
      window.removeEventListener("scroll", onScroll)
    }
  }, [tick, applyCaption, galleryX])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return
      const s = state.current
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
      const delta = e.key === "ArrowRight" ? 1 : -1
      const next = clamp(s.activeIndex + delta, 0, n - 1)
      const vw = window.innerWidth
      const targetScroll = (next / (n - 1)) * SCROLL_RANGE
      const targetX = scrollToGalleryX(targetScroll, vw)

      if (animRef.current) animRef.current.stop()
      animRef.current = animate(galleryX, targetX, {
        type: "spring",
        stiffness: 175,
        damping: 36,
        onUpdate: (v) => {
          isSettingScrollRef.current = true
          document.documentElement.scrollTop = galleryXToScroll(v, window.innerWidth)
          isSettingScrollRef.current = false
        },
        onComplete: () => { animRef.current = null },
      })
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [n, galleryX])

  return (
    <>
      <div style={{ background: "#f5f5f5", position: "relative", cursor: `url('/cursors/cursor-default.svg') 20 20, auto` }}>
        <div
          role="region"
          aria-label="Abracadabra Records Discography"
          style={{ position: "sticky", top: 0, height: "100vh", background: "#f5f5f5" }}
        >
          <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 80% 75% at -5% -5%, rgba(185,168,228,0.80) 0%, transparent 70%)",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 80% 75% at 105% 105%, rgba(128,196,180,0.75) 0%, transparent 70%)",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat", backgroundSize: "200px 200px",
              opacity: 0.15, mixBlendMode: "soft-light",
            }} />
          </div>

          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Link
            href="/blondish"
            style={{
              position: "absolute", top: 24, left: 28,
              fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(39,39,42,0.45)", textDecoration: "none", zIndex: 30,
              cursor: `url('/cursors/cursor-hover.svg') 23 23, pointer`,
            }}
          >
            ← ABRACADABRA
          </Link>

          <div style={{
            position: "absolute", top: 20, left: 0, right: 0,
            display: "flex", justifyContent: "center", zIndex: 30, pointerEvents: "none",
          }}>
            <Image
              src="/abracadabra-logo.avif"
              alt="Abracadabra Records"
              width={480}
              height={480}
              style={{ opacity: 0.72 }}
              priority
            />
          </div>

          <div aria-hidden style={{
            position: "absolute", left: 0, top: 0, width: "8vw", height: "100%", zIndex: 10,
            background: "linear-gradient(to right, #f5f5f5 20%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
            pointerEvents: "none",
          }} />
          <div aria-hidden style={{
            position: "absolute", right: 0, top: 0, width: "8vw", height: "100%", zIndex: 10,
            background: "linear-gradient(to left, #f5f5f5 20%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)" }}>
            <div ref={stripRef} style={{ display: "flex", alignItems: "center", gap: `${GAP}px`, willChange: "transform" }}>
              {releases.map((r, i) => (
                <div
                  key={r.id}
                  ref={el => { cardRefs.current[i] = el }}
                  style={{
                    width: BASE_W, height: BASE_W, flexShrink: 0,
                    overflow: "hidden", borderRadius: 2, position: "relative",
                    willChange: "width, height, opacity",
                    cursor: `url('/cursors/cursor-hover.svg') 23 23, pointer`,
                  }}
                  onClick={() => {
                    const vw = window.innerWidth
                    const targetScroll = (i / (n - 1)) * SCROLL_RANGE
                    const targetX = scrollToGalleryX(targetScroll, vw)
                    const spring = getClickSpring(i - state.current.activeIndex, vw < 640)

                    isSettingScrollRef.current = true
                    document.documentElement.scrollTop = targetScroll
                    isSettingScrollRef.current = false

                    if (animRef.current) animRef.current.stop()
                    animRef.current = animate(galleryX, targetX, {
                      type: "spring",
                      stiffness: spring.stiffness,
                      damping: spring.damping,
                      onComplete: () => { animRef.current = null },
                    })
                  }}
                >
                  <Image
                    src={r.src}
                    alt={`${r.title} by ${r.artist} — Abracadabra Records`}
                    fill
                    sizes="(max-width: 768px) 360px, 480px"
                    style={{ objectFit: "cover" }}
                    loading={i <= 3 ? "eager" : "lazy"}
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{
            position: "absolute", bottom: 155, left: 0, right: 0,
            textAlign: "center", zIndex: 20, pointerEvents: "none",
          }}>
            <span ref={captionTitleRef} style={{
              fontFamily: "var(--font-geist-sans)", fontSize: "0.875rem",
              color: "#27272a", display: "block", marginBottom: 3,
            }} />
            <span ref={captionArtistRef} style={{
              fontFamily: "var(--font-geist-sans)", fontSize: "0.75rem",
              color: "#71717a", display: "block",
            }} />
          </div>

          <div aria-hidden style={{
            position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
            width: "min(92vw, 720px)", zIndex: 20,
          }}>
            <div
              ref={hoverLabelRef}
              style={{
                position: "absolute", bottom: "calc(100% + 10px)",
                transform: "translateX(-50%)", textAlign: "center",
                pointerEvents: "none", opacity: 0,
                transition: "opacity 0.18s ease",
              }}
            >
              <span ref={hoverMonthRef} style={{
                fontFamily: "var(--font-geist-sans)", fontSize: "0.75rem",
                color: "#27272a", display: "block",
              }} />
              <span ref={hoverYearRef} style={{
                fontFamily: "var(--font-geist-sans)", fontSize: "0.7rem",
                color: "#71717a", display: "block",
              }} />
            </div>

            <div style={{ overflow: "hidden" }}>
              <div ref={railRef} style={{ display: "flex", alignItems: "flex-end", gap: 0, willChange: "transform" }}>
                {releases.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: TICK_PITCH, flexShrink: 0,
                      display: "flex", alignItems: "flex-end", justifyContent: "center",
                      paddingTop: 10, marginTop: -10,
                      cursor: `url('/cursors/cursor-hover.svg') 23 23, pointer`,
                    }}
                    onPointerEnter={(e) => { if (e.pointerType !== "mouse") return; hoverIndexRef.current = i }}
                    onPointerLeave={(e) => { if (e.pointerType !== "mouse") return; hoverIndexRef.current = null }}
                    onClick={() => {
                      const vw = window.innerWidth
                      const targetScroll = (i / (n - 1)) * SCROLL_RANGE
                      const targetX = scrollToGalleryX(targetScroll, vw)
                      const spring = getClickSpring(i - state.current.activeIndex, vw < 640)

                      isSettingScrollRef.current = true
                      document.documentElement.scrollTop = targetScroll
                      isSettingScrollRef.current = false

                      if (animRef.current) animRef.current.stop()
                      animRef.current = animate(galleryX, targetX, {
                        type: "spring",
                        stiffness: spring.stiffness,
                        damping: spring.damping,
                        onComplete: () => { animRef.current = null },
                      })
                    }}
                  >
                    <div
                      ref={el => { ticksRef.current[i] = el }}
                      style={{ width: TICK_W, height: TICK_MIN_H, borderRadius: 1, background: "rgba(39,39,42,0.18)", flexShrink: 0 }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 10 }}>
              <span ref={dateRef} style={{
                fontFamily: "var(--font-geist-sans)", fontSize: "0.8rem",
                color: "#71717a", display: "block", whiteSpace: "pre-line", lineHeight: 1.5,
              }} />
            </div>
          </div>
          </div>
        </div>

        <div style={{ height: SCROLL_RANGE }} aria-hidden />
      </div>

      <div ref={liveRef} aria-live="polite" aria-atomic className="sr-only" />
    </>
  )
}
