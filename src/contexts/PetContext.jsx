/**
 * Contexto de Pets do Vivarium
 * Gerencia o estado de pets globalmente
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { petService } from '../services';

const PetContext = createContext(null);

export function PetProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carrega pets ao inicializar
    loadPets();
  }, []);

  const loadPets = () => {
    const allPets = petService.getAllPets();
    setPets(allPets);
    setIsLoading(false);
  };

  const getUserPets = (userId) => {
    return petService.getPetsByUserId(userId);
  };

  const getPetById = (petId) => {
    return petService.getPetById(petId);
  };

  const createPet = async (petData) => {
    const result = await petService.createPet(petData);
    if (result.success) {
      loadPets();
    }
    return result;
  };

  const updatePet = async (petId, updatedData) => {
    const result = await petService.updatePet(petId, updatedData);
    if (result.success) {
      loadPets();
    }
    return result;
  };

  const deletePet = async (petId) => {
    const result = await petService.deletePet(petId);
    if (result.success) {
      loadPets();
    }
    return result;
  };

  const value = {
    pets,
    isLoading,
    getUserPets,
    getPetById,
    createPet,
    updatePet,
    deletePet,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}

export function usePets() {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePets deve ser usado dentro de um PetProvider');
  }
  return context;
}
