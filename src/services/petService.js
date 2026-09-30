/**
 * Serviço de gerenciamento de pets do Vivarium
 * Trabalha com localStorage e dados mockados
 */

import storageService from './storageService';
import { mockPets } from '../data';

class PetService {
  /**
   * Inicializa os dados mockados se não existirem
   */
  initializeMockData() {
    const pets = storageService.getPets();
    if (pets.length === 0) {
      storageService.setPets(mockPets);
    }
  }

  /**
   * Obtém todos os pets
   */
  getAllPets() {
    return storageService.getPets();
  }

  /**
   * Obtém pet por ID
   */
  getPetById(petId) {
    const pets = storageService.getPets();
    return pets.find(p => p.id === petId);
  }

  /**
   * Obtém pets de um usuário específico
   */
  getPetsByUserId(userId) {
    return storageService.getPetsByUserId(userId);
  }

  /**
   * Cadastra novo pet
   */
  async createPet(petData) {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));

    const newPet = {
      id: Date.now().toString(),
      ...petData,
      createdAt: new Date().toISOString(),
    };

    storageService.addPet(newPet);
    return { success: true, pet: newPet };
  }

  /**
   * Atualiza dados de um pet
   */
  async updatePet(petId, updatedData) {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));

    const success = storageService.updatePet(petId, updatedData);
    if (success) {
      const updatedPet = this.getPetById(petId);
      return { success: true, pet: updatedPet };
    }

    return { success: false, error: 'Pet não encontrado' };
  }

  /**
   * Remove um pet
   */
  async deletePet(petId) {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));

    const success = storageService.deletePet(petId);
    return { success: success };
  }
}

export default new PetService();
