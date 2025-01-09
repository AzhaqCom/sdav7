import { useState } from 'react';
import { ArmyForm } from '@/components/ArmyForm';
import { FigurineForm } from '@/components/FigurineForm';

export function AdminInterface() {
  const [activeTab, setActiveTab] = useState<'army' | 'figurine'>('army');

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('army')}
              className={`${
                activeTab === 'army'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Add Army
            </button>
            <button
              onClick={() => setActiveTab('figurine')}
              className={`${
                activeTab === 'figurine'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Add Figurine
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'army' ? <ArmyForm /> : <FigurineForm />}
    </div>
  );
}