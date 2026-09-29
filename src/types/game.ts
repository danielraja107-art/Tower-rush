export type GameState =
  | 'LOADING'
  | 'HOME'
  | 'TOWER_SELECTION'
  | 'BALL_SELECTION'
  | 'WAGER_SELECTION'
  | 'ROUND_CONFIRMATION'
  | 'COUNTDOWN'
  | 'RACING'
  | 'FINISH_DETECTION'
  | 'RESULT'
  | 'CELEBRATION'
  | 'ROUND_COMPLETE';

export type BallId = 'ruby' | 'sapphire' | 'emerald' | 'amber';
export type TowerId = 'timber-cascade' | 'spiral-timber' | 'forest-switchback';

export interface Ball {
  id: BallId;
  name: string;
  color: string;
  emissiveColor?: string;
  metalness: number;
  roughness: number;
}

export const BALLS: Record<BallId, Ball> = {
  ruby: {
    id: 'ruby',
    name: 'RUBY',
    color: '#c0392b',
    metalness: 0.9,
    roughness: 0.1,
  },
  sapphire: {
    id: 'sapphire',
    name: 'SAPPHIRE',
    color: '#2980b9',
    metalness: 0.9,
    roughness: 0.1,
  },
  emerald: {
    id: 'emerald',
    name: 'EMERALD',
    color: '#27ae60',
    metalness: 0.9,
    roughness: 0.1,
  },
  amber: {
    id: 'amber',
    name: 'AMBER',
    color: '#f39c12',
    metalness: 0.9,
    roughness: 0.1,
  },
};

export interface Tower {
  id: TowerId;
  name: string;
  description: string;
  previewImage?: string;
}

export const TOWERS: Record<TowerId, Tower> = {
  'timber-cascade': {
    id: 'timber-cascade',
    name: 'TIMBER CASCADE',
    description: 'Classic wooden race tower with broad ramps and alternating levels.',
  },
  'spiral-timber': {
    id: 'spiral-timber',
    name: 'SPIRAL TIMBER',
    description: 'Tall circular tower with spiral ramps and layered platforms.',
  },
  'forest-switchback': {
    id: 'forest-switchback',
    name: 'FOREST SWITCHBACK',
    description: 'Cinematic outdoor tower with zig-zag switchbacks and bridge sections.',
  },
};

export interface WagerOption {
  value: number;
  label: string;
}

export const WAGER_OPTIONS: WagerOption[] = [
  { value: 1, label: '$1' },
  { value: 5, label: '$5' },
  { value: 10, label: '$10' },
  { value: 25, label: '$25' },
  { value: 50, label: '$50' },
];

export interface RoundData {
  roundId: string;
  towerId: TowerId;
  selectedBallId: BallId;
  wagerAmount: number;
  virtualBalanceBefore: number;
  virtualBalanceAfter: number;
  raceStartTime: number;
  raceEndTime: number | null;
  winnerBallId: BallId | null;
  selectedBallWon: boolean | null;
  resultAmount: number;
  roundStatus: 'pending' | 'racing' | 'complete' | 'cancelled';
}

export interface GameConfig {
  demoBalance: number;
  minWager: number;
  maxWager: number;
  winMultiplier: number;
  countdownDuration: number;
}

export const DEFAULT_CONFIG: GameConfig = {
  demoBalance: 250.00,
  minWager: 1,
  maxWager: 50,
  winMultiplier: 2.0,
  countdownDuration: 3000,
};

export interface PhysicsConfig {
  gravity: { x: number; y: number; z: number };
  ballMass: number;
  ballRadius: number;
  ballRestitution: number;
  ballFriction: number;
  fixedTimeStep: number;
  maxSubSteps: number;
}

export const PHYSICS_CONFIG: PhysicsConfig = {
  gravity: { x: 0, y: -9.81, z: 0 },
  ballMass: 1.0,
  ballRadius: 0.5,
  ballRestitution: 0.3,
  ballFriction: 0.4,
  fixedTimeStep: 1 / 60,
  maxSubSteps: 4,
};

export interface CameraConfig {
  overview: { position: [number, number, number]; target: [number, number, number]; fov: number };
  chase: { offset: [number, number, number]; lookAhead: number; smoothness: number };
  finish: { position: [number, number, number]; target: [number, number, number]; fov: number };
}

export const CAMERA_CONFIG: CameraConfig = {
  overview: {
    position: [0, 25, 30],
    target: [0, 5, 0],
    fov: 50,
  },
  chase: {
    offset: [3, 4, 8],
    lookAhead: 5,
    smoothness: 0.1,
  },
  finish: {
    position: [0, 3, 10],
    target: [0, 1, 0],
    fov: 40,
  },
};

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface RaceResult {
  winnerId: BallId;
  finishTimes: Record<BallId, number>;
  selectedBallWon: boolean;
  payout: number;
}