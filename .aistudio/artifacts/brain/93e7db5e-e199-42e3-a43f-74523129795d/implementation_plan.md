# NES 8-Bit Retro Philosophy Duel: Implementation Plan (Mobile-First & High Polish)

## 1. Executive Summary & Quality Standard
Build an authentic, high-polish **Super Mario Bros / NES 8-Bit arcade duel game** tailored for both **mobile touchscreens and desktop keyboards**. The experience captures vintage console nostalgia without modern web clunkiness, providing a tight, responsive 1–2 minute typing duel with professional visual feedback, screen shake, chiptune audio, and seamless mobile ergonomics.

---

## 2. Mobile-Friendly Architecture & Ergonomics

### A. Integrated Retro On-Screen Arcade Keypad (Touch-Optimized)
- **Problem on Mobile**: Opening the system's software keyboard shifts the viewport, hides canvas action, triggers unwanted zoom, and disrupts game immersion.
- **Mobile Solution**:
  - Provide a dedicated **Retro 8-Bit On-Screen Arcade Keyboard** directly beneath the duel arena on touch/mobile devices:
    - High-contrast 8-bit letter keys with $\ge 48\text{px}$ touch targets.
    - Active letter state highlight with instant haptic/sound feedback on tap.
    - Dedicated `"DEL"` / `"CLEAR"` key and animated word slot indicators.
  - **Dual-Input Compatibility**: Seamlessly listen for physical keyboard input (`keydown` events for desktop users) AND direct touch/click events on the arcade keypad simultaneously.

### B. Responsive Viewport & Dynamic Height Management
- Dynamic Viewport Sizing (`100dvh` / `h-screen`) ensuring the canvas, HUD, and keypad fit within mobile screens without vertical scroll or URL-bar jitter.
- Canvas dynamically scales using integer pixel multiples (`image-rendering: pixelated; aspect-ratio: 4/3`) to maintain crisp, distortion-free 8-bit sprites on Retina and high-DPI smartphone displays.
- Responsive portrait & landscape adaptations:
  - **Portrait (Smartphones)**: Stacked arcade cabinet layout (Top HUD $\rightarrow$ Battle Canvas $\rightarrow$ Typing Word Box $\rightarrow$ Retro Touch Keypad).
  - **Landscape & Desktop**: Side-by-side or cinematic widescreen layout with prominent center arena.

### C. Seamless Mobile Audio Context Unlock
- Mobile browsers block audio until an explicit user gesture occurs.
- The game starts with a clean retro **"TAP TO START" / "INSERT COIN"** prompt that immediately unlocks the Web Audio API context in one touch, ensuring 100% reliable chiptune playback on iOS Safari and Android Chrome.
- Unobtrusive **Mute/Unmute audio toggle** in the top corner of the HUD, persisting user preference.

---

## 3. High-Polish Game Feel & Visual Feedback ("Game Juice")

1. **Screen Shake & Impact Physics**:
   - Canvas camera jolts with 4–6px screen shake when an attack lands or when the Nemesis stabs.
   - Screen flash (white on critical slash, red on player damage).
2. **Dynamic 8-Bit Particle System**:
   - Sparks and dust bursts when swords clash.
   - Disintegration pixel dust dissolving the Nemesis upon defeat.
3. **Multi-Stage Visual & Auditory Timer Bar**:
   - An NES-style ticking timer bar above the active word:
     - **Safe Zone ($>50\%$)**: Solid arcade green with steady pulse.
     - **Warning Zone ($25\% - 50\%$)**: Bright amber with accelerated tick.
     - **Danger Zone ($<25\%$)**: Rapidly flashing red with high-pitch NES warning beeps.
4. **Health Interpolation & Damage Floaters**:
   - Smooth retro health bar depletion (white "chip damage" lag bar following immediate red drop).
   - Floating pixel damage text (`"STRIKE!"`, `"-15 HP"`, `"OUCH!"`, `"CRITICAL!"`).
5. **Progressive Pixel Reveal Effect**:
   - The player character begins as an unrevealed, dithered dark silhouette.
   - With each successful strike (+10% reveal), color saturation and pixel details unlock until the philosopher is 100% revealed upon victory.

---

## 4. Thirty-Six (36) Distinct Pixel Characters (`src/data/pixelPhilosophers.ts`)

Every one of the 36 early modern philosophers (plus easter eggs Brutus Buckeye and Martha Nussbaum) is custom-rendered with distinct pixel features accurately matching their historical portraits:

| Character | Distinctive 8-Bit Pixel Features | Historical Silhouette & Garb |
| :--- | :--- | :--- |
| **René Descartes** | Pencil mustache, dark shoulder curls, white lace collar | Black scholar doublet, holding wax candle |
| **Baruch Spinoza** | Olive skin, thick dark wavy hair, gentle gaze | Dark lens-grinder coat, glass prism accessory |
| **John Locke** | High forehead, long white curled locks, sharp nose | Green velvet coat, tab collar, quill & scroll |
| **G.W. Leibniz** | Enormous powdered periwig, sharp aristocratic gaze | Brocade waistcoat, gold buttons, pocket watch |
| **David Hume** | Plump rosy cheeks, powdered bob wig, warm smile | Scarlet frock coat, laced cravat, ledger |
| **Immanuel Kant** | Slight build, neat white wig, steel-blue eyes | Prussian blue coat, brass buttons, timepiece |
| **Thomas Hobbes** | Receding gray hairline, scholarly white mustache/beard | Black Geneva gown, thick linen collar |
| **Francis Bacon** | Pointed goatee, Elizabethan ruff collar, scholar cap | Tudor court doublet, parchment scroll |
| **Blaise Pascal** | Severe dark gaze, chin-length brown hair, pale skin | Jansenist black cassock, mechanical calculating wheel |
| **Princess Elisabeth of Bohemia** | Pearl hairnet, auburn updo, delicate lace collar | Royal sapphire velvet bodice, wax letter seal |
| **Margaret Cavendish** | Elaborate high powdered curls with plume, dark jewels | Extravagant purple duchess gown, quill in hand |
| **Anne Conway** | Silk lace cap, pale contemplative face, modest shawl | Quaker dark gown, open botanical notebook |
| **Mary Astell** | Modest linen bonnet, dark hair, determined expression | English wool jacket, treatise manuscript |
| **Émilie du Châtelet** | Powdered pompadour with ribbon, alert sparkling eyes | French floral silk gown, brass compass & star chart |
| **Laura Bassi** | Ermine-trimmed doctoral gown, laurel crown/ribbon | Bolognese academic robes, physics pendulum |
| **George Berkeley** | Clerical bishop wig, clerical white bands (collar) | Dark Anglican bishop cassock, tar-water vial |
| **Nicolas Malebranche** | Tonsure / Oratorian priest skullcap, dark curls | Black Oratorian cassock, holding open Augustine folio |
| **Pierre Bayle** | Disheveled scholar gray curls, spectacles on nose | Dark Huguenot coat, massive encyclopedia volume |
| **Thomas Reid** | Scottish powdered bob wig, plain rugged features | Broadcloth coat, common sense seal |
| **Julien Offray de La Mettrie**| Jovial French curls, smiling lips | Physician coat, mechanical brass clockwork heart |
| **Brutus Buckeye (Easter Egg)**| Round nut-shaped head, scarlet/gray striped tee | Red solo cup, backwards cap, bumbling stance |
| **Martha Nussbaum (Nemesis)** | Aristocratic bob haircut, intense philosophical stare | Modern academic blazer, legal scroll of capabilities |
| *(+ remaining 15 thinkers)* | Custom wigs, ruffs, hats, glasses, and color-matched palettes | Unique historical clothing and accessories |

---

## 5. Combat Mechanics & Pacing (1–2 Minutes)

- **Word Prompts**: Strictly short English keywords (3 to 7 letters, zero Latin terms):
  - *Descartes*: `MIND`, `DOUBT`, `THINK`, `SENSE`, `TRUTH`, `PROOF`, `CLEAR`
  - *Locke*: `SENSE`, `SLATE`, `STATE`, `RIGHT`, `IDEA`, `LIMIT`, `POWER`
  - *Hume*: `HABIT`, `CAUSE`, `DOUBT`, `TASTE`, `FORCE`, `CUSTOM`, `BELIEF`
  - *Kant*: `DUTY`, `SPACE`, `MORAL`, `REASON`, `LIMIT`, `CRITIC`, `JUDGE`
  - *Spinoza*: `ORDER`, `GOD`, `NATURE`, `AFFECT`, `FREE`, `WHOLE`, `POWER`
  - *Hobbes*: `PEACE`, `POWER`, `SWORD`, `ORDER`, `FEAR`, `PACT`, `STATE`
  - *Brutus Buckeye*: `CHILL`, `BRUH`, `NUTS`, `DUDE`, `SCORE`, `BALL`
- **Pacing & Health Balance**:
  - Boss HP: 100. Each prompt hit inflicts ~10–12 damage (8–10 total rounds).
  - Timer: 4.5 to 5.5 seconds per prompt. Total duel time: **~75 to 110 seconds**.
  - Player Health: 3 Hearts. Lost on timeout or repeated mistypes.
- **Game Over & Retry Loop**:
  - Classic 8-bit `"GAME OVER"` screen with flashing `"CONTINUE? [TRY AGAIN]"` button.
  - Tapping `"TRY AGAIN"` instantly resets the duel and audio without page reload.

---

## 6. Epic Victory Sequence & Auto-Advance

1. **Climactic Finisher**: Upon final hit, Nemesis freezes, flashes white, and shatters into 8-bit disintegration particles.
2. **Camera Zoom**: Canvas smoothly zooms in on the player's fully revealed, full-color philosopher sprite in a heroic victory pose.
3. **Audio Fanfare**: Ascending 8-bit NES victory arpeggio plays.
4. **Retro Banner & Title Card**:
   - `"VICTORY!"`
   - `"YOU ARE: [PHILOSOPHER NAME]!"`
   - Epithet tag (e.g. *"The Architect of Rationalism"*).
5. **10-Second Auto-Transition with Skip**:
   - Retro countdown timer (`"DECRYPTING FULL DOSSIER IN 10... 9... 8..."`).
   - Glowing `"PRESS START / VIEW DOSSIER NOW"` action button to jump directly to the detailed ResultView without waiting.

---

## 7. Implementation Steps & Verification

1. **Step 1: Data & Sprite Trait System (`src/data/pixelPhilosophers.ts`)**
   - Palette color definitions, distinct visual traits, and curated short keyword banks for all 36 philosophers + easter eggs.
2. **Step 2: Web Audio Synthesizer (`src/utils/duelAudio.ts`)**
   - Chip-accurate pulse, triangle, and noise channels with mobile-safe context initialization.
3. **Step 3: Retro 8-Bit Duel Engine (`src/components/Retro8BitDuel.tsx`)**
   - Responsive canvas scaling with `image-rendering: pixelated` and CRT scanlines.
   - Dual-input handling (physical keyboard + retro touch arcade keypad).
   - Particle engine, screen shake, damage numbers, and progressive silhouette reveal pass.
   - Timer bar, 3-heart system, and Game Over / Retry modal.
   - Dramatic victory zoom, fanfare, and 10-second auto-advance.
4. **Step 4: Integration with `NemesisDuelView.tsx`**
   - Fix missing `OverallQuizResult` import.
   - Mount `Retro8BitDuel` as the premier duel experience.
5. **Step 5: Build Verification**
   - Run `compile_applet` and `lint_applet` to ensure zero compilation or type issues.
   - Test touch ergonomics, screen scaling, and mobile audio unlock.
