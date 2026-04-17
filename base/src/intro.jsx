// Intro — brief design summary strip at the top of the canvas

const { T } = window;

function IntroStrip() {
  return (
    <div style={{
      width: 1440, padding: '48px 60px 40px', background: T.paper,
      border: `1px solid ${T.rule}`, borderRadius: 2, fontFamily: T.sans, color: T.ink,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 48, alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: T.muted, fontWeight: 500, marginBottom: 14 }}>
            Ledger · Design concept · April 2026
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 44, lineHeight: 1.05, letterSpacing: -0.8 }}>
            An expense tracker that<br/>
            <span style={{ fontStyle: 'italic' }}>reads your receipts for you.</span>
          </div>
          <div style={{ marginTop: 18, fontSize: 14, color: T.ink2, lineHeight: 1.55, maxWidth: 560 }}>
            Mobile-first personal finance for young professionals. Coral = money out, teal = money in —
            the whole UI hangs off that one decision. An AI intake turns receipts, PDFs and bank statements
            into tidy, reviewable transactions. A refined-minimal, editorial visual language: serif display,
            sans UI, mono numbers.
          </div>
        </div>

        <div>
          <Column title="Primary screens">
            {['Desktop overview', 'Mobile home', 'Add transaction', 'Upload · AI intake',
              'Review extracted', 'All activity', 'Export', 'Categories'].map(s => <li key={s}>{s}</li>)}
          </Column>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Column title="System">
            <li><b>Fraunces</b> — display numbers & titles</li>
            <li><b>Inter</b> — UI / labels</li>
            <li><b>JetBrains Mono</b> — tabular amounts</li>
            <li>Ivory <span style={{display:'inline-block',width:10,height:10,background:T.ivory,border:`1px solid ${T.rule}`,verticalAlign:'middle'}}/> canvas, ink <span style={{display:'inline-block',width:10,height:10,background:T.ink,verticalAlign:'middle'}}/> text</li>
            <li>Coral <span style={{display:'inline-block',width:10,height:10,background:T.coral,verticalAlign:'middle'}}/> expense · Teal <span style={{display:'inline-block',width:10,height:10,background:T.teal,verticalAlign:'middle'}}/> earning</li>
          </Column>
          <Column title="Principles">
            <li>Color is semantic, never decorative</li>
            <li>Numbers are the hero, not the chrome</li>
            <li>AI is a quiet assistant, not a feature</li>
          </Column>
        </div>
      </div>
    </div>
  );
}

function Column({ title, children }) {
  return (
    <div>
      <div style={{ fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: T.muted, fontWeight: 500, marginBottom: 10 }}>{title}</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 13, lineHeight: 1.9, color: T.ink2 }}>
        {children}
      </ul>
    </div>
  );
}

window.IntroStrip = IntroStrip;
