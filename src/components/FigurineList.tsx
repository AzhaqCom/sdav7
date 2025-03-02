import { useState } from 'react';
import { FigurineUpgrade, SelectedFigurine } from '@/types';
import { StatsTable } from './StatsTable';
import { ChevronDown, ChevronUp, Trash } from 'lucide-react';
import { Stats } from '@/types/gameStats';
import { ArmyRulesModal } from './ArmyRulesModal';

interface FigurineListProps {
  figurines: SelectedFigurine[];
  onRemove: (index: number) => void;
  modifiedStats: Record<number, Partial<Stats>>;
  setModifiedStats: React.Dispatch<React.SetStateAction<Record<number, Partial<Stats>>>>;
}

export function FigurineList({ figurines, onRemove, modifiedStats, setModifiedStats }: FigurineListProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArmyName, setSelectedArmyName] = useState('');

  const toggleExpand = (index: number, type: string) => {
    const key = `${index}-${type}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleStatChange = (figurineId: number, stat: keyof Pick<Stats, 'defense' | 'power' | 'vitality' | 'destiny' | 'life'>, value: number) => {
    setModifiedStats(prev => ({
      ...prev,
      [figurineId]: {
        ...prev[figurineId],
        [stat]: value
      }
    }));
  };

  const getModifiedStats = (figurine: SelectedFigurine) => {
    const modified = modifiedStats[figurine.id] || {};
    return {
      ...figurine.stats,
      power: modified.power ?? figurine.stats.power,
      vitality: modified.vitality ?? figurine.stats.vitality,
      destiny: modified.destiny ?? figurine.stats.destiny,
      life: modified.life ?? figurine.stats.life,
      defense: modified.defense ?? figurine.stats.defense
    };
  };

  const handleArmyNameClick = (armyName: string) => {
    setSelectedArmyName(armyName);
    setModalOpen(true);
  };

  function handleToggleOption(figurineId: number, upgrade: FigurineUpgrade) {

    setModifiedStats(prev => {
      const currentStats = prev[figurineId] || {};
      const baseFigurine = figurines.find(fig => fig.id === figurineId);
  
      if (!baseFigurine) return prev;
      if (upgrade.type_id === 1) {
        if (upgrade.modified_stat && upgrade.modification_value !== undefined) {
       
          const statKey = upgrade.modified_stat as keyof Stats;
          const baseValue = baseFigurine.stats[statKey];
          const isActive = selectedOptions.includes(upgrade.id);
          const modValue = upgrade.modification_value;
  
          if (typeof baseValue === 'number') {
            const newValue = isActive
              ? baseValue // Revenir à la valeur de base si l'option est désactivée
              : baseValue + modValue; // Appliquer la modification si l'option est activée
  
            return {
              ...prev,
              [figurineId]: {
                ...currentStats,
                [statKey]: newValue,
              },
            };
          }
        } 
      }
  
      return prev;
    });
  
    setSelectedOptions(prev =>
      prev.includes(upgrade.id)
        ? prev.filter(id => id !== upgrade.id)
        : [...prev, upgrade.id]
    );
  }
  return (
    <div className="bg-white dark:bg-gray-800 py-4 px-3 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold dark:text-white">Figurines Sélectionnées</h2>
      </div>

      {figurines.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Aucune figurine sélectionnée</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {figurines.map((figurine, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium dark:text-white">{figurine.name}</h3>
                  <button
                    onClick={() => handleArmyNameClick(figurine.armyName)}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {figurine.armyName}
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium dark:text-gray-200">{figurine.points} pts</span>
                  <button
                    onClick={() => onRemove(index)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <StatsTable
                stats={getModifiedStats(figurine)}
                figurineId={figurine.id}
                onStatChange={(stat, value) => handleStatChange(figurine.id, stat, value)}
                isEditable={true}
              />

              {/* Equipment Section */}
              {figurine.equipment && figurine.equipment.length > 0 && (
                <div className="mt-4 border-b pb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-white mb-2">Équipement</h4>
                  <ul className="space-y-2">
                    {figurine.equipment.map((equip, equipIndex) => (
                      equip.description && equip.description.trim() !== "" ? (
                        <li key={equipIndex}>
                          <button
                            onClick={() => toggleExpand(index, `equipment-${equipIndex}`)}
                            className="w-full text-left"
                          >
                            <div className="flex items-center justify-between text-sm text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
                              <span>{equip.name}</span>
                              {expandedItems[`${index}-equipment-${equipIndex}`] ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </div>
                          </button>
                          {expandedItems[`${index}-equipment-${equipIndex}`] && (
                            <p className="mt-1 text-sm text-gray-600 dark:text-white pl-4">
                              {equip.description}
                            </p>
                          )}
                        </li>
                      ) : (
                        <li key={equipIndex}>
                          <span className="text-sm text-gray-700 dark:text-white">{equip.name}</span>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions Héroïques Section */}
              {figurine.heroicActionsNames && figurine.heroicActionsNames.length > 0 && (
                <div className="mt-4 border-b pb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-white mb-2">Actions Héroïques</h4>
                  <ul className="space-y-2">
                    {figurine.heroicActionsNames.map((action, actionIndex) => (
                      <li key={actionIndex}>
                        <button
                          onClick={() => toggleExpand(index, `action-${actionIndex}`)}
                          className="w-full text-left"
                        >
                          <div className="flex items-center justify-between text-sm text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
                            <span>{action.nom}</span>
                            {expandedItems[`${index}-action-${actionIndex}`] ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </div>
                        </button>
                        {expandedItems[`${index}-action-${actionIndex}`] && (
                          <p className="mt-1 text-sm text-gray-600 dark:text-white pl-4">
                            {action.effet}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Règles Spéciales Section */}
              {figurine.specialRules && figurine.specialRules.length > 0 && (
                <div className="mt-4 border-b pb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-white mb-2">Règles Spéciales</h4>
                  <ul className="space-y-2">
                    {figurine.specialRules.map((rule, ruleIndex) => (
                      <li key={ruleIndex}>
                        <button
                          onClick={() => toggleExpand(index, `rule-${ruleIndex}`)}
                          className="w-full text-left"
                        >
                          <div className="flex items-center justify-between text-sm text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
                            <span>{rule.name}</span>
                            {expandedItems[`${index}-rule-${ruleIndex}`] ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </div>
                        </button>
                        {expandedItems[`${index}-rule-${ruleIndex}`] && (
                          <p className="mt-1 text-sm text-gray-600 dark:text-white pl-4">
                            {rule.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Upgrades Section */}
              {figurine.selectedUpgrades && figurine.selectedUpgrades.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-white mb-2">Options</h4>
                  <ul className="space-y-2">
                    {figurine.selectedUpgrades.map((upgrade, upgradeIndex) => (
                      <li key={upgradeIndex} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={`upgrade-${upgradeIndex}`}
                          checked={selectedOptions.includes(upgrade.id)}
                          onChange={() => handleToggleOption(figurine.id, upgrade)}
                          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                        />
                        <label htmlFor={`upgrade-${upgradeIndex}`} className="text-sm text-gray-700 dark:text-white">
                          {upgrade.name} ({upgrade.points})pts
                        </label>
                      </li>
                    ))}
                  </ul>

                  {/* Selected Options */}
                  {selectedOptions.length > 0 && figurine.selectedUpgrades.some(upgrade => selectedOptions.includes(upgrade.id) && upgrade.type_id !== 1) && (
                    <div className="mt-6 border-t pt-4">
                      <h5 className="text-sm font-medium text-gray-700 dark:text-white mb-2">Options sélectionnées</h5>
                      <ul className="space-y-2">
                        {figurine.selectedUpgrades
                          .filter(upgrade => selectedOptions.includes(upgrade.id) && upgrade.type_id !== 1)
                          .map((upgrade, upgradeIndex) => (
                            <li key={upgradeIndex}>
                              <button
                                onClick={() => toggleExpand(index, `upgrade-${upgradeIndex}`)}
                                className="w-full text-left"
                              >
                                <div className="flex items-center justify-between text-sm text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
                                  <span>{upgrade.name} ({upgrade.points})pts</span>
                                  {expandedItems[`${index}-upgrade-${upgradeIndex}`] ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </div>
                              </button>
                              {expandedItems[`${index}-upgrade-${upgradeIndex}`] && (
                                <div className="mt-1">
                                  {upgrade.type_id === 2 && upgrade.stats_json ? (
                                    <StatsTable stats={upgrade.stats_json} />
                                  ) : upgrade.type_id === 3 && upgrade.rule_description ? (
                                    <p className="text-sm text-gray-600 dark:text-white pl-4">
                                      {upgrade.rule_description}
                                    </p>
                                  ) : null}
                                </div>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ArmyRulesModal
        armyName={selectedArmyName}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}