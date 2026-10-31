# Samsmarana — Session Handover

Last updated: 1 Nov 2026. To resume, say **"continue Samsmarana"** and point Claude to this file. It lives in two places with the same content: the claude.ai project doc `claude/samsmarana-handover.md` and `HANDOVER.md` in the repo (BhawnaVatsa3012/samsmarana). The full item history is in `BACKLOG.md`; this file is the summary.

## State at handover
- Production: commit `424d57c` (Home reskin), **READY** on Vercel, live at samsmarana.vercel.app (checked 31 Oct 2026).
- Service-worker cache: **v30**. The next `index.html` change must bump it to v31.
- Vercel functions: **12/12**, the Hobby-plan limit. Any new feature must go inside an existing `api/*.js` file.
- Vercel IDs: project `prj_qKiVCb9FkL6sAKFdwJA8HODHb0NP`, team `team_dFd9OFvcTlCnk6UZmf8TTcQK`. Supabase project `wcvjdbmigjgocgwforsr`.

## Done 31 Oct 2026 — Home redesign (pilot)
- Claude Design produced the design system and two Home directions; **Option B** was picked. Spec: project doc `claude/design-handoff-spec.md`. Review of what didn't fit the code: `claude/design-handoff-review.md`. Original prompt: `claude/claude-design-prompt.md`.
- Decision: **reskin with existing data only**. No lesson counts, lesson path or week dots, because the app doesn't store lesson completion or daily history.
- Shipped in `424d57c`:
  - Design tokens added at the top of the stylesheet. New Home classes use the `ss-` prefix so they don't clash with the existing `.card` and `.pill`.
  - Home order: hero, continue card, progress (streak + badge), Shloka of the Day, quiz, Sadhaka offer, community, footer. All IDs and handlers kept.
  - The four JS-rendered Home cards were restyled by changing their HTML templates only, with no logic changes.
  - Top bar and tab bar restyled on every screen; emoji tab icons replaced with Lucide line icons.
  - Upgrade nudge copy fixed: Sadhaka unlocks Vocabulary, Shabd Roop and Karaka, plus Ask Guru Ji. The old text wrongly listed Dhatu Roop.
  - Shloka size follows the existing A+ setting (`--deva-size`).
- Checked: JS parses, no IDs lost, no horizontal scroll at 360px and 390px, all tap targets ≥ 44px, no console errors, preview reviewed by Bhawna, production READY.
- **Not yet checked:** Home while signed in on each tier. The sandbox can't log in.

## Done 17–18 Oct 2026
| Item | What changed | Commits |
|---|---|---|
| L3 | `api/auth.js` no longer logs request bodies (passwords) or full user records | `83daab9` |
| L5 | `upgrade-tier` returns 403 unless `userId` matches `order.notes.userId` | `83daab9` |
| Guru Ji privacy | Name and bio are no longer sent to Gemini. Guru Ji no longer greets users by name. | `a62390e` |
| L1 placeholders | All 11 `[[TODO]]` business details filled on Contact, Terms, Privacy and Refund | `39e59fb` |
| Gemini disclosure | The key (ending …xMm8) is on the **free tier**. The Privacy page says Google may use questions to improve its products and asks users not to share personal details. | `39e59fb` |
| L2 | **One-time plans, no auto-renewal.** A payment grants 30 days (monthly) or 365 days (yearly), stored as `tier_expires_at` in user_metadata. Paying again for the same tier extends from the current end date. Each payment ID is applied once. Expiry is enforced in `api/grammar.js` and `getTier()`. | `7f7336d` |
| L2 pages | Terms, Pricing, Refund, Shipping and Privacy reworded to "one-time payment, no auto-renewal" | `3ac2d6a` |

## Decisions made
- Payments are one-time for a fixed period, not Razorpay Subscriptions.
- Guru Ji stays on the Gemini free tier for now, and must never receive users' names, bios or other personal details.
- Later: move Guru Ji to the Claude API (paid by the app, not user keys) and make Claude-powered features paid-only. That will need a Privacy page update.
- Redesign is a reskin, not a rebuild, using only data the app already has.
- The 2 paying Sadhaka accounts from before 18 Oct have **no end date** and keep access until one is set by hand. Waiting on Bhawna to decide whether to set 30 or 365 days from their payment dates.

## Open items, in priority order
1. **Signed-in check of the new Home.** Open samsmarana.vercel.app signed out, then as Jigyasu and as Sadhaka. Expect: the streak card appears when signed in; the Sadhaka offer and community card disappear for Sadhaka and Vidvan; Listen and Ask Guru Ji behave as before.
2. **Upgrade page copy in `index.html`** (still wrong as of `424d57c`; line numbers approximate):
   - "₹299/month" and "₹499/month" (~lines 1033, 1052) and two "per month" labels (~1085, 1148). Change to "for 30 days, no auto-renewal".
   - "Questions? Write to vatsa.bhawna@gmail.com" (~line 1174). Replace with a support address. Leave the two admin email checks in the code alone.
   - The Sadhaka card lists "15 questions/day, Community access…" but not the lessons it unlocks (Vocabulary, Shabd Roop, Karaka). Match `pricing.html`.
3. **Razorpay website verification.** Submit the 7 page URLs (About, Contact, Pricing, Terms, Privacy, Refund, Shipping) under Business website detail. Bhawna submits; Claude can fill the form in Chrome for review first. Then send Terms and Privacy for legal review.
4. **Redesign, remaining screens.** Port one screen at a time with the same approach as Home: Learn, Guru Ji, Community, Progress, Upgrade. About 500 inline `style=""` colours need converting to tokens. Dark mode tokens exist but are not switched on; turn it on only after a screen's inline colours are converted.
5. **Tier-lock testing** with the test account across all tiers while logged in. This has never been fully done. It should also confirm a real purchase writes `tier_expires_at`.
6. **Razorpay live keys** (switch from test to production). Marked pending in `BACKLOG.md`; check the Razorpay dashboard. If live payments already work, mark it done.
7. **Old Sadhaka accounts:** set end dates once Bhawna decides 30 or 365 days.
8. **B11:** background mantra audio for full-screen recitation. Still needs a recording; free sources are Pixabay, Freesound, IndiaWAV, TunePocket and MikS Music.
9. **L4** (low priority): self-serve account deletion and data export. Requests go by email for now.
10. **Google Play Store** via Capacitor.
11. **B8** (deprioritised): referral discounts. Waits for conversion data, and must live inside `razorpay.js` because of the 12-function limit.

## Cleared from the old list
- "Dhatu Roop lock says Sadhaka": checked 31 Oct. The lock correctly says Vidvan; the wrong wording was in the Home upgrade nudge, fixed in `424d57c`.
- Bugs 19–20: confirmed committed and marked fixed in BACKLOG.md.
- UI-T3 (meanings toggle): already marked done in BACKLOG.md.
- UI-T4 (transliteration toggle): killed by decision; see BACKLOG.md.

## Rules to keep
- CommonJS in `api/*.js`. Never replace `index.html` wholesale. BACKLOG.md and HANDOVER.md changes go in separate commits from code.
- Bump the SW cache in both places (`sw.js` `CACHE` and `?v=` in `index.html`) with every `index.html` change.
- Before closing an item: check the raw GitHub file pinned to the commit SHA, then confirm the Vercel deployment is READY and production.
- Frontend tier locks must always be matched by a server-side check.
- The Sanskrit element ID is `sc-text`. Canvas share images use generic `serif`/`sans-serif` fonts only.
- New redesign classes use the `ss-` prefix. Don't restyle the existing `.card` or `.pill` globally; they're used 63 and 16 times across other screens.
- Big visual changes go to a branch first for a Vercel preview, then merge to main after Bhawna reviews.
