# TOWER RUSH — MASTER PLAN V2
## ASSETMCP-DRIVEN 3D GAME PRODUCTION PLAN

> **Single source of truth for Tower Rush.**
>
> Required workflow: **R&D → Logic → State → Presentation → Experience → Testing → Regression → Polish**.
>
> Primary implementation agent: **OpenCode**  
> Secondary visual/UX review: **Agy / Antigravity**  
> Asset discovery/R&D: **ASSETMCP**  
> Prototype economy: **demo/virtual credits only**.

---

# 0. EXECUTIVE GAME VISION

## 0.1 Core game

Four colored balls are placed at the top of a physical wooden racing tower.

The user:

1. Selects one ball.
2. Selects one tower.
3. Selects a demo/virtual wager amount.
4. Confirms the round.
5. Four balls release simultaneously.
6. All four balls travel through the tower using believable physics.
7. The first valid ball to reach the finish is the winner.
8. The result is displayed clearly.
9. If the selected ball wins, show a premium celebration/result experience.
10. The player can start a new round.

The experience must feel like a **real outdoor wooden attraction**, not a generic casino screen.

## 0.2 Non-negotiable visual direction

### World

- realistic sky
- natural daylight
- full grass ground
- believable terrain
- distant trees/vegetation
- atmospheric depth
- realistic shadows
- large wooden tower
- subtle environmental movement

### Tower

- structurally believable timber
- wood grain
- roughness variation
- beams/supports
- rails
- ramps
- platforms
- gates/obstacles
- bolts/connectors
- believable joins and intersections

### Balls

Exactly four:

```text
RUBY
SAPPHIRE
EMERALD
AMBER
```

They must be glossy, reflective, premium and colorful without being neon.

### Forbidden visual direction

```text
NO neon
NO cyberpunk
NO generic casino aesthetic
NO excessive glow
NO giant glowing buttons
NO flat 3D-looking geometry
NO fake-looking physics
NO random camera movement
NO UI covering the tower
```

Target visual identity:

**Natural Outdoor Luxury + Handcrafted Timber + Cinematic Competition + Premium UI + Tactile Physics**

---

# 1. AGENT STRATEGY

## 1.1 OpenCode — primary engineering

Use OpenCode for:

- repository inspection
- architecture
- phased implementation planning
- React
- Three.js / R3F
- Rapier physics
- Zustand state
- GSAP animation
- camera system
- UI
- audio/effects integration
- automated/manual testing
- debugging
- refactoring
- performance
- final engineering cleanup

### Required loop

```text
Master Plan
    ↓
Inspect repository
    ↓
PLAN mode
    ↓
Phase-specific implementation plan
    ↓
BUILD
    ↓
Test
    ↓
Fix
    ↓
Regression test
    ↓
Git checkpoint
```

Do not ask OpenCode to build the whole game in one pass.

## 1.2 Agy / Antigravity — visual/experience review

Use Agy after meaningful playable slices exist.

Review:

- composition
- scene realism
- materials
- lighting
- tower proportions
- ball presentation
- camera quality
- animation smoothness
- vibration/depth feel
- UI hierarchy
- responsive behavior
- celebration quality
- overall polish

Preferred loop:

```text
OpenCode implementation
        ↓
Playable build
        ↓
Agy review
        ↓
Findings
        ↓
OpenCode fixes
        ↓
Regression test
```

Agy must not replace the established architecture without a documented reason.

---

# 2. ASSETMCP — FIRST-CLASS ASSET R&D SYSTEM

ASSETMCP must be used early, during R&D, not only at the end.

## 2.1 First operation: discover the real tools

Before using ASSETMCP:

- [ ] Inspect the current ASSETMCP configuration.
- [ ] Discover the actual available ASSETMCP tools.
- [ ] Read their real schemas/descriptions.
- [ ] Determine which tools are for search, metadata, preview, download/import, filtering or validation.
- [ ] Do not invent tool names.
- [ ] Do not assume a tool exists because another MCP has a similar feature.

## 2.2 Asset search groups

### Tower structure

Search for:

```text
wooden tower
wooden ball run
wooden race tower
timber structure
wooden ramp
wooden platform
wooden rail
wooden support
wooden gate
```

### Track / obstacles

```text
wooden obstacle
bumper
peg
rail
barrier
gate
rotating bar
ramp
track component
```

### Environment

```text
realistic grass
grass terrain
trees
shrubs
rocks
outdoor environment
sky
clouds
```

### Structural details

```text
wood joints
metal fasteners
bolts
brackets
fences
signs
maintenance props
```

### Balls

Search only if an external ball asset is genuinely better than a procedural sphere with high-quality PBR materials.

## 2.3 Asset evaluation

Every candidate should be evaluated for:

```text
visual fit
geometry quality
topology
materials
scale
format
texture size
triangle count
material count
file size
collision complexity
engine compatibility
license
attribution requirements
commercial-use suitability
conversion effort
```

## 2.4 Asset selection workflow

```text
SEARCH
  ↓
COLLECT CANDIDATES
  ↓
COMPARE
  ↓
VERIFY SOURCE / LICENSE
  ↓
VERIFY FORMAT
  ↓
VERIFY PERFORMANCE
  ↓
SELECT
  ↓
IMPORT
  ↓
NORMALIZE SCALE / ORIGIN
  ↓
OPTIMIZE
  ↓
TEST IN SCENE
```

## 2.5 Asset register

Maintain:

`docs/ASSET_REGISTER.md`

Each entry should record:

- asset name
- category
- source
- source URL/identifier if available
- license
- attribution requirement
- file format
- geometry information if available
- texture resolution
- estimated size
- intended use
- import status
- optimization status
- notes

Also maintain:

`docs/ASSET_DECISIONS.md`

Record why major assets were selected or rejected.

## 2.6 Do not blindly reuse previous asset research

Existing generic low-poly asset research is only a reference. The earlier summary focused on items such as swords, shields, crates/barrels and trees, which does not fully represent the Tower Rush asset brief.

Tower Rush must run a dedicated ASSETMCP search for:

```text
wooden tower
ramps
supports
rails
obstacles
outdoor grass
trees
structural details
```

Do not force a low-poly aesthetic merely because an asset is lightweight.

---

# 3. PROJECT DOCUMENTATION

Maintain:

```text
TOWER_RUSH_MASTER_PLAN_V2_ASSETMCP.md
AGENTS.md
docs/ASSET_REGISTER.md
docs/ASSET_DECISIONS.md
docs/PHYSICS_TUNING.md
docs/CAMERA_SPEC.md
docs/UI_SPEC.md
docs/TEST_MATRIX.md
docs/KNOWN_ISSUES.md
```

The master plan is authoritative. Supporting documents must not silently contradict it.

---

# 4. PHASE 0 — REPOSITORY + MCP AUDIT

## Goal

Understand the project and verify the toolchain before implementation.

### TODO

- [ ] Inspect the repository.
- [ ] Inspect package.json.
- [ ] Identify current React/Vite architecture.
- [ ] Identify JavaScript vs TypeScript.
- [ ] Identify Three.js/R3F setup.
- [ ] Identify Rapier setup.
- [ ] Identify Zustand setup.
- [ ] Identify animation setup.
- [ ] Identify testing setup.
- [ ] Identify build/run commands.
- [ ] Inspect current OpenCode instructions.
- [ ] Inspect ASSETMCP configuration.
- [ ] Discover actual ASSETMCP tools.
- [ ] Establish baseline FPS/frame-time measurement.
- [ ] Establish current console error baseline.
- [ ] Avoid unrelated rewrites.

### Gate

The project starts successfully and the agent can explain the existing architecture and ASSETMCP capabilities before implementation begins.

---

# 5. PHASE 1 — ASSET R&D WITH ASSETMCP

## Goal

Create the real Tower Rush asset direction before final scene construction.

### TODO

- [ ] Search wooden tower structure candidates.
- [ ] Search ramps/platforms/rails.
- [ ] Search obstacle components.
- [ ] Search grass/terrain/environment assets.
- [ ] Search trees/vegetation.
- [ ] Search structural details.
- [ ] Evaluate ball options.
- [ ] Compare at least several viable candidates per major category when available.
- [ ] Verify licenses and source data.
- [ ] Evaluate geometry/material/texture cost.
- [ ] Select a coherent visual family.
- [ ] Document selected and rejected assets.
- [ ] Identify custom geometry that should be built in Three.js instead of sourced.

### Critical decision

Do not let the asset library dictate the gameplay design.

The game design comes first; ASSETMCP supplies suitable building material.

### Gate

The project has a coherent asset direction for the environment and all three towers.

---

# 6. PHASE 2 — TECHNICAL FOUNDATION

## Stack

```text
React
Three.js
React Three Fiber
Drei
Rapier
Zustand
GSAP
Postprocessing
Howler.js / Web Audio
```

### TODO

- [ ] 3D scene root.
- [ ] Physics world.
- [ ] Zustand store.
- [ ] Game state machine.
- [ ] Camera architecture.
- [ ] Asset loading strategy.
- [ ] UI shell.
- [ ] Audio manager.
- [ ] Effects manager.
- [ ] Development-only debug controls.
- [ ] Testing utilities.

### Gate

Foundation runs without blocking errors.

---

# 7. PHASE 3 — RULES + STATE MACHINE

## State

```text
LOADING
 ↓
HOME
 ↓
TOWER_SELECTION
 ↓
BALL_SELECTION
 ↓
WAGER_SELECTION
 ↓
ROUND_CONFIRMATION
 ↓
COUNTDOWN
 ↓
RACING
 ↓
FINISH_DETECTION
 ↓
RESULT
 ↓
CELEBRATION
 ↓
ROUND_COMPLETE
```

### Core round data

```text
roundId
towerId
selectedBallId
wagerAmount
virtualBalanceBefore
virtualBalanceAfter
raceStartTime
raceEndTime
winnerBallId
selectedBallWon
resultAmount
roundStatus
```

### TODO

- [ ] Define valid transitions.
- [ ] Add transition guards.
- [ ] Prevent double-start.
- [ ] Lock selection after confirmation.
- [ ] Lock wager during race.
- [ ] Handle cancellation safely.
- [ ] Reset cleanly.
- [ ] Record result.
- [ ] Record demo-credit settlement.
- [ ] Store round history.

---

# 8. PHASE 4 — FOUR-BALL PHYSICS PROTOTYPE

## Goal

Prove the actual game mechanic before final art.

Use one simple test track first.

### Four balls

```text
Ruby
Sapphire
Emerald
Amber
```

### Physics

- [ ] rigid bodies
- [ ] sphere colliders
- [ ] gravity
- [ ] mass
- [ ] friction
- [ ] restitution
- [ ] linear velocity
- [ ] angular velocity
- [ ] collision
- [ ] ramps
- [ ] walls
- [ ] finish sensor

### Required behavior

Balls must:

- start simultaneously
- accelerate naturally on slopes
- roll
- collide
- bounce where appropriate
- overtake each other naturally
- remain in track
- reach finish
- reset correctly

Do not fake normal movement with a scripted linear translation.

### Gate

Four balls can repeatedly complete the test race without getting permanently stuck or escaping the track.

---

# 9. PHASE 5 — SHARED TOWER CONSTRUCTION SYSTEM

Create reusable modules:

```text
Beam
Support
Platform
Ramp
Rail
Gate
Bumper
Obstacle
Finish
Connector
```

### TODO

- [ ] reusable dimensions
- [ ] consistent coordinate conventions
- [ ] consistent origins
- [ ] visual/physics geometry separation when beneficial
- [ ] reusable materials
- [ ] modular placement
- [ ] collision compatibility
- [ ] reset compatibility

### Gate

The same system can construct all three tower designs.

---

# 10. PHASE 6 — TOWER 01: TIMBER CASCADE

## Identity

Classic, readable wooden race tower.

### Design

- broad ramps
- alternating levels
- multiple vertical drops
- strong visibility of all four balls
- believable supports
- simple obstacles
- clear finish

### TODO

- [ ] assemble asset set
- [ ] build visual track
- [ ] build collision track
- [ ] tune physics
- [ ] add obstacles
- [ ] create finish
- [ ] test repeated races
- [ ] add camera positions

### Gate

Four balls can reliably race from start to finish.

---

# 11. PHASE 7 — TOWER 02: SPIRAL TIMBER

## Identity

Tall circular/spiral wooden structure.

### Design

- central support
- spiral ramps
- layered platforms
- large sense of height
- multiple sight lines

### TODO

- [ ] visual structure
- [ ] collision structure
- [ ] ball route
- [ ] obstacles
- [ ] camera opportunities
- [ ] repeated race test
- [ ] performance test

---

# 12. PHASE 8 — TOWER 03: FOREST SWITCHBACK

## Identity

Most cinematic outdoor tower.

### Design

- zig-zag switchbacks
- vertical drops
- bridge sections
- short enclosed sections where useful
- terrain integration
- forest/grass setting

### TODO

- [ ] architecture
- [ ] collision
- [ ] terrain integration
- [ ] environmental composition
- [ ] camera opportunities
- [ ] repeated race test
- [ ] performance test

---

# 13. PHASE 9 — REALISTIC ENVIRONMENT

## Ground

- [ ] terrain
- [ ] full grass field
- [ ] grass variation
- [ ] soil/dirt variation
- [ ] rocks
- [ ] small plants

## Background

- [ ] trees
- [ ] distant vegetation
- [ ] hills
- [ ] optional distant mountains
- [ ] atmospheric perspective

## Sky

- [ ] realistic sky
- [ ] coherent sun direction
- [ ] cloud layer
- [ ] natural horizon

## Living environment

- [ ] subtle grass movement
- [ ] subtle foliage movement
- [ ] subtle cloud movement
- [ ] restraint: do not animate everything

---

# 14. PHASE 10 — MATERIAL QUALITY

## Wood

- [ ] wood grain
- [ ] roughness variation
- [ ] normal/detail where useful
- [ ] subtle wear
- [ ] color variation
- [ ] physically coherent highlights

## Grass

- [ ] natural color variation
- [ ] roughness
- [ ] scale variation
- [ ] believable response to sunlight

## Metal

- [ ] correct roughness
- [ ] subtle reflections
- [ ] realistic wear

## Balls

- [ ] premium PBR
- [ ] clear specular highlight
- [ ] environmental reflection
- [ ] polished surface
- [ ] no neon glow

---

# 15. PHASE 11 — CINEMATIC CAMERA DIRECTOR

Use three camera families.

## Camera 01 — OVERVIEW

Use for:

- loading
- home
- tower reveal
- countdown
- race opening

## Camera 02 — CHASE

Use for:

- active race
- overtaking
- close competition
- important obstacle sequences

## Camera 03 — FINISH

Use for:

- final approach
- finish
- winner reveal
- result

### Rules

- [ ] no snapping
- [ ] smooth interpolation
- [ ] spatial continuity
- [ ] avoid disorienting rotation
- [ ] avoid clipping
- [ ] maintain ball readability
- [ ] preserve tower context

---

# 16. PHASE 12 — DEPTH + VIBRATION / IMPACT FEEL

## Depth

Use:

- perspective
- environmental layers
- foreground/midground/background
- contact shadows
- atmospheric depth
- believable scale
- restrained depth of field

## Shake

### Minor collision

```text
small impulse
short duration
minimal rotation
```

### Major collision

```text
strong short impulse
impact sound
small particle response
```

### Finish

```text
camera push
finish reaction
sound cue
winner emphasis
```

### Haptics

Where supported:

- [ ] subtle collision pulse
- [ ] stronger finish pulse
- [ ] reduced-motion / haptic-off setting

Never use constant shaking.

---

# 17. PHASE 13 — LOADING EXPERIENCE

The loading scene is already the game world.

### Sequence

```text
grass foreground
 ↓
tower in distance
 ↓
sky / trees / atmosphere
 ↓
slow camera reveal
 ↓
balls appear
 ↓
loading completes
 ↓
home
```

### UI

```text
TOWER RUSH

FOUR BALLS. ONE WINNER.

Loading...
```

### TODO

- [ ] preload critical assets
- [ ] useful progress indication
- [ ] graceful loading failure
- [ ] no obvious pop-in
- [ ] smooth home transition

---

# 18. PHASE 14 — MAIN PAGE

The 3D world remains the hero.

### Header

```text
TOWER RUSH

Demo Balance: $250.00
+
Account
```

### Main choices

```text
Choose Tower
Choose Ball
Choose Wager
```

### Secondary links

```text
How to Play
Rules
Terms & Conditions
Betting Disclaimer
Responsible Play
```

### Color direction

```text
forest green
warm wood
ivory / parchment
charcoal
muted brass/gold
natural greens
```

No neon.

---

# 19. PHASE 15 — TOWER SELECTION

Three tower options:

```text
TIMBER CASCADE
SPIRAL TIMBER
FOREST SWITCHBACK
```

Each card should show the actual visual identity of that tower.

Selection should use:

- subtle elevation
- clean border
- shadow
- clear selected state
- restrained animation

---

# 20. PHASE 16 — BALL SELECTION

Display:

```text
Ruby
Sapphire
Emerald
Amber
```

Selected ball:

- [ ] clear raised card
- [ ] subtle outline
- [ ] small rotation
- [ ] selected label
- [ ] color-independent status indicator

---

# 21. PHASE 17 — DEMO WAGER UI

This version uses virtual/demo credits only.

Example:

```text
WAGER

$1   $5   $10   $25   $50

     −   $10   +

Demo balance: $250.00
After wager: $240.00

[ PLACE WAGER ]
```

Always display:

- demo balance
- wager amount
- post-wager balance
- configured return/reward information
- confirmation state

Validate:

- [ ] minimum
- [ ] maximum
- [ ] insufficient demo balance
- [ ] invalid values
- [ ] lock after confirmation

---

# 22. PHASE 18 — ACCOUNT + PAYMENT PLACEHOLDER UI

Account:

```text
Balance
Round History
Payment Methods
Settings
```

Payment methods shown visually:

```text
Card
UPI
Bank Account
```

### Prototype rules

- [ ] no real payment processing
- [ ] no card-data collection
- [ ] no banking credential storage
- [ ] no fake successful transaction
- [ ] show “Coming Soon” / non-functional status

---

# 23. PHASE 19 — HOW TO PLAY

Create a visual walkthrough:

```text
01 Choose Tower
02 Choose Ball
03 Choose Demo Wager
04 Confirm Round
05 Four Balls Start
06 Watch Race
07 First Ball Finishes
08 Result
```

Use visual diagrams or mini 3D previews where useful.

---

# 24. PHASE 20 — RULES / TERMS / DISCLAIMER

Create accessible pages/modals for:

- Game Rules
- Terms & Conditions
- Betting Disclaimer
- Responsible Play
- Privacy

Use placeholder/legal-review copy where necessary during development.

Do not claim licensing, certification, legality, or real payment integration without separate verification.

---

# 25. PHASE 21 — PRE-RACE CINEMATIC

Sequence:

```text
confirm
 ↓
camera travels to tower top
 ↓
four balls settle
 ↓
gate closes/locks
 ↓
3
 ↓
2
 ↓
1
 ↓
GO
```

Requirements:

- [ ] natural physical ball settling
- [ ] believable gate motion
- [ ] camera transition is smooth
- [ ] countdown is readable
- [ ] sound builds gradually
- [ ] unnecessary UI is reduced during countdown

---

# 26. PHASE 22 — RACE EXPERIENCE

The race is the core spectacle.

### Required

- [ ] realistic gravity
- [ ] rolling
- [ ] acceleration
- [ ] collision
- [ ] bouncing
- [ ] spinning
- [ ] impact response
- [ ] readable race positions
- [ ] minimal HUD

Example HUD:

```text
YOUR BALL: SAPPHIRE

1 Ruby
2 Sapphire
3 Emerald
4 Amber
```

Never let the HUD hide important 3D action.

---

# 27. PHASE 23 — FINISH / WINNER DETECTION

The first valid ball to cross the finish line is the winner.

### TODO

- [ ] robust finish sensor
- [ ] first-finisher lock
- [ ] near-simultaneous finish rule
- [ ] remaining-ball handling
- [ ] result event
- [ ] state transition
- [ ] repeated tests

---

# 28. PHASE 24 — RESULT

Example:

```text
RACE COMPLETE

WINNER
SAPPHIRE

YOUR SELECTION
SAPPHIRE

RESULT
+$XX.XX DEMO CREDITS

[ CONTINUE ]
```

Result values come from configured demo rules, not arbitrary frontend edits.

---

# 29. PHASE 25 — WIN CELEBRATION

This is a signature moment.

Sequence:

```text
winner crosses finish
 ↓
short dramatic pause
 ↓
camera push
 ↓
winner emphasis
 ↓
finish reaction
 ↓
particles
 ↓
sound sting
 ↓
result card
 ↓
demo-credit result
```

Visual language:

- warm gold
- cream
- white
- natural green
- wood tones

Avoid casino-style flashing/neon effects.

The celebration should feel **premium, physical and earned**.

---

# 30. PHASE 26 — LOSS RESULT

Clear and respectful.

Example:

```text
RACE COMPLETE

WINNER
RUBY

YOUR BALL
SAPPHIRE

ROUND RESULT
No demo-credit return

[ NEW ROUND ]
```

Do not use humiliating or manipulative loss presentation.

---

# 31. PHASE 27 — AUDIO

## Environment

- wind
- grass ambience
- distant birds
- environmental space

## Tower

- wood creaks
- structural impacts
- mechanical sounds

## Ball

- rolling
- bounce
- impact
- finish

## UI

- hover
- select
- confirm
- transition

## Race

- countdown
- release
- tension
- finish

## Win

- premium result sting
- celebration sound

Do not turn the audio into a slot-machine soundscape.

---

# 32. PHASE 28 — VFX

Use restrained physical effects:

- dust
- small wood particles
- impact particles
- atmospheric particles
- finish particles
- subtle screen-space response

Every VFX system needs limits:

- [ ] lifetime
- [ ] emission budget
- [ ] maximum concurrent count
- [ ] low-end disable/fallback

---

# 33. PHASE 29 — SMOOTH ANIMATION PASS

This phase is mandatory.

The quality target is **overall smooth animation from first frame to final result**.

### Global rules

- no major snapping
- no camera teleporting
- no abrupt UI transitions
- physics controls physical ball motion
- GSAP controls appropriate UI/camera presentation
- no unnecessary looping
- no continuous shake

### Starting timing ranges

```text
Micro UI          150–250 ms
Standard UI       250–500 ms
Camera transition 600–1600 ms
Result reveal     500–1200 ms
Celebration       800–1800 ms
```

Tune from the actual result; these are starting ranges.

Inspect every transition:

- [ ] loading → home
- [ ] tower selection
- [ ] ball selection
- [ ] wager
- [ ] pre-race camera
- [ ] countdown
- [ ] race cameras
- [ ] finish camera
- [ ] result
- [ ] celebration
- [ ] reset

---

# 34. PHASE 30 — RESPONSIVE UX

### Desktop

3D world is dominant.

### Tablet

Reduce secondary UI while preserving tower visibility.

### Mobile

Priority:

```text
Balance / Account
3D Tower
Ball Selection
Wager
Primary Action
```

Test:

- [ ] portrait
- [ ] landscape
- [ ] touch
- [ ] keyboard
- [ ] resize
- [ ] multiple DPR settings

---

# 35. PHASE 31 — ACCESSIBILITY

- [ ] keyboard navigation
- [ ] visible focus states
- [ ] readable contrast
- [ ] reduced motion
- [ ] reduced camera shake
- [ ] text labels for ball colors
- [ ] selection not conveyed by color alone
- [ ] semantic buttons
- [ ] readable type scale

---

# 36. PHASE 32 — PERFORMANCE

Measure before optimizing.

Track:

```text
FPS
frame time
draw calls
triangles
texture memory
geometry memory
physics cost
postprocessing cost
```

Use appropriate optimization:

- instancing
- GLB compression
- Draco/Meshopt where appropriate
- texture compression
- reasonable texture sizes
- LOD
- simplified physics meshes
- limited dynamic shadows
- limited real-time lights
- restrained postprocessing
- pooled particles

### Asset performance

For each selected ASSETMCP asset inspect:

- triangle count
- texture resolution
- material count
- object count
- file size
- collision complexity

A beautiful asset is not automatically a good asset.

---

# 37. PHASE 33 — CONTINUOUS TESTING

Every phase uses:

```text
Implement
 ↓
Test
 ↓
Verify
 ↓
Fix
 ↓
Regression Test
 ↓
Commit
```

## Physics tests

- [ ] gravity
- [ ] rolling
- [ ] collision
- [ ] bounce
- [ ] containment
- [ ] finish
- [ ] reset

## Race tests

- [ ] exactly four balls
- [ ] simultaneous release
- [ ] correct winner
- [ ] near tie
- [ ] stuck ball recovery
- [ ] ball leaves track recovery
- [ ] repeated races
- [ ] double start prevention

## UI tests

- [ ] tower selection
- [ ] ball selection
- [ ] wager
- [ ] balance
- [ ] account
- [ ] How to Play
- [ ] Rules
- [ ] Terms
- [ ] placeholders

## Visual tests

- [ ] no missing assets
- [ ] no major clipping
- [ ] no obvious z-fighting
- [ ] no camera framing errors
- [ ] no broken materials
- [ ] no obvious pop-in

---

# 38. PHASE 34 — ASSET QA

Before approving a sourced asset:

```text
SOURCE
 ↓
LICENSE
 ↓
VISUAL FIT
 ↓
SCALE
 ↓
MATERIAL
 ↓
PERFORMANCE
 ↓
COLLISION
 ↓
IMPORT
 ↓
SCENE TEST
```

Reject an asset when:

- visual language conflicts with Tower Rush
- geometry is unnecessarily expensive
- textures are unnecessarily large
- licensing is unclear for the intended use
- scale is problematic
- materials are poor
- it creates obvious seams/clipping
- it reduces scene coherence

---

# 39. PHASE 35 — AGY VISUAL REVIEW

Agy reviews the running build against:

## World

- Does it feel outdoors?
- Does the grass feel natural?
- Does the sky have depth?
- Does the lighting make sense?
- Does the tower belong in the environment?

## Tower

- Does it look structurally believable?
- Does the wood look like wood?
- Do the three towers feel meaningfully different?
- Are the ramps and obstacles readable?

## Balls

- Are they glossy rather than neon?
- Are colors rich and distinct?
- Do reflections make sense?
- Do they visibly roll/impact correctly?

## Camera

- Is the race readable?
- Are transitions smooth?
- Does the finish feel important?
- Is depth convincing?

## UI

- Is the game understandable quickly?
- Is the selected ball obvious?
- Is wager information clear?
- Is demo balance clear?
- Does UI leave the world visible?

## Animation

- Any snapping?
- Any floatiness?
- Any awkward timing?
- Any excessive shake?
- Does the celebration feel earned?

---

# 40. PHASE 36 — DEBUGGING PROTOCOL

When a bug occurs:

```text
STOP FEATURE EXPANSION
        ↓
REPRODUCE
        ↓
CLASSIFY
        ↓
ISOLATE
        ↓
ROOT CAUSE
        ↓
MINIMAL FIX
        ↓
TARGETED TEST
        ↓
REGRESSION TEST
```

Do not mask failures by:

- disabling tests
- swallowing exceptions
- suppressing errors
- deleting functionality
- replacing real logic with fake logic
- unrelated rewrites

---

# 41. PHASE 37 — GIT CHECKPOINTS

Use:

```text
Implement
 ↓
Test
 ↓
Verify
 ↓
Review diff
 ↓
Commit
```

Recommended checkpoints:

```text
foundation
asset-rnd
physics
tower-01
tower-02
tower-03
race-engine
camera
environment
ui
demo-wager
result
celebration
audio
vfx
responsive
performance
final-qa
```

---

# 42. PHASE 38 — FINAL QA

Run the entire player journey repeatedly:

```text
OPEN
 ↓
LOADING
 ↓
HOME
 ↓
HOW TO PLAY
 ↓
TOWER SELECT
 ↓
BALL SELECT
 ↓
DEMO WAGER
 ↓
CONFIRM
 ↓
PRE-RACE
 ↓
COUNTDOWN
 ↓
RACE
 ↓
FINISH
 ↓
RESULT
 ↓
CELEBRATION / LOSS
 ↓
ROUND COMPLETE
 ↓
NEW ROUND
```

Also test:

- refresh
- resize
- mobile
- reduced motion
- audio mute
- repeated rounds
- missing asset failure
- slow loading
- low-performance settings

---

# 43. REAL-MONEY FUTURE BOUNDARY

This repository version uses:

```text
DEMO / VIRTUAL CREDITS ONLY
```

Future real-money systems such as deposits, withdrawals, payment providers, account verification, jurisdiction-specific controls, responsible-play controls, risk/fraud systems, production transaction ledgers and audited settlement must be treated as a separate future project.

Do not implement fake payment success.

---

# 44. MASTER DEFINITION OF DONE

The project is complete only when:

```text
REALISTIC OUTDOOR WORLD
+
3 DISTINCT WOODEN TOWERS
+
4 PHYSICAL BALLS
+
BELIEVABLE GRAVITY
+
REAL COLLISION
+
FIRST-FINISHER DETECTION
+
3-CAMERA CINEMATIC SYSTEM
+
SMOOTH ANIMATION
+
DEPTH + IMPACT FEEL
+
PREMIUM NON-NEON UI
+
LOADING EXPERIENCE
+
HOW TO PLAY
+
RULES / TERMS / DISCLAIMER
+
ACCOUNT + PAYMENT PLACEHOLDERS
+
DEMO WAGER
+
RESULT
+
WIN CELEBRATION
+
AUDIO
+
VFX
+
RESPONSIVE UX
+
ACCESSIBILITY
+
PERFORMANCE
+
CONTINUOUS TESTING
+
FINAL QA
```

The player should feel:

> **“This feels like a real physical race in a real place.”**

---

# 45. EXACT NEXT ACTION — DO NOT BUILD THE FULL GAME YET

Give this instruction to OpenCode first:

```text
Read TOWER_RUSH_MASTER_PLAN_V2_ASSETMCP.md completely.

Do NOT build the full game yet.
Do NOT start implementing the three final towers yet.
Do NOT implement real payments.

First inspect the existing repository, package configuration,
current architecture, installed dependencies, current assets,
run/build/test commands, and current OpenCode instructions.

Then inspect the ASSETMCP configuration and discover the ACTUAL
ASSETMCP tools available in this environment. Do not invent tool
names, capabilities, or schemas.

Run a Tower Rush asset R&D pass using ASSETMCP.

The R&D pass must focus specifically on:

1. wooden tower structures
2. wooden ramps/platforms/supports
3. rails, gates and obstacle components
4. outdoor grass/terrain
5. trees and vegetation
6. structural wood/metal details
7. possible ball assets/material references

For each category, collect viable candidates and evaluate:
- visual fit
- geometry quality
- scale
- materials
- format
- texture resolution
- estimated performance cost
- license/source information available from the tool
- import/conversion complexity

Create/update:

docs/ASSET_REGISTER.md
docs/ASSET_DECISIONS.md

Also report:

- ASSETMCP tool inventory
- what each tool can actually do
- best asset candidates
- rejected candidates and why
- what should be custom-built in Three.js
- likely performance risks
- asset import order
- gaps in available assets

Do not modify unrelated source code.
Do not build the wager/payment system.
Do not implement final UI.
Do not declare the game complete.

Stop after the asset R&D report and Phase 0 findings.
```

---

# 46. AFTER ASSET R&D — IMPLEMENTATION ORDER

```text
ASSETMCP R&D
      ↓
Asset Register
      ↓
OpenCode PLAN
      ↓
Foundation
      ↓
4-ball physics
      ↓
Shared tower framework
      ↓
Tower 01
      ↓
Tower 02
      ↓
Tower 03
      ↓
Camera director
      ↓
Environment
      ↓
Materials
      ↓
UI
      ↓
Demo wager
      ↓
Race experience
      ↓
Result
      ↓
Celebration
      ↓
Agy visual/UX review
      ↓
OpenCode fixes
      ↓
Performance
      ↓
Final QA
```

**Do not skip directly to the final visual build. Prove the race first, then build the world around a working race.**
