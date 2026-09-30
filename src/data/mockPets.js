/**
 * Dados mockados de pets para o Vivarium
 * Usados para demonstração e persistência local
 */

export const mockPets = [
  {
    id: '1',
    name: 'Thor',
    species: 'dog',
    sex: 'male',
    age: 3,
    breed: 'Golden Retriever',
    photo: null,
    userId: '1',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '2',
    name: 'Luna',
    species: 'cat',
    sex: 'female',
    age: 2,
    breed: 'Siamês',
    photo: null,
    userId: '1',
    createdAt: '2024-01-25T14:30:00Z',
  },
  {
    id: '3',
    name: 'Max',
    species: 'dog',
    sex: 'male',
    age: 5,
    breed: 'Labrador Retriever',
    photo: null,
    userId: '2',
    createdAt: '2024-02-25T09:00:00Z',
  },
  {
    id: '4',
    name: 'Mimi',
    species: 'cat',
    sex: 'female',
    age: 1,
    breed: 'Persa',
    photo: null,
    userId: '2',
    createdAt: '2024-03-01T16:45:00Z',
  },
];

export const getMockPetById = (id) => mockPets.find(pet => pet.id === id);
export const getMockPetsByUserId = (userId) => mockPets.filter(pet => pet.userId === userId);
