import React from 'react';

const EQUIPMENT_OPTIONS = [
  'Bow',
  'Heavy Armor',
  'Light Armor',
  'Shield',
  'Hand Weapon',
  'Elven Sword',
  'Spear',
  'Pike',
  'Two-handed Weapon',
  'Throwing Weapons',
] as const;

interface EquipmentInputProps {
  equipment: string[];
  onChange: (equipment: string[]) => void;
}

export function EquipmentInput({ equipment, onChange }: EquipmentInputProps) {
  const handleEquipmentChange = (item: string) => {
    if (equipment.includes(item)) {
      onChange(equipment.filter(e => e !== item));
    } else {
      onChange([...equipment, item]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Equipment</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {EQUIPMENT_OPTIONS.map((item) => (
          <label key={item} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={equipment.includes(item)}
              onChange={() => handleEquipmentChange(item)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="text-sm font-medium text-gray-700">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}