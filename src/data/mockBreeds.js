/**
 * Dados mockados de raças para o Vivarium
 */

export const dogBreeds = [
  'SRD',
  'Golden Retriever',
  'Labrador Retriever',
  'Pastor Alemão',
  'Rottweiler',
  'Poodle',
  'Yorkshire Terrier',
  'Shih Tzu',
  'Dachshund',
  'Bulldog Francês',
  'Beagle',
  'Border Collie',
  'Boxer',
  'Husky Siberiano',
  'Pug',
];

export const catBreeds = [
  'SRD',
  'Siamês',
  'Persa',
  'Maine Coon',
  'Ragdoll',
  'Bengal',
  'British Shorthair',
  'Sphynx',
  'Angorá',
  'Russo Azul',
];

export const getBreedsBySpecies = (species) => {
  if (species === 'dog') return dogBreeds;
  if (species === 'cat') return catBreeds;
  return [];
};
