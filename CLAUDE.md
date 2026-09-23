# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static one-page marketing site for Toa Tech LLC (Full-Stack Development, Cloud Computing, n8n automation), deployed to GitHub Pages on a custom domain. `README.md` is the full build brief: read it before writing code. It has the section-by-section content spec (§5), the accessibility requirements (§6), and the "First Task" checklist. This file summarizes the rules that apply to every change.

## Commands

The site has no build step, package manager, or test runner. To preview it:

```bash
python3 -m http.server 8000
```

The page must also work when `index.html` is opened directly via `file://`, so check that too.

Before calling work done, run the verification in README §6.6: a keyboard-only pass (including the mobile menu at 375px), an automated scan (axe, Lighthouse, or `pa11y`), a contrast check of every token pair, reflow at 400% zoom / 320px, HTML validation with zero errors, and a VoiceOver check of headings and landmarks. A Lighthouse score alone does not count as passing.

## Hard constraints

- Hand-written HTML and CSS. Use vanilla JS only for progressive enhancement (mobile nav toggle, footer year). The page must be fully usable with JS disabled.
- No frameworks, Tailwind, Bootstrap, bundler, `package.json`, CDN scripts, analytics, or web fonts. Use a system font stack. Icons are inline SVG or local files in `assets/`.
- Use relative paths only, never a leading `/`, so the site works from `file://` and from a subpath.
- Mobile-first, from 320px to 1440px+, with no horizontal scroll.
- Do not add a GitHub Actions workflow. Pages serves the default branch root, and `.nojekyll` sits at the root.
- `CNAME` holds a placeholder (`toatech.com`) until the owner confirms the domain. `sitemap.xml`, `robots.txt`, the canonical URL, and the OG tags must use the same domain.

## Architecture

```
index.html
assets/css/tokens.css   # every design value lives here as a custom property
assets/css/reset.css
assets/css/main.css     # layout + components; loaded last
assets/js/main.js       # progressive enhancement only
assets/img/             # logo, favicon, og-image
CNAME, robots.txt, sitemap.xml, .nojekyll   # deployment files at the root
```

Page sections, in order: header → hero → services (three equal cards) → approach → about → contact → footer. The footer also holds a short accessibility statement (README §6.7). The `<head>` needs a title, meta description, canonical URL, Open Graph and Twitter tags, a favicon, and JSON-LD `ProfessionalService` data with the business name and email. Keep total page weight under 500KB.

The design is clean, light B2B (README §4): a content width of about 1100px, a paragraph measure of about 65ch, hairline borders and soft shadows, and no gradients or glow. The owner's logo overrides README §4 on color. The palette comes from the logo: navy (`--color-accent`) on light sections, near-black ink (`--color-ink`) for the header and footer, and chrome silver for text and buttons on ink. Accessibility still overrides the brand: navy on ink is 1.47:1, so dark areas redefine `--color-focus` to the silver `--color-focus-inverse` and use `.button--inverse`.

Logo assets live in `assets/img/`. `logo-full.jpg` (circle plus wordmark) is the preferred form. The owner wants the circle mark alone (`logo-mark.png`, favicons) used only where space requires it. The full logo has a white background and relies on `mix-blend-mode: multiply`, so place it only on light surfaces. The mark is an ellipse about 6% wider than tall because the source art is. Keep that proportion.

- `main.css` has no hard-coded hex values or magic pixel numbers. It references tokens only.
- `tokens.css` records the measured contrast ratio of each foreground/background pair in a comment. Update those comments whenever a color changes.
- Class naming is BEM-ish (`.card`, `.card__title`, `.card--featured`). Style by class, not by element position or deep descendant selectors.
- Header and footer markup stay self-contained and commented, so they can be copied into future pages (`services.html`, `about.html`).
- Build order when starting from scratch: tokens → reset → HTML structure → main.css → JS → meta/SEO → deployment files.

## Accessibility (WCAG 2.1 AA, required)

When a design choice conflicts with accessibility, accessibility wins. Rules that are easy to miss:

- Visible `:focus-visible` outline on every interactive element: at least 2px, at least 3:1 contrast. Anchor targets get `scroll-margin-top` so the sticky header does not cover them.
- The skip link is the first focusable element. The mobile menu toggle is a real `<button>` with `aria-expanded` kept in sync and `aria-controls` set.
- Exactly one `<h1>`, no skipped heading levels, and each `<section>` has `aria-labelledby` pointing to its heading.
- Decorative SVGs get `aria-hidden="true" focusable="false"`.
- Links in body copy are underlined.
- Links make sense out of context. When a short label is needed, extend it with `.visually-hidden` text.
- Sizes are in `rem`. Text must survive the WCAG text-spacing overrides without clipping.
- All motion is disabled under `prefers-reduced-motion: reduce`.
- The `mailto:toatechllc@gmail.com` CTA says it opens an email client, and the address also appears as copyable text. There is no contact form.
- Targets are at least 24×24 CSS px. Aim for 44×44 on the mobile menu button and the primary CTA.
- Reading order in the DOM matches the visual order. Do not reorder content with CSS `order` or absolute positioning.
- Never add an accessibility overlay or toolbar, and never add an "ADA compliant" or "WCAG certified" badge. The accessibility statement says conformance is ongoing, not certified, and gives `toatechllc@gmail.com` as the address for reporting a barrier.

## Content rules

- Never invent testimonials, client names, logos, metrics, certifications, or years in business. Leave out any unknown fact instead of using a placeholder, and list the omissions in your summary.
- Write in plain language and expand acronyms on first use, including a one-clause explanation of what n8n is.
- Ask before stating business facts, pricing, or claims.
- Service scope, as the owner stated it. Cloud work supports the apps and automations Toa Tech builds. It covers recommending AWS resources, Azure data pipelines, and Terraform. Do not offer cost cutting, cost or pricing reviews, or audits of existing cloud environments, and do not mention pricing anywhere.
- The site speaks in the first person ("I").

## Working agreement

- If anything in the brief is ambiguous, show a plan before writing files.
- Commit in logical chunks. Do not push unless asked. The directory is not yet a git repo, so run `git init` before the first commit.
- After each meaningful chunk, state in a line or two what changed and what is next.
