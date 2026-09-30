/**
 * Dados mockados de locais para o mapa do Vivarium
 * Usados para demonstração e visualização
 */

export const mockPlaces = [
  {
    id: '1',
    name: 'Clínica Veterinária Pet Care',
    category: 'veterinary',
    address: 'Rua das Flores, 123 - Centro',
    phone: '(11) 3456-7890',
    hours: 'Seg-Sex: 08:00-18:00 | Sáb: 09:00-13:00',
    rating: 4.8,
    coordinates: { x: 30, y: 25 },
  },
  {
    id: '2',
    name: 'Pet Shop Amigo Fiel',
    category: 'petshop',
    address: 'Avenida Principal, 456 - Jardim Botânico',
    phone: '(11) 2345-6789',
    hours: 'Seg-Sáb: 09:00-20:00',
    rating: 4.5,
    coordinates: { x: 60, y: 40 },
  },
  {
    id: '3',
    name: 'Banho & Tosa Estilo Pet',
    category: 'grooming',
    address: 'Rua dos Animais, 789 - Vila Nova',
    phone: '(11) 3456-1234',
    hours: 'Seg-Sex: 10:00-19:00',
    rating: 4.7,
    coordinates: { x: 45, y: 65 },
  },
  {
    id: '4',
    name: 'Hotel para Pets Sonho',
    category: 'hotel',
    address: 'Estrada do Sol, 321 - Zona Rural',
    phone: '(11) 9876-5432',
    hours: '24 horas',
    rating: 4.9,
    coordinates: { x: 20, y: 70 },
  },
  {
    id: '5',
    name: 'Farmácia Veterinária Saúde',
    category: 'pharmacy',
    address: 'Rua da Saúde, 654 - Centro',
    phone: '(11) 2345-0987',
    hours: 'Seg-Sáb: 08:00-20:00',
    rating: 4.6,
    coordinates: { x: 55, y: 20 },
  },
  {
    id: '6',
    name: 'Veterinária 24 Horas',
    category: 'veterinary',
    address: 'Avenida Brasil, 987 - Centro',
    phone: '(11) 9123-4567',
    hours: '24 horas',
    rating: 4.4,
    coordinates: { x: 70, y: 55 },
  },
  {
    id: '7',
    name: 'Pet Shop Mundo Animal',
    category: 'petshop',
    address: 'Rua Comercial, 147 - Shopping Center',
    phone: '(11) 3456-7891',
    hours: 'Seg-Dom: 10:00-22:00',
    rating: 4.3,
    coordinates: { x: 35, y: 45 },
  },
  {
    id: '8',
    name: 'Spa Pet Relax',
    category: 'grooming',
    address: 'Rua do Relaxamento, 258 - Bairro Verde',
    phone: '(11) 2345-6788',
    hours: 'Ter-Sáb: 09:00-18:00',
    rating: 4.8,
    coordinates: { x: 80, y: 30 },
  },
];

export const getMockPlaceById = (id) => mockPlaces.find(place => place.id === id);
export const getMockPlacesByCategory = (category) => mockPlaces.filter(place => place.category === category);

export const placeCategories = [
  { id: 'all', name: 'Todos', icon: '📍' },
  { id: 'veterinary', name: 'Veterinária', icon: '🏥' },
  { id: 'petshop', name: 'Pet Shop', icon: '🛒' },
  { id: 'grooming', name: 'Banho & Tosa', icon: '✂️' },
  { id: 'hotel', name: 'Hotel Pet', icon: '🏨' },
  { id: 'pharmacy', name: 'Farmácia', icon: '💊' },
  { id: 'park', name: 'Parque/Praça', icon: '🌳' },
];
