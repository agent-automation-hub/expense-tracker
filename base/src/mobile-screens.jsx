// Mobile screens — iOS frames, 402 × 874

const { T, fmtCOP, fmtCOPraw, D } = window

// ─────────────────────────────────────────────────────────────
// Shared mobile chrome
// ─────────────────────────────────────────────────────────────
function MobileShell({ children, hasTabBar = true, bg = T.ivory }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: bg,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          paddingTop: 58,
          paddingBottom: hasTabBar ? 96 : 40,
          height: "100%",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
      {hasTabBar && <MobileTabBar />}
    </div>
  )
}

function MobileTabBar({ active = "home" }) {
  const { I } = window
  const items = [
    [
      "home",
      "Home",
      <svg width="18" height="18" viewBox="0 0 18 18" key="h">
        <path
          d="M2 8l7-6 7 6v8H2V8z"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>,
    ],
    [
      "activity",
      "Activity",
      <svg width="18" height="18" viewBox="0 0 18 18" key="a">
        <path
          d="M2 14l4-4 3 3 7-7"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>,
    ],
    ["add", "", null],
    ["upload", "Upload", I.sparkle(16)],
    [
      "profile",
      "You",
      <svg width="18" height="18" viewBox="0 0 18 18" key="p">
        <circle
          cx="9"
          cy="6"
          r="3"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M3 16c1.5-3 4-4 6-4s4.5 1 6 4"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>,
    ],
  ]
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10px 18px 30px",
        background: `linear-gradient(to top, ${T.paper} 60%, rgba(251,249,245,0))`,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          alignItems: "center",
          height: 56,
          background: T.ink,
          borderRadius: 999,
          padding: "0 6px",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        {items.map(([id, label, icon]) => {
          if (id === "add") {
            return (
              <div
                key={id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 999,
                    background: T.paper,
                    color: T.ink,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path
                      d="M9 2v14M2 9h14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            )
          }
          const on = id === active
          return (
            <div
              key={id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                color: on ? T.paper : "rgba(255,255,255,0.55)",
              }}
            >
              {icon}
              <span style={{ fontSize: 10, fontWeight: 500 }}>{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MobileHeader({ title, sub, right, left }) {
  return (
    <div
      style={{
        padding: "8px 22px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        {sub && (
          <div
            style={{
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              color: T.muted,
              marginBottom: 4,
              fontWeight: 500,
            }}
          >
            {sub}
          </div>
        )}
        <div
          style={{
            fontFamily: T.serif,
            fontSize: 28,
            letterSpacing: -0.5,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
      </div>
      {right}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// 1 · Mobile Home — money in vs out
// ─────────────────────────────────────────────────────────────
function MobHome() {
  const { Eyebrow, Num, Mono, Rule, Chip, TypeGlyph, Spark, Btn, I } = window
  return (
    <MobileShell>
      <MobileHeader
        sub="April 2026"
        title={
          <span>
            Hola, <span style={{ fontStyle: "italic" }}>Valentina.</span>
          </span>
        }
        right={
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background: T.ink,
              color: T.paper,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: T.serif,
              fontStyle: "italic",
            }}
          >
            v
          </div>
        }
      />

      {/* Big balance card */}
      <div
        style={{
          margin: "4px 22px 14px",
          padding: "22px 22px 20px",
          background: T.paper,
          border: `1px solid ${T.rule}`,
          borderRadius: 2,
        }}
      >
        <Eyebrow>Net · April</Eyebrow>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "baseline",
            gap: 6,
          }}
        >
          <Num size={44}>
            <span style={{ fontSize: 18, marginRight: 4 }}>COP$</span>
            {fmtCOPraw(D.totals.balance)}
          </Num>
        </div>
        <div
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr",
            gap: 14,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: T.muted,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              In
            </div>
            <Mono size={13} color={T.teal} style={{ fontWeight: 600 }}>
              + {fmtCOPraw(D.totals.earned)}
            </Mono>
          </div>
          <div style={{ height: 28, background: T.rule }} />
          <div>
            <div
              style={{
                fontSize: 11,
                color: T.muted,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Out
            </div>
            <Mono size={13} color={T.coral} style={{ fontWeight: 600 }}>
              − {fmtCOPraw(D.totals.spent)}
            </Mono>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <Spark
            data={D.spark}
            width={314}
            height={32}
            color={T.ink}
            soft={T.faint}
          />
        </div>
      </div>

      {/* Two quick action cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          margin: "0 22px 18px",
        }}
      >
        <ActionCard tone="coral" label="Add expense" icon={I.minus(14)} />
        <ActionCard tone="teal" label="Add earning" icon={I.plus(14)} />
      </div>

      {/* AI upload banner */}
      <div
        style={{
          margin: "0 22px 18px",
          padding: 16,
          background: T.ink,
          color: T.paper,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              opacity: 0.6,
              marginBottom: 4,
            }}
          >
            AI assistant
          </div>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 18,
              letterSpacing: -0.2,
              lineHeight: 1.2,
            }}
          >
            Got a receipt? Drop it in.
          </div>
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            background: T.paper,
            color: T.ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {I.upload(16)}
        </div>
      </div>

      {/* Recent */}
      <div
        style={{
          padding: "0 22px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Eyebrow>Recent</Eyebrow>
        <span style={{ fontSize: 12, color: T.ink, fontWeight: 500 }}>
          See all
        </span>
      </div>
      <div
        style={{
          margin: "0 22px",
          background: T.paper,
          border: `1px solid ${T.rule}`,
          borderRadius: 2,
        }}
      >
        {D.tx.slice(0, 3).map((t, i) => (
          <MobTxRow key={t.id} t={t} last={i === 2} />
        ))}
      </div>
    </MobileShell>
  )
}

function ActionCard({ tone, label, icon }) {
  const bg = tone === "coral" ? T.coralBg : T.tealBg
  const fg = tone === "coral" ? T.coral : T.teal
  return (
    <div
      style={{
        background: bg,
        borderRadius: 2,
        padding: "18px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        minHeight: 106,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 999,
          background: T.paper,
          color: fg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: T.serif,
          fontSize: 18,
          color: T.ink,
          letterSpacing: -0.3,
        }}
      >
        {label}
      </div>
    </div>
  )
}

function MobTxRow({ t, last }) {
  const { TypeGlyph, Mono } = window
  const cat = D.catMap[t.cat]
  const out = t.type === "out"
  return (
    <div
      style={{
        padding: "14px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderBottom: last ? "none" : `1px solid ${T.rule2}`,
      }}
    >
      <TypeGlyph type={t.type} size={30} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: T.ink }}>
          {t.title}
        </div>
        <div style={{ fontSize: 11.5, color: T.muted, marginTop: 2 }}>
          {cat.label} · {t.date.replace(/·.*/, "").trim()}
        </div>
      </div>
      <Mono
        size={13}
        color={out ? T.coral : T.teal}
        style={{ fontWeight: 600 }}
      >
        {out ? "−" : "+"} {fmtCOPraw(t.amount)}
      </Mono>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// 2 · Add Transaction (manual)
// ─────────────────────────────────────────────────────────────
function MobAdd() {
  const { Eyebrow, Num, Mono, Chip, Btn, I, Rule } = window
  return (
    <MobileShell hasTabBar={false} bg={T.paper}>
      {/* Close header */}
      <div
        style={{
          padding: "0 22px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            border: `1px solid ${T.rule}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: T.ink,
          }}
        >
          {I.x(11)}
        </div>
        <div style={{ fontSize: 13, color: T.muted }}>New transaction</div>
        <div style={{ fontSize: 13, fontWeight: 500, color: T.muted }}>
          Save
        </div>
      </div>

      {/* Type toggle */}
      <div
        style={{
          margin: "0 22px 22px",
          height: 44,
          background: T.ivory,
          borderRadius: 999,
          padding: 4,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          position: "relative",
        }}
      >
        <div
          style={{
            background: T.coral,
            color: "#fff",
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 13.5,
            fontWeight: 500,
          }}
        >
          <span style={{ display: "inline-flex" }}>{I.minus(12)}</span> Expense
        </div>
        <div
          style={{
            color: T.muted,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 13.5,
            fontWeight: 500,
          }}
        >
          <span style={{ display: "inline-flex" }}>{I.plus(12)}</span> Earning
        </div>
      </div>

      {/* Amount — huge */}
      <div style={{ textAlign: "center", margin: "6px 0 28px" }}>
        <Eyebrow>Amount</Eyebrow>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <span style={{ fontFamily: T.serif, fontSize: 22, color: T.muted }}>
            COP$
          </span>
          <Num size={68} color={T.coral} weight={300}>
            18.500
          </Num>
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: 40,
              background: T.coral,
              marginLeft: 2,
              animation: "blink 1s steps(2, end) infinite",
            }}
          />
        </div>
      </div>

      {/* Fields */}
      <div
        style={{
          margin: "0 22px",
          background: T.ivory,
          borderRadius: 2,
          border: `1px solid ${T.rule}`,
          overflow: "hidden",
        }}
      >
        <Field label="Merchant" value="Azahar Coffee" />
        <Rule color={T.rule2} />
        <Field
          label="Category"
          rightNode={
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Chip tone="coral" size="sm">
                Food & drink
              </Chip>
              <span style={{ color: T.muted }}>{I.ar(12)}</span>
            </div>
          }
        />
        <Rule color={T.rule2} />
        <Field label="Date" value="Today, 09:12" />
        <Rule color={T.rule2} />
        <Field label="Note" value="Oat latte · Chapinero" muted />
      </div>

      {/* Category quick picks */}
      <div style={{ padding: "18px 22px 8px" }}>
        <Eyebrow style={{ marginBottom: 10 }}>Suggested</Eyebrow>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[
            "Food & drink",
            "Transport",
            "Groceries",
            "Coffee",
            "Leisure",
            "+ New",
          ].map((l, i) => (
            <Chip key={l} tone={i === 0 ? "ink" : "ghost"} size="md">
              {l}
            </Chip>
          ))}
        </div>
      </div>

      {/* Save button pinned bottom */}
      <div style={{ position: "absolute", bottom: 30, left: 22, right: 22 }}>
        <Btn
          variant="primary"
          size="lg"
          style={{
            width: "100%",
            height: 52,
            justifyContent: "center",
            fontSize: 15,
          }}
        >
          Save expense
        </Btn>
      </div>

      <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>
    </MobileShell>
  )
}

function Field({ label, value, rightNode, muted }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: T.muted,
          letterSpacing: 0.3,
          textTransform: "uppercase",
          fontWeight: 500,
          width: 90,
        }}
      >
        {label}
      </div>
      {rightNode || (
        <div
          style={{
            fontSize: 14,
            color: muted ? T.muted : T.ink,
            flex: 1,
            textAlign: "right",
          }}
        >
          {value}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// 3 · Upload — AI intake
// ─────────────────────────────────────────────────────────────
function MobUpload() {
  const { Eyebrow, Btn, Chip, I, Rule } = window
  return (
    <MobileShell hasTabBar={false} bg={T.ivory}>
      <div
        style={{
          padding: "0 22px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            border: `1px solid ${T.rule}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: T.ink,
            background: T.paper,
          }}
        >
          {I.x(11)}
        </div>
        <Chip tone="ink" size="sm">
          <span style={{ display: "inline-flex", marginRight: 4 }}>
            {I.sparkle(10)}
          </span>
          AI
        </Chip>
      </div>

      <MobileHeader
        sub="Upload"
        title={
          <span>
            Drop a file.
            <br />
            <span style={{ fontStyle: "italic", color: T.muted }}>
              We'll do the filing.
            </span>
          </span>
        }
      />

      {/* Drop zone */}
      <div
        style={{
          margin: "6px 22px 20px",
          padding: "30px 22px",
          background: T.paper,
          border: `1.5px dashed ${T.faint}`,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            background: T.ivory,
            margin: "0 auto 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: T.ink,
          }}
        >
          {I.upload(22)}
        </div>
        <div
          style={{
            fontFamily: T.serif,
            fontSize: 18,
            letterSpacing: -0.2,
            marginBottom: 4,
          }}
        >
          Drag a file, or tap to pick
        </div>
        <div style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>
          PDF · JPG · PNG · HEIC · CSV · up to 20 MB
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <Btn variant="primary" size="sm" icon={I.doc(12)}>
            Choose file
          </Btn>
          <Btn variant="light" size="sm">
            Take photo
          </Btn>
        </div>
      </div>

      {/* Recent uploads */}
      <div style={{ padding: "0 22px 10px" }}>
        <Eyebrow>In progress</Eyebrow>
      </div>
      <div
        style={{
          margin: "0 22px 16px",
          background: T.paper,
          border: `1px solid ${T.rule}`,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <UploadRow name="receipt-azahar.jpg" state="scanning" progress={62} />
        <Rule color={T.rule2} />
        <UploadRow name="bancolombia-march.pdf" state="extracted" count={14} />
        <Rule color={T.rule2} />
        <UploadRow name="uber-trip.pdf" state="ready" count={1} />
      </div>

      {/* What the AI can do */}
      <div style={{ padding: "0 22px" }}>
        <Eyebrow style={{ marginBottom: 10 }}>What it reads</Eyebrow>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[
            "Receipts",
            "Invoices",
            "Bank statements",
            "Screenshots",
            "Plain notes",
          ].map((l) => (
            <Chip key={l} tone="ghost" size="md">
              {l}
            </Chip>
          ))}
        </div>
      </div>
    </MobileShell>
  )
}

function UploadRow({ name, state, progress, count }) {
  const { I, Mono, Chip } = window
  return (
    <div
      style={{
        padding: "14px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 32,
          height: 40,
          borderRadius: 2,
          background: T.ivory,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: T.ink,
        }}
      >
        {I.doc(14)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: T.ink,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
        {state === "scanning" && (
          <div style={{ marginTop: 6 }}>
            <div
              style={{
                height: 3,
                background: T.rule2,
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: T.ink,
                }}
              />
            </div>
            <div
              style={{
                fontSize: 11,
                color: T.muted,
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span style={{ display: "inline-flex" }}>{I.sparkle(10)}</span>
              Reading… {progress}%
            </div>
          </div>
        )}
        {state === "extracted" && (
          <div style={{ fontSize: 11.5, color: T.muted, marginTop: 2 }}>
            {count} transactions found · review
          </div>
        )}
        {state === "ready" && (
          <div style={{ fontSize: 11.5, color: T.teal, marginTop: 2 }}>
            Added · {count} entry
          </div>
        )}
      </div>
      {state === "extracted" && (
        <Chip tone="ink" size="sm">
          Review
        </Chip>
      )}
      {state === "ready" && (
        <span style={{ color: T.teal, display: "inline-flex" }}>
          {I.check(14)}
        </span>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// 4 · Review extracted (AI confidence)
// ─────────────────────────────────────────────────────────────
function MobReview() {
  const { Eyebrow, Mono, Chip, Btn, Rule, I } = window
  const rows = [
    {
      t: "Éxito supermarket",
      cat: "Food & drink",
      amt: 184320,
      date: "Apr 12",
      conf: 0.98,
    },
    {
      t: "Pan Pa' Ya",
      cat: "Food & drink",
      amt: 12400,
      date: "Apr 12",
      conf: 0.96,
    },
    {
      t: "Drogueria Cafam",
      cat: "Health",
      amt: 34800,
      date: "Apr 11",
      conf: 0.74,
    },
    {
      t: "Cash withdrawal",
      cat: "Uncategorized",
      amt: 200000,
      date: "Apr 10",
      conf: 0.46,
      flag: true,
    },
  ]
  return (
    <MobileShell hasTabBar={false} bg={T.paper}>
      <div
        style={{
          padding: "0 22px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            border: `1px solid ${T.rule}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: T.ink,
          }}
        >
          <svg width="10" height="14" viewBox="0 0 10 14">
            <path
              d="M8 2L2 7l6 5"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <Chip tone="ghost" size="sm">
          <span
            style={{ display: "inline-flex", marginRight: 4, color: T.ink }}
          >
            {I.sparkle(10)}
          </span>
          Extracted by AI
        </Chip>
      </div>

      <MobileHeader
        sub="bancolombia-march.pdf"
        title={
          <span>
            4 entries found.
            <br />
            <span style={{ fontStyle: "italic", color: T.muted }}>
              Confirm or edit.
            </span>
          </span>
        }
      />

      <div
        style={{
          margin: "6px 22px 18px",
          background: T.ivory,
          border: `1px solid ${T.rule}`,
          borderRadius: 2,
        }}
      >
        {rows.map((r, i) => (
          <React.Fragment key={i}>
            <ReviewRow r={r} />
            {i < rows.length - 1 && <Rule color={T.rule2} />}
          </React.Fragment>
        ))}
      </div>

      {/* Totals summary */}
      <div
        style={{
          margin: "0 22px",
          padding: "14px 16px",
          background: T.ivory,
          border: `1px solid ${T.rule}`,
          borderRadius: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Eyebrow>Will add</Eyebrow>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 20,
              marginTop: 4,
              color: T.coral,
            }}
          >
            − COP$ {fmtCOPraw(rows.reduce((s, r) => s + r.amt, 0))}
          </div>
        </div>
        <span
          style={{
            fontSize: 11,
            color: T.muted,
            textAlign: "right",
            maxWidth: 130,
            lineHeight: 1.3,
          }}
        >
          1 needs your review before saving
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 22,
          right: 22,
          display: "flex",
          gap: 8,
        }}
      >
        <Btn
          variant="light"
          size="lg"
          style={{ flex: 1, justifyContent: "center" }}
        >
          Discard
        </Btn>
        <Btn
          variant="primary"
          size="lg"
          style={{ flex: 2, justifyContent: "center" }}
        >
          Save 4 transactions
        </Btn>
      </div>
    </MobileShell>
  )
}

function ReviewRow({ r }) {
  const { Chip, Mono, I } = window
  const conf = Math.round(r.conf * 100)
  const level = r.conf > 0.9 ? "high" : r.conf > 0.6 ? "mid" : "low"
  const dotColors = { high: T.teal, mid: "#C79A50", low: T.coral }
  return (
    <div
      style={{
        padding: "14px 14px",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          border: `1.5px solid ${r.flag ? T.coral : T.ink}`,
          background: r.flag ? "transparent" : T.ink,
          color: T.paper,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {!r.flag && I.check(12)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.t}</div>
          <Mono size={13} color={T.coral} style={{ fontWeight: 600 }}>
            − {fmtCOPraw(r.amt)}
          </Mono>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 6,
            alignItems: "center",
          }}
        >
          <Chip tone={r.flag ? "coral" : "ghost"} size="sm">
            {r.cat}
          </Chip>
          <span style={{ fontSize: 11, color: T.muted }}>{r.date}</span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: 11,
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              color: dotColors[level],
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: 999,
                background: dotColors[level],
              }}
            />
            {conf}% confident
          </span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// 5 · All transactions
// ─────────────────────────────────────────────────────────────
function MobActivity() {
  const { Eyebrow, Chip, Mono, Rule, I } = window
  const groups = [
    {
      label: "Today, Apr 17",
      items: D.tx.filter((t) => t.date.startsWith("Today")),
    },
    {
      label: "Yesterday, Apr 16",
      items: D.tx.filter((t) => t.date.startsWith("Yesterday")),
    },
    { label: "This week", items: D.tx.slice(3, 7) },
  ]
  return (
    <MobileShell>
      <MobileHeader
        sub="Activity"
        title="All movement."
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                background: T.paper,
                border: `1px solid ${T.rule}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: T.ink,
              }}
            >
              {I.search(13)}
            </div>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                background: T.paper,
                border: `1px solid ${T.rule}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: T.ink,
              }}
            >
              {I.filter(13)}
            </div>
          </div>
        }
      />

      {/* Segmented filter */}
      <div
        style={{
          margin: "0 22px 16px",
          padding: 4,
          background: T.paper,
          border: `1px solid ${T.rule}`,
          borderRadius: 999,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {[
          ["All", true],
          ["Out", false],
          ["In", false],
        ].map(([l, a]) => (
          <div
            key={l}
            style={{
              height: 32,
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 500,
              background: a ? T.ink : "transparent",
              color: a ? T.paper : T.muted,
            }}
          >
            {l}
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div
        style={{
          padding: "0 22px 12px",
          display: "flex",
          gap: 6,
          overflowX: "auto",
        }}
      >
        <Chip tone="ink" size="md">
          April
        </Chip>
        <Chip tone="ghost" size="md">
          All categories
        </Chip>
        <Chip tone="ghost" size="md">
          + Filter
        </Chip>
      </div>

      <div
        style={{
          overflowY: "auto",
          height: "calc(100% - 220px)",
          paddingBottom: 20,
        }}
      >
        {groups.map((g) =>
          g.items.length ? (
            <div key={g.label}>
              <div
                style={{
                  padding: "10px 22px 6px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Eyebrow>{g.label}</Eyebrow>
                <span
                  style={{ fontFamily: T.mono, fontSize: 10, color: T.muted }}
                >
                  {g.items.length}
                </span>
              </div>
              <div
                style={{
                  margin: "0 22px",
                  background: T.paper,
                  border: `1px solid ${T.rule}`,
                  borderRadius: 2,
                  marginBottom: 8,
                }}
              >
                {g.items.map((t, i) => (
                  <MobTxRow key={t.id} t={t} last={i === g.items.length - 1} />
                ))}
              </div>
            </div>
          ) : null,
        )}
      </div>
    </MobileShell>
  )
}

// ─────────────────────────────────────────────────────────────
// 6 · Export
// ─────────────────────────────────────────────────────────────
function MobExport() {
  const { Eyebrow, Chip, Mono, Btn, I, Rule } = window
  return (
    <MobileShell hasTabBar={false} bg={T.paper}>
      <div
        style={{
          padding: "0 22px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            border: `1px solid ${T.rule}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: T.ink,
          }}
        >
          {I.x(11)}
        </div>
        <div style={{ fontSize: 13, color: T.muted }}>Export</div>
        <div style={{ width: 32 }} />
      </div>

      <MobileHeader
        sub="Export"
        title={
          <span>
            Take your data
            <br />
            <span style={{ fontStyle: "italic" }}>with you.</span>
          </span>
        }
      />

      {/* Format picker */}
      <div style={{ padding: "0 22px 8px" }}>
        <Eyebrow>Format</Eyebrow>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
          margin: "6px 22px 18px",
        }}
      >
        {[
          ["PDF", "Statement", true],
          ["CSV", "Raw data", false],
          ["XLSX", "Spreadsheet", false],
        ].map(([fmt, sub, a]) => (
          <div
            key={fmt}
            style={{
              padding: "14px 10px",
              textAlign: "center",
              background: a ? T.ink : T.ivory,
              color: a ? T.paper : T.ink,
              border: `1px solid ${a ? T.ink : T.rule}`,
              borderRadius: 2,
            }}
          >
            <div
              style={{
                fontFamily: T.serif,
                fontSize: 18,
                fontWeight: 400,
                marginBottom: 2,
              }}
            >
              {fmt}
            </div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Date range */}
      <div style={{ margin: "0 22px 14px" }}>
        <Eyebrow style={{ marginBottom: 8 }}>Date range</Eyebrow>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["This month", "Last month", "This year", "Custom"].map((l, i) => (
            <Chip key={l} tone={i === 0 ? "ink" : "ghost"} size="md">
              {l}
            </Chip>
          ))}
        </div>
      </div>

      {/* Type */}
      <div style={{ margin: "0 22px 14px" }}>
        <Eyebrow style={{ marginBottom: 8 }}>Include</Eyebrow>
        <div style={{ display: "flex", gap: 6 }}>
          <Chip tone="ink" size="md">
            All transactions
          </Chip>
          <Chip tone="ghost" size="md">
            Expenses
          </Chip>
          <Chip tone="ghost" size="md">
            Earnings
          </Chip>
        </div>
      </div>

      {/* Categories filter */}
      <div style={{ margin: "0 22px 18px" }}>
        <Eyebrow style={{ marginBottom: 8 }}>Categories</Eyebrow>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Chip tone="ink" size="md">
            All 9
          </Chip>
          <Chip tone="ghost" size="md">
            Select…
          </Chip>
        </div>
      </div>

      {/* Preview */}
      <div
        style={{
          margin: "0 22px 18px",
          padding: "14px 16px",
          background: T.ivory,
          border: `1px solid ${T.rule}`,
          borderRadius: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Eyebrow>Preview</Eyebrow>
          <Mono size={10} color={T.muted}>
            APRIL 2026
          </Mono>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          <SummaryCell label="Transactions" val={D.tx.length} />
          <SummaryCell label="File size" val="~ 42 KB" />
          <SummaryCell
            label="Out"
            val={`COP$ ${fmtCOPraw(D.totals.spent)}`}
            color={T.coral}
          />
          <SummaryCell
            label="In"
            val={`COP$ ${fmtCOPraw(D.totals.earned)}`}
            color={T.teal}
          />
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 30, left: 22, right: 22 }}>
        <Btn
          variant="primary"
          size="lg"
          icon={I.dl(14)}
          style={{ width: "100%", height: 52, justifyContent: "center" }}
        >
          Export statement · PDF
        </Btn>
      </div>
    </MobileShell>
  )
}

function SummaryCell({ label, val, color }) {
  const { Mono } = window
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          color: T.muted,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 3,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <Mono size={13} color={color || T.ink} style={{ fontWeight: 500 }}>
        {val}
      </Mono>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// 7 · Categories
// ─────────────────────────────────────────────────────────────
function MobCategories() {
  const { Eyebrow, Mono, Chip, Rule, I } = window
  const catColors = {
    food: T.coral,
    trans: "#E89B7D",
    rent: T.ink,
    subs: "#A37A63",
    leisure: "#C4A898",
    health: "#8C6B57",
    salary: T.teal,
    freel: "#5AA69F",
    gifts: "#7FB9B2",
  }
  const exp = D.categories.filter((c) => c.kind === "expense")
  const earn = D.categories.filter((c) => c.kind === "earning")

  const Row = ({ c }) => {
    const total = D.tx
      .filter((t) => t.cat === c.id)
      .reduce((s, t) => s + t.amount, 0)
    return (
      <div
        style={{
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            background: catColors[c.id] || T.faint,
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 500 }}>{c.label}</div>
        </div>
        <Mono size={12} color={T.muted}>
          {fmtCOPraw(total)}
        </Mono>
        <span style={{ color: T.muted }}>{I.ar(12)}</span>
      </div>
    )
  }

  return (
    <MobileShell>
      <MobileHeader
        sub="Categories"
        title="How you classify."
        right={
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background: T.ink,
              color: T.paper,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {I.plus(12)}
          </div>
        }
      />

      <div style={{ padding: "0 22px 10px" }}>
        <Eyebrow>Expenses · {exp.length}</Eyebrow>
      </div>
      <div
        style={{
          margin: "0 22px 18px",
          background: T.paper,
          border: `1px solid ${T.rule}`,
          borderRadius: 2,
        }}
      >
        {exp.map((c, i) => (
          <React.Fragment key={c.id}>
            <Row c={c} />
            {i < exp.length - 1 && <Rule color={T.rule2} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ padding: "0 22px 10px" }}>
        <Eyebrow>Earnings · {earn.length}</Eyebrow>
      </div>
      <div
        style={{
          margin: "0 22px",
          background: T.paper,
          border: `1px solid ${T.rule}`,
          borderRadius: 2,
        }}
      >
        {earn.map((c, i) => (
          <React.Fragment key={c.id}>
            <Row c={c} />
            {i < earn.length - 1 && <Rule color={T.rule2} />}
          </React.Fragment>
        ))}
      </div>
    </MobileShell>
  )
}

Object.assign(window, {
  MobHome,
  MobAdd,
  MobUpload,
  MobReview,
  MobActivity,
  MobExport,
  MobCategories,
  MobileShell,
  MobileHeader,
})
