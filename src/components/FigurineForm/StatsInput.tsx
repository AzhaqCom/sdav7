import React from 'react';
import { Stats } from '@/types/gameStats';

interface StatsInputProps {
  stats: Stats;
  onChange: (stats: Stats) => void;
}

export function StatsInput({ stats, onChange }: StatsInputProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Stats</h3>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">M</label>
          <input
            type="number"
            value={stats.movement}
            onChange={(e) => onChange({ ...stats, movement: parseInt(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">C</label>
          <input
            type="number"
            value={stats.combat}
            onChange={(e) => onChange({ ...stats, combat: parseInt(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">T</label>
          <input
            type="text"
            value={stats.toughness}
            onChange={(e) => onChange({ ...stats, toughness: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="3+"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">F</label>
          <input
            type="number"
            value={stats.fight}
            onChange={(e) => onChange({ ...stats, fight: parseInt(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">D</label>
          <input
            type="number"
            value={stats.defense}
            onChange={(e) => onChange({ ...stats, defense: parseInt(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">A</label>
          <input
            type="number"
            value={stats.attacks}
            onChange={(e) => onChange({ ...stats, attacks: parseInt(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">B</label>
          <input
            type="text"
            value={stats.bravery}
            onChange={(e) => onChange({ ...stats, bravery: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="5+"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">I</label>
          <input
            type="text"
            value={stats.injury}
            onChange={(e) => onChange({ ...stats, injury: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="5+"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">P</label>
          <input
            type="number"
            value={stats.power}
            onChange={(e) => onChange({ ...stats, power: parseInt(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">V</label>
          <input
            type="number"
            value={stats.vitality}
            onChange={(e) => onChange({ ...stats, vitality: parseInt(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">D</label>
          <input
            type="number"
            value={stats.destiny}
            onChange={(e) => onChange({ ...stats, destiny: parseInt(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">PV</label>
          <input
            type="number"
            value={stats.life}
            onChange={(e) => onChange({ ...stats, life: parseInt(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}