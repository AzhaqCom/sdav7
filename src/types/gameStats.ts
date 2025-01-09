// Game statistics types
export interface Stats {
  movement: number;
  combat: number;
  toughness?: string; // e.g., "3+"
  fight: number;
  defense: number;
  attacks: number;
  bravery: string; // e.g., "5+"
  injury?: string; // e.g., "5+"
  power?: number;
  vitality?: number;
  destiny?: number;
  life:number;
}

export interface Equipment {
  name: string;
  description: string;
}

export interface HeroicAction {
  name: string;
  description: string;
}

export interface SpecialRule {
  name: string;
  description: string;
  isActive: boolean;
}
export interface armyRules{
  name:string;
  description:string;
}