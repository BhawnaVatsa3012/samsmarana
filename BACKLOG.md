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
| Bug 17 | ✅ Fixed | Vidvan/Sadhaka payments were completely broken in production — `api/razorpay.js` and `api/waitlist.js` read the Supabase service key from `process.env.SUPABASE_SERVICE_ROLE_KEY`, which doesn't exist (every other API file uses `SUPABASE_SERVICE_KEY`). This crashed `createClient()` at module load, so `create-order`, `webhook`, `upgrade-tier`, and the waitlist endpoint all returned `500 FUNCTION_INVOCATION_FAILED` on every call. Found during end-to-end payment testing (no purchase had actually been click-tested since launch). Fixed by correcting the env var name in both files to match the rest of the codebase. Verified via a real test-mode Vidvan purchase completing successfully post-fix. |
| Bug 18 | ✅ Fixed | Back button (goBack()) caused navigation to cycle between two pages instead of reaching Home. Root cause: nav() unconditionally pushed the page being left onto navHistory on every call, including calls originating from goBack() itself, corrupting the history stack after a few navigations. Fixed by adding a skipHistory parameter to nav() (default false) and having goBack() pass true, so returning via Back no longer re-pushes history. |

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
| — | ✅ Done | Vidvan tier launch — real Razorpay payment flow live at ₹499/month · ₹3,999/year. Tier is derived server-side from the Razorpay order's notes (set at order-creation time) rather than trusted from the client or hardcoded, closing a bug where every successful payment — regardless of tier or plan — was setting tier: 'sadhaka'. Buy box now visible to all Sadhaka users, not just the admin account. |
| — | ⬜ Pending | Razorpay live keys (switch from test to production) |
| — | ⬜ Pending | Google Play Store via Capacitor |

---

## 🎨 UI Improvement Backlog

### Toggles & Settings
| # | Status | Item |
|---|--------|------|
| UI-T1 | ✅ Done | Notifications moved to account dropdown as an ON/OFF toggle, "Daily shloka reminder · 8 AM" — reuses existing /api/subscribe subscribe/unsubscribe actions, no new endpoint |
| UI-T2 | ✅ Done | Audio autoplay toggle, relabeled "Auto-play next verse" (Aug 2026) after the move to static per-verse audio — now controls verse-to-verse advance during Full Recitation only. Per-line tap-to-play was removed since audio is one file per verse, not per line. |
| UI-T3 | ✅ Done | Stotrams meanings toggle — "Show/Hide Meanings" button per verse, so users can read Sanskrit first and reveal meaning deliberately. Preference stored in `localStorage` (`show_meanings`), defaults to shown, persists across verse navigation. Toggling preserves scroll position via a `preserveScroll` flag on `renderStotraDetail()` rather than jumping back to the top. Also fixed while in the area: the "Next →" button no longer renders at all on a stotram's last verse, and symmetrically "← Prev" no longer renders on the first verse (both previously stayed visible but disabled). For single-verse stotrams (e.g. Maha Mrityunjaya Mantra) this leaves just the bare "1 / 1" counter with no buttons — shipped as-is rather than hiding the whole nav row. |
| UI-T4 | ❌ Killed | Transliteration toggle — decided against. Target audience already knows the shlokas by ear/script from childhood; the gap is meaning, not pronunciation (that's what UI-T3 solves). Per-verse audio recitation already serves anyone who can't read Devanagari better than a Roman transliteration would. Also would have required authoring new transliteration data from scratch (doesn't exist for stotram verses today), with real risk of subtly wrong pronunciation guidance. |

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
| UI-G1 | ✅ Done | Parchment treatment on Guru Ji's message bubbles — layered gradient background, gold left-edge accent, faint "ॐ" watermark, and a fade-up entrance animation on every reply. Pure CSS on `.msg.ai`, applies to both the JS-generated messages and the hardcoded greeting bubble. |
| UI-G2 | ✅ Done | "Today's Teaching" card on the Ask Guru Ji page — surfaces one of six existing grammar insights (reused verbatim from the Sandhi/Samas/Karaka/Script pages) automatically on page load, no prompt needed. Rotates daily using the same day-of-year modulo pattern as Shloka of the Day, via `TEACHINGS` array and `renderTodaysTeaching()`. |
| UI-G3 | ✅ Done | 🙏 "This helped" button added next to the existing ⚑ Flag button on every Guru Ji response. Local UI-only click response mirroring Flag's behavior — no backend persistence yet for either signal. |

### Progress Page
| # | Status | Item |
|---|--------|------|
| UI-P1 | ✅ Done | Sanskrit milestone labels replace the English Bronze/Silver/Gold badge wording — आरम्भक (0), अभ्यासी (10), तपस्वी (30), आचार्य (50). Thresholds and internal badge keys unchanged; साधक/विद्वान् deliberately avoided since those are paid subscription tier names. |
| UI-P2 | ✅ Done | Daily streak counter — "7 days of practice" displayed next to score |
| UI-P3 | ✅ Done | Learning Log renamed to "शिक्षण पत्र — My Learning Record" and wrapped in `.card`, matching the Score/Badge and Daily Quiz cards above it instead of reading visually flat. |

### Onboarding
| # | Status | Item |
|---|--------|------|
| UI-O1 | ✅ Done | First-launch 3-card swipe: (1) What is Samsmarana (2) How tiers work (3) Start here — Today's Shloka. Auto-shows once (localStorage), replayable via "How Samsmarana Works" in account dropdown. |

### Small High-Impact Polish
| # | Status | Item |
|---|--------|------|
| UI-X1 | ✅ Done | Pull-to-refresh on Home and Community — a lightweight touch-driven indicator bar (no dependencies) that arms only when window.scrollY is 0, so it doesn't interfere with normal scrolling. Re-runs renderContinueCard()/renderCommunityTeaser() on Home and loadReflections() on Community via enablePullToRefresh(). Needs a real-device test to confirm the pull thresholds feel right — not yet verified beyond code review. |
| UI-X2 | ✅ Done | Bookmarks empty state now reads "Save a shloka that speaks to you today 🙏" with a 🌸 icon (matching the warm tone already used elsewhere in the app), replacing the generic 🔖 + "No saved shlokas yet" copy. |
| UI-X3 | ✅ Done | Long-press (~550ms) on any Sanskrit line — Shloka of the Day, Shloka Cards, stotram verse lines — copies the text via a shared `.copyable-sanskrit` class and one document-level event-delegated handler, with a toast confirmation. Falls back to execCommand('copy') when navigator.clipboard is unavailable/rejects. Needs a real iPhone test — iOS Safari can restrict clipboard writes triggered from setTimeout rather than a direct tap; not yet verified on-device. |
| UI-X4 | ✅ Done | Visible ← Back link at top of sub-pages (Stotra detail, Profile, Bookmarks) for users unfamiliar with gesture navigation |
