// Inline stroke icons for the 空房子室內設計 (kfz) 合作流程 page.
import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  home: (<><path d="M3 11l9-7 9 7" /><path d="M5 10v9h14v-9" /></>),
  store: (<><path d="M4 9l1-4h14l1 4" /><path d="M4 9h16" /><path d="M5 9v10h14V9" /><path d="M9 19v-5h6v5" /></>),
  reno: (<><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v5h-5" /></>),
  build: (<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M22 12h-3M5 12H2M19 19l-2-2M7 7L5 5M19 5l-2 2M7 17l-2 2" /></>),
  sofa: (<><path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" /><path d="M3 11a2 2 0 0 1 2 2v3h14v-3a2 2 0 0 1 2-2" /><path d="M6 19v1M18 19v1" /></>),
  plan: (<><rect x="3" y="4" width="18" height="16" rx="1" /><path d="M3 9h18M9 4v16" /></>),
  star: (<><path d="M12 3.5l2.5 5.3 5.8.7-4.3 4 1.1 5.7L12 16.6 6.9 19.2 8 13.5 3.7 9.5l5.8-.7z" /></>),
  album: (<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 16l5-5 4 4 3-3 6 6" /><circle cx="8.5" cy="9" r="1.5" /></>),
  list: (<><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1.2" /><circle cx="4.5" cy="12" r="1.2" /><circle cx="4.5" cy="18" r="1.2" /></>),
  team: (<><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 5.5a3 3 0 0 1 0 5" /><path d="M20.5 19a5.5 5.5 0 0 0-4.2-5.3" /></>),
  shield: (<><path d="M12 3l7 3v5c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6z" /><path d="M9 12l2 2 4-4" /></>),
  camera: (<><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.5" /><path d="M8 7l1.5-2.5h5L16 7" /></>),
};

export function KfzIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}
