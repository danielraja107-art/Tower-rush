# TOWER RUSH — Master Game Development Plan

> **Project type:** Medium-complexity 3D competitive ball-race game with a future-ready wagering/reward architecture  
> **Primary frontend:** React + JavaScript  
> **3D:** Three.js + React Three Fiber + Drei  
> **Physics:** Rapier  
> **State:** Zustand  
> **Animation:** GSAP + requestAnimationFrame/Three.js animation techniques where appropriate  
> **Post effects:** Postprocessing  
> **Audio:** Howler.js / Web Audio  
> **Primary engineering agent:** OpenCode  
> **Secondary visual/experience reviewer:** Agy / Antigravity  
>
> **Important:** The first implementation uses demo/virtual credits only. Payment methods are visual UI placeholders and must not process real money. A future real-money version must be treated as a separate product/compliance phase with jurisdiction-specific legal, payment, age/access, responsible-play, security, testing, and audit requirements.

---

# 0. PROJECT VISION

## 0.1 Core Concept

Tower Rush is a premium outdoor 3D ball-racing game.

Four balls are released simultaneously from the top of a large wooden tower.

The player:

1. Chooses one of the four balls.
2. Chooses a wager amount using **demo/virtual credits**.
3. Starts the round.
4. Watches all four balls race through the tower.
5. The first ball to reach the finish determines the race winner.
6. If the player's selected ball wins, the round enters the win/result experience.
7. The result is presented with a strong, polished celebration animation.
8. The player can return to the main page and start another round.

The game must feel like a **real physical outdoor attraction**, not a generic casino interface.

---

# 0.2 Non-Negotiable Creative Direction

## Environment

The world must feel:

- realistic
- outdoors
- spacious
- tactile
- physically believable
- premium
- handcrafted
- calm before the race
- energetic during the race

Required environment:

- realistic sky
- natural sunlight
- clouds / atmospheric depth
- full grass ground
- distant terrain/trees
- realistic shadows
- wood tower as the main landmark
- subtle wind/environment movement
- natural ambient audio

## Tower

The tower must be:

- primarily wooden
- structurally believable
- made from beams, supports, ramps, joints and platforms
- detailed with grain/roughness variation
- visually inspired by the wooden ball-run/tower structure referenced by the user
- large enough to create convincing height and depth

## Balls

There are exactly four primary race balls:

- Ruby — deep ruby red
- Sapphire — rich sapphire blue
- Emerald — rich emerald green
- Amber — polished amber/gold

The balls must be:

- shiny
- premium
- reflective
- PBR-based
- clearly distinguishable
- colorful without becoming neon

## Colors to avoid

Do NOT use a neon visual language.

Avoid:

- electric neon blue
- neon purple
- neon pink
- cyberpunk styling
- glowing casino outlines everywhere
- black/red casino stereotype
- excessive bloom
- glowing UI borders
- giant flashing buttons

---

# 0.3 Product Feel

The target feeling:

> **Natural outdoor luxury + handcrafted timber + cinematic competition + premium game interface**

The game should look professional enough that the player immediately understands:

- what the game is
- what they can select
- what their balance represents
- what will happen next
- which ball they selected
- when the race starts
- who won
- what the result means

No clutter.

No confusing UI.

No visual noise over the tower.

---

# 1. DEVELOPMENT PRINCIPLES

## 1.1 Required Layered Workflow

Every phase follows:

```text
R&D
  ↓
Logic
  ↓
State
  ↓
Presentation
  ↓
Experience
  ↓
Testing
  ↓
Regression Testing
  ↓
Polish
```

Do not jump directly to visual polish before the underlying system works.

Do not leave all testing until the end.

---

# 1.2 Agent Workflow

## OpenCode = Primary Engineering Agent

Use OpenCode for:

- repository inspection
- architecture
- implementation planning
- React code
- Three.js/R3F code
- Rapier physics
- Zustand state
- game state machine
- camera director
- UI implementation
- asset integration
- testing
- debugging
- refactoring
- performance fixes

Use OpenCode **Plan mode first** for every major phase.

Do not immediately ask it to "build the whole game."

Preferred workflow:

```text
MASTER PLAN
    ↓
OpenCode PLAN
    ↓
architecture + dependency review
    ↓
implementation tasks
    ↓
OpenCode BUILD
    ↓
test
    ↓
fix
    ↓
regression test
```

## Agy / Antigravity = Secondary Review Agent

Use Agy primarily for:

- visual inspection
- UX review
- composition review
- animation quality review
- cinematic feel review
- scene/environment review
- polish review
- finding visual defects after a working slice exists

Agy should not randomly rewrite the architecture after OpenCode establishes the implementation structure.

Preferred relationship:

```text
OpenCode
   ↓
working implementation
   ↓
Agy visual/experience review
   ↓
findings
   ↓
OpenCode fixes
```

---

# 2. REPOSITORY FOUNDATION

## Phase 0 — Project Audit + Architecture

### Goal

Prepare a clean, maintainable project before implementing game features.

### TODO

- [ ] Inspect the existing repository before changing anything.
- [ ] Detect existing React/Vite setup.
- [ ] Detect existing Three.js/R3F setup.
- [ ] Identify package manager and Node version.
- [ ] Check whether JavaScript or TypeScript is already established.
- [ ] Preserve useful existing infrastructure instead of rebuilding unnecessarily.
- [ ] Create a clear source structure.
- [ ] Create a dedicated assets structure.
- [ ] Create a dedicated game state structure.
- [ ] Create a dedicated 3D world structure.
- [ ] Create a dedicated UI structure.
- [ ] Create a dedicated audio structure.
- [ ] Create a dedicated test structure.
- [ ] Add an `AGENTS.md` or equivalent project instructions for OpenCode.
- [ ] Add this master plan to the repository.
- [ ] Define coding conventions.
- [ ] Define naming conventions.
- [ ] Define performance budgets.
- [ ] Verify the project runs before feature development.

### Suggested structure

```text
src/
├── app/
├── components/
├── game/
│   ├── core/
│   ├── race/
│   ├── balls/
│   ├── towers/
│   ├── physics/
│   ├── camera/
│   ├── rules/
│   └── results/
├── state/
├── ui/
├── audio/
├── effects/
├── assets/
├── utils/
└── tests/
```

### Gate

The application must:

- start successfully
- render a basic 3D scene
- show a React shell
- have no blocking console errors
- have a documented project structure

---

# 3. GAME RULES

## Phase 1 — Formalize the Round

### Goal

Define exactly what constitutes a round.

### Round state

```text
IDLE
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
CELEBRATION_OR_STANDARD_RESULT
  ↓
ROUND_COMPLETE
```

### Required round data

```text
roundId
towerId
selectedBallId
wagerAmount
virtualBalanceBefore
virtualBalanceAfter
ballPositions
raceStartTime
raceFinishTime
winnerBallId
roundStatus
resultAmount
```

### TODO

- [ ] Define valid round states.
- [ ] Define transitions.
- [ ] Prevent invalid state transitions.
- [ ] Prevent starting twice.
- [ ] Prevent changing the selected ball after confirmation.
- [ ] Prevent changing the wager after race start.
- [ ] Reset the round cleanly.
- [ ] Add round ID generation.
- [ ] Record timestamps.
- [ ] Record winner.
- [ ] Record demo-credit settlement.

### Gate

A complete round can be simulated without visual polish.

---

# 4. FOUR-BALL SYSTEM

## Phase 2 — Ball Physics Prototype

### Goal

Prove that four balls can physically race through one track.

### Ball requirements

Each ball must have:

```text
Rigid body
Sphere collider
Mass
Gravity
Linear velocity
Angular velocity
Friction
Restitution
Collision groups
```

### TODO

- [ ] Create four balls.
- [ ] Give every ball a unique ID.
- [ ] Create premium PBR materials.
- [ ] Add realistic sphere geometry.
- [ ] Add appropriate roughness/metalness/specular behavior.
- [ ] Test gravity.
- [ ] Test rolling.
- [ ] Test bouncing.
- [ ] Test ramp acceleration.
- [ ] Test wall collision.
- [ ] Test obstacle collision.
- [ ] Test simultaneous release.
- [ ] Verify no ball gets stuck.
- [ ] Verify no ball tunnels through collision objects.
- [ ] Verify physics reset.
- [ ] Verify deterministic round setup where required for repeatable testing.

### Important

Do not fake normal race movement with a linear animation.

Normal ball movement should be driven by the physics simulation.

---

# 5. TOWER SYSTEM

## Phase 3 — Shared Tower Framework

### Goal

Create a reusable tower construction system so three towers can share systems while having different layouts.

### Tower components

```text
TowerRoot
├── Base
├── VerticalSupports
├── Platforms
├── Ramps
├── Rails
├── Gates
├── Obstacles
├── FinishSection
└── DecorativeDetails
```

### TODO

- [ ] Build reusable wooden beam modules.
- [ ] Build reusable ramp modules.
- [ ] Build reusable rail modules.
- [ ] Build reusable supports.
- [ ] Build collision versions of all track pieces.
- [ ] Keep visual meshes and physics meshes separate when beneficial.
- [ ] Add wood material variations.
- [ ] Add metal fasteners.
- [ ] Add contact points and believable intersections.
- [ ] Create tower reset logic.
- [ ] Create tower visibility/activation logic.

---

# 6. TOWER 01 — TIMBER CASCADE

## Phase 4

### Identity

The approachable classic tower.

### Layout

- tall vertical timber frame
- alternating wooden ramps
- broad platforms
- multiple drops
- visible race lanes
- natural openings through which the balls can be observed

### TODO

- [ ] Create complete visual layout.
- [ ] Create physics collision layout.
- [ ] Add multiple ramp sections.
- [ ] Add controlled bounce sections.
- [ ] Add simple gates/deflectors.
- [ ] Add finish zone.
- [ ] Test four-ball race.
- [ ] Verify all four balls can reach the end.
- [ ] Tune difficulty.
- [ ] Add camera opportunities.

### Gate

A complete four-ball race must work from start to finish.

---

# 7. TOWER 02 — SPIRAL TIMBER

## Phase 5

### Identity

A taller, more dramatic tower with a central spiral/rounded route.

### Layout

- central timber support
- circular/spiral ramps
- layered platforms
- changing camera elevation
- visually obvious height

### TODO

- [ ] Create spiral track geometry.
- [ ] Create collision geometry.
- [ ] Ensure balls cannot escape the track.
- [ ] Tune slope and friction.
- [ ] Add controlled obstacles.
- [ ] Create a readable finish section.
- [ ] Add dedicated camera shots.
- [ ] Test four-ball race repeatedly.
- [ ] Test edge cases where two balls arrive together.

---

# 8. TOWER 03 — FOREST SWITCHBACK

## Phase 6

### Identity

The most cinematic tower.

### Layout

- zig-zag wooden sections
- switchbacks
- vertical drops
- short tunnels
- bridge-like track sections
- larger support architecture
- forest/grass environment integration

### TODO

- [ ] Create switchback architecture.
- [ ] Add terrain interaction around the tower.
- [ ] Add visual depth between levels.
- [ ] Create collision geometry.
- [ ] Tune routes for a believable race.
- [ ] Add cinematic camera positions.
- [ ] Test simultaneous release.
- [ ] Test finish detection.
- [ ] Test reset.

---

# 9. RACE CONTROL

## Phase 7 — Four-Ball Race Engine

### Goal

Turn the physics prototype into the actual race.

### TODO

- [ ] Create start gate.
- [ ] Place four balls.
- [ ] Lock positions before countdown.
- [ ] Countdown 3 → 2 → 1 → GO.
- [ ] Open the start gate physically or visually.
- [ ] Start timer.
- [ ] Track all four balls.
- [ ] Detect finish line crossing.
- [ ] Determine the first valid finisher.
- [ ] Freeze/finish remaining balls appropriately.
- [ ] Record winner.
- [ ] Trigger result state.
- [ ] Reset all physics.
- [ ] Return to ready state.

### Edge cases

- [ ] Two balls arrive almost simultaneously.
- [ ] Ball gets stuck.
- [ ] Ball exits track.
- [ ] Ball is missing.
- [ ] Physics reset while moving.
- [ ] User tries to leave during a race.
- [ ] User rapidly clicks start.
- [ ] Browser tab visibility changes.
- [ ] Window resizes during a race.

---

# 10. CAMERA SYSTEM

## Phase 8 — Cinematic Camera Director

### Goal

Make the race feel like a professionally directed event.

### Three primary camera modes

## Camera 1 — Overview

Use for:

- loading reveal
- tower introduction
- countdown
- race opening

Properties:

- wide perspective
- tower clearly visible
- enough sky/ground context
- strong composition

## Camera 2 — Chase

Use for:

- active race
- ball-to-ball competition
- obstacle sequences

Properties:

- follows the important action
- stays slightly offset from the ball
- keeps enough track context visible
- avoids motion sickness
- never snaps

## Camera 3 — Finish

Use for:

- final approach
- last few meters
- winner finish
- result reveal

Properties:

- lower viewpoint
- stronger depth
- finish zone is prominent
- allows clean result composition

### Camera animation rules

- [ ] Never snap between major cameras.
- [ ] Use smooth interpolation.
- [ ] Preserve spatial continuity.
- [ ] Avoid unnecessary camera spinning.
- [ ] Use easing appropriate to camera movement.
- [ ] Pre-position the next camera when possible.
- [ ] Avoid clipping through tower geometry.
- [ ] Avoid showing empty sky for long periods.
- [ ] Keep the race readable at all times.

---

# 11. CAMERA SHAKE + DEPTH FEEL

## Phase 9

### Goal

Give physical weight without turning the screen into a shaking mess.

### Minor collision

```text
tiny positional impulse
short duration
minimal rotation
```

### Major collision

```text
stronger impulse
very short duration
subtle rotational response
```

### Finish impact

```text
camera push
small shake
sound hit
dust/particle response
winner emphasis
```

### TODO

- [ ] Implement reusable camera impulse system.
- [ ] Separate minor/medium/major shake strengths.
- [ ] Make shake frame-rate independent.
- [ ] Disable excessive shake on reduced-motion accessibility setting.
- [ ] Test shake at different FPS values.
- [ ] Ensure shake never moves camera through tower geometry.

---

# 12. REALISTIC WORLD

## Phase 10 — Environment

### Goal

Turn the prototype into a believable location.

### Ground

- [ ] natural terrain
- [ ] grass material
- [ ] grass variation
- [ ] dirt patches
- [ ] subtle elevation
- [ ] scattered stones
- [ ] small plants

### Background

- [ ] trees
- [ ] distant vegetation
- [ ] hills
- [ ] optional mountains
- [ ] atmospheric perspective

### Sky

- [ ] realistic sky
- [ ] directional sun
- [ ] soft clouds
- [ ] atmospheric color
- [ ] realistic horizon

### Lighting

- [ ] daylight
- [ ] believable shadow direction
- [ ] contact shadows
- [ ] ambient contribution
- [ ] restrained bloom/postprocessing

### Environmental animation

- [ ] grass movement
- [ ] subtle foliage movement
- [ ] cloud movement
- [ ] ambient particles where appropriate

---

# 13. WOOD MATERIAL SYSTEM

## Phase 11

### Goal

Make the tower look physically constructed.

### Materials

Create material variants for:

- main timber
- darker track wood
- worn timber
- fresh timber
- metal connectors
- bolts
- rails

### TODO

- [ ] Add PBR texture workflow.
- [ ] Add roughness variation.
- [ ] Add normal/bump detail where useful.
- [ ] Add wood grain.
- [ ] Add subtle edge wear.
- [ ] Avoid procedural noise that looks fake.
- [ ] Make intersections believable.
- [ ] Avoid perfectly identical wooden beams.
- [ ] Use instancing where repeated pieces are expensive.

---

# 14. BALL MATERIALS

## Phase 12

### Ball appearance

### Ruby

- deep red
- glossy
- premium reflection
- not neon

### Sapphire

- deep blue
- glossy
- premium reflection
- not neon

### Emerald

- deep green
- glossy
- premium reflection
- not neon

### Amber

- rich amber/gold
- glossy
- premium reflection
- not neon

### TODO

- [ ] Use high-quality sphere geometry.
- [ ] PBR materials.
- [ ] Environment reflections.
- [ ] Strong but realistic specular highlight.
- [ ] Ball rotation follows physics.
- [ ] Contact shadow follows ball.
- [ ] Visual selection state does not alter physical material unrealistically.

---

# 15. GAME UI / UX

## Phase 13 — Application Shell

### Principle

The UI supports the game. It does not dominate the game.

### Desktop hierarchy

```text
TOP BAR
    ↓
LARGE 3D WORLD
    ↓
BALL SELECTION + WAGER CONTROLS
    ↓
SECONDARY INFORMATION
```

### Mobile hierarchy

```text
BALANCE / ACCOUNT
    ↓
3D TOWER
    ↓
BALL SELECTION
    ↓
WAGER
    ↓
PRIMARY ACTION
```

---

# 16. LOADING SCREEN

## Phase 14

### Goal

The first impression must already feel like the finished product.

### Experience

1. Camera starts low in grass.
2. Tower is visible in distance.
3. Sky and environment are already active.
4. Environmental ambience begins.
5. Camera slowly reveals the tower.
6. Four balls appear at the top.
7. Loading progress is shown.
8. User enters the main page when ready.

### UI

```text
TOWER RUSH

FOUR BALLS. ONE WINNER.

Loading...
```

### TODO

- [ ] Preload required assets.
- [ ] Show meaningful loading state.
- [ ] Avoid abrupt scene pop-in.
- [ ] Transition smoothly into home.
- [ ] Keep loading fast.
- [ ] Handle asset loading failure.
- [ ] Provide retry path for failed critical assets.

---

# 17. MAIN PAGE

## Phase 15

### Main screen

The tower is the visual hero.

### Top bar

```text
TOWER RUSH

Demo Balance: $250.00

+
Account
```

### Main controls

```text
Choose your tower
Choose your ball
Choose your wager
```

### Secondary actions

```text
How to Play
Game Rules
Terms & Conditions
Betting Disclaimer
Responsible Play
```

### TODO

- [ ] Build clean responsive layout.
- [ ] Keep 3D world visible.
- [ ] Make selected ball obvious.
- [ ] Make selected tower obvious.
- [ ] Make demo-credit balance clear.
- [ ] Prevent UI overlap with important 3D content.
- [ ] Add hover/focus/press states.
- [ ] Add keyboard accessibility.
- [ ] Add mobile layout.

---

# 18. TOWER SELECTION

## Phase 16

Create three live-preview cards.

### Card 1

```text
TIMBER CASCADE
```

### Card 2

```text
SPIRAL TIMBER
```

### Card 3

```text
FOREST SWITCHBACK
```

Each preview should:

- show the actual tower
- use the same visual material system
- have subtle idle animation
- clearly show selected state

Avoid static fake images if live 3D previews are practical.

---

# 19. BALL SELECTION

## Phase 17

Show four balls:

```text
Ruby
Sapphire
Emerald
Amber
```

### Selection behavior

Selected ball:

- slightly elevated card
- clean border
- subtle shadow
- small selected indicator
- ball subtly rotates
- accessible text label

Do not use giant glowing outlines.

---

# 20. WAGER PANEL — DEMO/VIRTUAL CREDITS

## Phase 18

### Purpose

Prototype the full interaction without connecting real financial systems.

### UI

```text
WAGER

$1   $5   $10   $25   $50

      −   $10   +

Demo balance: $250.00

Potential return: $XX.XX

[ PLACE WAGER ]
```

### Required clarity

Always display:

- current demo balance
- wager amount
- remaining balance after wager
- the displayed reward/return rule
- confirmation state

Never hide important financial information behind animation.

### TODO

- [ ] Demo balance store.
- [ ] Wager validation.
- [ ] Minimum wager.
- [ ] Maximum wager.
- [ ] Insufficient demo balance state.
- [ ] Reset demo balance for development.
- [ ] Transaction history for demo credits.
- [ ] UI-only payment expansion controls.

---

# 21. ACCOUNT / PAYMENT UI PLACEHOLDER

## Phase 19

### Account panel

```text
ACCOUNT

Balance
Payment Methods
Round History
Settings
```

### Add funds panel

Show:

```text
Card
UPI
Bank Account
```

### Important

These are **placeholder interfaces only**.

Do NOT:

- collect real card numbers
- store banking credentials
- process real UPI transactions
- create fake payment success states
- pretend that a transaction occurred

Instead show:

```text
Coming Soon
```

or another clearly non-functional state.

---

# 22. HOW TO PLAY

## Phase 20

Create a visual walkthrough.

### Page/Modal sections

1. Choose a tower.
2. Choose one ball.
3. Choose demo wager.
4. Confirm.
5. Four balls start together.
6. Watch the race.
7. First ball to the finish wins.
8. Result is shown.

Include:

- small 3D diagrams
- animated examples
- concise explanations
- readable typography

---

# 23. TERMS / DISCLAIMER / RESPONSIBLE PLAY UI

## Phase 21

Create placeholder informational pages/modals for:

- Terms & Conditions
- Betting Disclaimer
- Responsible Play
- Privacy
- Game Rules

### Development rule

These screens should use clear placeholder/legal-review copy during development.

Do not claim that the product is licensed, certified, legal in a jurisdiction, or connected to a payment provider unless separately verified.

---

# 24. PRE-RACE EXPERIENCE

## Phase 22

### Sequence

```text
Tower selection
    ↓
Ball selection
    ↓
Wager confirmation
    ↓
Camera travels to tower top
    ↓
Four balls appear
    ↓
Start gate closes/locks
    ↓
3
    ↓
2
    ↓
1
    ↓
GO
```

### Animation requirements

- camera movement is smooth
- no teleporting
- balls settle naturally
- start gate has physical weight
- UI reduces visual noise before GO
- countdown audio escalates subtly

---

# 25. RACE EXPERIENCE

## Phase 23

The race must feel like a physical event.

### Required feedback

- ball rolling
- realistic acceleration
- collision response
- bounce
- wood impact
- subtle dust
- audio hits
- camera response
- visible distance/depth
- clear race progress
- readable winner position

### HUD

Keep it minimal.

Possible information:

```text
YOUR BALL: SAPPHIRE

RACE
Ruby       1st
Sapphire   2nd
Emerald    3rd
Amber      4th
```

Do not create a giant dashboard over the 3D world.

---

# 26. RESULT SYSTEM

## Phase 24

### Winner determination

The first ball to validly cross the finish line wins.

### Required result data

```text
winnerBallId
winnerColor
finishTime
selectedBallId
selectedBallWon
displayedResult
```

### Result state

Show:

```text
RACE COMPLETE

Winner
Sapphire

Your selection
Sapphire

Result
[displayed demo reward]

[ CONTINUE ]
```

---

# 27. WIN CELEBRATION

## Phase 25

### Goal

Create a memorable premium celebration.

### Trigger

Only after the authoritative race result is available.

### Sequence

```text
finish
  ↓
tiny time dilation / dramatic timing
  ↓
camera push
  ↓
winner focus
  ↓
environmental/finish reaction
  ↓
particles
  ↓
light response
  ↓
payout/result card
  ↓
winner message
```

### Visual language

Use:

- warm gold
- cream
- natural greens
- white
- wood colors

Avoid:

- neon explosions
- excessive bloom
- flashing rainbow lights
- cheap casino fireworks

### Example

```text
YOU WON

SAPPHIRE WINS

+$XX.XX DEMO CREDITS

[ CONTINUE ]
```

---

# 28. LOSS RESULT

## Phase 26

Do not use humiliating or aggressive loss presentation.

Example:

```text
RACE COMPLETE

Winner
Ruby

Your ball
Sapphire

Round result
No demo-credit return

[ NEW ROUND ]
```

Use a calm transition back to gameplay.

---

# 29. AUDIO

## Phase 27

### Environment

- wind
- grass ambience
- distant birds
- subtle environmental room/space tone

### Tower

- wood creaks
- subtle structure movement
- impacts

### Ball

- rolling
- bounce
- collision
- finish impact

### UI

- hover
- select
- confirm
- transition
- result

### Race

- countdown
- start release
- rising tension
- finish cue

### Winner

- polished musical sting
- impact
- celebration sound

Do not make it sound like a slot machine.

---

# 30. VFX

## Phase 28

Use restrained, physical effects:

- dust
- tiny wood particles
- subtle impact particles
- motion streak only when justified
- finish particles
- environmental atmospheric particles
- subtle screen-space effects

Every VFX system must have a performance budget.

---

# 31. SMOOTH ANIMATION STANDARD

## Phase 29

### Global rules

- No abrupt snapping for major transitions.
- Use intentional easing curves.
- Avoid excessive bounce easing for premium UI.
- UI timing should be consistent.
- Camera timing should be longer than micro UI interactions.
- Physics should control physical motion.
- GSAP should control UI/camera presentation where appropriate.
- Do not use animation to fake physics.

### Suggested animation categories

```text
Micro UI:
150–250ms

Medium transition:
250–500ms

Cinematic camera:
600–1600ms

Result reveal:
500–1200ms

Major celebration:
800–1800ms
```

These are starting targets, not absolute values. Tune from actual feel.

---

# 32. RESPONSIVE DESIGN

## Phase 30

### Desktop

The 3D scene should dominate the page.

### Tablet

Reduce secondary UI width and preserve tower visibility.

### Mobile

Prioritize:

1. balance/account
2. 3D tower
3. ball selection
4. wager
5. primary action

### TODO

- [ ] Test portrait.
- [ ] Test landscape.
- [ ] Test touch.
- [ ] Test keyboard.
- [ ] Test resizing.
- [ ] Test different DPR values.
- [ ] Ensure buttons remain reachable.
- [ ] Ensure the 3D camera framing remains correct.

---

# 33. ACCESSIBILITY

## Phase 31

- [ ] Keyboard navigation.
- [ ] Visible focus states.
- [ ] Readable contrast.
- [ ] Reduced motion option.
- [ ] Shake intensity option.
- [ ] Avoid communicating only through color.
- [ ] Label every ball by text and color.
- [ ] Preserve clear button labels.
- [ ] Respect common touch-target sizing.

---

# 34. PERFORMANCE

## Phase 32

### Goals

The game should remain smooth on realistic mid-range hardware.

### TODO

- [ ] Monitor renderer calls.
- [ ] Monitor texture memory.
- [ ] Monitor geometry memory.
- [ ] Monitor FPS.
- [ ] Test low/medium/high DPR.
- [ ] Use instancing for repeated grass/vegetation where appropriate.
- [ ] Compress 3D assets.
- [ ] Compress textures.
- [ ] Avoid unnecessarily large textures.
- [ ] Use LOD where useful.
- [ ] Keep real-time shadow cost controlled.
- [ ] Avoid too many dynamic lights.
- [ ] Keep postprocessing restrained.
- [ ] Dispose resources when leaving scenes where necessary.

### Performance gate

Do not add visual features that cause major frame-time regressions without measuring them.

---

# 35. TESTING STRATEGY

## Phase 33 — Continuous Testing

Every feature must be tested immediately after implementation.

## Physics tests

- [ ] ball falls under gravity
- [ ] ball rolls
- [ ] ball bounces
- [ ] ball collides
- [ ] ball stays inside track
- [ ] ball reaches finish
- [ ] reset works

## Race tests

- [ ] exactly four balls start
- [ ] all four start simultaneously
- [ ] winner is correct
- [ ] tie handling works
- [ ] race cannot start twice
- [ ] race can reset

## UI tests

- [ ] ball selection works
- [ ] tower selection works
- [ ] wager controls work
- [ ] insufficient balance handled
- [ ] account modal works
- [ ] How to Play works
- [ ] terms modal works
- [ ] placeholders clearly show non-functional status

## Responsive tests

- [ ] desktop
- [ ] tablet
- [ ] mobile
- [ ] portrait
- [ ] landscape

## Regression

After every significant change:

- [ ] rerun the core race
- [ ] verify camera
- [ ] verify UI
- [ ] verify reset
- [ ] verify console
- [ ] verify FPS

---

# 36. DEBUGGING RULES FOR AGENTS

Agents must not:

- rewrite working systems without justification
- change the game's visual direction without approval
- add random packages
- introduce random architecture
- replace physics with fake animation
- replace real game flow with placeholders
- skip tests to make a feature appear complete
- declare a feature finished just because it renders once

When a bug appears:

```text
REPRODUCE
    ↓
ISOLATE
    ↓
FIX ROOT CAUSE
    ↓
TEST
    ↓
REGRESSION TEST
```

---

# 37. VISUAL REVIEW CHECKLIST FOR AGY

After each major visual milestone, ask:

### Environment

- Does the sky feel natural?
- Does the ground feel like real grass?
- Does the tower feel physically present?
- Is there believable depth?
- Are the materials realistic?

### Tower

- Does the structure look constructed?
- Do beams intersect correctly?
- Does wood look like wood?
- Are rails/supports believable?
- Does each tower have its own identity?

### Balls

- Are colors distinct?
- Are they glossy rather than neon?
- Do they reflect their environment?
- Do they roll naturally?
- Are they easy to follow?

### Camera

- Does the tower remain readable?
- Are camera transitions smooth?
- Is the race understandable?
- Is the final camera exciting without being disorienting?

### UI

- Does UI stay out of the way?
- Is the selected ball obvious?
- Is the wager easy to understand?
- Are account controls understandable?
- Does it feel premium?

### Animation

- Does anything snap?
- Does anything move too quickly?
- Does anything feel floaty?
- Does camera movement feel physical?
- Does the celebration feel earned?

---

# 38. NO-GO LIST

Do not ship visual or gameplay changes that produce any of the following:

```text
NO NEON UI
NO CYBERPUNK LOOK
NO GENERIC CASINO AESTHETIC
NO GIANT GLOWING BUTTONS
NO RANDOM CAMERA SHAKING
NO CAMERA TELEPORTS
NO FAKE BALL PHYSICS
NO BALLS FLOATING THROUGH TRACKS
NO FLAT BROWN BOX TOWER
NO EMPTY GRASS PLANE
NO BLANK SKYBOX
NO UI COVERING THE TOWER
NO FAKE PAYMENT SUCCESS
NO UNEXPLAINED MONEY VALUES
NO UNTESTED ROUND LOGIC
NO SINGLE-PHASE "BUILD EVERYTHING" IMPLEMENTATION
```

---

# 39. FINAL QUALITY BAR

The project is NOT complete when:

- the balls render
- the tower renders
- the button works

The project is complete only when:

### Game

- [ ] Four balls race correctly.
- [ ] Three towers work.
- [ ] Winner detection works.
- [ ] Reset works.
- [ ] Full round flow works.

### Visual

- [ ] Environment looks believable.
- [ ] Wood feels physical.
- [ ] Balls look premium.
- [ ] Sky/grass/lighting work together.
- [ ] Depth is strong.

### Animation

- [ ] Loading transition is smooth.
- [ ] Camera transitions are smooth.
- [ ] Ball movement feels physical.
- [ ] UI motion is polished.
- [ ] Win celebration is polished.
- [ ] Impact feedback is satisfying.

### UX

- [ ] A new user understands the game quickly.
- [ ] Ball selection is obvious.
- [ ] Wager is obvious.
- [ ] Demo balance is obvious.
- [ ] Rules are accessible.
- [ ] Account/payment placeholders are clearly non-functional.

### Engineering

- [ ] No blocking runtime errors.
- [ ] No serious memory leaks.
- [ ] No broken reset state.
- [ ] Acceptable performance.
- [ ] Responsive.
- [ ] Tested repeatedly.

---

# 40. PHASE ORDER — DO NOT SKIP

```text
PHASE 0
Repository + Architecture
        ↓
PHASE 1
Game Rules + State Machine
        ↓
PHASE 2
4-Ball Physics Prototype
        ↓
PHASE 3
Shared Tower Framework
        ↓
PHASE 4
Tower 01
        ↓
PHASE 5
Tower 02
        ↓
PHASE 6
Tower 03
        ↓
PHASE 7
Race Engine
        ↓
PHASE 8
Camera Director
        ↓
PHASE 9
Camera Shake + Depth
        ↓
PHASE 10
Realistic Environment
        ↓
PHASE 11
Wood Materials
        ↓
PHASE 12
Ball Materials
        ↓
PHASE 13
UI Shell
        ↓
PHASE 14
Loading Experience
        ↓
PHASE 15
Main Page
        ↓
PHASE 16
Tower Selection
        ↓
PHASE 17
Ball Selection
        ↓
PHASE 18
Demo Wager
        ↓
PHASE 19
Account/Payment UI Placeholder
        ↓
PHASE 20
How To Play
        ↓
PHASE 21
Terms/Disclaimer UI
        ↓
PHASE 22
Pre-Race
        ↓
PHASE 23
Race Experience
        ↓
PHASE 24
Result
        ↓
PHASE 25
Win Celebration
        ↓
PHASE 26
Loss Result
        ↓
PHASE 27
Audio
        ↓
PHASE 28
VFX
        ↓
PHASE 29
Smooth Animation Pass
        ↓
PHASE 30
Responsive
        ↓
PHASE 31
Accessibility
        ↓
PHASE 32
Performance
        ↓
PHASE 33
Continuous Testing + Final QA
```

---

# 41. THE EXACT NEXT STEPS

## STEP 1 — Put this file into your project

Save this as:

```text
TOWER_RUSH_MASTER_PLAN.md
```

Commit it to Git.

---

## STEP 2 — Give the repository to OpenCode

Do NOT say:

```text
"Build Tower Rush."
```

Instead tell OpenCode to:

1. Read `TOWER_RUSH_MASTER_PLAN.md`.
2. Inspect the current repository.
3. Enter PLAN mode.
4. Identify the existing architecture.
5. Map the requested game systems onto the repository.
6. Identify missing dependencies.
7. Identify risks.
8. Break Phase 0 into concrete implementation tasks.
9. Do not implement later phases yet.
10. Report the plan before changing code.

---

## STEP 3 — Let OpenCode implement ONLY Phase 0

The first goal is not beauty.

The first goal is:

```text
clean foundation
+
3D scene boot
+
physics ready
+
state architecture
+
asset structure
+
testing structure
```

Then test it.

---

## STEP 4 — Build Phase 2 next

After the foundation is clean:

```text
4 balls
+
one simple track
+
real Rapier physics
+
gravity
+
collision
+
finish detection
+
winner detection
```

This is the first true gameplay milestone.

---

## STEP 5 — Only after the race works, bring Agy in

Give Agy the running project and ask it to inspect:

```text
visual quality
camera
physics feel
composition
materials
UX
animation smoothness
performance feel
```

Do not ask Agy to redesign the entire architecture.

Give its findings back to OpenCode.

---

## STEP 6 — Iterate

The loop becomes:

```text
OpenCode
→ implement
→ test

Agy
→ inspect
→ critique

OpenCode
→ fix

test again
```

Repeat this through the phases.

---

# 42. MASTER DEFINITION OF DONE

Tower Rush is ready for a final release candidate only when a new user can open the game and experience this complete flow without confusion:

```text
OPEN GAME
   ↓
CINEMATIC LOADING
   ↓
REALISTIC OUTDOOR WORLD
   ↓
MAIN PAGE
   ↓
HOW TO PLAY / RULES AVAILABLE
   ↓
ACCOUNT / PAYMENT OPTIONS VISIBLE AS FUTURE PLACEHOLDERS
   ↓
SELECT TOWER
   ↓
SELECT BALL
   ↓
SELECT DEMO WAGER
   ↓
CONFIRM
   ↓
CAMERA MOVES TO TOWER
   ↓
4 BALLS READY
   ↓
3
2
1
GO
   ↓
4 BALL PHYSICAL RACE
   ↓
SMOOTH CINEMATIC CAMERA
   ↓
IMPACT / DEPTH / VIBRATION FEEL
   ↓
FIRST BALL FINISHES
   ↓
RESULT
   ↓
POLISHED WIN / LOSS PRESENTATION
   ↓
DEMO-CREDIT SETTLEMENT
   ↓
ROUND COMPLETE
```

The player should leave the round thinking:

> **"That felt like a real physical race."**

That is the quality target for this project.
