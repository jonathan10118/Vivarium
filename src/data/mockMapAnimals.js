/**
 * Dados mockados de animais no mapa do Vivarium
 * Usados para demonstração visual
 */

export const mockMapAnimals = [
  {
    id: 'map-pet-1',
    name: 'Thor',
    species: 'dog',
    breed: 'Golden Retriever',
    location: 'Parque Central',
    coordinates: { x: 25, y: 35 },
  },
  {
    id: 'map-pet-2',
    name: 'Luna',
    species: 'cat',
    breed: 'Siamês',
    location: 'Praça das Flores',
    coordinates: { x: 55, y: 25 },
  },
  {
    id: 'map-pet-3',
    name: 'Mel',
    species: 'dog',
    breed: 'Labrador Retriever',
    location: 'Área Verde',
    coordinates: { x: 40, y: 60 },
  },
  {
    id: 'map-pet-4',
    name: 'Nina',
    species: 'cat',
    breed: 'Persa',
    location: 'Jardim Botânico',
    coordinates: { x: 70, y: 45 },
  },
];

export const getMapAnimalById = (id) => mockMapAnimals.find(animal => animal.id === id);
