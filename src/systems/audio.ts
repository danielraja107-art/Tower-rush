import { Howl, Howler } from 'howler'

export type SoundCategory =
  | 'environment'
  | 'tower'
  | 'ball'
  | 'ui'
  | 'race'
  | 'win'

export interface SoundConfig {
  src: string[]
  volume?: number
  loop?: boolean
  category?: SoundCategory
  preload?: boolean
}

export const SOUND_DEFINITIONS: Record<string, SoundConfig> = {
  ambientWind: { src: ['/assets/audio/ambient/wind.mp3'], volume: 0.3, loop: true, category: 'environment', preload: true },
  ambientBirds: { src: ['/assets/audio/ambient/birds.mp3'], volume: 0.2, loop: true, category: 'environment', preload: true },
  ambientGrass: { src: ['/assets/audio/ambient/grass.mp3'], volume: 0.15, loop: true, category: 'environment', preload: true },
  woodCreak: { src: ['/assets/audio/tower/creak.mp3'], volume: 0.4, category: 'tower' },
  woodImpact: { src: ['/assets/audio/tower/impact.mp3'], volume: 0.5, category: 'tower' },
  ballRoll: { src: ['/assets/audio/ball/roll.mp3'], volume: 0.3, loop: true, category: 'ball' },
  ballBounce: { src: ['/assets/audio/ball/bounce.mp3'], volume: 0.5, category: 'ball' },
  ballImpact: { src: ['/assets/audio/ball/impact.mp3'], volume: 0.6, category: 'ball' },
  ballFinish: { src: ['/assets/audio/ball/finish.mp3'], volume: 0.7, category: 'ball' },
  uiHover: { src: ['/assets/audio/ui/hover.mp3'], volume: 0.2, category: 'ui' },
  uiSelect: { src: ['/assets/audio/ui/select.mp3'], volume: 0.3, category: 'ui' },
  uiConfirm: { src: ['/assets/audio/ui/confirm.mp3'], volume: 0.4, category: 'ui' },
  uiTransition: { src: ['/assets/audio/ui/transition.mp3'], volume: 0.3, category: 'ui' },
  countdownBeep: { src: ['/assets/audio/race/countdown.mp3'], volume: 0.5, category: 'race' },
  raceRelease: { src: ['/assets/audio/race/release.mp3'], volume: 0.6, category: 'race' },
  raceTension: { src: ['/assets/audio/race/tension.mp3'], volume: 0.2, loop: true, category: 'race', preload: true },
  raceFinish: { src: ['/assets/audio/race/finish.mp3'], volume: 0.7, category: 'race' },
  winSting: { src: ['/assets/audio/win/sting.mp3'], volume: 0.8, category: 'win' },
  winCelebration: { src: ['/assets/audio/win/celebration.mp3'], volume: 0.6, category: 'win' },
}

class AudioManager {
  private sounds: Map<string, Howl> = new Map()
  private categoryVolumes: Map<SoundCategory, number> = new Map([
    ['environment', 1],
    ['tower', 1],
    ['ball', 1],
    ['ui', 1],
    ['race', 1],
    ['win', 1],
  ])
  private masterVolume = 1
  private muted = false
  private initialized = false

  async initialize() {
    if (this.initialized) return

    Howler.autoUnlock = true
    Howler.html5PoolSize = 10

    const preloadPromises = Object.entries(SOUND_DEFINITIONS)
      .filter(([, config]) => config.preload)
      .map(([key, config]) => this.loadSound(key, config))

    await Promise.allSettled(preloadPromises)
    this.initialized = true
  }

  private async loadSound(key: string, config: SoundConfig): Promise<void> {
    return new Promise((resolve) => {
      const howl = new Howl({
        src: config.src,
        volume: (config.volume ?? 1) * this.getCategoryVolume(config.category ?? 'ui') * this.masterVolume,
        loop: config.loop ?? false,
        preload: true,
        onload: () => resolve(),
        onloaderror: () => resolve(),
      })

      this.sounds.set(key, howl)
    })
  }

  private getCategoryVolume(category: SoundCategory): number {
    return this.categoryVolumes.get(category) ?? 1
  }

  play(key: string, options?: { volume?: number; rate?: number; loop?: boolean }): number | null {
    let sound = this.sounds.get(key)

    if (!sound) {
      const config = SOUND_DEFINITIONS[key]
      if (!config) {
        console.warn(`Sound not defined: ${key}`)
        return null
      }

      sound = new Howl({
        src: config.src,
        volume: (config.volume ?? 1) * this.getCategoryVolume(config.category ?? 'ui') * this.masterVolume,
        loop: config.loop ?? false,
      })
      this.sounds.set(key, sound)
    }

    if (options?.volume !== undefined) sound.volume(options.volume * this.masterVolume)
    if (options?.rate !== undefined) sound.rate(options.rate)
    if (options?.loop !== undefined) sound.loop(options.loop)

    const id = sound.play()
    return typeof id === 'number' ? id : null
  }

  stop(key: string, id?: number) {
    const sound = this.sounds.get(key)
    if (sound) {
      if (id !== undefined) sound.stop(id)
      else sound.stop()
    }
  }

  pause(key: string, id?: number) {
    const sound = this.sounds.get(key)
    if (sound) {
      if (id !== undefined) sound.pause(id)
      else sound.pause()
    }
  }

  setVolume(key: string, volume: number) {
    const sound = this.sounds.get(key)
    if (sound) sound.volume(volume * this.masterVolume)
  }

  setCategoryVolume(category: SoundCategory, volume: number) {
    this.categoryVolumes.set(category, Math.max(0, Math.min(1, volume)))
    this.sounds.forEach((sound, key) => {
      const config = SOUND_DEFINITIONS[key]
      if (config?.category === category) {
        sound.volume((config.volume ?? 1) * volume * this.masterVolume)
      }
    })
  }

  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume))
    Howler.volume(this.masterVolume)
  }

  setMuted(muted: boolean) {
    this.muted = muted
    Howler.mute(muted)
  }

  isMuted(): boolean {
    return this.muted
  }

  getMasterVolume(): number {
    return this.masterVolume
  }

  unload(key: string) {
    const sound = this.sounds.get(key)
    if (sound) {
      sound.unload()
      this.sounds.delete(key)
    }
  }

  unloadAll() {
    this.sounds.forEach((sound) => sound.unload())
    this.sounds.clear()
  }
}

export const audioManager = new AudioManager()

export function useAudio() {
  return {
    play: audioManager.play.bind(audioManager),
    stop: audioManager.stop.bind(audioManager),
    pause: audioManager.pause.bind(audioManager),
    setVolume: audioManager.setVolume.bind(audioManager),
    setCategoryVolume: audioManager.setCategoryVolume.bind(audioManager),
    setMasterVolume: audioManager.setMasterVolume.bind(audioManager),
    setMuted: audioManager.setMuted.bind(audioManager),
    isMuted: audioManager.isMuted.bind(audioManager),
    initialize: audioManager.initialize.bind(audioManager),
  }
}