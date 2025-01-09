import { Figurine } from '@/types';

interface FigurineSelectorProps {
  figurines: Figurine[];
  onAddFigurine: (figurineId: number) => void;
  disabled: boolean;
}

export function FigurineSelector({ figurines, onAddFigurine, disabled }: FigurineSelectorProps) {
  return (
    <div>
      <label htmlFor="figurine" className="block text-sm font-medium text-gray-700 dark:text-white">
        Selectionnez une figurine
      </label>
      <div className="mt-1 flex space-x-2">
        <select
          id="figurine"
          disabled={disabled}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          onChange={(e) => onAddFigurine(Number(e.target.value))}
          defaultValue=""
        >
          <option value="" disabled>
            {disabled ? 'Select an army first' : 'Select a figurine...'}
          </option>
          {figurines.map((figurine) => (
            <option key={figurine.id} value={figurine.id}>
              {figurine.name} ({figurine.points} pts)
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}