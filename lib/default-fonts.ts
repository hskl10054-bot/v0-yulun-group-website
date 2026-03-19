// Shared default font styles for CMS — used by both admin and frontend
// Ensures font size/family settings are consistent across backend and frontend

export interface FontStyle {
  fontSize?: string
  fontFamily?: string
}

// ─── Content field fonts: page -> section -> key -> FontStyle ─────
export const DEFAULT_CONTENT_FONTS: Record<string, Record<string, Record<string, FontStyle>>> = {
  home: {
    hero: {
      subtitle: { fontSize: "0.875rem" },
      title: {},
      slogan: {},
    },
    contact: {
      address: { fontSize: "1.05rem", fontFamily: "'Cormorant Garamond', serif" },
      phone: { fontSize: "1.05rem", fontFamily: "'Cormorant Garamond', serif" },
      email: { fontSize: "1.05rem", fontFamily: "'Cormorant Garamond', serif" },
      hours: { fontSize: "1.05rem", fontFamily: "'Cormorant Garamond', serif" },
    },
  },
  design: {
    hero: {
      en_subtitle: { fontSize: "1.275rem" },
      title: { fontFamily: "'Cormorant Garamond', serif" },
      title_italic: { fontFamily: "'Cormorant Garamond', serif" },
      description: { fontSize: "0.88rem", fontFamily: "'Noto Serif TC', serif" },
    },
    about: {
      quote: { fontSize: "2rem", fontFamily: "'Cormorant Garamond', serif" },
      description: { fontSize: "0.88rem", fontFamily: "'Noto Serif TC', serif" },
    },
    contact: {
      address: { fontSize: "1.05rem", fontFamily: "'Cormorant Garamond', serif" },
      phone: { fontSize: "1.05rem", fontFamily: "'Cormorant Garamond', serif" },
      email: { fontSize: "1.05rem", fontFamily: "'Cormorant Garamond', serif" },
      hours: { fontSize: "1.05rem", fontFamily: "'Cormorant Garamond', serif" },
    },
  },
  construction: {
    hero: {
      en_subtitle: { fontSize: "0.65rem" },
      title: { fontFamily: "'Cormorant Garamond', serif" },
      title_line2: { fontFamily: "'Cormorant Garamond', serif" },
      title_line3: {},
      description: { fontSize: "0.88rem", fontFamily: "'Noto Serif TC', serif" },
    },
    contact: {
      address: { fontSize: "1.05rem", fontFamily: "'Cormorant Garamond', serif" },
      phone: { fontSize: "1.05rem", fontFamily: "'Cormorant Garamond', serif" },
      email: { fontSize: "1.05rem", fontFamily: "'Cormorant Garamond', serif" },
      hours: { fontSize: "1.05rem", fontFamily: "'Cormorant Garamond', serif" },
    },
  },
  cafe: {
    hero: {
      en_subtitle: { fontSize: "0.65rem" },
      title: { fontFamily: "'Cormorant Garamond', serif" },
      title_italic: { fontFamily: "'Cormorant Garamond', serif" },
      description: { fontSize: "0.88rem", fontFamily: "'Noto Serif TC', serif" },
    },
  },
}

// ─── List item field fonts: page -> sectionKey -> field -> FontStyle ─
// These apply to ALL items in a section (regardless of sort_order)
export const DEFAULT_LIST_FONTS: Record<string, Record<string, Record<string, FontStyle>>> = {
  home: {
    brand_cards: {
      title: {},
      subtitle: { fontSize: "0.75rem" },
      description: { fontSize: "0.875rem" },
    },
    strengths: {
      title: { fontSize: "1.25rem" },
      description: { fontSize: "0.875rem" },
    },
    portfolio: {
      title: { fontSize: "1.125rem", fontFamily: "'Cormorant Garamond', serif" },
      subtitle: {},
    },
    testimonials: {
      title: { fontSize: "0.75rem" },
      subtitle: { fontSize: "0.75rem" },
      description: { fontSize: "1rem", fontFamily: "'Cormorant Garamond', serif" },
    },
  },
  design: {
    services: {
      subtitle: { fontSize: "2.49rem", fontFamily: "'Cormorant Garamond', serif" },
      title: { fontSize: "1.4rem", fontFamily: "'Cormorant Garamond', serif" },
      description: { fontSize: "0.82rem", fontFamily: "'Noto Serif TC', serif" },
    },
    portfolio: {
      title: { fontSize: "1.3rem", fontFamily: "'Cormorant Garamond', serif" },
    },
    testimonials: {
      title: { fontSize: "0.7rem" },
      subtitle: { fontSize: "0.65rem" },
      description: { fontSize: "1rem", fontFamily: "'Cormorant Garamond', serif" },
    },
  },
  construction: {
    strengths: {
      title: { fontSize: "1.4rem", fontFamily: "'Cormorant Garamond', serif" },
      description: { fontSize: "0.82rem", fontFamily: "'Noto Serif TC', serif" },
    },
    services: {
      subtitle: { fontSize: "0.75rem", fontFamily: "'Cormorant Garamond', serif" },
      title: { fontSize: "1.4rem", fontFamily: "'Cormorant Garamond', serif" },
      description: { fontSize: "0.82rem", fontFamily: "'Noto Serif TC', serif" },
    },
    portfolio: {
      title: { fontSize: "1.3rem", fontFamily: "'Cormorant Garamond', serif" },
      subtitle: {},
    },
    testimonials: {
      title: { fontSize: "0.7rem" },
      subtitle: { fontSize: "0.65rem" },
      description: { fontSize: "1rem", fontFamily: "'Cormorant Garamond', serif" },
    },
  },
  cafe: {
    features: {
      title: { fontSize: "1.4rem", fontFamily: "'Cormorant Garamond', serif" },
      description: { fontSize: "0.82rem", fontFamily: "'Noto Serif TC', serif" },
    },
    stores: {
      title: { fontSize: "1.4rem", fontFamily: "'Cormorant Garamond', serif" },
      description: { fontSize: "0.82rem", fontFamily: "'Noto Serif TC', serif" },
    },
  },
}

// ─── Helpers to look up defaults ──────────────────────────────────

/** Get default font style for a content field */
export function getDefaultContentFont(page: string, section: string, key: string): FontStyle {
  return DEFAULT_CONTENT_FONTS[page]?.[section]?.[key] || {}
}

/** Get default font style for a list item field (same for all items in the section) */
export function getDefaultListFont(page: string, sectionKey: string, field: string): FontStyle {
  return DEFAULT_LIST_FONTS[page]?.[sectionKey]?.[field] || {}
}
