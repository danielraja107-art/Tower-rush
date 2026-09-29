import { Vector3, Color, BufferGeometry, Points, PointsMaterial, AdditiveBlending, Float32BufferAttribute, Group } from 'three'

export type EffectType =
  | 'dust'
  | 'woodChips'
  | 'impact'
  | 'finish'
  | 'ambient'
  | 'celebration'

export interface ParticleConfig {
  position: Vector3
  velocity?: Vector3
  color?: Color
  size?: number
  lifetime?: number
  count?: number
  spread?: number
  gravity?: number
}

export interface EffectConfig {
  type: EffectType
  position: Vector3
  config?: ParticleConfig
  duration?: number
}

class EffectsManager {
  private scene: Group | null = null
  private effects: Map<string, { update: (delta: number) => boolean; dispose: () => void }> = new Map()
  private maxParticles = 500
  private particleCount = 0
  private enabled = true
  private quality = 'high'

  setScene(scene: Group) {
    this.scene = scene
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (!enabled) this.clearAll()
  }

  setQuality(quality: 'low' | 'medium' | 'high') {
    this.quality = quality
    switch (quality) {
      case 'low': this.maxParticles = 100; break
      case 'medium': this.maxParticles = 300; break
      case 'high': this.maxParticles = 500; break
    }
  }

  createEffect(effectConfig: EffectConfig): string | null {
    if (!this.enabled || !this.scene) return null
    if (this.particleCount >= this.maxParticles) return null

    const id = `effect_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    let effect: { update: (delta: number) => boolean; dispose: () => void } | null = null

    switch (effectConfig.type) {
      case 'dust':
        effect = this.createDustEffect(effectConfig)
        break
      case 'woodChips':
        effect = this.createWoodChipsEffect(effectConfig)
        break
      case 'impact':
        effect = this.createImpactEffect(effectConfig)
        break
      case 'finish':
        effect = this.createFinishEffect(effectConfig)
        break
      case 'ambient':
        effect = this.createAmbientEffect(effectConfig)
        break
      case 'celebration':
        effect = this.createCelebrationEffect(effectConfig)
        break
    }

    if (effect) {
      this.effects.set(id, effect)
      return id
    }

    return null
  }

  private createDustEffect(config: EffectConfig) {
    const { position, config: particleConfig } = config
    const count = Math.min(particleConfig?.count ?? 10, this.maxParticles - this.particleCount)
    if (count <= 0) return null

    const geometry = new BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const lifetimes = new Float32Array(count)
    const velocities = new Float32Array(count * 3)

    const baseColor = particleConfig?.color ?? new Color(0x8b7d6b)
    const spread = particleConfig?.spread ?? 0.5
    const lifetime = particleConfig?.lifetime ?? 2

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = position.x + (Math.random() - 0.5) * spread
      positions[i3 + 1] = position.y + Math.random() * spread
      positions[i3 + 2] = position.z + (Math.random() - 0.5) * spread

      const colorVariation = 0.1
      colors[i3] = baseColor.r + (Math.random() - 0.5) * colorVariation
      colors[i3 + 1] = baseColor.g + (Math.random() - 0.5) * colorVariation
      colors[i3 + 2] = baseColor.b + (Math.random() - 0.5) * colorVariation

      sizes[i] = particleConfig?.size ?? (0.05 + Math.random() * 0.1)
      lifetimes[i] = lifetime * (0.5 + Math.random() * 0.5)

      velocities[i3] = (Math.random() - 0.5) * 0.5
      velocities[i3 + 1] = Math.random() * 0.5 + 0.2
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.5
    }

    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
    geometry.setAttribute('size', new Float32BufferAttribute(sizes, 1))
    geometry.setAttribute('lifetime', new Float32BufferAttribute(lifetimes, 1))

    const material = new PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const points = new Points(geometry, material)
    this.scene!.add(points)
    this.particleCount += count

    return {
      update: (delta: number) => {
        if (!this.enabled) return false

        const positionsAttr = geometry.getAttribute('position')
        const sizesAttr = geometry.getAttribute('size')
        const lifetimesAttr = geometry.getAttribute('lifetime')

        let alive = 0

        for (let i = 0; i < count; i++) {
          const i3 = i * 3
          const life = lifetimesAttr.getX(i) - delta

          if (life <= 0) {
            positionsAttr.setXYZ(i, 9999, 9999, 9999)
            sizesAttr.setX(i, 0)
            lifetimesAttr.setX(i, 0)
            continue
          }

          alive++
          lifetimesAttr.setX(i, life)

          const progress = 1 - life / (particleConfig?.lifetime ?? 2)
          const easeOut = 1 - Math.pow(1 - progress, 3)

          positionsAttr.setX(i, positionsAttr.getX(i) + velocities[i3] * delta)
          positionsAttr.setY(i, positionsAttr.getY(i) + velocities[i3 + 1] * delta - 0.5 * delta * delta)
          positionsAttr.setZ(i, positionsAttr.getZ(i) + velocities[i3 + 2] * delta)

          sizesAttr.setX(i, (particleConfig?.size ?? 0.1) * (1 - easeOut * 0.5))
          material.opacity = 0.6 * (1 - easeOut)
        }

        positionsAttr.needsUpdate = true
        sizesAttr.needsUpdate = true
        lifetimesAttr.needsUpdate = true

        return alive > 0
      },
      dispose: () => {
        this.scene!.remove(points)
        geometry.dispose()
        material.dispose()
        this.particleCount -= count
      },
    }
  }

  private createWoodChipsEffect(config: EffectConfig) {
    const { position, config: particleConfig } = config
    const count = Math.min(particleConfig?.count ?? 20, this.maxParticles - this.particleCount)
    if (count <= 0) return null

    const geometry = new BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const lifetimes = new Float32Array(count)
    const velocities = new Float32Array(count * 3)
    const rotations = new Float32Array(count)
    const rotationSpeeds = new Float32Array(count)

    const baseColor = particleConfig?.color ?? new Color(0x8b6914)
    const spread = particleConfig?.spread ?? 1
    const lifetime = particleConfig?.lifetime ?? 3

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = position.x + (Math.random() - 0.5) * spread
      positions[i3 + 1] = position.y + Math.random() * spread * 0.5
      positions[i3 + 2] = position.z + (Math.random() - 0.5) * spread

      const colorVariation = 0.15
      colors[i3] = Math.min(1, baseColor.r + (Math.random() - 0.5) * colorVariation)
      colors[i3 + 1] = Math.min(1, baseColor.g + (Math.random() - 0.5) * colorVariation)
      colors[i3 + 2] = Math.min(1, baseColor.b + (Math.random() - 0.5) * colorVariation)

      sizes[i] = (particleConfig?.size ?? 0.15) * (0.5 + Math.random() * 0.5)
      lifetimes[i] = lifetime * (0.5 + Math.random() * 0.5)

      const speed = 2 + Math.random() * 3
      const angle = Math.random() * Math.PI * 2
      const elevation = Math.random() * Math.PI * 0.5
      velocities[i3] = Math.cos(angle) * Math.cos(elevation) * speed
      velocities[i3 + 1] = Math.sin(elevation) * speed
      velocities[i3 + 2] = Math.sin(angle) * Math.cos(elevation) * speed

      rotations[i] = Math.random() * Math.PI * 2
      rotationSpeeds[i] = (Math.random() - 0.5) * 10
    }

    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
    geometry.setAttribute('size', new Float32BufferAttribute(sizes, 1))
    geometry.setAttribute('lifetime', new Float32BufferAttribute(lifetimes, 1))
    geometry.setAttribute('rotation', new Float32BufferAttribute(rotations, 1))

    const material = new PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const points = new Points(geometry, material)
    this.scene!.add(points)
    this.particleCount += count

    return {
      update: (delta: number) => {
        if (!this.enabled) return false

        const positionsAttr = geometry.getAttribute('position')
        const sizesAttr = geometry.getAttribute('size')
        const lifetimesAttr = geometry.getAttribute('lifetime')
        const rotationsAttr = geometry.getAttribute('rotation')

        let alive = 0

        for (let i = 0; i < count; i++) {
          const i3 = i * 3
          const life = lifetimesAttr.getX(i) - delta

          if (life <= 0) {
            positionsAttr.setXYZ(i, 9999, 9999, 9999)
            sizesAttr.setX(i, 0)
            lifetimesAttr.setX(i, 0)
            continue
          }

          alive++
          lifetimesAttr.setX(i, life)

          const progress = 1 - life / (particleConfig?.lifetime ?? 3)

          positionsAttr.setX(i, positionsAttr.getX(i) + velocities[i3] * delta)
          positionsAttr.setY(i, positionsAttr.getY(i) + velocities[i3 + 1] * delta - 4.9 * delta * delta)
          positionsAttr.setZ(i, positionsAttr.getZ(i) + velocities[i3 + 2] * delta)

          rotationsAttr.setX(i, rotationsAttr.getX(i) + rotationSpeeds[i] * delta)

          sizesAttr.setX(i, (particleConfig?.size ?? 0.15) * (1 - progress * 0.3))
          material.opacity = 0.8 * (1 - progress)
        }

        positionsAttr.needsUpdate = true
        sizesAttr.needsUpdate = true
        lifetimesAttr.needsUpdate = true
        rotationsAttr.needsUpdate = true

        return alive > 0
      },
      dispose: () => {
        this.scene!.remove(points)
        geometry.dispose()
        material.dispose()
        this.particleCount -= count
      },
    }
  }

  private createImpactEffect(config: EffectConfig) {
    const { position, config: particleConfig } = config
    const count = Math.min(particleConfig?.count ?? 30, this.maxParticles - this.particleCount)
    if (count <= 0) return null

    const geometry = new BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const lifetimes = new Float32Array(count)
    const velocities = new Float32Array(count * 3)

    const baseColor = particleConfig?.color ?? new Color(0xffaa00)
    const spread = particleConfig?.spread ?? 0.3
    const lifetime = 0.5

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const elevation = (Math.random() - 0.5) * Math.PI * 0.5
      const speed = 5 + Math.random() * 10

      positions[i3] = position.x + (Math.random() - 0.5) * spread
      positions[i3 + 1] = position.y + (Math.random() - 0.5) * spread
      positions[i3 + 2] = position.z + (Math.random() - 0.5) * spread

      const colorVariation = 0.3
      colors[i3] = Math.min(1, baseColor.r + (Math.random() - 0.5) * colorVariation)
      colors[i3 + 1] = Math.min(1, baseColor.g + (Math.random() - 0.5) * colorVariation)
      colors[i3 + 2] = Math.min(1, baseColor.b + (Math.random() - 0.5) * colorVariation)

      sizes[i] = (particleConfig?.size ?? 0.1) * (0.5 + Math.random() * 0.5)
      lifetimes[i] = lifetime * (0.5 + Math.random() * 0.5)

      velocities[i3] = Math.cos(angle) * Math.cos(elevation) * speed
      velocities[i3 + 1] = Math.sin(elevation) * speed
      velocities[i3 + 2] = Math.sin(angle) * Math.cos(elevation) * speed
    }

    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
    geometry.setAttribute('size', new Float32BufferAttribute(sizes, 1))
    geometry.setAttribute('lifetime', new Float32BufferAttribute(lifetimes, 1))

    const material = new PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const points = new Points(geometry, material)
    this.scene!.add(points)
    this.particleCount += count

    return {
      update: (delta: number) => {
        if (!this.enabled) return false

        const positionsAttr = geometry.getAttribute('position')
        const sizesAttr = geometry.getAttribute('size')
        const lifetimesAttr = geometry.getAttribute('lifetime')

        let alive = 0

        for (let i = 0; i < count; i++) {
          const i3 = i * 3
          const life = lifetimesAttr.getX(i) - delta

          if (life <= 0) {
            positionsAttr.setXYZ(i, 9999, 9999, 9999)
            sizesAttr.setX(i, 0)
            lifetimesAttr.setX(i, 0)
            continue
          }

          alive++
          lifetimesAttr.setX(i, life)

          const progress = 1 - life / 0.5

          positionsAttr.setX(i, positionsAttr.getX(i) + velocities[i3] * delta)
          positionsAttr.setY(i, positionsAttr.getY(i) + velocities[i3 + 1] * delta - 9.81 * delta * delta)
          positionsAttr.setZ(i, positionsAttr.getZ(i) + velocities[i3 + 2] * delta)

          sizesAttr.setX(i, (particleConfig?.size ?? 0.1) * (1 - progress))
          material.opacity = 1 - progress
        }

        positionsAttr.needsUpdate = true
        sizesAttr.needsUpdate = true
        lifetimesAttr.needsUpdate = true

        return alive > 0
      },
      dispose: () => {
        this.scene!.remove(points)
        geometry.dispose()
        material.dispose()
        this.particleCount -= count
      },
    }
  }

  private createFinishEffect(config: EffectConfig) {
    return this.createImpactEffect({ 
      ...config, 
      position: config.position, 
      config: { ...config.config, count: 50, color: new Color(0xffd700), lifetime: 2, position: config.position } 
    })
  }

  private createAmbientEffect(_config: EffectConfig) {
    return null
  }

  private createCelebrationEffect(config: EffectConfig) {
    const { position, config: particleConfig } = config
    const count = Math.min(particleConfig?.count ?? 100, this.maxParticles - this.particleCount)
    if (count <= 0) return null

    const geometry = new BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const lifetimes = new Float32Array(count)
    const velocities = new Float32Array(count * 3)

    const baseColor = particleConfig?.color ?? new Color(0xffd700)
    const spread = particleConfig?.spread ?? 5
    const lifetime = particleConfig?.lifetime ?? 3

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const elevation = Math.random() * Math.PI * 0.5
      const speed = 2 + Math.random() * 5

      positions[i3] = position.x + (Math.random() - 0.5) * spread
      positions[i3 + 1] = position.y + Math.random() * spread
      positions[i3 + 2] = position.z + (Math.random() - 0.5) * spread

      const colorVariation = 0.2
      colors[i3] = Math.min(1, baseColor.r + (Math.random() - 0.5) * colorVariation)
      colors[i3 + 1] = Math.min(1, baseColor.g + (Math.random() - 0.5) * colorVariation)
      colors[i3 + 2] = Math.min(1, baseColor.b + (Math.random() - 0.5) * colorVariation)

      sizes[i] = (particleConfig?.size ?? 0.2) * (0.5 + Math.random() * 0.5)
      lifetimes[i] = lifetime * (0.5 + Math.random() * 0.5)

      velocities[i3] = Math.cos(angle) * Math.cos(elevation) * speed
      velocities[i3 + 1] = Math.sin(elevation) * speed
      velocities[i3 + 2] = Math.sin(angle) * Math.cos(elevation) * speed
    }

    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
    geometry.setAttribute('size', new Float32BufferAttribute(sizes, 1))
    geometry.setAttribute('lifetime', new Float32BufferAttribute(lifetimes, 1))

    const material = new PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const points = new Points(geometry, material)
    this.scene!.add(points)
    this.particleCount += count

    return {
      update: (delta: number) => {
        if (!this.enabled) return false

        const positionsAttr = geometry.getAttribute('position')
        const sizesAttr = geometry.getAttribute('size')
        const lifetimesAttr = geometry.getAttribute('lifetime')

        let alive = 0

        for (let i = 0; i < count; i++) {
          const i3 = i * 3
          const life = lifetimesAttr.getX(i) - delta

          if (life <= 0) {
            positionsAttr.setXYZ(i, 9999, 9999, 9999)
            sizesAttr.setX(i, 0)
            lifetimesAttr.setX(i, 0)
            continue
          }

          alive++
          lifetimesAttr.setX(i, life)

          const progress = 1 - life / (particleConfig?.lifetime ?? 3)

          positionsAttr.setX(i, positionsAttr.getX(i) + velocities[i3] * delta)
          positionsAttr.setY(i, positionsAttr.getY(i) + velocities[i3 + 1] * delta - 1 * delta * delta)
          positionsAttr.setZ(i, positionsAttr.getZ(i) + velocities[i3 + 2] * delta)

          sizesAttr.setX(i, (particleConfig?.size ?? 0.2) * (1 - progress * 0.2))
          material.opacity = 0.9 * (1 - progress * 0.5)
        }

        positionsAttr.needsUpdate = true
        sizesAttr.needsUpdate = true
        lifetimesAttr.needsUpdate = true

        return alive > 0
      },
      dispose: () => {
        this.scene!.remove(points)
        geometry.dispose()
        material.dispose()
        this.particleCount -= count
      },
    }
  }

  update(delta: number) {
    if (!this.enabled) return

    const toRemove: string[] = []
    this.effects.forEach((effect, id) => {
      const alive = effect.update(delta)
      if (!alive) {
        effect.dispose()
        toRemove.push(id)
      }
    })

    toRemove.forEach((id) => this.effects.delete(id))
  }

  clearAll() {
    this.effects.forEach((effect) => effect.dispose())
    this.effects.clear()
    this.particleCount = 0
  }

  getStats() {
    return {
      activeEffects: this.effects.size,
      particleCount: this.particleCount,
      maxParticles: this.maxParticles,
    }
  }
}

export const effectsManager = new EffectsManager()

export function useEffects() {
  return {
    createEffect: effectsManager.createEffect.bind(effectsManager),
    clearAll: effectsManager.clearAll.bind(effectsManager),
    setEnabled: effectsManager.setEnabled.bind(effectsManager),
    setQuality: effectsManager.setQuality.bind(effectsManager),
    getStats: effectsManager.getStats.bind(effectsManager),
  }
}