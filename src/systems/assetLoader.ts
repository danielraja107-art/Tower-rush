import { useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader, EXRLoader } from 'three-stdlib'
import {
  TextureLoader,
  SRGBColorSpace,
  NoColorSpace,
  PMREMGenerator,
  EquirectangularReflectionMapping,
} from 'three'
import { useMemo } from 'react'

export interface GLTFAsset {
  url: string
}

export interface TextureAsset {
  url: string
  isNormal?: boolean
  isRoughness?: boolean
  isMetalness?: boolean
  isDisplacement?: boolean
  isAO?: boolean
  isColor?: boolean
  flipY?: boolean
}

export interface HDRIAsset {
  url: string
}

export function useGLTF(url: string) {
  return useLoader(GLTFLoader, url)
}

export function useTexture(url: string, options: Partial<TextureAsset> = {}) {
  const texture = useLoader(TextureLoader, url)
  if (options.flipY !== undefined) texture.flipY = options.flipY
  if (options.isColor) {
    texture.colorSpace = SRGBColorSpace
  } else {
    // Normal, roughness, metalness, AO, displacement are linear data
    texture.colorSpace = NoColorSpace
  }
  return texture
}

export function useHDRI(url: string) {
  const { gl } = useThree()
  const pmremGenerator = useMemo(() => {
    const generator = new PMREMGenerator(gl)
    generator.compileEquirectangularShader()
    return generator
  }, [gl])

  const texture = useLoader(EXRLoader, url)
  texture.mapping = EquirectangularReflectionMapping

  const envMap = useMemo(() => {
    return pmremGenerator.fromEquirectangular(texture).texture
  }, [texture, pmremGenerator])

  return { envMap, texture }
}

export const ASSET_PATHS = {
  models: {
    towerDefense: '/assets/models/tower-defense-kit/',
    platformer: '/assets/models/platformer-kit/',
    castle: '/assets/models/castle-kit/',
    prototype: '/assets/models/prototype-kit/',
  },
  textures: {
    wood: '/assets/textures/wood/',
    grass: '/assets/textures/grass/',
    ground: '/assets/textures/ground/',
    metal: '/assets/textures/metal/',
  },
  hdri: '/assets/hdri/',
}

export const MODEL_NAMES = {
  tower: {
    round: {
      base: 'tower-round-base',
      build: ['tower-round-build-a', 'tower-round-build-b', 'tower-round-build-c', 'tower-round-build-d', 'tower-round-build-e', 'tower-round-build-f'],
      middle: ['tower-round-middle-a', 'tower-round-middle-b', 'tower-round-middle-c'],
      roof: ['tower-round-roof-a', 'tower-round-roof-b', 'tower-round-roof-c'],
      top: ['tower-round-top-a', 'tower-round-top-b', 'tower-round-top-c'],
    },
    square: {
      base: 'tower-square-base',
      build: ['tower-square-build-a', 'tower-square-build-b', 'tower-square-build-c', 'tower-square-build-d', 'tower-square-build-e', 'tower-square-build-f'],
      middle: ['tower-square-middle-a', 'tower-square-middle-b', 'tower-square-middle-c'],
      roof: ['tower-square-roof-a', 'tower-square-roof-b', 'tower-square-roof-c'],
      top: ['tower-square-top-a', 'tower-square-top-b', 'tower-square-top-c'],
    },
    woodStructure: ['wood-structure', 'wood-structure-high', 'wood-structure-part'],
    tiles: {
      straight: 'tile-straight',
      slope: 'tile-slope',
      corner: 'tile-corner',
      crossing: 'tile-crossing',
      split: 'tile-split',
    },
  },
  platformer: {
    blocks: {
      grass: 'block-grass',
      grassSlope: 'block-grass-slope',
      grassCorner: 'block-grass-corner',
      grassNarrow: 'block-grass-narrow',
      moving: 'block-moving',
    },
    fences: {
      wood: 'fence',
      woodRope: 'fence-rope',
      woodCorner: 'fence-corner',
      woodLow: 'fence-low',
    },
    nature: {
      treePine: 'tree-pine',
      treePineSnow: 'tree-pine-snow',
      tree: 'tree',
      rock: 'rock',
      rocks: 'rocks',
    },
    hazards: {
      saw: 'saw',
      spikes: 'trap-spikes',
    },
  },
  castle: {
    bridges: {
      straight: 'bridge-straight',
      pillar: 'bridge-straight-pillar',
      drawbridge: 'bridge-draw',
    },
    gates: {
      wood: 'gate',
      metal: 'metal-gate',
    },
    walls: {
      woodFence: 'wall-narrow-wood-fence',
      stone: 'wall-stone',
    },
    details: {
      studs: 'studs',
      corners: 'corner',
      pillars: 'pillar',
    },
  },
  prototype: {
    primitives: {
      cube: 'shape-cube',
      cylinder: 'shape-cylinder',
      slope: 'shape-slope',
      prism: 'shape-triangular-prism',
    },
    structures: {
      columns: 'column',
      pipes: 'pipe',
      stairs: 'stairs',
    },
  },
}