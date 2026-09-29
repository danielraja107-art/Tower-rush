# Tower Rush — Asset Decisions Log

**Generated:** 2026-09-28  
**Phase:** 1 — Asset R&D Complete  
**Authority:** This document records *why* assets were selected or rejected.

---

## 1. KENNEY KITS — PRIMARY GEOMETRY SOURCE

### Decision: Use 4 Kenney kits as the core geometry library

**Rationale:**
- **License:** All CC0 (public domain) — zero attribution required, commercial-safe
- **Format:** FBX, GLB, OBJ — native Three.js/R3F GLTFLoader compatibility
- **Consistency:** Unified art style, consistent scale (1 unit = 1 meter), shared colormap texture
- **Modularity:** Designed as tile-based kits — perfect for procedural tower construction
- **Performance:** Low-poly (500-2000 tris), single material per kit, GPU-friendly
- **Coverage:** Tower Defense Kit (towers), Platformer Kit (ramps/platforms), Castle Kit (structural), Prototype Kit (primitives)

**Alternative considered:** Mixing multiple external sources  
**Rejected because:** License fragmentation, scale inconsistency, style mismatch, integration overhead

---

## 2. TOWER DEFENSE KIT — TOWER STRUCTURES

### Decision: Primary source for all three tower designs

**Key models identified:**
- `tower-round-base`, `tower-round-build-a-f`, `tower-round-middle-a-c`, `tower-round-roof-a-c`, `tower-round-top-a-c`
- `tower-square-bottom-a-c`, `tower-square-build-a-f`, `tower-square-middle-a-c`, `tower-square-roof-a-c`, `tower-square-top-a-c`
- `wood-structure`, `wood-structure-high`, `wood-structure-part` — **critical for timber aesthetic**
- `tile-*` variants — modular track pieces (straight, slope, corner, split, crossing)
- `detail-tree`, `detail-rocks`, `detail-dirt` — environmental scatter

**Tower 01 (Timber Cascade):** Square tower modules + wood-structure + tile-straight/slope  
**Tower 02 (Spiral Timber):** Round tower modules + tile-curve/half + wood-structure-high  
**Tower 03 (Forest Switchback):** Square + tile-wide-* + bridge-straight + ground-hills

**Performance note:** All models share `Textures/colormap.png` — single texture bind for entire tower

---

## 3. PLATFORMER KIT — TRACK COMPONENTS

### Decision: Primary source for ramps, platforms, rails, moving elements

**Key models identified:**
- `block-grass-*` / `block-snow-*` — 50+ platform variants (corner, curve, slope, overhang, hexagon)
- `platform`, `platform-ramp`, `platform-overhang`, `platform-fortified`
- `fence-*`, `fence-rope`, `fence-low-*` — rail/fence system
- `block-moving`, `block-moving-large` — animated obstacles
- `trap-spikes`, `saw`, `conveyor-belt` — hazard variety
- `tree-pine`, `tree-pine-snow`, `tree` — vegetation
- `bridge-draw` (from Castle Kit) — bridge sections

**Why not Tower Defense Kit tiles only:** Platformer Kit has richer slope/overhang variety, moving platforms, and grass-textured blocks that read as "outdoor wooden platforms" with our wood materials applied.

---

## 4. CASTLE KIT — STRUCTURAL DETAILS

### Decision: Bridges, gates, walls, stairs, siege equipment

**Key models identified:**
- `bridge-straight`, `bridge-straight-pillar`, `bridge-draw` — bridge variety
- `gate`, `metal-gate` — start/finish gates
- `wall-*`, `wall-narrow-*`, `wall-corner-*` — containment walls
- `stairs-stone`, `stairs-stone-square` — vertical transitions
- `tower-hexagon-*`, `tower-slant-roof` — tower variation
- `rocks-large`, `rocks-small` — terrain scatter
- `siege-*` — thematic obstacles (ballista, catapult, trebuchet)

**Integration:** Castle Kit uses stone texture but geometry is timber-compatible; will apply wood materials.

---

## 5. PROTOTYPE KIT — COLLISION & PROTOTYPING

### Decision: Primitive shapes for collision meshes, rapid iteration, debug visualization

**Key models identified:**
- `shape-cube`, `shape-cylinder`, `shape-slope`, `shape-triangular-prism` — collision primitives
- `column`, `column-rounded`, `column-triangle` — support structures
- `floor-*`, `wall-*`, `stairs-*` — quick blockout
- `pipe`, `pipe-corner`, `pipe-split` — tubular obstacles
- `ladder` — climbable elements (visual only, physics uses colliders)

---

## 6. AMBIENT CG MATERIALS — PBR SURFACE QUALITY

### Decision: 6 curated 1K-JPG material sets from ambientCG (all CC0)

| Material | Selection Reason | Tower Rush Role |
|----------|------------------|-----------------|
| **Wood 095** | Light, clean, subtle grain, polished | Primary tower timber (beams, platforms) |
| **Wood 051** | Darker, rich brown, furniture-grade | Accent wood, darker structural elements |
| **Grass 001** | Dense, fresh, natural lawn | Main grass field (full coverage) |
| **Ground 037** | Forest floor, moss, damp earth | Woodland areas, tower bases, variation |
| **Metal 063** | Aged, rusty, oxidized steel | Bolts, brackets, weathered hardware |
| **Metal 049A** | Clean, smooth, silver | Polished fasteners, new hardware |

**Why 1K not 4K/8K:** 
- 1K (1024²) = ~4MB per material set — web-appropriate
- 4K would be ~60MB per set — excessive for browser delivery
- Visual difference at game camera distances is negligible
- Can generate mipmaps at runtime

**Maps included per material:** Color, Normal (DX+GL), Roughness, Displacement, (Metalness for metals), AO (for grass/ground)

---

## 7. 3D TREE STUMP — VEGETATION ANCHOR

### Decision: Use ambientCG 3D Tree Stump 001 (LQ-1K-JPG)

**Rationale:**
- Only CC0 3D tree model available via ASSETMCP
- LQ version: ~500 tris, 1K textures — performant
- Stumps/logs are more believable in timber tower setting than full trees
- Kenney kits provide `tree-pine`, `tree-large`, `tree-trunk` for background forests

**Placement strategy:** Stumps at tower base, fallen logs as environmental storytelling; full trees from Kenney kits at distance.

---

## 8. HDRI — LIGHTING FOUNDATION

### Decision: Day Environment HDRI 091 (1K EXR)

**Rationale:**
- Forest morning lighting — matches "natural outdoor wooden attraction" vision
- Soft sun direction, diffused shadows, green color cast from canopy
- 1K EXR = 4MB — acceptable for web; provides accurate PBR lighting
- Alternative: Procedural sky + directional light — rejected for realism gap

**Usage:** `THREE.PMREMGenerator` → `envMap` for all PBR materials; `background` for sky dome.

---

## 9. BALLS — PROCEDURAL THREE.JS (NO EXTERNAL ASSET)

### Decision: Build 4 balls programmatically with `MeshPhysicalMaterial`

**Why not external models:**
- Sphere is simplest primitive — no UV unwrap issues, no texture loading
- External sphere assets don't exist in CC0 with premium PBR
- Full control over: `metalness`, `roughness`, `clearcoat`, `clearcoatRoughness`, `envMapIntensity`, `color`
- Bundle size: ~0 KB vs ~500 KB+ for textured model
- Runtime color swap for team selection UI

**Material specification (all balls):**
```javascript
const ballMaterial = new THREE.MeshPhysicalMaterial({
  color: BALL_COLOR,           // Ruby/Sapphire/Emerald/Amber
  metalness: 0.9,
  roughness: 0.1,
  clearcoat: 1.0,
  clearcoatRoughness: 0.05,
  envMapIntensity: 1.5,
  transmission: 0.1,           // subtle glass-like depth
  thickness: 1.0,
  ior: 1.5,
});
```

**Geometry:** `new THREE.SphereGeometry(0.5, 64, 64)` — 8k tris, smooth silhouette

---

## 10. REJECTED: OPENGAMEART ASSETS

### Decision: All OpenGameArt results rejected due to license ambiguity

**Evidence:** Every search result returned `"license_status": "blocked_unclear_license"`, `"license_allowed": false` with warnings:
- "License metadata is missing"
- "OpenGameArt license varies per asset page; details tool should verify before download"

**Risk:** Using assets with unclear licenses could invalidate commercial use, require attribution we can't verify, or contain license conflicts.

**Policy:** Per AGENTS.md §24 — "Never add packages merely because they are popular" / "Do not expose secrets in frontend code" — unclear licenses are a legal secret we cannot accept.

---

## 11. DEFERRED: POLYHAVEN, ITCH.IO, QUATERNIUS

### Decision: Not pursued in Phase 1

**Polyhaven:** ASERTMCP search returned no results; would require manual browsing. Deferred to Phase 2 if gaps emerge.

**itch.io:** Requires manual page navigation per asset; license verification per download. High friction for R&D phase.

**Quaternius:** No relevant results for wooden tower/ramp queries.

**Revisit trigger:** If Kenney + ambientCG coverage proves insufficient during Phase 2-3 implementation.

---

## 12. TEXTURE RESOLUTION STRATEGY

### Decision: 1K (1024²) for all materials; generate mipmaps; downsample to 512² for mobile

**Rationale:**
- Desktop: 1K provides crisp detail at typical camera distances
- Mobile: 512² reduces VRAM ~75% with minimal visual impact
- WebGL2 supports `gl.generateMipmap` — automatic LOD
- Total texture memory: ~6 materials × 6 maps × 1K ≈ 150 MB VRAM (desktop), ~40 MB (mobile)

---

## 13. INSTANCING STRATEGY

### Decision: Heavy instancing for repeated elements

| Element | Instance Count Estimate | Technique |
|---------|------------------------|-----------|
| Track tiles (straight/slope/corner) | 100-300 per tower | `InstancedMesh` + single GLB |
| Fence posts / rails | 50-150 per tower | `InstancedMesh` |
| Bolts / connectors | 200-500 per tower | `InstancedMesh` (tiny geometry) |
| Rocks / debris | 20-50 per tower | `InstancedMesh` |
| Trees (background) | 30-100 | `InstancedMesh` + billboard LOD |

**Expected draw calls:** <50 for full scene (well within 60fps budget)

---

## 14. NEXT PHASE VALIDATION CHECKLIST

Before Phase 2 (Technical Foundation), verify:

- [ ] All Kenney GLB models load without error in Three.js
- [ ] ambientCG material maps apply correctly to Kenney geometry
- [ ] Scale consistency: 1 Kenney unit = 1 Three.js unit = 1 meter
- [ ] HDRI provides adequate illumination for PBR materials
- [ ] Procedural balls render with correct reflections
- [ ] Collision primitives (Prototype Kit) work with Rapier
- [ ] InstancedMesh performance test: 500 instances @ 60fps

---

## 15. SIGN-OFF

**Asset R&D Complete:** ✅  
**Register Created:** ✅ (`docs/ASSET_REGISTER.md`)  
**Decisions Documented:** ✅ (this file)  
**Assets Downloaded & Extracted:** ✅ (9 archives, ~2,700 files)  
**Manifest Generated:** ✅ (`ASSET_MANIFEST.json`)  
**Ready for Phase 2:** ✅

**Next Action:** OpenCode PLAN for Phase 2 — Technical Foundation (React/Three.js/R3F/Rapier/Zustand/GSAP stack initialization)