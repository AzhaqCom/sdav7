import { Stats } from './gameStats';

export interface Army {
  id: number;
  name: string;
  rules?: ArmyRule[];
}

export interface ArmyRule {
  id: number;
  army_id: number;
  name: string;
  description: string;
}

export interface Figurine {
  id: number;
  army_id: number;
  name: string;
  points: number;
  stats: Stats;
  equipment: Equipment[];
  heroicActions: number[];
  specialRules: SpecialRule[];
  upgrades?: FigurineUpgrade[];
}

export interface Equipment {
  name: string;
  description: string;
}

export interface HeroicJson {
  id: number;
  nom: string;
  effet: string;
}

export interface SpecialRule {
  name: string;
  description: string;
  isActive: boolean;
}

export interface FigurineUpgrade {
  id: number;
  figurine_id: number;
  name: string;
  type_id: number;
  points: number;
  stats_json?: Stats;
  rule_description?: string;
}

export interface SelectedFigurine extends Figurine {
  armyName: string;
  heroicActionsNames?: HeroicJson[];
  selectedUpgrades?: FigurineUpgrade[];
}

export interface UpgradeType {
  id: number;
  name: string;
}