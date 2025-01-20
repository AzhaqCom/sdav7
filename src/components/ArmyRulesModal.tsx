import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X } from 'lucide-react';

interface ArmyRulesModalProps {
  armyName: string;
  isOpen: boolean;
  onClose: () => void;
}

interface ArmyRule {
  name: string;
  description: string;
}

export function ArmyRulesModal({ armyName, isOpen, onClose }: ArmyRulesModalProps) {
  const [rules, setRules] = useState<ArmyRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchArmyRules();
    }
  }, [isOpen, armyName]);

  async function fetchArmyRules() {
    setLoading(true);

    const { data: army, error } = await supabase
      .from('armies')
      .select('armyRules')
      .eq('name', armyName)
      .single();

    if (error) {
      console.error('Error fetching army rules:', error);
      setRules([]);
    } else if (army && army.armyRules) {
      setRules(army.armyRules);
    } else {
      setRules([]);
    }

    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold dark:text-white">
            {armyName} - Army Rules
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
          {loading ? (
            <p className="text-center dark:text-white">Loading rules...</p>
          ) : rules.length > 0 ? (
            <div className="space-y-4">
              {rules.map((rule, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
                >
                  <h3 className="font-medium text-lg mb-2 dark:text-white">{rule.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{rule.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No rules found for this army.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
