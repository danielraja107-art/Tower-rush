# Tower Rush — Asset Register

**Generated:** 2026-09-28  
**Source:** ASSETMCP R&D Pass  
**Status:** Phase 1 Complete — Asset Research & Selection

---

## 1. SELECTED ASSETS — TOWER STRUCTURES & COMPONENTS

| Asset | Source | Category | License | Format | Size | Intended Use | Status |
|-------|--------|----------|---------|--------|------|--------------|--------|
| **Tower Defense Kit** | Kenney | Tower structures | CC0 | FBX/GLB/OBJ | 5.4 MB | **Primary tower construction** — wooden towers, bridges, ramps, platforms, wood-structure variants | ✅ Downloaded & Extracted |
| **Platformer Kit** | Kenney | Platforms/Ramps | CC0 | FBX/GLB/OBJ | 4.6 MB | **Ramps, slopes, platforms, fences, moving platforms** — modular track components | ✅ Downloaded & Extracted |
| **Castle Kit** | Kenney | Structural details | CC0 | FBX/GLB/OBJ | 2.2 MB | **Bridges, gates, walls, towers, stairs, siege equipment** — structural connectors & obstacles | ✅ Downloaded & Extracted |
| **Prototype Kit** | Kenney | Basic geometry | CC0 | FBX/GLB/OBJ | 3.0 MB | **Columns, floors, walls, stairs, pipes, primitive shapes** — rapid prototyping & collision meshes | ✅ Downloaded & Extracted |

---

## 2. SELECTED ASSETS — MATERIALS (PBR)

| Asset | Source | Category | License | Format | Resolution | Maps | Intended Use | Status |
|-------|--------|----------|---------|--------|------------|------|--------------|--------|
| **Wood 095** | ambientCG | Wood material | CC0 | JPG | 1K | Color, Normal, Roughness, Displacement | **Primary tower wood** — light, clean, polished timber | ✅ Downloaded |
| **Wood 051** | ambientCG | Wood material | CC0 | JPG | 1K | Color, Normal, Roughness, Displacement | **Secondary/darker wood** — rich brown, furniture-grade | ✅ Downloaded |
| **Grass 001** | ambientCG | Grass ground | CC0 | JPG | 1K | Color, Normal, Roughness, Displacement, AO | **Primary grass field** — dense, fresh, natural lawn | ✅ Downloaded |
| **Ground 037** | ambientCG | Forest ground | CC0 | JPG | 1K | Color, Normal, Roughness, Displacement, AO | **Forest floor** — damp earth, moss, woodland | ✅ Downloaded |
| **Metal 063** | ambientCG | Aged metal | CC0 | JPG | 1K | Color, Normal, Roughness, Metalness, Displacement | **Bolts, connectors, hardware** — rusty, aged steel | ✅ Downloaded |
| **Metal 049 A** | ambientCG | Clean metal | CC0 | JPG | 1K | Color, Normal, Roughness, Metalness, Displacement | **Polished hardware** — clean silver fasteners | ✅ Downloaded |

---

## 3. SELECTED ASSETS — ENVIRONMENT & MODELS

| Asset | Source | Category | License | Format | Size | Intended Use | Status |
|-------|--------|----------|---------|--------|------|--------------|--------|
| **3D Tree Stump 001** | ambientCG | Tree model | CC0 | OBJ/MTL | 5.7 MB (LQ) | **Tree stumps, fallen logs** — low-poly background vegetation | ✅ Downloaded |
| **Day Environment HDRI 091** | ambientCG | Sky/lighting | CC0 | EXR/HDR | 4.1 MB (1K) | **Realistic outdoor lighting** — forest morning, soft sun | ✅ Downloaded |

---

## 4. BALL ASSETS — DECISION: CUSTOM PROCEDURAL

| Option | Evaluation | Decision |
|--------|------------|----------|
| External sphere models | Limited CC0 sphere assets; overkill for simple geometry | ❌ Rejected |
| **Procedural Three.js spheres + custom PBR materials** | Full control over gloss, reflection, color; minimal bundle size; perfect for 4 distinct balls | ✅ **Selected** |

**Ball specifications (to be built in Three.js):**
- **RUBY** — Deep red, high metallic, low roughness, clear coat
- **SAPPHIRE** — Rich blue, high metallic, low roughness, clear coat  
- **EMERALD** — Vibrant green, high metallic, low roughness, clear coat
- **AMBER** — Warm gold/orange, high metallic, low roughness, clear coat

All balls: `SphereGeometry(0.5, 64, 64)`, `MeshPhysicalMaterial` with `clearcoat: 1.0`, `clearcoatRoughness: 0.1`, `envMapIntensity: 1.5`

---

## 5. REJECTED / DEFERRED CANDIDATES

| Asset | Source | Reason for Rejection |
|-------|--------|----------------------|
| OpenGameArt wooden towers | OpenGameArt | **License unclear/blocked** — all results had missing license metadata |
| OpenGameArt wooden ramps/platforms | OpenGameArt | **License unclear/blocked** — same issue |
| Kenney Nature/Tree packs | Kenney | **No results found** in catalog search |
| ambientCG full tree models | ambientCG | **Only stump available** — no full tree models in 3D model category |
| Polyhaven assets | Polyhaven | **No search results** via ASSETMCP (provider may need manual browsing) |
| itch.io assets | itch.io | **Deferred** — requires manual page navigation, license verification per asset |
| Quaternius assets | Quaternius | **No relevant results** for wooden tower/ramp queries |

---

## 6. ASSET COVERAGE ANALYSIS

| Tower Rush Requirement | Coverage | Notes |
|------------------------|----------|-------|
| **Wooden tower structures** | ✅ Excellent | Tower Defense Kit: round/square towers, multi-level builds, wood-structure variants |
| **Ramps & slopes** | ✅ Excellent | Platformer Kit: extensive slope variants (steep, narrow, large, curve, half) |
| **Platforms & walkways** | ✅ Excellent | Platformer Kit: grass/snow blocks in many sizes; Castle Kit: bridges |
| **Rails & fences** | ✅ Good | Platformer Kit: fence variants (straight, corner, low, rope); Castle Kit: wall-narrow-wood-fence |
| **Gates & obstacles** | ✅ Good | Castle Kit: gate, metal-gate, drawbridge; Platformer Kit: doors, traps |
| **Structural connectors** | ✅ Good | Castle Kit: pillars, studs, corners; Prototype Kit: columns, pipes |
| **Bolts & hardware** | ✅ Good | ambientCG Metal 063 (aged), Metal 049A (clean) |
| **Grass terrain** | ✅ Excellent | ambientCG Grass 001 + Ground 037 for variation |
| **Trees & vegetation** | ⚠️ Partial | Only tree stump from ambientCG; Kenney kits include tree models (tree-pine, tree-large, tree-trunk) |
| **Rocks & debris** | ✅ Good | Tower Defense Kit: detail-rocks; Castle Kit: rocks-large/small; Platformer Kit: rocks, stones |
| **Sky & lighting** | ✅ Good | ambientCG Day HDRI 091 (forest morning) |
| **Premium balls** | ✅ Custom | Procedural spheres with MeshPhysicalMaterial — best quality/size ratio |

---

## 7. IMPORT ORDER FOR PHASE 2+

1. **Priority 1 (Foundation):** Kenney Tower Defense Kit + Platformer Kit — core tower/track geometry
2. **Priority 2 (Structure):** Kenney Castle Kit — bridges, gates, walls, stairs
3. **Priority 3 (Materials):** ambientCG Wood 095/051, Grass 001, Ground 037, Metal 063/049A
4. **Priority 4 (Environment):** ambientCG HDRI 091, Tree Stump, Kenney tree models
5. **Priority 5 (Prototyping):** Kenney Prototype Kit — collision primitives, rapid iteration

---

## 8. PERFORMANCE NOTES

- **Kenney GLB models:** Optimized for real-time, low-poly, single draw call per model
- **ambientCG 1K textures:** 1024² — appropriate for web; can downsample to 512² for mobile
- **Total downloaded:** ~25 MB compressed; ~100 MB extracted
- **Triangle budget:** Kenney models ~500-2000 tris each; well within 60fps target
- **Material count:** 6 PBR material sets + custom ball materials = ~10 materials total
- **Instancing opportunity:** High — track segments, fence posts, bolts repeat heavily

---

## 9. GAPS REQUIRING CUSTOM WORK

1. **Full tree models** — Use Kenney tree-pine/tree-large from Platformer/Castle kits; supplement with billboards
2. **Ball physics meshes** — Simple sphere colliders (procedural)
3. **Tower-specific theming** — Three tower variants built from shared component library
4. **Finish line / sensor** — Custom geometry
5. **Camera rigs** — Custom Three.js camera director
6. **VFX particles** — Custom Three.js/GPU particle systems
7. **UI/HUD** — Custom React components (not asset-dependent)