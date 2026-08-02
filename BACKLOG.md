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
| Bug 10 | ✅ Fixed | (UI-O1) Onboarding intro cards were not swipeable — added touchstart/touchend swipe navigation, kept the Next/Skip buttons working |
| Bug 11 | ✅ Fixed | Shabd Roop / Dhatu Roop rendered empty despite API/DB having correct data — `loadGrammarData()` was only ever called from the login/session-restore path, never wired to `nav('shabdroop'/'dhaturoop')`, so anonymous/free users (and any pre-session-restore visit) never populated `window._shabdData`/`_dhatuData`, and `showShabd`/`showDhatu` silently bailed out |
| Bug 12 | ✅ Fixed | Stotram audio not playing — originally traced to a stale `/api/tts` URL after `api/tts.js` was consolidated into `api/grammar.js`. That URL fix shipped but was superseded before ElevenLabs was ever properly configured. Aug 2026: dropped ElevenLabs TTS entirely for stotrams — `playStoraLine()`/`playStotraLineByIndex()` removed, replaced with static per-verse MP3 recordings (Bhawna's own voice) served from Supabase Storage bucket `stotram-audio`, all 52 verses across 5 stotrams. `playVerseAudio()`/`playFullRecitation()` now just play a direct URL. ElevenLabs remains in use only for the grammar-tutor feature, unrelated to stotrams. |

| Bug 13 | ⬜ Pending | Home page (Shloka of the Day) audio button still labeled "Listen"/"Stop" — should read "Listen"/"Pause" to match the terminology now used on stotram pages. Note: `stopShlokaAudio()` also resets `currentTime` to 0, so even after the label fix it will still restart from the beginning rather than resume — decide if that restart behavior should be fixed at the same time or left as-is for the daily shloka. |
| Bug 14 | ⬜ Pending | Stotram page "Listen to Verse" / "Full Recitation" buttons say "Stop" / "Stop Recitation" while paused — should say "Pause" / "Pause Recitation" instead, since the behavior already resumes rather than restarts. Label-only fix in `updateVerseAudioBtn()` and `updateRecitationBtn()`. |
| Bug 15 | ⬜ Pending | Pausing audio on one verse, then navigating to a different verse via the stotrams list, "Continue where you left off", or a bookmark, and pressing Listen can resume the old paused verse instead of starting the new one. Root cause: `openStotra()` and `resumeStotra()` don't clear `_stotraAudio`/`_recitationActive` the way `stotraNavVerse()` does. Full Recitation pause also leaves its internal wait-loop unresolved rather than actually stopped, risking a second overlapping loop on resume. Needs both entry points patched to mirror `stotraNavVerse()`'s reset, and the recitation pause path needs to explicitly release its pending wait instead of leaving it dangling. |

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
| UI-T1 | ✅ Done | Notifications moved to account dropdown as an ON/OFF toggle, "Daily shloka reminder · 8 AM" — reuses existing /api/subscribe subscribe/unsubscribe actions, no new endpoint |
| UI-T2 | ✅ Done | Audio autoplay toggle, relabeled "Auto-play next verse" (Aug 2026) after the move to static per-verse audio — now controls verse-to-verse advance during Full Recitation only. Per-line tap-to-play was removed since audio is one file per verse, not per line. |
| UI-T3 | ⬜ Pending | Stotrams meanings toggle — "Show meanings" per verse, so users can read Sanskrit first and reveal meaning deliberately |
| UI-T4 | ⬜ Pending | Transliteration toggle — show/hide Roman script on stotram and shloka content for users not yet fluent in Devanagari |

### Home Screen
| # | Status | Item |
|---|--------|------|
| UI-H1 | ✅ Done | Reordered home: hero shloka → today's practice → continue where you left off → community teaser slot (UI-H3 content pending separately) |
| UI-H2 | ✅ Done | "Continue where you left off" card added — reads last_visited from localStorage, written from stotra/shabd/dhatu nav functions, hidden if no history yet |
| UI-H3 | ✅ Done | Community highlight teaser added to home for Jigyasu users only — pulls one reflection from GET /api/community (no new endpoint), read-only, links to upgrade flow |

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
| UI-P2 | ✅ Done | Daily streak counter — "7 days of practice" displayed next to score |
| UI-P3 | ⬜ Pending | Rename Learning Log to "शिक्षण पत्र — My Learning Record" and give it more prominence on the page |

### Onboarding
| # | Status | Item |
|---|--------|------|
| UI-O1 | ✅ Done | First-launch 3-card swipe: (1) What is Samsmarana (2) How tiers work (3) Start here — Today's Shloka. Auto-shows once (localStorage), replayable via "How Samsmarana Works" in account dropdown. |

### Small High-Impact Polish
| # | Status | Item |
|---|--------|------|
| UI-X1 | ⬜ Pending | Pull-to-refresh on Community and Home pages |
| UI-X2 | ⬜ Pending | Warm empty state for Bookmarks — "Save a shloka that speaks to you today 🙏" instead of generic icon |
| UI-X3 | ⬜ Pending | Long-press to copy Sanskrit text on any shloka/stotra line |
| UI-X4 | ✅ Done | Visible ← Back link at top of sub-pages (Stotra detail, Profile, Bookmarks) for users unfamiliar with gesture navigation |
