// App — mounts everything onto the design canvas

const {
  T,
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt,
  IntroStrip,
  DesktopDashboard,
  MobHome,
  MobAdd,
  MobUpload,
  MobReview,
  MobActivity,
  MobExport,
  MobCategories,
  IOSDevice,
  useTweaks,
  TweaksPanel,
} = window

function Phone({ label, children, note, noteSide = "right" }) {
  return (
    <div style={{ position: "relative" }}>
      <DCArtboard
        label={label}
        width={402}
        height={874}
        style={{
          borderRadius: 48,
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <IOSDevice width={402} height={874}>
          {children}
        </IOSDevice>
      </DCArtboard>
      {note && (
        <DCPostIt
          top={noteSide === "right" ? 40 : 40}
          left={noteSide === "right" ? 430 : undefined}
          right={noteSide === "left" ? 430 : undefined}
          rotate={noteSide === "right" ? 3 : -3}
          width={200}
        >
          {note}
        </DCPostIt>
      )}
    </div>
  )
}

function App() {
  const tweaks = useTweaks()

  return (
    <>
      <DesignCanvas>
        {/* Intro */}
        <div style={{ padding: "0 60px 80px" }}>
          <IntroStrip />
        </div>

        {/* Desktop dashboard */}
        <DCSection
          title="Desktop · Overview"
          subtitle="The hero screen. Money in vs money out at a single glance — balance, breakdown, activity."
        >
          <div style={{ position: "relative" }}>
            <DCArtboard
              label="01 · Dashboard · 1440×900"
              width={1440}
              height={900}
            >
              <DesktopDashboard />
            </DCArtboard>
            <DCPostIt top={40} left={1470} width={220} rotate={3}>
              Split hero: earned / spent / net. Color does the work — coral vs
              teal. No icon chaff.
            </DCPostIt>
            <DCPostIt top={360} left={1470} width={220} rotate={-2}>
              Serif numerals, mono for list amounts. Numbers lead; labels are
              eyebrows.
            </DCPostIt>
          </div>
        </DCSection>

        {/* Mobile hero row — primary flows */}
        <DCSection
          title="Mobile · Primary flows"
          subtitle="Four screens that define the product: home, add, upload, review."
          gap={56}
        >
          <Phone
            label="02 · Home"
            note="Big balance, in/out split, spark. Two action cards keyed to color."
          >
            <MobHome />
          </Phone>
          <Phone label="03 · Add transaction">
            <MobAdd />
          </Phone>
          <Phone
            label="04 · Upload · AI intake"
            note="Drop zone + queue. Each file shows its own state: scanning, extracted, ready."
          >
            <MobUpload />
          </Phone>
          <Phone
            label="05 · Review extracted"
            note="Confidence per row. <60% forces a human check — no silent saves."
          >
            <MobReview />
          </Phone>
        </DCSection>

        {/* Mobile secondary row */}
        <DCSection
          title="Mobile · Secondary"
          subtitle="Navigation and management surfaces."
          gap={56}
        >
          <Phone
            label="06 · All activity"
            note="Segmented In/Out/All. Grouped by day, collapsed into paper cards."
          >
            <MobActivity />
          </Phone>
          <Phone label="07 · Export">
            <MobExport />
          </Phone>
          <Phone
            label="08 · Categories"
            note="Custom-category creation is a single + in the header. No modal gymnastics."
          >
            <MobCategories />
          </Phone>
        </DCSection>

        {/* Footer */}
        <div style={{ padding: "0 60px 80px", maxWidth: 900 }}>
          <div
            style={{
              fontFamily: T.sans,
              fontSize: 11,
              letterSpacing: 1.8,
              textTransform: "uppercase",
              color: T.muted,
              fontWeight: 500,
              marginBottom: 14,
            }}
          >
            Design rationale
          </div>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 22,
              lineHeight: 1.35,
              color: T.ink,
              letterSpacing: -0.2,
            }}
          >
            Spreadsheets win on power; they lose on{" "}
            <span style={{ fontStyle: "italic" }}>glanceability</span>. Ledger
            bets the whole interface on one claim: you should know, in under two
            seconds, whether this month is red or green. Every screen protects
            that promise. The AI intake doesn&apos;t try to be smart — it tries
            to be <span style={{ fontStyle: "italic" }}>honest</span>: show what
            you extracted, show how sure you are, let the human confirm.
          </div>
        </div>
      </DesignCanvas>

      <TweaksPanel tweaks={tweaks} />
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
