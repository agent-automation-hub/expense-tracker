// Tweaks — accent swap, density, dark-ish mode, cursor toggle

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentExpense": "#D66A4E",
  "accentEarning": "#3E8B85",
  "showGrid": true,
  "serifTitles": true
}/*EDITMODE-END*/;

function useTweaks() {
  const [state, setState] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('tweaks') || 'null') || TWEAK_DEFAULTS; }
    catch { return TWEAK_DEFAULTS; }
  });
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setVisible(true);
      if (e.data.type === '__deactivate_edit_mode') setVisible(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const update = (patch) => {
    const next = { ...state, ...patch };
    setState(next);
    localStorage.setItem('tweaks', JSON.stringify(next));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
    // Apply accents live by mutating T
    if (patch.accentExpense) window.T.coral = patch.accentExpense;
    if (patch.accentEarning) window.T.teal = patch.accentEarning;
  };

  // Apply on load
  React.useEffect(() => {
    if (state.accentExpense) window.T.coral = state.accentExpense;
    if (state.accentEarning) window.T.teal = state.accentEarning;
  }, []);

  return { state, update, visible };
}

function TweaksPanel({ tweaks }) {
  const { state, update, visible } = tweaks;
  if (!visible) return null;
  const { T } = window;

  const accentPairs = [
    ['#D66A4E', '#3E8B85', 'Coral × Teal'],
    ['#C0443A', '#2E7D32', 'Classic R/G'],
    ['#C2883A', '#4F6D3E', 'Amber × Olive'],
    ['#2B2926', '#8A847B', 'Monochrome'],
  ];

  return (
    <div style={{
      position: 'fixed', right: 20, bottom: 20, zIndex: 9999, width: 280,
      background: '#fff', border: `1px solid ${T.rule}`, borderRadius: 2,
      padding: 16, fontFamily: T.sans, fontSize: 12, color: T.ink,
      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
    }}>
      <div style={{ fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: T.muted, marginBottom: 10, fontWeight: 500 }}>Tweaks</div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: T.muted, marginBottom: 6 }}>Accent pair (reload to see)</div>
        <div style={{ display: 'grid', gap: 6 }}>
          {accentPairs.map(([c1, c2, name]) => (
            <div key={name}
                 onClick={() => update({ accentExpense: c1, accentEarning: c2 })}
                 style={{
                   padding: 8, border: `1px solid ${state.accentExpense === c1 ? T.ink : T.rule}`,
                   borderRadius: 2, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                <div style={{ width: 16, height: 16, background: c1 }}/>
                <div style={{ width: 16, height: 16, background: c2 }}/>
              </div>
              <span style={{ fontSize: 12 }}>{name}</span>
            </div>
          ))}
        </div>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
        <span>Show canvas grid</span>
        <input type="checkbox" checked={state.showGrid}
               onChange={e => update({ showGrid: e.target.checked })}/>
      </label>

      <div style={{ fontSize: 10, color: T.muted, marginTop: 10, lineHeight: 1.5 }}>
        Reload the page after changing accents to re-render all color-derived chips.
      </div>
    </div>
  );
}

window.useTweaks = useTweaks;
window.TweaksPanel = TweaksPanel;
