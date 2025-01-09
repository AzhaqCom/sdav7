import { Stats } from '@/types/gameStats';
import { UpgradeType } from '@/types';
import { StatsInput } from './StatsInput';


interface UpgradeInputProps {
    upgradeTypes: UpgradeType[];
    onAdd: (upgrade: {
        name: string;
        type_id: number;
        points: number;
        stats_json?: Stats;
        rule_description?: string;
    }) => void;
    name: string;
    setName: (name: string) => void;
    typeId: number | '';
    setTypeId: (typeId: number | '') => void;
    points: number;
    setPoints: (points: number) => void;
    stats: Stats | undefined;
    setStats: (stats: Stats | undefined) => void;
    ruleDescription: string;
    setRuleDescription: (ruleDescription: string) => void;
}



export function UpgradeInput({ upgradeTypes, onAdd, name, setName, typeId, setTypeId, points, setPoints, stats, setStats, ruleDescription, setRuleDescription }: UpgradeInputProps) {

    const handleSubmit = () => {
        if (!name || !typeId) return;

        onAdd({
            name,
            type_id: Number(typeId),
            points,
            stats_json: typeId === 2 ? stats : undefined, // Mount type
            rule_description: typeId === 3 ? ruleDescription : undefined, // Rule type
        });

        // Reset form
        setName('');
        setTypeId('');
        setPoints(0);
        setStats(undefined);
        setRuleDescription('');
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Nom de l'amélioration
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Type d'amélioration
                </label>
                <select
                    value={typeId}
                    onChange={(e) => setTypeId(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    
                >
                    <option value="">Sélectionnez un type...</option>
                    {upgradeTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Points
                </label>
                <input
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    min="0"
                  
                />
            </div>

            {typeId === 2 && ( // Mount type
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Statistiques de la monture</h4>
                    <StatsInput
                        stats={stats || {
                            movement: 10,
                            combat: 2,
                            fight: 3,
                            defense: 4,
                            attacks: 0,
                            bravery: '7+',
                            life: 1
                        }}
                        onChange={setStats}
                    />
                </div>
            )}

            {typeId === 3 && ( // Rule type
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description de la règle
                    </label>
                    <textarea
                        value={ruleDescription}
                        onChange={(e) => setRuleDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={3}
                      
                    />
                </div>
            )}

            <button
                type="button"
                onClick={handleSubmit}
                className=" flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Ajouter l'amélioration
            </button>
        </div>
    );
}