import { TbLock, TbCheck, TbBook, TbUsers, TbMicrophone2, TbCalendarEvent } from "react-icons/tb";

type TierStatus = "unlocked" | "active" | "locked";

type Tier = {
  code: string;
  name: string;
  requirement: string;
  perks: string[];
  status: TierStatus;
};

type Perk = {
  icon: React.ElementType;
  label: string;
  detail: string;
};

type PulseItem = {
  time: string;
  event: string;
  location?: string;
  detail?: string;
};

const TIERS: Tier[] = [
  {
    code: "01",
    name: "SIGNAL",
    requirement: "500 $NRG",
    perks: ["Weekly community calls", "Educational content library"],
    status: "unlocked",
  },
  {
    code: "02",
    name: "INNER CIRCLE",
    requirement: "2,000 $NRG",
    perks: ["Quarterly track feedback sessions", "Early event ticket access"],
    status: "active",
  },
  {
    code: "03",
    name: "GREEN ROOM",
    requirement: "5,000 $NRG",
    perks: ["Pre-show 5km runs with BLOND:ISH", "Backstage passes — select shows"],
    status: "locked",
  },
  {
    code: "04",
    name: "FREQUENCY ONE",
    requirement: "10,000 $NRG",
    perks: ["Direct studio access sessions", "One-on-one mentorship calls"],
    status: "locked",
  },
];

const ACTIVE_PERKS: Perk[] = [
  { icon: TbBook, label: "Educational Library", detail: "Full archive — 43 sessions" },
  { icon: TbUsers, label: "Community Calls", detail: "Every Wed · 18:00 CET" },
  { icon: TbMicrophone2, label: "Track Feedback", detail: "Next session: 12 Jun" },
  { icon: TbCalendarEvent, label: "Early Ticket Access", detail: "Pre-sale opens 48h early" },
];

const PULSE: PulseItem[] = [
  { time: "2 days ago", event: "Track feedback session", location: "Berlin" },
  { time: "4 days ago", event: "Community call", detail: "47 holders" },
  { time: "1 week ago", event: "$NRG × Abracadabra collab announced" },
  { time: "2 weeks ago", event: "Pre-show run", location: "Barcelona" },
  { time: "3 weeks ago", event: "Green Room session", location: "Amsterdam" },
];

export default function NRGPortal() {
  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        backgroundColor: "oklch(9% 0.008 60)",
        color: "oklch(92% 0.008 60)",
        "--accent": "oklch(70% 0.13 60)",
        "--green": "oklch(68% 0.15 145)",
        "--text-2": "oklch(62% 0.012 60)",
        "--text-3": "oklch(40% 0.008 60)",
        "--border": "oklch(22% 0.01 60)",
        "--surface": "oklch(14% 0.01 60)",
        "--accent-bg": "oklch(13% 0.022 60)",
      } as React.CSSProperties}
    >
      <style>{`
        @keyframes nrgFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nrg-1 { animation: nrgFadeUp 600ms cubic-bezier(0.16,1,0.3,1) 0ms   both; }
        .nrg-2 { animation: nrgFadeUp 600ms cubic-bezier(0.16,1,0.3,1) 80ms  both; }
        .nrg-3 { animation: nrgFadeUp 600ms cubic-bezier(0.16,1,0.3,1) 160ms both; }
        .nrg-4 { animation: nrgFadeUp 600ms cubic-bezier(0.16,1,0.3,1) 260ms both; }
        @media (prefers-reduced-motion: reduce) {
          .nrg-1, .nrg-2, .nrg-3, .nrg-4 { animation: none; }
        }
      `}</style>

      {/* NAV */}
      <nav
        className="flex items-center justify-between px-8 py-5"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span
          style={{
            fontWeight: 800,
            fontSize: "1rem",
            letterSpacing: "0.1em",
            color: "var(--accent)",
          }}
        >
          $NRG
        </span>
        <div className="flex items-center gap-3">
          <span
            style={{
              fontSize: "0.6875rem",
              color: "var(--text-3)",
              letterSpacing: "0.06em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            7Fa2...dK9P
          </span>
          <div
            className="flex items-center gap-2 px-3 py-1"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              fontSize: "0.625rem",
              color: "var(--text-2)",
              letterSpacing: "0.12em",
              borderRadius: "2px",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--green)" }} />
            CONNECTED
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="px-8 pt-16 pb-20"
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,oklch(0% 0 0/0.03) 3px,oklch(0% 0 0/0.03) 4px)",
        }}
      >
        <p
          className="nrg-1"
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.22em",
            color: "var(--text-3)",
            marginBottom: "24px",
            fontWeight: 500,
          }}
        >
          BLOND:ISH · ABRACADABRA RECORDS · SOLANA
        </p>

        <h1
          className="nrg-2"
          style={{
            fontWeight: 800,
            fontSize: "clamp(5rem, 20vw, 18rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            marginBottom: "40px",
          }}
        >
          $NRG
        </h1>

        <div
          className="nrg-3 flex items-baseline gap-10 flex-wrap"
          style={{ marginBottom: "48px" }}
        >
          <div className="flex items-baseline gap-3">
            <span
              style={{
                fontWeight: 700,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.02em",
              }}
            >
              $0.0847
            </span>
            <span style={{ fontSize: "0.875rem", color: "var(--green)", fontWeight: 500, letterSpacing: "0.04em" }}>
              +12.4%
            </span>
          </div>

          <div>
            <p style={{ fontSize: "0.5625rem", letterSpacing: "0.22em", color: "var(--text-3)", marginBottom: "3px" }}>
              MARKET CAP
            </p>
            <p style={{ fontWeight: 700, fontSize: "1.375rem", fontVariantNumeric: "tabular-nums", color: "var(--text-2)", letterSpacing: "-0.01em" }}>
              $2.3M
            </p>
          </div>

          <div>
            <p style={{ fontSize: "0.5625rem", letterSpacing: "0.22em", color: "var(--text-3)", marginBottom: "3px" }}>
              YOU HOLD
            </p>
            <p style={{ fontWeight: 700, fontSize: "1.375rem", fontVariantNumeric: "tabular-nums", color: "var(--text-2)", letterSpacing: "-0.01em" }}>
              2,500
            </p>
          </div>
        </div>

        <p
          className="nrg-4"
          style={{
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--accent)",
            maxWidth: "22ch",
          }}
        >
          ENERGY HELD.<br />DOORS OPEN.
        </p>
      </section>

      {/* ACCESS TIERS */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="px-8 pt-12 pb-6">
          <h2 style={{ fontSize: "0.5625rem", letterSpacing: "0.22em", color: "var(--text-3)", fontWeight: 500 }}>
            ACCESS TIERS
          </h2>
        </div>

        {TIERS.map((tier, i) => {
          const isActive = tier.status === "active";
          const isLocked = tier.status === "locked";

          return (
            <div
              key={tier.code}
              style={{
                borderTop: "1px solid var(--border)",
                backgroundColor: isActive ? "var(--accent-bg)" : "transparent",
                opacity: i === 2 ? 0.42 : i === 3 ? 0.26 : 1,
              }}
            >
              <div
                className="flex items-start gap-6 px-8 py-7 flex-wrap"
                style={{ maxWidth: "960px" }}
              >
                {/* Code */}
                <div style={{ width: "52px", flexShrink: 0 }}>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: "2rem",
                      lineHeight: 1,
                      color: isActive ? "var(--accent)" : "var(--text-3)",
                      display: "block",
                      letterSpacing: "-0.02em",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {tier.code}
                  </span>
                  <div className="flex items-center gap-1 mt-1.5">
                    {isLocked
                      ? <TbLock size={11} style={{ color: "var(--text-3)" }} />
                      : <TbCheck size={11} style={{ color: isActive ? "var(--accent)" : "var(--text-3)" }} />
                    }
                    {isActive && (
                      <span style={{ fontSize: "0.5rem", letterSpacing: "0.16em", color: "var(--accent)", fontWeight: 600 }}>
                        YOURS
                      </span>
                    )}
                  </div>
                </div>

                {/* Name + perks */}
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      letterSpacing: "-0.01em",
                      lineHeight: 1,
                      marginBottom: "10px",
                      color: isActive ? "oklch(92% 0.008 60)" : "var(--text-2)",
                    }}
                  >
                    {tier.name}
                  </h3>
                  <ul className="flex flex-col" style={{ gap: "4px" }}>
                    {tier.perks.map((perk) => (
                      <li
                        key={perk}
                        style={{
                          fontSize: "0.875rem",
                          color: isActive ? "var(--text-2)" : "var(--text-3)",
                          lineHeight: 1.55,
                        }}
                      >
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirement */}
                <div style={{ marginLeft: "auto", paddingTop: "4px" }}>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "1rem",
                      letterSpacing: "0.04em",
                      color: isActive ? "var(--accent)" : "var(--text-3)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {tier.requirement}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* YOUR ACCESS */}
      <section className="py-14" style={{ borderBottom: "1px solid var(--border)" }}>
        <h2
          className="px-8 mb-8"
          style={{ fontSize: "0.5625rem", letterSpacing: "0.22em", color: "var(--text-3)", fontWeight: 500 }}
        >
          YOUR ACCESS
        </h2>

        {/* 1px gap = visible border, no card shadows */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1px",
            backgroundColor: "var(--border)",
            border: "1px solid var(--border)",
          }}
        >
          {ACTIVE_PERKS.map(({ icon: Icon, label, detail }) => (
            <div
              key={label}
              className="px-8 py-8"
              style={{ backgroundColor: "oklch(9% 0.008 60)" }}
            >
              <Icon size={18} style={{ color: "var(--accent)", marginBottom: "14px", display: "block" }} />
              <p style={{ fontWeight: 600, fontSize: "1rem", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "5px" }}>
                {label}
              </p>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-2)", lineHeight: 1.4 }}>
                {detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PULSE */}
      <section className="px-8 py-14">
        <h2
          style={{ fontSize: "0.5625rem", letterSpacing: "0.22em", color: "var(--text-3)", fontWeight: 500, marginBottom: "28px" }}
        >
          PULSE
        </h2>

        <div style={{ maxWidth: "640px" }}>
          {PULSE.map((item, i) => (
            <div
              key={i}
              className="flex items-baseline gap-8 py-4"
              style={{ borderBottom: i < PULSE.length - 1 ? "1px solid var(--border)" : undefined }}
            >
              <span
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--text-3)",
                  letterSpacing: "0.06em",
                  minWidth: "88px",
                  flexShrink: 0,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {item.time}
              </span>
              <span style={{ fontSize: "0.9375rem", color: "var(--text-2)", lineHeight: 1.4 }}>
                {item.event}
                {item.location && (
                  <span style={{ color: "var(--text-3)", marginLeft: "6px" }}>— {item.location}</span>
                )}
                {item.detail && (
                  <span style={{ color: "var(--text-3)", marginLeft: "6px" }}>· {item.detail}</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="px-8 py-7 flex items-center justify-between flex-wrap gap-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span style={{ fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", color: "var(--text-3)" }}>
          $NRG · ABRACADABRA RECORDS
        </span>
        <span style={{ fontSize: "0.625rem", color: "var(--text-3)", letterSpacing: "0.12em" }}>
          VISUAL PROTOTYPE · SOLANA
        </span>
      </footer>
    </div>
  );
}
