// Mock data for the designs — a plausible month for a young professional in Bogotá

const categories = [
  { id: 'food',    label: 'Food & drink',    kind: 'expense', glyph: '◔' },
  { id: 'trans',   label: 'Transport',       kind: 'expense', glyph: '◑' },
  { id: 'rent',    label: 'Rent & utilities',kind: 'expense', glyph: '◐' },
  { id: 'subs',    label: 'Subscriptions',   kind: 'expense', glyph: '◓' },
  { id: 'leisure', label: 'Leisure',         kind: 'expense', glyph: '◒' },
  { id: 'health',  label: 'Health',          kind: 'expense', glyph: '◕' },
  { id: 'salary',  label: 'Salary',          kind: 'earning', glyph: '●' },
  { id: 'freel',   label: 'Freelance',       kind: 'earning', glyph: '◉' },
  { id: 'gifts',   label: 'Gifts',           kind: 'earning', glyph: '○' },
];

const catMap = Object.fromEntries(categories.map(c => [c.id, c]));

const tx = [
  // Latest-first
  { id: 1,  type:'out', cat:'food',    title:'Azahar Coffee',           note:'Oat latte · Chapinero',     amount: 18500,  date:'Today · 09:12',    src:'manual' },
  { id: 2,  type:'in',  cat:'freel',   title:'Monarca Studio',          note:'Invoice #044 — Brand work', amount: 2800000,date:'Today · 08:40',    src:'ai' },
  { id: 3,  type:'out', cat:'trans',   title:'Uber',                    note:'Zona G → Usaquén',          amount: 22400,  date:'Yesterday · 19:33',src:'manual' },
  { id: 4,  type:'out', cat:'leisure', title:'Cine Colombia',           note:'Saturday · 2 tickets',      amount: 46000,  date:'Apr 14',           src:'manual' },
  { id: 5,  type:'out', cat:'subs',    title:'Spotify Premium',         note:'Monthly',                   amount: 18900,  date:'Apr 13',           src:'auto' },
  { id: 6,  type:'out', cat:'food',    title:'Éxito supermarket',       note:'Weekly groceries',          amount: 184320, date:'Apr 12',           src:'ai' },
  { id: 7,  type:'in',  cat:'salary',  title:'Monthly salary',          note:'Mercado Libre',             amount: 6200000,date:'Apr 10',           src:'auto' },
  { id: 8,  type:'out', cat:'rent',    title:'Rent — Apt 702',          note:'April',                     amount: 1950000,date:'Apr 01',           src:'auto' },
  { id: 9,  type:'out', cat:'subs',    title:'Netflix',                 note:'Standard plan',             amount: 38900,  date:'Mar 28',           src:'auto' },
  { id: 10, type:'out', cat:'health',  title:'Farmatodo',               note:'Pharmacy',                  amount: 62100,  date:'Mar 26',           src:'manual' },
  { id: 11, type:'in',  cat:'gifts',   title:'Birthday — Mamá',         note:'Transfer',                  amount: 300000, date:'Mar 22',           src:'manual' },
  { id: 12, type:'out', cat:'food',    title:'Mercado del Río',         note:'Lunch with Ana',            amount: 74500,  date:'Mar 21',           src:'ai' },
];

// Totals for this month
const totals = {
  earned: tx.filter(t=>t.type==='in').reduce((s,t)=>s+t.amount, 0),
  spent:  tx.filter(t=>t.type==='out').reduce((s,t)=>s+t.amount, 0),
};
totals.balance = totals.earned - totals.spent;

// Category breakdown (expense only) for the donut + list
const breakdown = (() => {
  const byCat = {};
  tx.filter(t=>t.type==='out').forEach(t => { byCat[t.cat] = (byCat[t.cat]||0) + t.amount; });
  const rows = Object.entries(byCat)
    .map(([id,v]) => ({ id, label: catMap[id].label, amount: v, pct: v/totals.spent }))
    .sort((a,b) => b.amount - a.amount);
  return rows;
})();

// 30-day spark — daily net (mock)
const spark = [
  120, 80, 160, 40, 200, 90, 60,
  30, 220, 180, 70, 50, 110, 260,
  90, 40, 180, 150, 70, 30, 200,
  100, 60, 240, 140, 80, 50, 190, 120, 70
];

window.D = { categories, catMap, tx, totals, breakdown, spark };
