/**
 * Contexto de Autenticação do Vivarium
 * Gerencia o estado de autenticação globalmente
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica autenticação ao carregar
    const currentUser = authService.getCurrentUser();
    const isLoggedIn = authService.isLoggedIn();

    setUser(currentUser);
    setIsAuthenticated(isLoggedIn);
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const result = await authService.login(email, password);

    if (result.success) {
      setUser(result.user);
      setIsAuthenticated(true);
    }

    return result;
  };

  const register = async (userData) => {
    const result = await authService.register(userData);

    if (result.success) {
      setUser(result.user);
      setIsAuthenticated(true);
    }

    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (updatedData) => {
    const result = await authService.updateUser(updatedData);

    if (result.success) {
      setUser(result.user);
    }

    return result;
  };

  const getExtendedUserData = () => {
    return authService.getExtendedUserData();
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    getExtendedUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}