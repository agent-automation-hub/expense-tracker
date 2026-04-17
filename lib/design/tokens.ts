export const T = {
  ivory: "#F4F1EC",
  paper: "#FBF9F5",
  ink: "#141311",
  ink2: "#2B2926",
  muted: "#8A847B",
  faint: "#C8C2B6",
  rule: "#E4DFD5",
  rule2: "#EAE5DB",

  coral: "#D66A4E",
  coralSoft: "#F4D9CE",
  coralBg: "#FAEAE1",
  teal: "#3E8B85",
  tealSoft: "#C9E0DD",
  tealBg: "#E2EFEC",

  accent: "#141311",

  serif: '"Fraunces", "Times New Roman", serif',
  sans: '"Inter", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const

export const catColors: Record<string, string> = {
  rent: T.ink,
  food: T.coral,
  trans: "#E89B7D",
  subs: "#A37A63",
  leisure: "#C4A898",
  health: "#8C6B57",
  salary: T.teal,
  freel: "#5AA69F",
  gifts: "#7FB9B2",
}
