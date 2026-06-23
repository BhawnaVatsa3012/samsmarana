# Samsmarana (संस्मरण) — Product Backlog
**Source of truth. Update this file after every chat session.**
Last updated: Chat 25

---

## Legend
- ✅ Complete & tested
- 🔄 Deployed but unverified
- 🚧 In progress
- ⬜ Not started
- 🐛 Bug

---

## Core Infrastructure

| Status | Item | Notes |
|--------|------|-------|
| ✅ | PWA + Install Banner | Live |
| ✅ | Supabase auth (sign-up, sign-in, sign-out) | Live |
| ✅ | Tier system: Jigyasu (free) → Sadhaka (paid) → Vidvan (coming soon) | Live |
| ✅ | Razorpay payments — test mode | Working; webhook bypass via `action=upgrade-tier` |
| ✅ | Admin panel | Gated to vatsa.bhawna@gmail.com |
| ✅ | Vidvan waitlist | Live |
| ⬜ | Razorpay → live keys | Switch when ready to go live |
| ⬜ | Google Play Store via Capacitor | Future |

---

## Shipped Features

| Status | Code | Feature | Score | Notes |
|--------|------|---------|-------|-------|
| ✅ | — | Shloka Cards + Canvas share | — | Live |
| ✅ | — | Community reflections (Sadhaka+) | — | Live |
| ✅ | B1 | Daily Quiz — Home page | — | Live |
| ✅ | B2 | My Progress + Quiz history | — | Live |
| ✅ | B4 | Bookmark / Save Shlokas | — | Complete |
| ✅ | B5 | Pronunciation Audio (ElevenLabs voice clone) | — | Complete; ambient audio layered |
| ✅ | B6a | Guru Ji Personalisation | — | Complete |
| ✅ | P1 | Ask Guru Ji on Shloka Cards | 0.95 | Complete; buttons on home + shloka cards page |
| ✅ | P2 | Web Push Notifications — daily shloka at 8am IST | 0.95 | Tested on Safari Mac + iPhone |
| 🔄 | P3 | Read-only Community feed for Jigyasu users | 0.92 | Deployed; **unverified** — test after Bug 1 fix |

---

## Feature Backlog (not started)

| Code | Feature | Score | Priority | Notes |
|------|---------|-------|----------|-------|
| P4 | Guru Ji accuracy disclaimer | 0.88 | 🟢 High | Currently beside Ask button — see Bug 3 below |
| P5 | Vidvan ship date commitment | 0.85 | 🟢 High | Risk item |
| P6 | Referral mechanic — invite to unlock | 0.80 | 🟢 High | Growth |
| B6b | Adaptive quiz + onboarding assessment | 0.80 | 🟢 High | Existing flow improvement |
| P7 | PWA home screen icon + logo mark | 0.75 | 🟡 Med | All tiers |
| P8 | Shloka depth — expanded life context | 0.72 | 🟡 Med | All tiers |
| B7 | Expanded Shabd Roop + Dhatu Roop | 0.70 | 🟡 Med | **Held** — incorporate expert panel suggestions first |
| P9 | One-tap daily quiz from home screen | 0.68 | 🟡 Med | All tiers |
| P10 | Sidebar width reduction 290→260px | 0.60 | 🟡 Med | All tiers |
| P11 | Sandhi + Samasa recognition module | 0.55 | 🟡 Med | Sadhaka+ only |
| P12 | Audio — option without ambient music | 0.50 | 🟡 Med | All tiers |
| P13 | Architecture modular refactor plan | 0.45 | ⚪ Low/Parked | Risk — single index.html getting large |


## ✨ Feature Backlog

| # | Status | Feature |
|---|--------|---------|
| P1 | ✅ Done | Ask Guru Ji on Shloka Cards |
| P2 | ✅ Done | Web Push Notifications |
| P3 | ✅ Done | Read-only community for Jigyasu users |
| B1 | ✅ Done | Daily Shloka Quiz |
| B2 | ✅ Done | My Progress / daily quiz tracking |
| B4 | ✅ Done | Bookmark / Save Shlokas |
| B5 | ✅ Done | Pronunciation Audio |
| B6a | ✅ Done | Guru Ji personalisation |
| B7 | ⬜ Pending | Expanded Shabd/Dhatu Roop (gated by tier) |
| — | ⬜ Pending | Vidvan tier launch |
| — | ⬜ Pending | Razorpay live keys |
| — | ⬜ Pending | Google Play Store via Capacitor |

---

## Bug Backlog (current sprint)

| # | Status | Bug | Notes |
|---|--------|-----|-------|
| Bug 1 | ⬜ | Sign-in shows no error on wrong password | **Do first** — breaks trust on first use |
| Bug 2 | ⬜ | P3 Jigyasu read-only community — verify working | Unverified due to wrong-password incident during testing |
| Bug 3 | ⬜ | Guru Ji accuracy disclaimer sits beside Ask button | Should be at page bottom |
| Bug 4 | ⬜ | Community reflections card design — too informal | Need more structured, formal card layout |
| Bug 5 | ⬜ | New user profile shows cached values on first load | Should be empty/blank on first load |
| Bug 6 | ⬜ | Sign-out is three levels deep | Embed sign-out icon directly in topbar pill or profile panel |


| Bug 1 | ✅ Fixed | Sign-in shows no error on wrong password |
| Bug 1b | ✅ Fixed | Password reset — Gmail bot consuming link; switched to 6-digit OTP flow |
| Bug 2 | 🔄 Unverified | Jigyasu read-only community — needs fresh Jigyasu test account to verify |
| Bug 3 | ⬜ Open | Guru Ji disclaimer sitting beside Ask button instead of below it |
| Bug 4 | ⬜ Open | Community reflections need more formal card design |
| Bug 5 | ⬜ Open | New user profile shows cached values on first load |
| Bug 6 | ⬜ Open | Sign-out buried three levels deep — surface in topbar/profile panel |
| Bug 7 | ✅ Fixed | Sign-up page unreachable — "No account?" span was malformed HTML |

---

## Critical Coding Rules — Never Break These

- **Never replace `index.html` wholesale** — always use github.dev find-and-replace with unique search strings
- **Always fetch live code via `Vercel:web_fetch_vercel_url` before any edits** — deployed state may differ from GitHub
- **Sanskrit element ID is `sc-text`** — never `sc-sanskrit`; there is no `sc-translit` element — never reference it
- **All API files must use CommonJS** (`require`/`module.exports`) — never ES module syntax (`import`/`export`)
- **Supabase client must be instantiated inside the handler function** — not at module level
- **Server-side Supabase writes require `SUPABASE_SERVICE_KEY`** (service role) — anon key is blocked by RLS
- **`_supabase` is not initialised in the frontend** — never reference it in client-side JS
- **Duplicate JS function definitions are a recurring risk** — always search for function name before and after any addition; last definition wins in JavaScript
- **`setTimeout(100ms)`** is required when `nav()` is called before writing to DOM elements — page must render first
- **Canvas fonts must be generic families only** (`serif`, `sans-serif`) — Google Fonts unavailable in canvas on mobile
- **Supabase PostgREST joins silently return empty arrays** when FK doesn't directly link two tables — use two sequential fetches instead
- **Gmail corrupts HTML files** with non-breaking spaces (`\xa0`) — never send `index.html` via Gmail
- **After any Supabase metadata change**, user must sign out and back in
- **`wrapTextCanvas()`** returns a Y position value — distinct from old `wrapText()`
- **`sendMsg()` order:** `fetchUserProfile` → `_guruName` → `_guroBio` → `_enrichedText` → `chatHistory.push`

---

## Key Technical References

| Item | Value |
|------|-------|
| Live URL | https://samsmarana.vercel.app |
| GitHub | https://github.com/BhawnaVatsa3012/samsmarana |
| Vercel projectId | `prj_qKiVCb9FkL6sAKFdwJA8HODHb0NP` |
| Vercel teamId | `team_dFd9OFvcTlCnk6UZmf8TTcQK` |
| Supabase project ID | `wcvjdbmigjgocgwforsr` |
| Raw GitHub API path | `https://raw.githubusercontent.com/BhawnaVatsa3012/samsmarana/main/api/[filename].js` |
| Stack | Single `index.html`, Vercel serverless (CommonJS), Supabase, Gemini AI, Razorpay, ElevenLabs |
| Tier labels | Jigyasu (J, free) → Sadhaka (S, paid) → Vidvan (V, coming soon) |
| Admin email | vatsa.bhawna@gmail.com |
