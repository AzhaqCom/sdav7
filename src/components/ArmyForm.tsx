import { useState } from 'react';
import { supabase } from '@/lib/supabase';
interface ArmyRules {
  name: string;
  description: string;
}
export function ArmyForm() {
  
  const [formData, setFormData] = useState({
    name: '',
    armyRules: [] as ArmyRules[],
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const addArmyRules = () => {
    setFormData(prev => ({
      ...prev,
      armyRules: [...prev.armyRules, { name: '', description: '' }]
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase
      .from('armies')
      .insert([{  name: formData.name,
        armyRules:formData.armyRules
       }]);

    if (error) {
      console.error('Error adding army:', error);
      setStatus('error');
      return;
    }

    setStatus('success');
    setFormData({
      name: '',
      armyRules: []
    });
    setTimeout(() => setStatus('idle'), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="armyName" className="block text-sm font-medium text-gray-700 dark:text-white">
          Nom d'armée
        </label>
        <input
          type="text"
          id="armyName"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:bg-gray-700"
          required
        />
             {/* armyrule*/}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium dark:text-white">Regle d'arme</h3>
          <button
            type="button"
            onClick={addArmyRules}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-white"
          >
           Ajouter une règle d'armée
          </button>
        </div>
        {formData.armyRules.map((action, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              value={action.name}
              onChange={(e) => {
                const newActions = [...formData.armyRules];
                newActions[index] = { ...action, name: e.target.value };
                setFormData(prev => ({ ...prev, armyRules: newActions }));
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:bg-gray-700"
              placeholder="Action name"
            />
            <textarea
              value={action.description}
              onChange={(e) => {
                const newActions = [...formData.armyRules];
                newActions[index] = { ...action, description: e.target.value };
                setFormData(prev => ({ ...prev, armyRules: newActions }));
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:bg-gray-700"
              placeholder="Action description"
              rows={2}
            />
          </div>
        ))}
      </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
      >
        {status === 'loading' ? 'Adding...' : 'Add Army'}
      </button>

      {status === 'success' && (
        <p className="text-green-600">Army added successfully!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600">Error adding army. Please try again.</p>
      )}
    </form>
  );
}