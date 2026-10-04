import type { Config } from 'tailwindcss'

// Theme tokens live in the `@theme` block of src/index.css (Tailwind v4).
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
} satisfies Config
