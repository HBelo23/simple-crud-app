import { useState, useEffect, useCallback } from 'react';
import { Person } from '@/types/Person';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPeople = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/pessoas`);
      if (!response.ok) throw new Error('Erro ao buscar pessoas');
      const data = await response.json();
      setPeople(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      // Fallback para dados mockados quando API não está disponível
      setPeople([
        { id: 1, nome: 'João Silva', idade: 28, cidade: 'São Paulo' },
        { id: 2, nome: 'Maria Santos', idade: 34, cidade: 'Rio de Janeiro' },
        { id: 3, nome: 'Pedro Costa', idade: 22, cidade: 'Belo Horizonte' },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addPerson = async (person: Omit<Person, 'id'>): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/pessoas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person),
      });
      if (!response.ok) throw new Error('Erro ao cadastrar pessoa');
      await fetchPeople();
      return true;
    } catch (err) {
      // Fallback: adiciona localmente
      const newPerson = { ...person, id: Date.now() };
      setPeople(prev => [...prev, newPerson]);
      return true;
    }
  };

  const deletePerson = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/pessoas/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar pessoa');
      await fetchPeople();
      return true;
    } catch (err) {
      // Fallback: remove localmente
      setPeople(prev => prev.filter(p => p.id !== id));
      return true;
    }
  };

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  return { people, loading, error, addPerson, deletePerson, refetch: fetchPeople };
}
