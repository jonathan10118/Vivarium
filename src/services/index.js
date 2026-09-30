/**
 * Centralização dos serviços do Vivarium
 */

import authService from './authService';
import petService from './petService';
import placeService from './placeService';
import storageService from './storageService';
import { placeCategories } from '../data/mockPlaces';

// Inicializa dados mockados
authService.initializeMockData();
petService.initializeMockData();
placeService.initializeMockData();

export { authService, petService, placeService, storageService, placeCategories };
