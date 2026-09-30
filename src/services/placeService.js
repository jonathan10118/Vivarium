/**
 * Serviço de gerenciamento de locais do Vivarium
 * Trabalha com localStorage e dados mockados
 */

import storageService from './storageService';
import { mockPlaces } from '../data';

class PlaceService {
  /**
   * Inicializa os dados mockados se não existirem
   */
  initializeMockData() {
    const places = storageService.getPlaces();
    if (places.length === 0) {
      storageService.setPlaces(mockPlaces);
    }
  }

  /**
   * Obtém todos os locais
   */
  getAllPlaces() {
    return storageService.getPlaces();
  }

  /**
   * Obtém local por ID
   */
  getPlaceById(placeId) {
    const places = storageService.getPlaces();
    return places.find(p => p.id === placeId);
  }

  /**
   * Filtra locais por categoria
   */
  getPlacesByCategory(category) {
    const places = storageService.getPlaces();
    if (category === 'all') return places;
    return places.filter(p => p.category === category);
  }

  /**
   * Busca locais por termo
   */
  searchPlaces(searchTerm) {
    const places = storageService.getPlaces();
    const term = searchTerm.toLowerCase();
    return places.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.address.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }
}

export default new PlaceService();
