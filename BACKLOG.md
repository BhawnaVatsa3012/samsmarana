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

| Bug 13 | ✅ Fixed | Home page (Shloka of the Day) audio button was labeled "Listen"/"Stop" and always restarted from the beginning on pause. Fixed in two parts: label now reads "Listen"/"Pause"; and `stopShlokaAudio()` was split into `pauseShlokaAudio()` (pauses both the ambient and voice tracks in place, including mid-way through the initial 5s ambient-only lead-in before the voice starts) and `fullyStopShlokaAudio()` (resets position, used only after the track naturally ends). Pressing Listen again now resumes exactly where it left off instead of restarting. |
| Bug 14 | ✅ Fixed | Stotram page "Listen to Verse" / "Full Recitation" buttons said "Stop" / "Stop Recitation" while paused — relabeled to "Pause" / "Pause Recitation" in `updateVerseAudioBtn()` and `updateRecitationBtn()` to match the resume behavior that was already there. |
| Bug 15 | ✅ Fixed | Pausing audio on one verse, then navigating to a different verse via the stotrams list, "Continue where you left off", or a bookmark, and pressing Listen could resume the old paused verse instead of starting the new one. Fixed with a shared `stopAllStotraAudio()` helper — clears `_stotraAudio` and `_recitationActive`, and now also explicitly releases the recitation loop's pending wait via `_recitationResolve` instead of leaving it dangling (which could otherwise let a second overlapping recitation loop start on resume). Wired into `openStotra()`, `resumeStotra()`, and `stotraNavVerse()` so every entry point resets state consistently. |

| Bug 16 | ✅ Fixed | Shloka of the Day audio (home page) and stotram audio (stotra detail page) could overlap and play simultaneously — neither stopped when navigating away from its page, so starting one while the other was still running in the background caused audio to overlap. Fixed by hooking into `nav()`, the single function every page transition goes through: leaving the home page now calls `pauseShlokaAudio()`, and leaving the stotra detail page now calls `stopAllStotraAudio()`. Covers every navigation path (tabs, back button, bookmarks, "Continue where you left off"), not just the specific one that surfaced it. |

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
| B11 | ⬜ Pending | Full-stotram ambient/mantra audio track — one continuous audio clip (not per-verse) layered underneath the existing per-verse voice recitation during Full Recitation, similar to the ambient track behind Shloka of the Day. Recording not yet sourced. Verse advancement/highlighting will continue to be driven by the existing per-verse files, not this track, since syncing display to a position within this new track would require manually-noted timestamps once it exists. |
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
| UI-T3 | ✅ Done | Stotrams meanings toggle — "Show/Hide Meanings" button per verse, so users can read Sanskrit first and reveal meaning deliberately. Preference stored in `localStorage` (`show_meanings`), defaults to shown, persists across verse navigation. Toggling preserves scroll position via a `preserveScroll` flag on `renderStotraDetail()` rather than jumping back to the top. Also fixed while in the area: the "Next →" button no longer renders at all on a stotram's last verse (previously stayed visible but disabled). |
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
| UI-S1 | ✅ Done | Full-screen recitation mode — dims the tab bar and shows the current verse large-format against a dark background while Full Recitation plays. Pausing keeps you inside the immersive view (button switches to "Resume") rather than kicking you back to the normal page; only the explicit close (X) button or navigating away actually exits it. Highlighting is verse-level, not line-level, since audio is one file per verse with no per-line timestamps to sync against. |
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
