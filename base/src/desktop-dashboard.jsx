// Desktop dashboard — 1440 × 900 editorial layout

const { T, fmtCOP, fmtCOPraw, D } = window;

function DesktopDashboard() {
  const { Eyebrow, Num, Mono, Rule, Dot, Chip, TypeGlyph, Spark, Donut, Btn, I } = window;
  const catColors = {
    rent: T.ink, food: T.coral, trans: '#E89B7D',
    subs: '#A37A63', leisure: '#C4A898', health: '#8C6B57',
  };
  const segments = D.breakdown.map(r => ({ pct: r.pct, color: catColors[r.id] || T.faint }));

  return (
    <div style={{
      width: 1440, height: 900, background: T.ivory, color: T.ink,
      fontFamily: T.sans, display: 'flex', overflow: 'hidden',
    }}>
      {/* SIDEBAR */}
      <aside style={{
        width: 232, padding: '28px 22px', borderRight: `1px solid ${T.rule}`,
        display: 'flex', flexDirection: 'column', gap: 28, background: T.paper,
      }}>
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div style={{
            fontFamily: T.serif, fontSize: 26, fontWeight: 400,
            letterSpacing: -0.5, fontStyle: 'italic',
          }}>Ledger</div>
          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: 1 }}>v 1.0</div>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            ['Overview', true],
            ['All activity', false],
            ['Expenses', false],
            ['Earnings', false],
            ['Categories', false],
            ['Upload', false, true],
            ['Export', false],
          ].map(([label, active, isNew]) => (
            <div key={label} style={{
              padding: '9px 12px', borderRadius: 8,
              background: active ? T.ink : 'transparent',
              color: active ? T.paper : T.ink2,
              fontSize: 14, fontWeight: active ? 500 : 400,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              cursor: 'pointer',
            }}>
              <span>{label}</span>
              {isNew && <Chip tone="coral" size="sm" style={{ height: 18, fontSize: 10, padding: '0 8px' }}>AI</Chip>}
            </div>
          ))}
        </nav>

        <Rule />

        {/* Quick add */}
        <div>
          <Eyebrow style={{ marginBottom: 12 }}>Quick add</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Btn variant="coral" size="sm" icon={I.minus(12)}>Expense</Btn>
            <Btn variant="teal"  size="sm" icon={I.plus(12)}>Earning</Btn>
            <Btn variant="light" size="sm" icon={I.upload(14)}>Upload receipt</Btn>
          </div>
        </div>

        <div style={{ flex: 1 }}/>

        {/* Account */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 10, borderTop: `1px solid ${T.rule}` }}>
          <div style={{
            width: 32, height: 32, borderRadius: 999, background: T.ink,
            color: T.paper, display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily: T.serif, fontSize: 15, fontStyle: 'italic',
          }}>v</div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Valentina R.</div>
            <div style={{ fontSize: 11, color: T.muted }}>Personal · COP</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: '28px 36px 0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <Eyebrow>April, 2026</Eyebrow>
            <div style={{
              fontFamily: T.serif, fontSize: 36, fontWeight: 400, letterSpacing: -0.8,
              marginTop: 4,
            }}>
              Good afternoon, Valentina.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, height: 36,
              padding: '0 14px', border: `1px solid ${T.rule}`, borderRadius: 999,
              background: T.paper, color: T.muted, fontSize: 13, width: 260,
            }}>
              {I.search(13)}
              <span>Search transactions…</span>
              <span style={{ marginLeft: 'auto', fontFamily: T.mono, fontSize: 10 }}>⌘K</span>
            </div>
            <Btn variant="light" icon={I.filter(13)}>April</Btn>
            <Btn variant="primary" icon={I.plus(12)}>Add</Btn>
          </div>
        </div>

        {/* Hero row — money in vs money out */}
        <section style={{
          border: `1px solid ${T.rule}`, borderRadius: 2, background: T.paper,
          display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
          overflow: 'hidden', marginBottom: 16,
        }}>
          {/* Earned */}
          <div style={{ padding: '26px 30px 24px', position: 'relative' }}>
            <Eyebrow>Earned · in</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 14 }}>
              <Num size={52} color={T.teal} weight={400}>
                <span style={{ fontSize: 24, fontWeight:400, marginRight: 6, color: T.teal }}>COP$</span>
                {fmtCOPraw(D.totals.earned)}
              </Num>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap: 8, marginTop: 12, color: T.muted, fontSize: 12 }}>
              <Chip tone="teal" size="sm">+ 12.4%</Chip>
              <span>vs March</span>
            </div>
          </div>

          <div style={{ background: T.rule }} />

          {/* Spent */}
          <div style={{ padding: '26px 30px 24px' }}>
            <Eyebrow>Spent · out</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 14 }}>
              <Num size={52} color={T.coral} weight={400}>
                <span style={{ fontSize: 24, fontWeight:400, marginRight: 6, color: T.coral }}>COP$</span>
                {fmtCOPraw(D.totals.spent)}
              </Num>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap: 8, marginTop: 12, color: T.muted, fontSize: 12 }}>
              <Chip tone="coral" size="sm">− 3.1%</Chip>
              <span>vs March</span>
            </div>
          </div>

          <div style={{ background: T.rule }} />

          {/* Balance + spark */}
          <div style={{ padding: '26px 30px 24px' }}>
            <Eyebrow>Net balance</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 14 }}>
              <Num size={52} weight={400}>
                <span style={{ fontSize: 24, fontWeight:400, marginRight: 6 }}>COP$</span>
                {fmtCOPraw(D.totals.balance)}
              </Num>
            </div>
            <div style={{ marginTop: 8 }}>
              <Spark data={D.spark} width={320} height={36} color={T.ink} soft={T.faint} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.muted }}>Apr 01</span>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.muted }}>Apr 30</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lower grid */}
        <section style={{
          display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 16, flex: 1,
          minHeight: 0,
        }}>
          {/* Recent activity */}
          <div style={{
            border: `1px solid ${T.rule}`, borderRadius: 2, background: T.paper,
            padding: '22px 26px 8px', display: 'flex', flexDirection: 'column', minHeight: 0,
          }}>
            <header style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              marginBottom: 16,
            }}>
              <div>
                <Eyebrow>Recent activity</Eyebrow>
                <div style={{
                  fontFamily: T.serif, fontSize: 22, marginTop: 4, letterSpacing: -0.3,
                }}>This week, in order.</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <Chip tone="ink" size="md">All</Chip>
                <Chip tone="ghost" size="md">Out</Chip>
                <Chip tone="ghost" size="md">In</Chip>
              </div>
            </header>

            <div style={{ overflow: 'hidden' }}>
              {D.tx.slice(0, 7).map((t, i) => (
                <TxRow key={t.id} t={t} first={i===0} />
              ))}
            </div>

            <div style={{
              padding: '10px 0 14px', color: T.muted, fontSize: 13,
              display:'flex', alignItems:'center', justifyContent:'space-between',
              borderTop: `1px solid ${T.rule}`, marginTop: 8,
            }}>
              <span>Showing 7 of 42 this month</span>
              <span style={{ color: T.ink, fontWeight:500, display:'flex', alignItems:'center', gap:6 }}>
                See all {I.ar(12)}
              </span>
            </div>
          </div>

          {/* Breakdown */}
          <div style={{
            border: `1px solid ${T.rule}`, borderRadius: 2, background: T.paper,
            padding: '22px 26px', display: 'flex', flexDirection: 'column', minHeight: 0,
          }}>
            <header style={{ marginBottom: 16 }}>
              <Eyebrow>Where it went</Eyebrow>
              <div style={{
                fontFamily: T.serif, fontSize: 22, marginTop: 4, letterSpacing: -0.3,
              }}>Expenses by category.</div>
            </header>

            <div style={{ display:'flex', gap: 24, alignItems:'center' }}>
              <Donut
                segments={segments}
                size={170} thickness={18}
                center={
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontSize: 10, letterSpacing: 1.4, textTransform:'uppercase', color: T.muted }}>Total</div>
                    <Num size={22} style={{ marginTop: 2 }}>{fmtCOPraw(D.totals.spent / 1000).replace(/\.\d+$/,'')}k</Num>
                  </div>
                }
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {D.breakdown.slice(0,5).map(r => (
                  <div key={r.id} style={{ display:'flex', alignItems:'center', gap: 10 }}>
                    <Dot color={catColors[r.id] || T.faint} size={8}/>
                    <div style={{ flex: 1, fontSize: 13 }}>{r.label}</div>
                    <Mono size={12} color={T.muted}>{Math.round(r.pct*100)}%</Mono>
                    <Mono size={12} style={{ width: 86, textAlign:'right' }}>{fmtCOPraw(r.amount)}</Mono>
                  </div>
                ))}
              </div>
            </div>

            {/* AI upload promo */}
            <div style={{
              marginTop: 'auto', border: `1px solid ${T.rule}`, borderRadius: 2,
              padding: 18, background: T.ivory, display:'flex', gap: 14, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 2, background: T.ink,
                color: T.paper, display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink: 0,
              }}>{I.sparkle(16)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>
                  Drop a receipt, get a transaction.
                </div>
                <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.45 }}>
                  PDFs, photos, bank statements — the AI reads them and files the entry.
                </div>
              </div>
              <Btn variant="light" size="sm" icon={I.upload(12)}>Upload</Btn>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function TxRow({ t, first }) {
  const { Rule, Mono, Chip, TypeGlyph, I } = window;
  const cat = D.catMap[t.cat];
  const out = t.type === 'out';
  return (
    <>
      {!first && <Rule color={T.rule2} />}
      <div style={{
        display:'grid', gridTemplateColumns: '28px 1fr auto auto 130px 16px',
        alignItems:'center', gap: 14, padding: '13px 0',
        fontFamily: T.sans, fontSize: 13.5,
      }}>
        <TypeGlyph type={t.type} size={28}/>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 500, color: T.ink, display: 'flex', gap: 8, alignItems: 'center' }}>
            {t.title}
            {t.src === 'ai' && <span title="From AI extraction" style={{ color: T.muted, display:'inline-flex' }}>{I.sparkle(10)}</span>}
          </div>
          <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{t.note}</div>
        </div>
        <Chip tone="ghost" size="sm">{cat.label}</Chip>
        <Mono size={11} color={T.muted}>{t.date}</Mono>
        <Mono size={14} color={out ? T.coral : T.teal} style={{ textAlign:'right', fontWeight: 500 }}>
          {out ? '−' : '+'} {fmtCOPraw(t.amount)}
        </Mono>
        <div style={{ color: T.muted, display: 'flex', justifyContent: 'flex-end' }}>{I.dots(12)}</div>
      </div>
    </>
  );
}

window.DesktopDashboard = DesktopDashboard;
window.TxRow = TxRow;
