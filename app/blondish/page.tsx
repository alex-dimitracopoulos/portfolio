import Link from "next/link"
import Image from "next/image"
import { releases } from "./gallery/data"

// Visually striking covers spread across the catalog
const BG_INDICES = [0, 7, 12, 20, 27, 34, 42, 51, 60, 68, 75, 82]

export default function BlondishPage() {
  const bgCovers = BG_INDICES.map(i => releases[i]).filter(Boolean)

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        color: "#fff",
      }}
    >
      {/* Album mosaic background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: 3,
          opacity: 0.22,
          pointerEvents: "none",
        }}
      >
        {bgCovers.map((r) => (
          <div key={r.id} style={{ position: "relative", overflow: "hidden" }}>
            <Image
              src={r.src}
              alt=""
              fill
              style={{ objectFit: "cover" }}
              sizes="25vw"
              priority={false}
            />
          </div>
        ))}
      </div>

      {/* Vignette overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.82) 65%, #0a0a0a 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px 60px",
          textAlign: "center",
        }}
      >
        {/* Label tag */}
        <div
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.52rem",
            letterSpacing: "0.22em",
            color: "#00FF00",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          ABRACADABRA RECORDS × ALEX DIMITRACOPOULOS
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontFamily: "var(--font-bebas-neue)",
            fontSize: "clamp(3.5rem, 12vw, 8rem)",
            letterSpacing: "0.02em",
            lineHeight: 0.88,
            marginBottom: 20,
          }}
        >
          BUILT THIS
          <br />
          FOR YOU
        </h1>

        {/* Oval label stamp — mirrors the Abracadabra pill motif */}
        <div
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.16em",
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 999,
            padding: "5px 20px 4px",
            display: "inline-block",
            marginBottom: 64,
          }}
        >
          THREE PROTOTYPES · MAY 2026 · PORTFOLIO APPLICATION
        </div>

        {/* Prototype cards */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 72,
          }}
        >
          <Link
            href="/blondish/gallery"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 4,
              padding: "28px 36px",
              minWidth: 200,
              transition: "border-color 0.15s, background 0.15s",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.48rem",
                letterSpacing: "0.22em",
                color: "#00FF00",
                textTransform: "uppercase",
              }}
            >
              01 — GALLERY
            </span>
            <span
              style={{
                fontFamily: "var(--font-bebas-neue)",
                fontSize: "1.4rem",
                letterSpacing: "0.06em",
                color: "#fff",
              }}
            >
              ABRACADABRA
              <br />
              DISCOGRAPHY
            </span>
          </Link>

          <Link
            href="/blondish/nrg"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 4,
              padding: "28px 36px",
              minWidth: 200,
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.48rem",
                letterSpacing: "0.22em",
                color: "#00FF00",
                textTransform: "uppercase",
              }}
            >
              02 — PORTAL
            </span>
            <span
              style={{
                fontFamily: "var(--font-bebas-neue)",
                fontSize: "1.4rem",
                letterSpacing: "0.06em",
                color: "#fff",
              }}
            >
              $NRG MEMBER
              <br />
              PORTAL
            </span>
          </Link>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 4,
              padding: "28px 36px",
              minWidth: 200,
              opacity: 0.35,
              cursor: "not-allowed",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.48rem",
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
              }}
            >
              03 — IN PROGRESS
            </span>
            <span
              style={{
                fontFamily: "var(--font-bebas-neue)",
                fontSize: "1.4rem",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              COMING
              <br />
              SOON
            </span>
          </div>
        </div>

        {/* Back link */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.52rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            textDecoration: "none",
          }}
        >
          ← BACK TO PORTFOLIO
        </Link>
      </div>
    </div>
  )
}
