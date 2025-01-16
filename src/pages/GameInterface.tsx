import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Army, Figurine, SelectedFigurine } from '@/types';
import { ArmySelector } from '@/components/ArmySelector';
import { FigurineSelector } from '@/components/FigurineSelector';
import { FigurineList } from '@/components/FigurineList';

export function GameInterface() {
  const [armies, setArmies] = useState<Army[]>([]);
  const [selectedArmy, setSelectedArmy] = useState<number | null>(null);
  const [figurines, setFigurines] = useState<Figurine[]>([]);
  const [selectedFigurines, setSelectedFigurines] = useState<SelectedFigurine[]>(() => {
    const saved = localStorage.getItem('selectedFigurines');
    return saved ? JSON.parse(saved) : [];
  });
  const [modifiedStats, setModifiedStats] = useState<Record<number, { defense: number,power: number, vitality: number, destiny: number, life:number }>>(() => {
    const saved = localStorage.getItem('modifiedStats');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    fetchArmies();
  }, []);

  useEffect(() => {
    if (selectedArmy) {
      fetchFigurines(selectedArmy);
    }
  }, [selectedArmy]);

  useEffect(() => {
    localStorage.setItem('selectedFigurines', JSON.stringify(selectedFigurines));
  }, [selectedFigurines]);

  useEffect(() => {
    localStorage.setItem('modifiedStats', JSON.stringify(modifiedStats));
  }, [modifiedStats]);

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
  async function fetchHeroicActions(heroicActionIds: number[]) {
    const { data, error } = await supabase
      .from('actions_heroiques')
      .select('id, nom, effet')
      .in('id', heroicActionIds); // Récupérer les actions héroïques par leurs IDs

    if (error) {
      console.error('Error fetching heroic actions:', error);
      return [];
    }
    return data;
  }
  async function fetchUpgrades(figurineId: number) {
    const { data, error } = await supabase
      .from('upgrades')
      .select('id, figurine_id, name, type_id, points, stats_json, rule_description')
      .eq('figurine_id', figurineId); // Filtrer par figurine_id
  
    if (error) {
      console.error('Error fetching upgrades:', error);
      return [];
    }
    return data;
  }
  async function fetchFigurines(armyId: number) {
    const { data, error } = await supabase
      .from('figurines')
      .select(`
        id,
        army_id,
        name,
        points,
        stats,
        equipment,
        heroicActions,
        specialRules
      `)
      .eq('army_id', armyId)
      .order('name');

    if (error) {
      console.error('Error fetching figurines:', error);
      return;
    }

    setFigurines(data);
  }

  function handleArmyChange(armyId: number) {
    setSelectedArmy(armyId);
  }

  async function handleAddFigurine(figurineId: number) {  
    const figurine = figurines.find(f => f.id === figurineId);
    if (!figurine) {
      console.error('Figurine non trouvée');
      return;
    }
  
    const army = armies.find(a => a.id === selectedArmy);
    if (!army) {
      console.error('Armée non trouvée');
      return;
    }
  
    const heroicActions = await fetchHeroicActions(figurine.heroicActions);
    const upgrades = await fetchUpgrades(figurine.id)
    const newFigurine: SelectedFigurine = {
      ...figurine,
      armyName: army.name,
      heroicActionsNames: heroicActions,
      selectedUpgrades:upgrades
    };
  
    setSelectedFigurines(prev => [...prev, newFigurine]);
  }

  function handleRemoveFigurine(index: number) {
    const figurineToRemove = selectedFigurines[index];

    // Supprimer la figurine de la liste
    setSelectedFigurines(prev => prev.filter((_, i) => i !== index));

    // Mettre à jour modifiedStats en supprimant la clé correspondante
    setModifiedStats(prev => {
      const newModifiedStats = { ...prev };
      delete newModifiedStats[figurineToRemove.id]; // Supprimer la clé

      // Sauvegarder dans localStorage
      localStorage.setItem('modifiedStats', JSON.stringify(newModifiedStats));

      return newModifiedStats; // Retourner la nouvelle version
    });
  }


  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Go jouer !</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ArmySelector
            armies={armies}
            selectedArmy={selectedArmy}
            onArmyChange={handleArmyChange}
          />

          <FigurineSelector
            figurines={figurines}
            onAddFigurine={handleAddFigurine}
            disabled={!selectedArmy}
          />
        </div>
      </div>

      <FigurineList
        figurines={selectedFigurines}
        onRemove={handleRemoveFigurine}
        modifiedStats={modifiedStats} // Passer modifiedStats au composant enfant
        setModifiedStats={setModifiedStats} // Passer setModifiedStats
      />
    </div>
  );
}
