# Samsmarana — Backlog

## 🐛 Bug Backlog

| # | Status | Bug |
|---|--------|-----|
| Bug 1 | ✅ Fixed | Sign-in shows no error on wrong password |
| Bug 1b | ✅ Fixed | Password reset — Gmail bot consuming link; switched to 6-digit OTP flow |
| Bug 2 | ✅ Closed | Jigyasu read-only community — verified and closed |
| Bug 3 | ✅ Closed | Guru Ji disclaimer sitting beside Ask button instead of below it |
| Bug 4 | ✅ Closed | Community reflections card design |
| Bug 5 | ✅ Closed | New user profile shows cached values on first load |
| Bug 6 | ✅ Closed | Sign-out buried three levels deep |
| Bug 7 | ✅ Fixed | Sign-up page unreachable — malformed HTML |
| Bug 8 | ✅ Fixed | Remove `console.log('[TAB DEBUG]...')` from nav() |
| Bug 9 | ✅ Fixed | `playStoraLine()` now hits `/api/tts` correctly |

---

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
| B7 | ✅ Done | Expanded Shabd/Dhatu Roop (gated by tier) |
| B8 | ⬜ Deprioritized | Referral mechanism — Jigyasu earns 40% off Sadhaka, Sadhaka earns 30% off Vidvan; non-stackable, applied server-side via Razorpay. Deferred until post-launch once signup→paid conversion data exists. Also blocked by Vercel Hobby 12/12 function limit — would need to be merged into razorpay.js rather than its own endpoint. |
| B9 | ✅ Done | Bottom tab bar navigation (5 Devanagari-labelled tabs) |
| B9.1 | ✅ Done | Active tab highlighting fix (background colour, not just text) |
| B10 | ✅ Done | Stotrams — all 5 stotrams fully migrated to per-line EN/HI object format (Shiv Tandav 68 lines, Rudrashtakam 32, Shiva Panchakshara 20, Mahishasura Mardini 62 + refrain, Maha Mrityunjaya 4). Live in production. |
| — | ⬜ Pending | Vidvan tier launch |
| — | ⬜ Pending | Razorpay live keys (switch from test to production) |
| — | ⬜ Pending | Google Play Store via Capacitor |

---

## 🎨 UI Improvement Backlog

### Toggles & Settings
| # | Status | Item |
|---|--------|------|
| UI-T1 | ⬜ Pending | Notifications toggle — move to account dropdown as a prominent ON/OFF with label "Daily shloka reminder · 8 AM" |
| UI-T2 | ⬜ Pending | Audio autoplay toggle — let users disable audio autoplay by default (for office/commute use) |
| UI-T3 | ⬜ Pending | Stotrams meanings toggle — "Show meanings" per verse, so users can read Sanskrit first and reveal meaning deliberately |
| UI-T4 | ⬜ Pending | Transliteration toggle — show/hide Roman script on stotram and shloka content for users not yet fluent in Devanagari |

### Home Screen
| # | Status | Item |
|---|--------|------|
| UI-H1 | ⬜ Pending | Reorder home: Shloka of the Day (full-width hero) → Today's Practice card (quiz status) → Continue where you left off → Community highlight teaser |
| UI-H2 | ⬜ Pending | "Continue where you left off" card — surface last visited section (e.g. Shiv Tandav Verse 3, Shabd Roop) |
| UI-H3 | ⬜ Pending | Community highlight on home — one reflection, read-only teaser for Jigyasu users to encourage upgrade |

### Stotrams Experience
| # | Status | Item |
|---|--------|------|
| UI-S1 | ⬜ Pending | Full-screen recitation mode — when audio plays, dim UI and highlight the active Sanskrit line as audio progresses (Vidvan tier) |
| UI-S2 | ✅ Done | Font size control — A / A+ toggle on Sanskrit text for accessibility (especially Devanagari at small sizes) |

### Guru Ji
| # | Status | Item |
|---|--------|------|
| UI-G1 | ⬜ Pending | Parchment/cream background on Guru Ji's message bubbles (planned in visual refresh) |
| UI-G2 | ⬜ Pending | "Today's teaching" card in Guru Ji — one daily grammar insight surfaced passively, no prompt needed |
| UI-G3 | ⬜ Pending | Add 🙏 "This helped" response rating alongside the existing Flag button |

### Progress Page
| # | Status | Item |
|---|--------|------|
| UI-P1 | ⬜ Pending | Replace numeric score display with Sanskrit milestone labels at each level (e.g. अभ्यासी at 10, साधक at 30) |
| UI-P2 | ⬜ Pending — NEXT UP | Daily streak counter — "7 days of practice" displayed next to score |
| UI-P3 | ⬜ Pending | Rename Learning Log to "शिक्षण पत्र — My Learning Record" and give it more prominence on the page |

### Onboarding
| # | Status | Item |
|---|--------|------|
| UI-O1 | ⬜ Pending | First-launch 3-card swipe: (1) What is Samsmarana (2) How tiers work (3) Start here — Today's Shloka |

### Small High-Impact Polish
| # | Status | Item |
|---|--------|------|
| UI-X1 | ⬜ Pending | Pull-to-refresh on Community and Home pages |
| UI-X2 | ⬜ Pending | Warm empty state for Bookmarks — "Save a shloka that speaks to you today 🙏" instead of generic icon |
| UI-X3 | ⬜ Pending | Long-press to copy Sanskrit text on any shloka/stotra line |
| UI-X4 | ✅ Done | Visible ← Back link at top of sub-pages (Stotra detail, Profile, Bookmarks) for users unfamiliar with gesture navigation |
