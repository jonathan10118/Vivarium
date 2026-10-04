/**
 * Serviço de autenticação do Vivarium
 * Integra login e cadastro com o backend
 */

import storageService from './storageService';
import { mockUsers } from '../data';

class AuthService {
  initializeMockData() {
    const users = storageService.getUsers();

    if (users.length === 0) {
      storageService.setUsers(mockUsers);
    }
  }

  async login(email, password) {
    try {
      const response = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.erro || 'E-mail ou senha inválidos.',
        };
      }

      const usuario = data.usuario;

      const user = {
        id: usuario.id,
        name: usuario.nome,
        email: usuario.email,
        createdAt: usuario.createdAt || null,
        cpf: usuario.cpf || '',
        phone: usuario.telefone || '',
        address: {
          cep: usuario.endereco?.cep || '',
          street: usuario.endereco?.rua || '',
          number: usuario.endereco?.numero || '',
          complement: usuario.endereco?.complemento || '',
          neighborhood: usuario.endereco?.bairro || '',
          city: usuario.endereco?.cidade || '',
          state: usuario.endereco?.estado || '',
        },
        avatar: null,
      };

      storageService.setAuthUser(user);
      storageService.setAuthenticated(true);

      localStorage.setItem('vivarium_token', data.token);

      return {
        success: true,
        user,
      };
    } catch (error) {
      console.error('Erro ao conectar com o backend:', error);

      return {
        success: false,
        error: 'Não foi possível conectar ao servidor do Vivarium.',
      };
    }
  }

  async register(userData) {
    try {
      const response = await fetch(
        'http://localhost:3000/api/usuarios/cadastro',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: userData.name,
            email: userData.email,
            cpf: userData.cpf,
            telefone: userData.phone,
            cep: userData.address?.cep,
            rua: userData.address?.street,
            numero: userData.address?.number,
            complemento: userData.address?.complement,
            bairro: userData.address?.neighborhood,
            cidade: userData.address?.city,
            estado: userData.address?.state,
            senha: userData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.erro || 'Não foi possível criar a conta.',
        };
      }

      const usuario = data.usuario;

      const user = {
        id: usuario.id,
        name: usuario.nome,
        email: usuario.email,
        createdAt: usuario.createdAt || null,
        cpf: usuario.cpf || userData.cpf || '',
        phone: usuario.telefone || userData.phone || '',
        address: {
          cep: usuario.endereco?.cep || userData.address?.cep || '',
          street: usuario.endereco?.rua || userData.address?.street || '',
          number: usuario.endereco?.numero || userData.address?.number || '',
          complement:
            usuario.endereco?.complemento ||
            userData.address?.complement ||
            '',
          neighborhood:
            usuario.endereco?.bairro ||
            userData.address?.neighborhood ||
            '',
          city: usuario.endereco?.cidade || userData.address?.city || '',
          state: usuario.endereco?.estado || userData.address?.state || '',
        },
        avatar: null,
      };

      storageService.setAuthUser(user);
      storageService.setAuthenticated(true);

      localStorage.setItem(
        'vivarium_user_extended',
        JSON.stringify({
          cpf: user.cpf,
          phone: user.phone,
          address: user.address,
        })
      );

      localStorage.setItem('vivarium_token', data.token);

      return {
        success: true,
        user,
      };
    } catch (error) {
      console.error('Erro ao conectar com o backend:', error);

      return {
        success: false,
        error: 'Não foi possível conectar ao servidor do Vivarium.',
      };
    }
  }

  logout() {
    storageService.clearAuth();

    try {
      localStorage.removeItem('vivarium_user_extended');
      localStorage.removeItem('vivarium_token');
    } catch {
      // ignore
    }
  }

  getCurrentUser() {
    return storageService.getAuthUser();
  }

  isLoggedIn() {
    return storageService.isAuthenticated();
  }

  async updateUser(updatedData) {
    const currentUser = this.getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        error: 'Usuário não autenticado',
      };
    }

    try {
      const updatedUser = {
        ...currentUser,
        ...updatedData,
        address: {
          ...(currentUser.address || {}),
          ...(updatedData.address || {}),
        },
      };

      storageService.setAuthUser(updatedUser);

      localStorage.setItem(
        'vivarium_user_extended',
        JSON.stringify({
          cpf: updatedUser.cpf || '',
          phone: updatedUser.phone || '',
          address: updatedUser.address || {},
        })
      );

      return {
        success: true,
        user: updatedUser,
      };
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);

      return {
        success: false,
        error: 'Erro ao atualizar usuário',
      };
    }
  }

  getExtendedUserData() {
    try {
      return JSON.parse(
        localStorage.getItem('vivarium_user_extended') || '{}'
      );
    } catch {
      return {};
    }
  }
}

export default new AuthService();