import { Stats } from '@/types/gameStats';
import { Plus, Minus } from 'lucide-react';


interface StatsTableProps {
  stats: Stats;
  figurineId?: number;
  onStatChange?: (stat: keyof Pick<Stats,'defense' | 'power' | 'vitality' | 'destiny' | 'life'>, value: number) => void;
  isEditable?: boolean;
}

export function StatsTable({ stats, onStatChange, isEditable = false }: StatsTableProps) {
  
  const renderStatCell = (stat: keyof Pick<Stats, 'defense' |'power' | 'vitality' | 'destiny' | 'life'>) => {
    if (!isEditable) {
      return <td className="px-2 py-1 text-center dark:text-gray-200">{stats[stat]}</td>;
    }

    return (
      <td className="px-2 py-1 text-center">
        <div className="flex items-center justify-center">
          <button
            onClick={() => onStatChange?.(stat, (stats[stat] as number) - 1)}
            className="p-1 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-200 disabled:opacity-50"
            disabled={(stats[stat] as number) <= 0}
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-6 text-center dark:text-gray-200">{stats[stat]}</span>
          <button
            onClick={() => onStatChange?.(stat, (stats[stat] as number) + 1)}
            className="p-1 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </td>
    );
  };

  return (
    <div className="space-y-3">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b dark:border-gray-600">
            <th className="px-2 py-1 text-gray-600 dark:text-white">M</th>
            <th className="px-2 py-1 text-gray-600 dark:text-white">C</th>
            <th className="px-2 py-1 text-gray-600 dark:text-white">T</th>
            <th className="px-2 py-1 text-gray-600 dark:text-white">F</th>
            <th className="px-2 py-1 text-gray-600 dark:text-white">D</th>
            <th className="px-2 py-1 text-gray-600 dark:text-white">A</th>
            <th className="px-2 py-1 text-gray-600 dark:text-white">B</th>
            <th className="px-2 py-1 text-gray-600 dark:text-white">I</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-2 py-1 text-center dark:text-gray-200">{stats.movement}</td>
            <td className="px-2 py-1 text-center dark:text-gray-200">{stats.combat}</td>
            <td className="px-2 py-1 text-center dark:text-gray-200">{stats.toughness}</td>
            <td className="px-2 py-1 text-center dark:text-gray-200">{stats.fight}</td>
            <td className="px-2 py-1 text-center dark:text-gray-200">{stats.defense}</td>
            <td className="px-2 py-1 text-center dark:text-gray-200">{stats.attacks}</td>
            <td className="px-2 py-1 text-center dark:text-gray-200">{stats.bravery}</td>
            <td className="px-2 py-1 text-center dark:text-gray-200">{stats.injury}</td>
          </tr>
        </tbody>
      </table>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b dark:border-gray-600">
            <th className="px-2 py-1 text-gray-600 dark:text-white">P</th>
            <th className="px-2 py-1 text-gray-600 dark:text-white">V</th>
            <th className="px-2 py-1 text-gray-600 dark:text-white">D</th>
            <th className="px-2 py-1 text-gray-600 dark:text-white">PV</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {renderStatCell('power')}
            {renderStatCell('vitality')}
            {renderStatCell('destiny')}
            {renderStatCell('life')}
          </tr>
        </tbody>
      </table>
    </div>
  );
}