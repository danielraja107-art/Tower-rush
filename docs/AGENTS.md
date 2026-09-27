# AGENTS.md — Universal Game Development Rules

> This file is the project-wide operating contract for AI coding agents (including OpenCode).
> It is designed to work across small games, large games, 2D, 3D, browser, desktop, and multiplayer projects.
>
> Core architecture:
>
> **R&D → LOGIC → STATE → PRESENTATION → EXPERIENCE**
>
> Testing is continuous across every layer, not a final-only phase.

---

# 1. PRIMARY OBJECTIVE

Build the game in a controlled, verifiable way.

The agent must prioritize:

1. Correctness
2. Maintainable architecture
3. Small, reviewable changes
4. Continuous verification
5. Clear separation of concerns
6. Player experience
7. Performance appropriate to the game's actual needs

Do not optimize for the largest amount of code produced per turn.

Optimize for **the smallest amount of correct, verified work that moves the project forward**.

---

# 2. NON-NEGOTIABLE DEVELOPMENT MODEL

Every game must be reasoned about through these five layers:

```text
┌────────────────────────────────────────────┐
│                 EXPERIENCE                 │
│ Animation • Feedback • Feel • Juice        │
├────────────────────────────────────────────┤
│                PRESENTATION                │
│ UI • Components • Rendering • Visuals      │
├────────────────────────────────────────────┤
│                   STATE                    │
│ Current game truth • Data • Progression    │
├────────────────────────────────────────────┤
│                   LOGIC                    │
│ Rules • Systems • Simulation • Algorithms  │
├────────────────────────────────────────────┤
│                    R&D                     │
│ Research • Decisions • Specification       │
└────────────────────────────────────────────┘
```

Do not mix responsibilities without a reason.

Examples:

- UI components should not contain complex game rules.
- Animation code should not decide game outcomes.
- Input handlers should translate player input into commands/events rather than reimplementing game logic.
- Persistent data should not be confused with transient runtime state.
- Core game logic should be testable without rendering the UI whenever practical.

---

# 3. DEFAULT PROJECT WORKFLOW

Use this order unless the project specification explicitly requires a different order:

```text
1. R&D
2. Game Blueprint / Specification
3. Architecture Review
4. Test Strategy
5. LOGIC
6. STATE
7. PRESENTATION
8. INTEGRATION
9. INPUT
10. EXPERIENCE / ANIMATION
11. FULL QA
12. POLISH
13. PERFORMANCE
14. RELEASE CHECK
```

Testing happens continuously:

```text
R&D        → define acceptance criteria
LOGIC      → unit/system tests
STATE      → state transition tests
PRESENTATION → component/UI tests
INTEGRATION → integration tests
EXPERIENCE  → interaction / visual behavior tests
FINAL QA    → end-to-end product verification
```

---

# 4. R&D IS THE SOURCE OF TRUTH

If the repository contains project R&D/specification documents, read them before making implementation decisions.

Typical documents:

```text
docs/
├── GAME-RND.md
├── GAME-BUILD-PLAN.md
├── ARCHITECTURE.md
├── DESIGN-SYSTEM.md
├── TECH-DECISIONS.md
└── BUILD-STATUS.md
```

When these documents exist:

- Treat explicit decisions as authoritative.
- Do not casually change game rules.
- Do not invent mechanics that are not specified.
- Do not remove planned functionality without documenting why.
- If two specifications conflict, stop and report the conflict before implementing.

If the specification is incomplete, make the **smallest safe assumption**, clearly record it, and avoid silently creating a large product decision.

---

# 5. BEFORE EDITING: INSPECT FIRST

Before changing code:

```text
1. Read the relevant instructions.
2. Inspect the repository structure.
3. Find the current implementation.
4. Find existing tests.
5. Find package/dependency configuration.
6. Find existing scripts.
7. Check the current working tree.
8. Identify related code paths.
```

Never assume the repository looks the way you expect.

Do not recreate files or architecture that already exist without inspecting them first.

Do not overwrite working code simply because a cleaner-looking alternative is possible.

---

# 6. PLAN BEFORE LARGE CHANGES

For every non-trivial task, first produce a small implementation plan.

The plan should identify:

```text
- Goal
- Scope
- Files likely to change
- Files that should not change
- Dependencies, if any
- Risks
- Test cases
- Verification commands
- Stop condition
```

Do not begin broad implementation until the plan is understood.

For small, obvious edits, a full planning step is optional.

---

# 7. BOUNDED WORK UNITS

Never implement an entire game in one giant operation.

Break work into milestones such as:

```text
LOGIC
├── Board/data model
├── Core movement
├── Combat/action rules
├── Collision rules
├── Spawning
├── Scoring
└── Win/lose rules

STATE
├── Runtime state
├── Progression
├── Persistence
└── Settings

PRESENTATION
├── Shell/layout
├── HUD
├── Game view
├── Menus
└── Feedback surfaces

EXPERIENCE
├── Input feel
├── Motion
├── VFX
├── Audio
└── Transitions
```

The exact breakdown depends on the game.

**One milestone should be small enough to test confidently.**

---

# 8. HARD SCOPE BOUNDARIES

For each task, define:

```text
CURRENT TASK:
What is being built now?

OUT OF SCOPE:
What must NOT be built yet?

ALLOWED FILES:
Which directories/files may change?

VERIFICATION:
What must pass before the task is complete?

STOP CONDITION:
When should the agent stop?
```

The agent must not silently pull future-phase work into the current task.

Do not "clean up" unrelated parts of the project during feature work unless explicitly requested or required for correctness.

---

# 9. DEFINITION OF DONE

A task is not complete merely because code was written.

A task is complete only when:

```text
☐ Implementation matches the specification
☐ Relevant tests exist
☐ Relevant tests pass
☐ Existing related tests still pass
☐ Lint/type/static checks pass, when configured
☐ Build passes when relevant
☐ No new console/runtime errors were introduced
☐ No known unfinished placeholder logic remains
☐ Scope stayed within the requested milestone
☐ Changes are understandable and reviewable
```

For visual work additionally verify:

```text
☐ Layout works at intended resolutions
☐ Text remains readable
☐ Interactive states work
☐ No major overflow/clipping
☐ Touch targets are usable
☐ Responsive behavior is intentional
```

---

# 10. TEST-FIRST MENTAL MODEL

Do not interpret "test-first" as requiring every line of code to be written only after a test.

Instead:

```text
Understand behavior
      ↓
Define acceptance cases
      ↓
Implement smallest unit
      ↓
Run tests
      ↓
Fix failures
      ↓
Regression test
```

For game logic, prioritize deterministic tests.

Examples:

```text
Input A + State A → Expected State B

Move left:
Board A → Board B

Merge:
[2,2,0,0] → [4,0,0,0]

Collision:
Player + wall → expected resolution

Damage:
Attack + target state → expected HP

Spawner:
Seed/configuration → expected spawn behavior
```

---

# 11. DETERMINISTIC GAME LOGIC

Whenever possible, make core systems deterministic and easy to test.

Avoid hiding important rules inside:

- render functions
- animation callbacks
- random UI code
- event handlers
- component lifecycle effects

Randomness should be isolated behind a testable abstraction when practical.

For example:

```text
Random source
      ↓
Spawn system
      ↓
Game state
```

This makes edge cases reproducible.

---

# 12. SEPARATE GAME TIME FROM PRESENTATION TIME

A game may have:

```text
Game state
Animation state
Render state
```

Do not assume these are identical.

Examples:

```text
Game logic says:
Enemy HP = 0

Presentation says:
Play hit reaction → dissolve → remove visual
```

or:

```text
Game logic:
Tile moved

Experience:
Animate tile from old position to new position
```

State transitions should remain authoritative.

Animations should not become the hidden source of truth for game rules.

---

# 13. STATE MANAGEMENT RULES

State should represent meaningful game truth.

Separate:

### Runtime state

```text
Current player position
Current board
Current HP
Enemies
Current score
Current match status
```

### Persistent state

```text
Best score
Unlocked content
Settings
Save data
Player preferences
```

### Presentation state

```text
Modal open
Animation phase
Hovered control
Transient notification
```

Do not merge all three categories into a single unstructured object.

Avoid boolean explosion such as:

```text
isPlaying
isWon
isGameOver
isPaused
isStarting
isEnding
```

when a clear state machine or enum is more appropriate.

---

# 14. STATE MACHINES

For games with distinct modes, use explicit states when it improves clarity.

Example:

```text
BOOT
 ↓
MENU
 ↓
READY
 ↓
PLAYING
 ├── PAUSED
 ├── WON
 └── GAME_OVER
```

Rules must define valid transitions.

Do not allow accidental transitions such as:

```text
GAME_OVER → PLAYING
```

unless an explicit restart/continue action causes it.

---

# 15. SINGLE SOURCE OF TRUTH

A core rule should have one authoritative implementation.

Do not implement the same rule in:

```text
UI
Store
Game engine
Animation
Input handler
```

For example, if "can the player move?" is a game rule, it should not have five slightly different implementations.

Prefer:

```text
Input
  ↓
Game command
  ↓
Authoritative game logic
  ↓
State result
  ↓
UI
```

---

# 16. COMPONENT DESIGN RULES

Create components around meaningful responsibilities.

Good:

```text
GameBoard
PlayerHUD
InventoryPanel
PauseMenu
EnemyHealthBar
Tile
ScoreCard
```

Avoid pointless fragmentation:

```text
TextWrapper
SmallText
LabelWrapper
CardContainer2
ButtonShell
```

unless the abstraction genuinely improves reuse, readability, or behavior.

A component should have:

- clear responsibility
- predictable inputs
- minimal hidden state
- no unrelated game rules

---

# 17. UI DEVELOPMENT ORDER

For UI-heavy games, prefer:

```text
1. Layout skeleton
2. Typography hierarchy
3. Primary controls
4. Core game information
5. Game board/world framing
6. Overlays/modals
7. Responsive behavior
8. Interaction states
9. Animation
10. Polish
```

First make the static structure correct.

Then connect real data.

Then add motion.

Do not mix:

```text
new UI
new state
new game logic
new animation
```

into one giant change unless necessary.

---

# 18. DESIGN SYSTEM RULES

Before widespread styling, identify:

```text
Typography
Color roles
Spacing scale
Radii
Borders
Shadows
Icon style
Motion rules
Responsive breakpoints
Interactive states
```

Use reusable tokens when the project's stack supports them.

Do not scatter arbitrary values everywhere when a shared design token would be clearer.

---

# 19. GAME FEEL / EXPERIENCE

Experience is its own layer.

Think about:

```text
Input response
Motion
Timing
Impact
Feedback
Sound
VFX
Transitions
Reward feedback
Failure feedback
```

Experience should reinforce the underlying state.

Examples:

```text
Successful hit
→ sound + impact + reaction

Correct merge
→ movement + merge effect + score feedback

Game over
→ state change + transition + readable message
```

Do not let "juice" hide broken mechanics.

**Correctness first, feel second.**

---

# 20. INPUT ARCHITECTURE

Normalize multiple input methods into the same game commands whenever possible.

Example:

```text
Keyboard ─────┐
Mouse ────────┤
Touch ────────┤
Controller ───┤ → Game Command → Game Logic
AI ───────────┘
```

Do not duplicate gameplay rules inside each input method.

For example:

```text
ArrowLeft
SwipeLeft
Controller Left
```

should resolve to the same logical command.

---

# 21. RESPONSIVE + MULTI-DEVICE

When a game targets multiple devices, explicitly consider:

```text
Desktop
Tablet
Mobile
Touch
Mouse
Keyboard
Controller
```

Do not assume a desktop layout will automatically become a good mobile layout.

Verify:

```text
- viewport behavior
- touch targets
- scrolling
- orientation
- text scale
- safe areas where relevant
- input conflicts
```

---

# 22. ACCESSIBILITY

Apply accessibility appropriate to the platform and game.

Consider:

```text
Keyboard access
Focus visibility
Semantic controls
Text alternatives
Color-independent information
Readable contrast
Reduced motion
Readable text size
Audio-independent feedback
```

Critical game information should not depend exclusively on:

```text
color
sound
animation
```

when an equivalent textual/semantic signal can be provided.

---

# 23. PERFORMANCE

Do not optimize blindly.

First identify the game's real bottleneck.

For 2D/UI games, investigate:

```text
unnecessary renders
DOM growth
large images
animation overhead
event listener duplication
```

For 3D games, investigate:

```text
draw calls
triangle count
texture memory
shader complexity
object counts
physics cost
post-processing
GC pressure
```

For multiplayer games, investigate:

```text
tick rate
message frequency
serialization
latency
interpolation
server load
client prediction
```

Use measurement when possible.

Do not introduce complexity only because it sounds performant.

---

# 24. DEPENDENCY POLICY

Before adding a package:

```text
Ask:
- Is it actually needed?
- Is the feature already possible with existing dependencies?
- Does it reduce complexity overall?
- Is it compatible with the current project?
- Will it add maintenance cost?
```

Do not add packages merely because they are popular.

Never upgrade unrelated dependencies during a focused feature task unless necessary.

---

# 25. MCP / TOOL USAGE

Use tools according to their responsibility.

Typical roles:

```text
Documentation MCP
→ verify library/API usage

UI/design MCP
→ research components and visual patterns

Browser automation
→ end-to-end interaction testing

Browser devtools
→ runtime inspection and debugging

Repository tools
→ inspect/search existing project code
```

Do not use an MCP simply because it is available.

Use the smallest tool set required for the current task.

When using external UI/component references:

```text
Research
  ↓
Select useful pattern
  ↓
Adapt to project design system
  ↓
Implement
  ↓
Test
```

Do not blindly import an entire unrelated application architecture.

---

# 26. VISUAL REFERENCE RULE

External references are references, not authority.

When using a component library or UI catalog:

- preserve the project's design language
- avoid unnecessary dependency expansion
- avoid replacing existing architecture
- verify responsive behavior
- verify accessibility
- keep the visual result coherent across the game

The final UI should look like **one game**, not a collection of unrelated copied components.

---

# 27. GIT SAFETY

Use Git checkpoints after meaningful green milestones.

Preferred cycle:

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

Useful commit boundaries:

```text
feat: add board logic
feat: add movement rules
feat: add state store
feat: add game board UI
feat: connect keyboard input
feat: add tile animations
test: add edge-case coverage
```

Avoid giant commits containing unrelated systems.

Before destructive work:

```text
Check git status
Check git diff
Confirm intended scope
```

---

# 28. ERROR / DEBUGGING PROTOCOL

When any error occurs, STOP feature expansion.

Use:

```text
ERROR
 ↓
REPRODUCE
 ↓
CLASSIFY
 ↓
LOCATE
 ↓
ROOT CAUSE
 ↓
MINIMAL FIX
 ↓
TARGETED TEST
 ↓
REGRESSION TEST
 ↓
FULL RELEVANT CHECK
 ↓
CONTINUE
```

Classify the problem:

```text
Logic
State
UI
Input
Animation
Build
Dependency
Environment
Performance
Browser/runtime
Network/multiplayer
```

Do not respond to every error by rewriting multiple unrelated files.

---

# 29. NO ERROR MASKING

Never "solve" errors by:

```text
- disabling a failing test
- removing an assertion
- swallowing an exception
- adding broad try/catch without handling
- ignoring type errors
- suppressing console errors
- replacing real logic with mocks
- deleting failing functionality without approval
```

A failure is information.

Fix the underlying problem.

---

# 30. MINIMAL-FIX PRINCIPLE

When an existing system works and a new feature breaks it:

1. Identify the regression.
2. Determine whether the new feature is actually the cause.
3. Make the smallest safe change.
4. Preserve unrelated behavior.
5. Add a regression test where practical.

Do not perform broad rewrites during debugging unless the existing architecture is genuinely the root cause.

---

# 31. NO SPECULATIVE REFACTORING

Do not refactor code merely because:

```text
"I would normally write it differently."
```

Refactor when there is a documented reason:

```text
- bug prevention
- required feature
- measured performance issue
- duplicated authoritative logic
- clear architectural conflict
```

Prefer incremental improvements.

---

# 32. BUILD / VERIFY COMMANDS

Before declaring a milestone complete, discover the project's actual commands.

Typical examples:

```bash
npm test
npm run lint
npm run build
npm run check
npm run typecheck
```

Do not invent commands.

Read:

```text
package.json
project documentation
CI configuration
```

and use the project's real commands.

For non-JavaScript projects, use the project's corresponding build/test tools.

---

# 33. BROWSER / RUNTIME VERIFICATION

For browser games, when browser tooling is available:

```text
1. Start the development server.
2. Open the actual game.
3. Exercise the changed behavior.
4. Check the console.
5. Check runtime errors.
6. Check network failures when relevant.
7. Check responsive behavior.
8. Verify the main user path.
```

For UI changes, don't rely only on static code inspection.

---

# 34. MULTIPLAYER-SPECIFIC RULES

For multiplayer games, define authority explicitly.

Example:

```text
Client
→ input/request

Server
→ authoritative game state

Client
→ presentation/interpolation
```

Do not let client-only state become authoritative without a deliberate reason.

Test:

```text
connection
reconnection
latency
disconnect
duplicate messages
out-of-order messages
invalid commands
multiple players
lobby/room lifecycle
```

---

# 35. SAVE / PERSISTENCE RULES

Define what survives a restart.

Separate:

```text
Current match
Session data
Player progression
Settings
Statistics
```

Never accidentally persist transient state just because the same store contains both types of information.

Test persistence explicitly.

---

# 36. SECURITY / TRUST RULES

For games with servers, accounts, purchases, inventories, competitive scores, or multiplayer:

- Never trust the client for authoritative outcomes.
- Validate important inputs server-side.
- Do not expose secrets in frontend code.
- Do not log sensitive credentials/tokens.
- Avoid trusting client-provided scores/rewards.
- Rate-limit abuse-prone endpoints where appropriate.

For purely local games, keep security proportional to the actual threat model.

---

# 37. DOCUMENTATION RULES

Update project documentation when a meaningful architectural decision changes.

Useful records:

```text
docs/
├── ARCHITECTURE.md
├── TECH-DECISIONS.md
├── BUILD-STATUS.md
└── TEST-CASES.md
```

Do not produce documentation that is disconnected from the actual implementation.

Documentation should reflect reality.

---

# 38. BUILD STATUS / HANDOFF

When finishing a milestone, record:

```text
Status:
What changed:
Files changed:
Tests added:
Commands executed:
Results:
Known issues:
Next milestone:
```

This makes a new agent/session capable of continuing without rediscovering the entire project.

---

# 39. AGENT RESPONSE FORMAT

For implementation tasks, finish with:

```text
## Completed
- What was implemented

## Files Changed
- Exact relevant files

## Verification
- Tests run
- Build/lint/type checks run
- Runtime/browser checks run, if applicable

## Result
- PASS / BLOCKED

## Known Issues
- Only real remaining issues

## Next Step
- The next bounded milestone only
```

Never claim a check was performed if it was not actually performed.

---

# 40. WHEN THE USER SAYS "BUILD THE WHOLE GAME"

Do not interpret this as permission to make one giant unverified change.

Instead:

```text
Read specification
 ↓
Create implementation roadmap
 ↓
Identify dependencies
 ↓
Create milestones
 ↓
Implement milestone 1
 ↓
Verify
 ↓
Commit
 ↓
Implement milestone 2
 ↓
Verify
 ↓
Commit
 ...
```

The agent should still work toward the full game, but through controlled checkpoints.

---

# 41. WHEN THE USER PROVIDES A MASTER MD

If the user provides a master game plan:

```text
1. Read it completely.
2. Compare it with the repository.
3. Identify conflicts.
4. Preserve explicit project decisions.
5. Convert each major phase into bounded milestones.
6. Verify each milestone before continuing.
```

Never silently replace the master plan with a different architecture.

---

# 42. UNIVERSAL GAME MILESTONE TEMPLATE

Use this template for every implementation milestone:

```md
# Milestone: <name>

## Objective
<single clear outcome>

## Layer
R&D | LOGIC | STATE | PRESENTATION | EXPERIENCE | INTEGRATION | QA

## In Scope
- ...

## Out of Scope
- ...

## Files Allowed to Change
- ...

## Requirements
- ...

## Edge Cases
- ...

## Tests
- ...

## Verification
- ...

## Completion Gate
The milestone is complete only when:
- [ ] Requirements implemented
- [ ] Relevant tests pass
- [ ] Existing relevant tests pass
- [ ] Required checks pass
- [ ] No known runtime errors
- [ ] Scope stayed bounded

## Stop
Do not continue to the next milestone until the gate passes.
```

---

# 43. UNIVERSAL GAME BUILD LOOP

For every system:

```text
UNDERSTAND
   ↓
PLAN
   ↓
IMPLEMENT
   ↓
TEST
   ↓
VERIFY
   ↓
REVIEW
   ↓
COMMIT
   ↓
NEXT
```

If verification fails:

```text
DO NOT MOVE FORWARD

DEBUG
 ↓
FIX
 ↓
RETEST
```

---

# 44. FINAL GAME QA

Before calling the game finished, verify the appropriate categories.

## Core gameplay

```text
☐ Game starts
☐ Main mechanic works
☐ Rules are correct
☐ Win condition works
☐ Lose/game-over condition works
☐ Restart works
☐ Pause/resume works if applicable
```

## Input

```text
☐ Primary input works
☐ Secondary input works if supported
☐ Input conflicts are handled
☐ Input is responsive
```

## State

```text
☐ State transitions are correct
☐ Persistence is correct
☐ Reset behavior is correct
☐ No stale state
```

## UI

```text
☐ Layout
☐ Typography
☐ Controls
☐ Feedback
☐ Responsive behavior
☐ Accessibility
```

## Experience

```text
☐ Animation
☐ Sound
☐ VFX
☐ Transitions
☐ Reward/failure feedback
```

## Technical

```text
☐ Build passes
☐ Tests pass
☐ No known console errors
☐ No obvious runtime errors
☐ No accidental debug UI
☐ No secrets committed
☐ Performance is appropriate
```

---

# 45. DEFINITION OF DONE — WHOLE GAME

The game is considered complete only when:

```text
☐ R&D decisions are documented
☐ Architecture is understandable
☐ Core logic is correct
☐ State model is stable
☐ Presentation is coherent
☐ Experience is polished to the intended level
☐ Input works
☐ Edge cases are handled
☐ Automated tests pass where applicable
☐ Browser/device testing passes where applicable
☐ Build passes
☐ No known critical bugs
☐ No placeholder implementation remains
☐ Documentation matches the implementation
☐ Final Git state is clean/reviewed
```

---

# 46. MOST IMPORTANT RULE

## NEVER BUILD MORE THAN YOU CAN VERIFY.

The preferred development pattern is:

```text
Small correct change
        ↓
Immediate verification
        ↓
Green checkpoint
        ↓
Next small change
```

Not:

```text
Huge implementation
        ↓
Hope
        ↓
Hours of debugging
```

The objective is not merely to finish the game.

The objective is to build it in a way that makes the next game easier, safer, faster, and more understandable.

---

# 47. DEFAULT PRINCIPLES

When there is no explicit project instruction, follow these principles:

```text
1. Read before editing.
2. Plan before large changes.
3. Keep game rules independent from presentation.
4. Keep state explicit.
5. Prefer one source of truth.
6. Work in small milestones.
7. Test continuously.
8. Fix root causes.
9. Avoid unrelated refactors.
10. Verify before claiming completion.
11. Commit green milestones.
12. Use tools according to their actual purpose.
13. Keep dependencies proportional to the game.
14. Preserve the intended player experience.
15. Never silently invent major product decisions.
```

---

# 48. DEFAULT AGENT BEHAVIOR

When starting work on any game, think in this order:

```text
What is the game supposed to do?
        ↓
What are the exact rules?
        ↓
What is the authoritative state?
        ↓
What systems implement the rules?
        ↓
How should the player see it?
        ↓
How should it feel?
        ↓
How will we prove it works?
```

Then implement in bounded, verified steps.

---

# END OF UNIVERSAL GAME AGENT CONTRACT
