import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Army, UpgradeType } from '@/types';
import { Stats } from '@/types/gameStats';
import { StatsInput } from './FigurineForm/StatsInput';
import { UpgradeInput } from './FigurineForm/UpgradeInput';

interface HeroicAction {
  id: number;
  nom: string;
  effet: string;
}
interface Equipment {
  name: string;
  description: string;
}
interface SpecialRule {
  name: string;
  description: string;
  isActive: boolean;
}

interface FigurineUpgrade {
  name: string;
  type_id: number;
  points: number;
  stats_json?: Stats;
  rule_description?: string;
}

export function FigurineForm() {
  const [armies, setArmies] = useState<Army[]>([]);
  const [actions, setActions] = useState<HeroicAction[]>([]);
  const [upgradeTypes, setUpgradeTypes] = useState<UpgradeType[]>([]);
  const [formData, setFormData] = useState({
    army_id: '',
    name: '',
    points: '',
    stats: {
      movement: 6,
      combat: 4,
      toughness: '4+',
      fight: 3,
      defense: 4,
      attacks: 2,
      bravery: '6+',
      injury: '6+',
      power: 2,
      vitality: 1,
      destiny: 1,
      life: 2
    } as Stats,
    equipment: [] as Equipment[],
    heroicActions: [] as number[],
    specialRules: [] as SpecialRule[],
    upgrades: [] as FigurineUpgrade[]
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  // State for UpgradeInput
  const [upgradeName, setUpgradeName] = useState('');
  const [upgradeTypeId, setUpgradeTypeId] = useState<number | ''>('');
  const [upgradePoints, setUpgradePoints] = useState<number>(0);
  const [upgradeStats, setUpgradeStats] = useState<Stats | undefined>();
  const [upgradeRuleDescription, setUpgradeRuleDescription] = useState('');

  useEffect(() => {
    fetchArmies();
    fetchActions();
    fetchUpgradeTypes();
  }, []);

  async function fetchArmies() {
    const { data, error } = await supabase
      .from('armies')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching armies:', error);
      return;
    }

    setArmies(data);
  }

  async function fetchActions() {
    const { data, error } = await supabase
      .from('actions_heroiques')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching actions:', error);
      return;
    }

    setActions(data);
  }

  async function fetchUpgradeTypes() {
    const { data, error } = await supabase
      .from('upgrade_types')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching upgrade types:', error);
      return;
    }

    setUpgradeTypes(data);
  }

  const addEquipment = () => {
    setFormData(prev => ({
      ...prev,
      equipment: [...prev.equipment, { name: '', description: '' }]
    }));
  };

  const addSpecialRule = () => {
    setFormData(prev => ({
      ...prev,
      specialRules: [...prev.specialRules, { name: '', description: '', isActive: true }]
    }));
  };

  const handleAddUpgrade = (upgrade: FigurineUpgrade) => {
    setFormData(prev => ({
      ...prev,
      upgrades: [...prev.upgrades, upgrade]
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    // First, insert the figurine
    const { data: figurineData, error: figurineError } = await supabase
      .from('figurines')
      .insert([{
        army_id: parseInt(formData.army_id),
        name: formData.name,
        points: parseInt(formData.points),
        stats: formData.stats,
        equipment: formData.equipment,
        heroicActions: formData.heroicActions,
        specialRules: formData.specialRules
      }])
      .select()
      .single();

    if (figurineError) {
      console.error('Error adding figurine:', figurineError);
      setStatus('error');
      return;
    }

    // Then, insert all upgrades for this figurine
    if (formData.upgrades.length > 0) {
      const { error: upgradesError } = await supabase
        .from('upgrades')
        .insert(
          formData.upgrades.map(upgrade => ({
            ...upgrade,
            figurine_id: figurineData.id
          }))
        );

      if (upgradesError) {
        console.error('Error adding upgrades:', upgradesError);
        setStatus('error');
        return;
      }
    }

    setStatus('success');
    setFormData({
      army_id: '',
      name: '',
      points: '',
      stats: {
        movement: 0,
        combat: 0,
        toughness: '0+',
        fight: 0,
        defense: 0,
        attacks: 0,
        bravery: '0+',
        injury: '0+',
        power: 0,
        vitality: 0,
        destiny: 0,
        life: 0
      },
      equipment: [],
      heroicActions: [],
      specialRules: [],
      upgrades: []
    });
    setTimeout(() => setStatus('idle'), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Existing form fields */}
      <div>
        <label htmlFor="army" className="block text-sm font-medium text-gray-700">
          Army
        </label>
        <select
          id="army"
          value={formData.army_id}
          onChange={(e) => setFormData(prev => ({ ...prev, army_id: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select an army...</option>
          {armies.map((army) => (
            <option key={army.id} value={army.id}>
              {army.name}
            </option>
          ))}
        </select>
      </div>



      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Figurine Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="points" className="block text-sm font-medium text-gray-700">
          Points
        </label>
        <input
          type="number"
          id="points"
          value={formData.points}
          onChange={(e) => setFormData(prev => ({ ...prev, points: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="0"
        />
      </div>

      <StatsInput
        stats={formData.stats}
        onChange={(stats) => setFormData(prev => ({ ...prev, stats }))}
      />
      <div>
        <h3 className="text-lg font-medium">Actions héroïques</h3>
        <ul className="list-none space-y-2">
          {actions.map((action) => (
            <li key={action.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`action-${action.id}`}
                name="heroicActions"
                value={action.id}
                checked={formData.heroicActions.includes(action.id)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setFormData((prev) => {
                    const updatedActions = isChecked
                      ? [...prev.heroicActions, action.id]
                      : prev.heroicActions.filter((id) => id !== action.id);

                    return {
                      ...prev,
                      heroicActions: updatedActions,
                    };
                  });
                }}
                className="w-4 h-4"
              />
              <label htmlFor={`action-${action.id}`} className="cursor-pointer">
                <strong>{action.nom}</strong>
              </label>
            </li>
          ))}
        </ul>
      </div>
      {/* Equipment section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Equipment</h3>
          <button
            type="button"
            onClick={addEquipment}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Add Equipment
          </button>
        </div>
        {formData.equipment.map((equipment, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              value={equipment.name}
              onChange={(e) => {
                const newEquipment = [...formData.equipment];
                newEquipment[index] = { ...equipment, name: e.target.value };
                setFormData(prev => ({ ...prev, equipment: newEquipment }));
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Equipment name"
            />
            <textarea
              value={equipment.description}
              onChange={(e) => {
                const newEquipment = [...formData.equipment];
                newEquipment[index] = { ...equipment, description: e.target.value };
                setFormData(prev => ({ ...prev, equipment: newEquipment }));
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Equipment description"
              rows={3}
            />
          </div>
        ))}
      </div>

      {/* Special Rules section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Special Rules</h3>
          <button
            type="button"
            onClick={addSpecialRule}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Add Special Rule
          </button>
        </div>
        {formData.specialRules.map((rule, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              value={rule.name}
              onChange={(e) => {
                const newRules = [...formData.specialRules];
                newRules[index] = { ...rule, name: e.target.value };
                setFormData(prev => ({ ...prev, specialRules: newRules }));
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Rule name"
            />
            <textarea
              value={rule.description}
              onChange={(e) => {
                const newRules = [...formData.specialRules];
                newRules[index] = { ...rule, description: e.target.value };
                setFormData(prev => ({ ...prev, specialRules: newRules }));
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Rule description"
              rows={3}
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rule.isActive}
                onChange={(e) => {
                  const newRules = [...formData.specialRules];
                  newRules[index] = { ...rule, isActive: e.target.checked };
                  setFormData(prev => ({ ...prev, specialRules: newRules }));
                }}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>
        ))}
      </div>

      {/* Upgrades section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Upgrades</h3>
        <UpgradeInput
          upgradeTypes={upgradeTypes}
          onAdd={handleAddUpgrade}
          name={upgradeName}
          setName={setUpgradeName}
          typeId={upgradeTypeId}
          setTypeId={setUpgradeTypeId}
          points={upgradePoints}
          setPoints={setUpgradePoints}
          stats={upgradeStats}
          setStats={setUpgradeStats}
          ruleDescription={upgradeRuleDescription}
          setRuleDescription={setUpgradeRuleDescription}
        />
        {formData.upgrades.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Added Upgrades</h4>
            <ul className="space-y-2">
              {formData.upgrades.map((upgrade, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>{upgrade.name} ({upgrade.points} pts)</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        upgrades: prev.upgrades.filter((_, i) => i !== index)
                      }));
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
      >
        {status === 'loading' ? 'Adding...' : 'Add Figurine'}
      </button>

      {status === 'success' && (
        <p className="text-green-600">Figurine added successfully!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600">Error adding figurine. Please try again.</p>
      )}
    </form>
  );
}