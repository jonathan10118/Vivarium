/**
 * Dados mockados de usuários para o Vivarium
 * Usados para demonstração e persistência local
 */

export const mockUsers = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    password: 'senha123',
    avatar: null,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao.santos@email.com',
    password: 'senha456',
    avatar: null,
    createdAt: '2024-02-20T14:30:00Z',
  },
];

export const getMockUserById = (id) => mockUsers.find(user => user.id === id);
export const getMockUserByEmail = (email) => mockUsers.find(user => user.email === email);
