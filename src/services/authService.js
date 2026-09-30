/**
 * Serviço de autenticação do Vivarium
 * Trabalha com localStorage e dados mockados
 */

import storageService from './storageService';
import { mockUsers, getMockUserByEmail } from '../data';

class AuthService {
  /**
   * Inicializa os dados mockados se não existirem
   */
  initializeMockData() {
    const users = storageService.getUsers();
    if (users.length === 0) {
      storageService.setUsers(mockUsers);
    }
  }

  /**
   * Realiza login com email e senha
   */
  async login(email, password) {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = storageService.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      storageService.setAuthUser(userWithoutPassword);
      storageService.setAuthenticated(true);
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, error: 'E-mail ou senha inválidos' };
  }

  /**
   * Realiza cadastro de novo usuário
   */
  async register(name, email, password) {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = storageService.getUsers();
    
    // Verifica se email já existe
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'E-mail já cadastrado' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      avatar: null,
      createdAt: new Date().toISOString(),
    };

    storageService.addUser(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    storageService.setAuthUser(userWithoutPassword);
    storageService.setAuthenticated(true);

    return { success: true, user: userWithoutPassword };
  }

  /**
   * Realiza logout
   */
  logout() {
    storageService.clearAuth();
  }

  /**
   * Obtém usuário autenticado atual
   */
  getCurrentUser() {
    return storageService.getAuthUser();
  }

  /**
   * Verifica se usuário está autenticado
   */
  isLoggedIn() {
    return storageService.isAuthenticated();
  }

  /**
   * Atualiza dados do usuário
   */
  async updateUser(updatedData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { success: false, error: 'Usuário não autenticado' };

    const success = storageService.updateUser(currentUser.id, updatedData);
    if (success) {
      const updatedUser = { ...currentUser, ...updatedData };
      storageService.setAuthUser(updatedUser);
      
      // Atualiza dados estendidos se existirem
      const extendedData = JSON.parse(localStorage.getItem('vivarium_user_extended') || '{}');
      const updatedExtended = { ...extendedData, ...updatedData };
      localStorage.setItem('vivarium_user_extended', JSON.stringify(updatedExtended));
      
      return { success: true, user: updatedUser };
    }

    return { success: false, error: 'Erro ao atualizar usuário' };
  }

  /**
   * Obtém dados estendidos do usuário
   */
  getExtendedUserData() {
    try {
      return JSON.parse(localStorage.getItem('vivarium_user_extended') || '{}');
    } catch {
      return {};
    }
  }
}

export default new AuthService();
