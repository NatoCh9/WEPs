# PRD — KnowWEPs (Working Title)
### A corporate awareness page for the UN Women's Empowerment Principles

| | |
|---|---|
| **Status** | Draft — core decisions confirmed (see §0), remaining items in §12 |
| **Author** | Compiled by Claude from project files, 2026-07-18 |
| **Related files** | [`WEPs-Awareness-Site-Plan.md`](WEPs-Awareness-Site-Plan.md) (design plan), [`compass_artifact_wf-7d6c0e69...md`](compass_artifact_wf-7d6c0e69-6ce1-58eb-a702-30734223765e_text_markdown.md) (8-site competitive teardown), [`index.html`](index.html) (built v1), [`quiz-ad.html`](quiz-ad.html) (built v1) |

---

## 0. Confirmed Decisions

| Decision | Answer | Implication |
|---|---|---|
| **Ownership** | Built on behalf of a nonprofit/other organization (not personal, not an employer) | Org name/identity is still TBD (see §12) — footer attribution and any legal/brand review requirements depend on which org. Do not publish externally until the org is identified and, if needed, has signed off on referencing UN Women/WEPs branding. |
| **Hosting** | GitHub Pages | Requires the project to live in a git repo (currently this folder is **not** a git repo). Static-only hosting — confirms the no-backend architecture in §9 is the right fit; newsletter capture will still need a separate third-party service since GitHub Pages can't run server code. |
| **Primary success metric** | Quiz engagement (completion rate + scores), not click-through conversion | Analytics priority should be quiz funnel events (start → each question answered → completion → result tier), not just outbound CTA clicks. Tool choice (GA4/Plausible/etc.) still open — see §12. |

## 1. Problem Statement

The UN Women's Empowerment Principles (WEPs) — a free, CEO-signed framework for advancing gender
equality at work, created by UN Women with the UN Global Compact — has ~12,000 corporate signatories
globally. That sounds like a lot until you consider there are an estimated 300+ million companies
worldwide; awareness of WEPs among business decision-makers who *could* sign is low, and the official
[weps.org](https://www.weps.org/) site is built for people who already know what WEPs is (a resource
hub), not for converting someone who has never heard of it.

There is no dedicated top-of-funnel awareness asset whose only job is: explain WEPs in under two
minutes, make the business case, and generate the specific action of "employee forwards this to their
CEO, CEO signs."

## 2. Goal

Move business audiences from *unaware* → *understands WEPs* → *takes an action that leads toward their
company signing the official WEPs CEO Statement of Support.*

This project does **not** replace weps.org, does not collect signatures itself, and does not claim to
be an official UN Women property. It is an independent feeder/awareness layer that funnels warm traffic
to the official signing process.

## 3. Target Audience

- **Primary:** Any employee, manager, or founder at a company (any size, any industry, any region) who
  is in a position to influence or directly make the decision to sign — from startup founders to
  corporate sustainability/ESG/HR leads to individual employees who'd advocate upward.
- **Secondary (traffic driver):** General social-media audience interested in workplace gender-equality
  content, reached via the standalone quiz as a paid/organic social asset — not all of whom are
  decision-makers, but who may share or forward to someone who is.
- No geographic or sector narrowing (confirmed decision — see plan §2).

## 4. Success Metrics

**Confirmed primary metric: quiz engagement** — completion rate and score distribution across both the
on-site quiz (`index.html`) and the standalone ad variant (`quiz-ad.html`). This is a reach/awareness
metric, not a conversion metric — appropriate for this stage, where the goal is proving people will
engage with WEPs content at all before optimizing how hard the page pushes toward a sign-up.

Secondary metrics, tracked but not primary while quiz engagement is the focus:
1. Quiz → CEO-invite / share click-through rate (does the quiz actually drive the next action, or just entertain?)
2. Clicks on "Sign the CEO Statement" / "Invite your CEO" (proxy for real conversion — happens off-site
   on weps.org and is not currently trackable by us end-to-end, see §9)
3. Qualitative: any self-reported "we signed because of this page" — would require a way to ask (e.g. a
   post-signup survey), which does not currently exist

*(Newsletter signups dropped as a candidate metric — that section was removed from the page, see §5.)*

**Implementation status:** GA4 (`gtag.js`) is now wired into both pages with custom events on the full
quiz funnel (`quiz_start`, `quiz_answer`, `quiz_complete` with score/tier) and every outbound CTA
(`cta_click`). Still needs a real GA4 Measurement ID from you — currently ships with a placeholder
(`G-XXXXXXX`) that records nothing.

## 5. Scope

### In scope (built in v1)
- Single-page awareness site (`index.html`): hero, trust bar + signatory wall, business-case cards,
  7 Principles, interactive quiz, signatory proof section, FAQ, resource links, final CTA, footer with
  UN Women Ambassadors attribution/disclaimer
- Standalone short-form quiz (`quiz-ad.html`) built for paid social ad placements
- All primary CTAs link out to official `weps.org` pages (join flow, CEO Statement of Support)

### Explicitly out of scope (v1)
- Collecting or processing actual WEPs signatures — this always happens on weps.org
- User accounts / login
- Multi-language support (English only, matching "global/no specific focus" decision)
- CMS or non-technical content editing — content is hardcoded in HTML
- Newsletter/email capture of any kind — considered and deliberately dropped (see §12)
- Paid ad campaign setup/management (the *asset* is built; running ads is a separate workstream)

## 6. Functional Requirements

| # | Feature | Requirement | Status |
|---|---|---|---|
| F1 | Hero | Blended emotional + stat headline, dual CTA (soft primary / hard secondary) | ✅ Built |
| F2 | Trust bar | UN Women/UN Global Compact attribution + signatory count + text-based logo wall | ✅ Built |
| F3 | Business case | 4 benefit cards (talent, performance, trust, ESG) | ✅ Built |
| F4 | 7 Principles | Full text of all 7 Principles, plain-language one-liners | ✅ Built |
| F5 | Quiz (on-site) | 8 multiple-choice questions, instant feedback, score-gated 3-tier result, CEO-invite (mailto) + share actions | ✅ Built |
| F6 | Quiz (ad variant) | Standalone 5-question mobile-first version, same scoring/CTA logic, self-contained page | ✅ Built |
| F7 | Proof/signatories | Real signatory names only, no fabricated quotes, link to full directory | ✅ Built (see §8 sourcing caveat) |
| F8 | FAQ | Answers the 5 most likely CEO objections (who signs, cost, publicity, commitment, what's next) | ✅ Built |
| F9 | Resources | Outbound links to official WEPs tools (Gap Analysis Tool, CEO Statement, resource library) | ✅ Built, all 3 URLs verified live |
| F10 | Final CTA | Repeats core ask, links to CEO Statement | ✅ Built |
| F11 | Footer | UN Women Ambassadors attribution + non-official-signing-platform disclaimer | ✅ Built |
| F12 | Analytics | Track quiz funnel (start/answer/complete) and all outbound CTA clicks via GA4 | ✅ Built, ⚠️ needs a real Measurement ID (see §12) |

## 7. Non-Functional Requirements

- **Performance:** Single self-contained HTML file per page, no build step, no heavy JS framework —
  should load fast on mobile by construction. No formal performance budget set yet.
- **Responsive/mobile-first:** Required — most traffic (social/LinkedIn referral, paid ad) will be
  mobile. Built with CSS Grid/Flexbox breakpoints; not yet tested on real devices (see §11).
- **Accessibility:** No formal WCAG target set (§12) — a best-effort pass has been applied (skip-to-
  content link, `aria-live="polite"` on quiz feedback, `role="progressbar"`/`aria-label` on the quiz
  progress bar, semantic `<details>` for FAQ, real `<button>` elements for quiz interactions), but this
  has not been run through a formal accessibility audit or screen-reader testing.
- **Browser support:** Not yet specified. Built with standard modern JS (`fetch`-free, vanilla ES5/ES6,
  `navigator.share` with a clipboard fallback) — should work on all evergreen browsers; not tested on
  older browsers.
- **Privacy/data handling:** With the newsletter removed, the page collects no first-party user data
  directly. GA4 (once a real Measurement ID is added) will collect standard analytics/behavioral data —
  worth a privacy-notice line if/when that's wired up, since it's third-party data collection even
  without a form.

## 8. Content Requirements & Sourcing Rules

Established and followed during v1 build, should stay binding for any future content changes:

- **No fabricated quotes or testimonials.** Signatory examples use only real, publicly-listed company
  names (Accor, Global Business Travel Association, [24]7.ai — all confirmed present on weps.org's
  homepage at time of research) with factual, non-quoted context. No invented statements have been
  attributed to any real company.
- **All statistics sourced from official WEPs/UN Global Compact material**, with the caveat flagged
  in-page where sources disagree (WEPs' own site cites "12,000+ companies, 160+ countries"; UN Global
  Compact separately cites "3,400+ CEO-level signatories" — both figures are shown with attribution
  rather than silently picking one).
- **All 7 Principles text is drawn faithfully from official WEPs/UN Global Compact wording**, not
  paraphrased into vagueness.
- **Non-affiliation is stated explicitly** in the footer — this project is not UN Women and must never
  imply otherwise in headline or body copy.
- **Quiz questions and answers are sourced only from verified facts already used elsewhere on the page**
  (the 7 Principles, CEO Statement eligibility rules, signatory counts) — nothing was invented for the
  sake of having more questions.

## 9. Technical Architecture (current state)

- **Stack:** Static HTML + inline CSS + vanilla JS. No framework, no build tooling, no package.json.
- **Hosting:** Confirmed as **GitHub Pages**. Not yet deployed — this folder is not currently a git
  repository, so the remaining steps are: init a git repo, create a GitHub repo (public — GitHub Pages
  on the free tier requires the repo be public, or a paid plan for private-repo Pages), push, then enable
  Pages in repo settings. Not done yet — will do once the org/repo ownership question in §12 is resolved,
  since pushing to a public GitHub repo is a visible, external action worth confirming placement for.
- **Backend:** None. This is a purely static site. The two features that conceptually need a backend
  (newsletter capture, any first-party analytics/conversion tracking) are currently either non-functional
  (newsletter) or absent (analytics).
- **Conversion tracking limitation:** Because the actual WEPs sign-up happens entirely on weps.org, this
  project has no way to know if a click-through ever resulted in a real signature, unless weps.org
  supports UTM-parameter attribution or a referral code — worth investigating but not confirmed.

## 10. Design Requirements

Derived from the 8-site competitive teardown (see plan §5–7 for full detail):
- Professional/restrained palette (navy + coral accent in current build), explicitly avoiding
  stereotyped "pink/feminine" gender-cause visual tropes, to read as corporate-credible to a skeptical
  CEO audience
- Bold typography for stats and headers (Manrope for display, Inter for body, in current build)
- CTA verb discipline: soft discovery verbs for cold-traffic sections, hard commitment verbs reserved
  for warmed-up moments (full table in plan §5)
- No stock photography currently used — text/typography-led design; open question whether real
  photography should be added (see §12)

## 11. Testing & Verification Status

- ✅ JS syntax validated (`node --check`) on both pages
- ✅ Every JS `getElementById` reference confirmed to match a real HTML element ID
- ✅ HTML tag balance checked (div/section open-close counts match)
- ✅ Both pages confirmed to serve correctly over local HTTP (200 response)
- ❌ **Not yet done:** actual visual/interactive browser testing (no headless-browser tool was available
  in the build environment) — recommend manually clicking through the full quiz flow, the newsletter
  form, and all outbound links in a real browser before this is considered launch-ready
- ❌ **Not yet done:** cross-device/cross-browser testing, accessibility audit, real-device mobile testing

## 12. Open Questions — Need Your Input

Seven resolved (§0, plus four more below). Remaining, grouped by how much they block next steps:

**Resolved since the last revision:**
- ✅ **Organization**: UN Women Ambassadors. Footer updated to attribute the page to them; a brand/legal
  review against the Ambassadors program's own guidelines (if any exist) is still recommended before the
  repo goes public, since that hasn't been independently checked.
- ✅ **GitHub repo placement**: personal GitHub account, public repo.
- ✅ **Newsletter backend**: shipping without one — the section has been fully removed from `index.html`
  (markup, CSS, and JS handler) rather than left non-functional.
- ✅ **Resource link verification**: both `weps.org/resources` and `weps.org/companies` confirmed live and
  functional (resource library with 39 pages of filterable content; signatory directory listing 12,878
  companies as of the check).
- ✅ **Analytics tool**: Google Analytics (GA4). `gtag.js` is wired into both pages with a placeholder
  Measurement ID (`G-XXXXXXX`) and custom event tracking on the full quiz funnel (`quiz_start`,
  `quiz_answer`, `quiz_complete` with score/tier, and `cta_click` on every outbound CTA) — matches the
  confirmed quiz-engagement priority metric. **Still needed:** a real Measurement ID from a GA4 property
  you create at analytics.google.com; nothing is currently being recorded.
- ✅ **Accessibility**: still no formal WCAG target set, but a best-effort pass has been applied — skip-to-
  content link, `aria-live="polite"` on quiz feedback, `role="progressbar"`/`aria-label` on the quiz
  progress bar.

**Still blocking full launch:**
1. **GitHub repo creation + push** — needs you to create an empty public repo on github.com and share the
   name/URL (or confirm installing `gh` CLI instead) before this can actually be deployed.
2. **GA4 Measurement ID** — swap the `G-XXXXXXX` placeholder in both files for a real one.

**Important but not launch-blocking:**
3. **Real quotes/case studies** — still open from the original plan: pursue permission to use real
   signatory quotes, or keep the current "real names, no invented quotes" approach?
4. **Branding** — "KnowWEPs" is a placeholder name; want something different (possibly reflecting the
   UN Women Ambassadors identity), and is there an existing logo/color preference, or should one be designed?
5. **Photography** — add real workplace photography (per the 8-site teardown, this is near-universal
   among the researched sites), or stay with the current typography-led, photo-free design?

**Lower priority — nice to know, not urgent:**
6. **Paid ad plan/budget** — is `quiz-ad.html` actually going to run as a paid campaign, and if so on
   which platform(s) — affects whether it needs platform-specific sizing/tracking?
11. **Timeline** — any target launch date driving prioritization of the items above?

## Appendix: Research Summary

Full detail lives in the two source files, summarized here for PRD completeness:

- **[`WEPs-Awareness-Site-Plan.md`](WEPs-Awareness-Site-Plan.md)** — the working design plan: site
  structure rationale, section-by-section content direction, CTA verb-discipline rule, feature checklist
  against the competitive teardown, visual direction.
- **[`compass_artifact_wf-7d6c0e69...md`](compass_artifact_wf-7d6c0e69-6ce1-58eb-a702-30734223765e_text_markdown.md)** —
  hero-section and copywriting teardown of 8 comparable sites (HeForShe, WEPs itself, Catalyst, Vital
  Voices, Cherie Blair Foundation, Lean In Circles for Companies, 30% Club, International Women's Day),
  with verbatim headline/CTA/stat extraction and cross-site pattern analysis. Key finding applied
  throughout: the most effective corporate-engagement pages for this exact audience "blend" emotional/
  movement language with hard ROI proof points (Catalyst, Lean In), rather than committing fully to
  either the purely emotional or purely corporate pole.
