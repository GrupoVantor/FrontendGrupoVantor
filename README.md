# Grupo Vantor — Frontend

Vue 3 + Vite + TypeScript + Tailwind CSS v4 site for Grupo Vantor S.A.S.

## Stack

- **Vue 3** (`<script setup>` SFCs) + **vue-router**
- **Vite 8** with `@vitejs/plugin-vue` and `@tailwindcss/vite`
- Brand / motion styles in `src/index.css`

## Scripts

```bash
pnpm install
pnpm dev      # Vite on PORT or 8443
pnpm build
pnpm preview
```

Optional env (see `.env.example`):

- `VITE_GOOGLE_MAPS_API_KEY` — Contacto office map embed
- `VITE_CONTACT_FORM_ENDPOINT` — POST URL for the contact form (JSON). Defaults to FormSubmit AJAX for `contacto@grupovantor.co` (`https://formsubmit.co/ajax/contacto@grupovantor.co`) with no API key. Override with Formspree, Web3Forms, or a serverless function if needed. Payload includes all fields plus `autorizacionDatos` and `aceptaComercial`.
- `VITE_CONTACT_ENDPOINT` — alias of `VITE_CONTACT_FORM_ENDPOINT`
- `VITE_WEB3FORMS_ACCESS_KEY` — optional public Web3Forms access key (safe in the client). If set without an endpoint, the form posts to Web3Forms. Configure the recipient as `contacto@grupovantor.co`.

**FormSubmit one-time setup:** the first submission triggers an activation email to `contacto@grupovantor.co`. Open that inbox and confirm the link once; later inquiries are delivered automatically. Until then, the form shows a Spanish activation notice instead of success.

The contact form does not fall back to `mailto:`. On failure it shows a Spanish error (never a raw English exception). Success («¡Mensaje enviado!») is only shown after a completed POST.
