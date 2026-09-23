# Toa Tech LLC — Website

Static marketing site for **Toa Tech LLC**, an independent consultancy offering
Full-Stack Development, Cloud Computing, and n8n automation services.

This README is also the **starting brief for Claude Code**. Read it in full before
writing any code, then follow "First Task" at the bottom.

---

## 1. Goal

Ship a fast, accessible, professional one-page marketing site that:

- Explains clearly what Toa Tech LLC does and who it does it for.
- Makes the three service lines easy to scan and understand.
- Gets a qualified visitor to email `toatechllc@gmail.com` within one screen of scrolling.
- Deploys to GitHub Pages on a custom domain with zero build step.
- **Is usable by everyone** — WCAG 2.1 Level AA is a requirement of this build, not a
  later cleanup pass. See §6.

The audience is small-to-midsize business owners, startup founders, and engineering
managers evaluating an outside consultant. They are smart but not necessarily technical.
Copy should be plain, confident, and specific — no buzzword soup.

---

## 2. Hard Constraints

- **Hand-written HTML + CSS only.** No React, no Tailwind, no Bootstrap, no build
  step, no bundler, no package.json.
- **Vanilla JavaScript only, and only if genuinely needed** (e.g. mobile nav toggle,
  smooth scroll, current year in footer). The site must be fully readable and usable
  with JS disabled.
- **No external runtime dependencies.** No CDN scripts, no analytics, no font CDN
  unless explicitly approved — prefer a system font stack. Any image or icon is
  either an inline SVG or a local file in `assets/`.
- **Everything must work when opened directly as a file** (`file://`) and when served
  from a subpath. Use relative paths throughout — never a leading `/`.
- **Mobile-first.** Must look correct from 320px up to 1440px+ with no horizontal scroll.

---

## 3. Structure

Build a single page now, but organize the code so more pages can be added later
without a rewrite.

```
/
├── index.html
├── assets/
│   ├── css/
│   │   ├── reset.css        # normalize + box-sizing + base element resets
│   │   ├── tokens.css       # CSS custom properties: color, type scale, spacing, radii
│   │   └── main.css         # layout + components, imported last
│   ├── js/
│   │   └── main.js          # progressive enhancement only
│   └── img/
│       └── (logo, favicon, og-image)
├── CNAME                    # custom domain (see §7)
├── robots.txt
├── sitemap.xml
├── .nojekyll               # stops GitHub Pages from running Jekyll
└── README.md
```

Rules that keep it extensible:

- All design decisions live as custom properties in `tokens.css`. No hard-coded hex
  values or magic pixel numbers inside `main.css`.
- Style components by class, never by element position or deep descendant chains.
- Keep the header and footer markup self-contained and clearly commented so they can
  be lifted into `services.html` / `about.html` later.
- One CSS class naming convention throughout (BEM-ish: `.card`, `.card__title`,
  `.card--featured`). Pick it, use it everywhere.

---

## 4. Design Direction

**Clean, light, professional B2B.** Think a well-run consulting firm, not a startup
landing page generator.

- Light background (near-white, not pure `#fff` for large surfaces), dark neutral text
  with real contrast (body text ≥ 4.5:1, ideally closer to 12:1).
- One blue accent color used deliberately — links, primary button, section eyebrows,
  the odd rule or icon. Not everywhere.
- Generous whitespace. Section padding should feel roomy on desktop and still breathe
  on mobile.
- A constrained content width (~1100px) centered, with a narrower measure (~65ch) for
  paragraphs so text stays readable.
- Type: system font stack. A clear scale — big confident h1, distinctly smaller h2,
  body around 17–18px with ~1.6 line-height.
- Subtle depth only: hairline borders and very soft shadows. No gradients on text,
  no glow, no heavy drop shadows, no animated background.
- Motion is minimal and respects `prefers-reduced-motion`.

---

## 5. Page Content

Write real, specific copy — not lorem ipsum, not placeholder brackets. If a fact is
unknown (years in business, client names, metrics), leave it out entirely rather than
inventing it or leaving a `[TODO]` visible to visitors. Flag anything you deliberately
omitted in your summary at the end.

Sections, in order:

1. **Header** — wordmark "Toa Tech LLC", anchor nav (Services · Approach · About ·
   Contact), and a "Get in touch" button. Collapses to a working mobile menu.

2. **Hero** — one sentence on what Toa Tech does and for whom, one short supporting
   paragraph, and a primary CTA (`mailto:toatechllc@gmail.com`). No stock photo.

3. **Services** — three cards, equal weight:
   - **Full-Stack Development** — web apps, APIs, integrations; from prototype to
     production.
   - **Cloud Computing** — architecture, deployment, cost and reliability work on
     modern cloud infrastructure.
   - **n8n Automation** — workflow automation that connects the tools a business
     already uses and removes manual steps.

   Each card: title, 2–3 sentence description, and 3–4 concrete bullet outcomes.
   Inline SVG icon per card (simple, single-stroke, matching weight).

4. **Approach** — 3 or 4 short points on how engagements actually run (scoping,
   communication cadence, handoff and documentation, no lock-in). This is the
   trust-building section; keep it grounded and non-salesy.

5. **About** — a short paragraph on Toa Tech LLC as an independent consultancy and
   what kind of work it takes on. Honest and brief.

6. **Contact** — heading, one line of copy, a large `mailto:toatechllc@gmail.com`
   button, and the email shown as readable text too. **No form** — this site is fully
   static and posts nowhere.

7. **Footer** — wordmark, email link, and "© <current year> Toa Tech LLC. All rights
   reserved." Year rendered server-free (hard-code it, or set it in `main.js` with the
   correct year already in the HTML as fallback).

---

## 6. Accessibility — ADA / WCAG 2.1 AA

**This is a first-class requirement, not a checklist at the end.** Toa Tech LLC is a
US business, so the site targets **WCAG 2.1 Level AA** conformance, which is the
standard the DOJ has codified for public entities and the benchmark US courts apply
to private businesses under ADA Title III. Meet every AA success criterion that
applies to a static marketing page. Where WCAG 2.2 AA adds a criterion that costs
nothing to satisfy (target size, focus not obscured, consistent help), satisfy it too.

If a design choice and an accessibility requirement conflict, **accessibility wins** —
change the design.

### 6.1 Perceivable

- Every meaningful image has descriptive `alt`; every decorative image or icon has
  `alt=""` or `aria-hidden="true"` and is removed from the accessibility tree.
- Inline SVG icons: `aria-hidden="true"` + `focusable="false"` when decorative; a
  `<title>` element and `role="img"` when meaningful.
- **Contrast**: body and small text ≥ 4.5:1; large text (≥24px, or ≥19px bold) ≥ 3:1;
  UI component boundaries, focus indicators, icons and chart strokes ≥ 3:1. Verify the
  computed values against the actual token colors — do not eyeball it. Record the ratio
  for each foreground/background pair as a comment in `tokens.css`.
- Never use color alone to convey meaning. Links inside body copy are underlined, not
  just recolored.
- Text resizes to 200% without loss of content or function, and reflows at 320px width
  (equivalent to 400% zoom at 1280px) with no horizontal scrolling. Size type and
  spacing in `rem`, never fixed `px` heights on text containers.
- Respect user text-spacing overrides: no clipping when line-height is set to 1.5×,
  letter-spacing to 0.12em, word-spacing to 0.16em, paragraph spacing to 2em.
- `<html lang="en">` is set.

### 6.2 Operable

- Everything reachable and usable by keyboard alone, in a logical order, with no
  keyboard traps. Test: Tab through the entire page, open and close the mobile menu,
  activate every link and button, without touching the mouse.
- **Visible focus indicator on every interactive element** — a clearly visible outline
  with ≥ 3:1 contrast against its background and at least 2px thick. Use
  `:focus-visible`. Never `outline: none` without an equally visible replacement.
- Skip-to-content link as the first focusable element; visually hidden until focused,
  then clearly visible.
- Focus is never obscured by the sticky header — add `scroll-margin-top` to anchor
  targets so headings don't land under it.
- Interactive targets are at least 24×24 CSS px (aim for 44×44 for the mobile menu
  button and primary CTA), with adequate spacing between adjacent targets.
- No content flashes more than three times per second. Any animation or transition is
  disabled under `@media (prefers-reduced-motion: reduce)`.
- No time limits, no auto-advancing content, no auto-playing media.

### 6.3 Understandable

- Link text makes sense out of context. No bare "click here", "read more", or
  "learn more" — or, if the visual design needs a short label, extend it with visually
  hidden text (`<span class="visually-hidden">about our cloud services</span>`).
- The `mailto:` CTA states plainly that it opens an email client, and the address is
  also shown as selectable text so it can be copied by anyone whose device has no mail
  client configured.
- Navigation, wording, and component behavior stay consistent across the page (and
  across future pages).
- Headings and labels describe their content. Reading order in the DOM matches the
  visual order — never reorder content with CSS `order` or absolute positioning in a
  way that breaks it.
- Plain language: short sentences, expand any acronym on first use (including "n8n" —
  explain what it is in one clause).

### 6.4 Robust

- Valid HTML: no duplicate `id`s, properly nested elements, no invalid ARIA.
- **Use native elements first.** A button is `<button>`, a link is `<a href>`. Reach
  for ARIA only when no native element does the job — a wrong ARIA role is worse than
  none.
- The mobile menu toggle is a real `<button>` with `aria-expanded` kept accurately in
  sync and `aria-controls` pointing at the menu's `id`.
- Landmarks: one `<header>`, one `<main id="main">`, one `<footer>`, `<nav>` with an
  `aria-label` if there is ever more than one.
- Exactly one `<h1>`; heading levels descend without skipping; every `<section>` has an
  accessible name (via `aria-labelledby` pointing at its heading).
- **With JavaScript disabled the page must remain fully readable and navigable** — the
  nav links must still work. Progressive enhancement only.

### 6.5 Do Not

- Do **not** add an accessibility overlay, widget, or "accessibility toolbar"
  (accessiBe, UserWay, AudioEye and similar). They do not create legal compliance,
  are opposed by the accessibility community, and are themselves frequently named in
  ADA lawsuits. Build it accessibly instead.
- Do not add an "ADA Compliant" or "WCAG Certified" badge. Conformance is not certified
  by a badge, and the claim itself creates legal exposure.

### 6.6 Verification (required before "done")

Run all of these and report the results:

1. Keyboard-only pass over the whole page, including the mobile menu at 375px width.
2. Automated scan — `axe` DevTools, Lighthouse accessibility audit, or `pa11y`. Fix
   everything it reports; note anything dismissed and why.
3. Contrast check on every token pair, with the computed ratios reported.
4. Zoom to 400% at 1280px and confirm reflow with no horizontal scrolling.
5. HTML validation with zero errors.
6. Screen reader spot-check of the heading outline and landmark structure (VoiceOver
   on macOS: Cmd+F5, then rotor with Ctrl+Opt+U).

Automated tools catch roughly a third of real issues — items 1, 4 and 6 are where the
actual problems surface. Do not report the page as accessible on a Lighthouse score
alone.

### 6.7 Accessibility Statement

Add a short accessibility statement in the footer area (or a small `accessibility.html`
if it runs long) that: states the WCAG 2.1 AA target, says conformance is ongoing
rather than certified, and gives `toatechllc@gmail.com` as the contact for reporting a
barrier with a commitment to respond. Keep it honest — do not claim full conformance.

---

## 7. Quality Bar

Beyond §6, non-negotiable before you call it done:

- **Semantics** — one `<h1>`; `<header>`, `<main>`, `<section>`, `<footer>`; heading
  levels never skip; nav is a `<nav>` with a list.
- **SEO / sharing** — `<title>`, meta description, canonical URL, Open Graph and
  Twitter card tags, favicon, and JSON-LD `ProfessionalService` structured data with
  the business name and email.
- **Performance** — no render-blocking third parties, images sized and lazy-loaded
  below the fold, total page weight comfortably under 500KB.
- **Code quality** — HTML validates, CSS has no unused rules, indentation is
  consistent, and comments mark each major section.

---

## 8. Deployment — GitHub Pages + Custom Domain

- Repo is public and served from the **root of the default branch** (`/` not `/docs`).
- `.nojekyll` at the root so files and folders starting with `_` are served as-is.
- `CNAME` at the root containing exactly `toatechllc.com` on a single line — no
  protocol, no trailing slash, no `www`. This domain is confirmed; do not substitute
  a placeholder.
- `sitemap.xml` and `robots.txt` reference the custom domain, not the
  `*.github.io` URL.
- Do **not** add a GitHub Actions workflow — plain Pages serving from the branch is
  enough and has nothing to break.

DNS is managed at **Cloudflare** (registrar and nameservers). For reference — not
something to automate:

- Apex `toatechllc.com`: four `A` records to the GitHub Pages IPs (`185.199.108.153`,
  `.109.153`, `.110.153`, `.111.153`), or a `CNAME` using Cloudflare's CNAME flattening.
- `www`: `CNAME` to `<github-user>.github.io`.
- Set those records to **DNS only (grey cloud)** while GitHub provisions its
  certificate — proxying (orange cloud) blocks the Let's Encrypt validation and is the
  usual cause of a stuck "certificate pending" state. Proxying can be re-enabled after
  the certificate issues, with Cloudflare SSL/TLS mode set to **Full (strict)**.
- Then tick "Enforce HTTPS" in the repo's Pages settings.

Subdomains are expected later for other services, so keep the apex records and any
future subdomain records independent — don't wildcard.

---

## 9. Working Agreement

- Build in order (accessibility considered at each step, never retrofitted):
  `tokens.css` → `reset.css` → `index.html` structure → `main.css`
  → progressive-enhancement JS → meta/SEO → deployment files.
- Show the plan before writing files if anything above is ambiguous. Ask rather
  than guess on business facts, pricing, or claims.
- Commit in logical chunks with clear messages. Don't push without being asked.
- After each meaningful chunk, state what changed and what's next in one or two lines.
- Never invent testimonials, client logos, case studies, certifications, or metrics.

---

## First Task

1. Use `toatechllc.com` as the canonical domain everywhere it appears: `CNAME`,
   `sitemap.xml`, `robots.txt`, and the canonical / Open Graph URLs.
2. Scaffold the file structure in §3.
3. Build the complete single page per §4–§7.
4. Open `index.html` and verify at 320px, 768px, and 1440px widths.
5. Run the full accessibility verification in §6.6 and fix everything it surfaces.
6. Report back: what you built, the accessibility results from §6.6 (including the
   contrast ratios), any content you left out for lack of real information, and the
   exact remaining steps to go live on GitHub Pages.
