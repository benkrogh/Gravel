/**
 * Gravel design tokens
 *
 * Single source of truth for colors, typography, spacing, and radii.
 * CSS custom properties are defined in styles/tokens.css.
 * TypeScript exports here enable type-safe usage in components.
 */

export const colors = {
  // Brand
  brand: {
    primary: "var(--color-brand-primary)",
    primaryHover: "var(--color-brand-primary-hover)",
    secondary: "var(--color-brand-secondary)",
  },

  // CTA (marketing)
  cta: {
    default: "var(--color-cta)",
    hover: "var(--color-cta-hover)",
  },

  // Neutrals
  neutral: {
    0: "var(--color-neutral-0)",
    50: "var(--color-neutral-50)",
    100: "var(--color-neutral-100)",
    200: "var(--color-neutral-200)",
    300: "var(--color-neutral-300)",
    400: "var(--color-neutral-400)",
    500: "var(--color-neutral-500)",
    600: "var(--color-neutral-600)",
    700: "var(--color-neutral-700)",
    800: "var(--color-neutral-800)",
    900: "var(--color-neutral-900)",
    950: "var(--color-neutral-950)",
  },

  // Semantic
  background: {
    default: "var(--color-bg-default)",
    subtle: "var(--color-bg-subtle)",
    elevated: "var(--color-bg-elevated)",
  },
  text: {
    primary: "var(--color-text-primary)",
    secondary: "var(--color-text-secondary)",
    tertiary: "var(--color-text-tertiary)",
    inverse: "var(--color-text-inverse)",
  },
  border: {
    default: "var(--color-border-default)",
    strong: "var(--color-border-strong)",
  },
  status: {
    success: "var(--color-status-success)",
    warning: "var(--color-status-warning)",
    error: "var(--color-status-error)",
    info: "var(--color-status-info)",
  },
} as const;

export const typography = {
  fontFamily: {
    sans: "var(--font-dm-sans)",
    mono: "var(--font-mono)",
  },
  fontSize: {
    xs: "var(--text-xs)",
    sm: "var(--text-sm)",
    base: "var(--text-base)",
    lg: "var(--text-lg)",
    xl: "var(--text-xl)",
    "2xl": "var(--text-2xl)",
    "3xl": "var(--text-3xl)",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: "var(--leading-tight)",
    normal: "var(--leading-normal)",
    relaxed: "var(--leading-relaxed)",
  },
} as const;

export const spacing = {
  0: "var(--space-0)",
  1: "var(--space-1)",
  2: "var(--space-2)",
  3: "var(--space-3)",
  4: "var(--space-4)",
  5: "var(--space-5)",
  6: "var(--space-6)",
  8: "var(--space-8)",
  10: "var(--space-10)",
  12: "var(--space-12)",
  16: "var(--space-16)",
} as const;

export const radii = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  full: "var(--radius-full)",
} as const;

export const shadows = {
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
} as const;
