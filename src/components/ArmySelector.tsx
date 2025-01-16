import { Army } from '@/types';

interface ArmySelectorProps {
  armies: Army[];
  selectedArmy: number | null;
  onArmyChange: (armyId: number) => void;
}

export function ArmySelector({ armies, selectedArmy, onArmyChange }: ArmySelectorProps) {
  return (
    <div>
      <label htmlFor="army" className="block text-sm font-medium text-gray-700 dark:text-white">
        Selectionnez une armée
      </label>
      <select
        id="army"
        value={selectedArmy || ''}
        onChange={(e) => onArmyChange(Number(e.target.value))}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      >
        <option value="">Select an army...</option>
        {armies.map((army) => (
          <option key={army.id} value={army.id}>
            {army.name}
          </option>
        ))}
      </select>
    </div>
  );
}