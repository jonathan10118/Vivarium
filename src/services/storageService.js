/**
 * Serviço de persistência local usando localStorage
 * Centraliza todas as operações de armazenamento
 */

const STORAGE_KEYS = {
  AUTH_USER: 'vivarium_auth_user',
  IS_AUTHENTICATED: 'vivarium_is_authenticated',
  USERS: 'vivarium_users',
  PETS: 'vivarium_pets',
  PLACES: 'vivarium_places',
};

class StorageService {
  /**
   * Salva dados no localStorage
   */
  setItem(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error(`Erro ao salvar ${key}:`, error);
      return false;
    }
  }

  /**
   * Recupera dados do localStorage
   */
  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error(`Erro ao recuperar ${key}:`, error);
      return defaultValue;
    }
  }

  /**
   * Remove dados do localStorage
   */
  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Erro ao remover ${key}:`, error);
      return false;
    }
  }

  /**
   * Limpa todos os dados do Vivarium
   */
  clearAll() {
    try {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      return false;
    }
  }

  // === Métodos específicos para autenticação ===

  getAuthUser() {
    return this.getItem(STORAGE_KEYS.AUTH_USER);
  }

  setAuthUser(user) {
    return this.setItem(STORAGE_KEYS.AUTH_USER, user);
  }

  isAuthenticated() {
    return this.getItem(STORAGE_KEYS.IS_AUTHENTICATED, false);
  }

  setAuthenticated(isAuthenticated) {
    return this.setItem(STORAGE_KEYS.IS_AUTHENTICATED, isAuthenticated);
  }

  clearAuth() {
    this.removeItem(STORAGE_KEYS.AUTH_USER);
    this.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
  }

  // === Métodos específicos para usuários ===

  getUsers() {
    return this.getItem(STORAGE_KEYS.USERS, []);
  }

  setUsers(users) {
    return this.setItem(STORAGE_KEYS.USERS, users);
  }

  addUser(user) {
    const users = this.getUsers();
    users.push(user);
    return this.setUsers(users);
  }

  updateUser(userId, updatedData) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedData };
      return this.setUsers(users);
    }
    return false;
  }

  // === Métodos específicos para pets ===

  getPets() {
    return this.getItem(STORAGE_KEYS.PETS, []);
  }

  setPets(pets) {
    return this.setItem(STORAGE_KEYS.PETS, pets);
  }

  addPet(pet) {
    const pets = this.getPets();
    pets.push(pet);
    return this.setPets(pets);
  }

  updatePet(petId, updatedData) {
    const pets = this.getPets();
    const index = pets.findIndex(p => p.id === petId);
    if (index !== -1) {
      pets[index] = { ...pets[index], ...updatedData };
      return this.setPets(pets);
    }
    return false;
  }

  deletePet(petId) {
    const pets = this.getPets();
    const filteredPets = pets.filter(p => p.id !== petId);
    return this.setPets(filteredPets);
  }

  getPetsByUserId(userId) {
    const pets = this.getPets();
    return pets.filter(p => p.userId === userId);
  }

  // === Métodos específicos para locais ===

  getPlaces() {
    return this.getItem(STORAGE_KEYS.PLACES, []);
  }

  setPlaces(places) {
    return this.setItem(STORAGE_KEYS.PLACES, places);
  }
}

export default new StorageService();
