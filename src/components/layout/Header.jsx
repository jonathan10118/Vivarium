/**
 * Componente Header
 * Navegação principal da aplicação - SEM menu hambúrguer
 */

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts';
import { useState, useEffect } from 'react';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'INÍCIO' },
    { path: '/mapa', label: 'MAPA' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    } else {
      setIsProfileMenuOpen(!isProfileMenuOpen);
    }
  };

  const handleMenuAction = (action) => {
    setIsProfileMenuOpen(false);
    action();
  };

  // Fecha o menu ao clicar fora
  const handleOutsideClick = (e) => {
    if (isProfileMenuOpen && !e.target.closest('.profile-menu-container')) {
      setIsProfileMenuOpen(false);
    }
  };

  // Adiciona e remove event listener para clique fora
  useEffect(() => {
    if (isProfileMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }
  }, [isProfileMenuOpen]);

  return (
    <header
      className="card"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderRadius: 0,
        borderBottom: '1px solid var(--color-border)',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
      }}
    >
      <div className="container" style={{ padding: 'var(--space-sm) var(--space-md)' }}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text-inverse)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0112 5Z" />
              </svg>
            </div>
            <span
              className="h2"
              style={{
                color: 'var(--color-primary)',
                margin: 0,
                fontSize: '1.25rem',
              }}
            >
              Vivarium
            </span>
          </Link>

          {/* Navegação Principal */}
          <nav className="flex items-center gap-4" style={{ fontSize: 'var(--font-size-small)' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-medium transition-colors"
                style={{
                  color: isActive(link.path) ? 'var(--color-primary)' : 'var(--color-text)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Ícone de Perfil */}
          <div className="profile-menu-container relative">
            <button
              onClick={handleProfileClick}
              style={{
                padding: 'var(--space-xs)',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
              }}
              aria-label="Perfil"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: 'var(--color-text)' }}
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Menu Suspenso para Usuário Logado */}
            {isAuthenticated && isProfileMenuOpen && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: 'var(--space-xs)',
                  minWidth: '200px',
                  zIndex: 1000,
                }}
              >
                <div className="flex flex-col">
                  <button
                    onClick={() => handleMenuAction(() => window.location.href = '/perfil')}
                    style={{
                      padding: 'var(--space-sm) var(--space-md)',
                      textAlign: 'left',
                      width: '100%',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-small)',
                      color: 'var(--color-text)',
                    }}
                  >
                    MEU PERFIL
                  </button>
                  <button
                    onClick={() => handleMenuAction(() => window.location.href = '/configuracoes')}
                    style={{
                      padding: 'var(--space-sm) var(--space-md)',
                      textAlign: 'left',
                      width: '100%',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-small)',
                      color: 'var(--color-text)',
                    }}
                  >
                    CONFIGURAÇÕES
                  </button>
                  <button
                    onClick={() => handleMenuAction(() => window.location.href = '/perfil')}
                    style={{
                      padding: 'var(--space-sm) var(--space-md)',
                      textAlign: 'left',
                      width: '100%',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-small)',
                      color: 'var(--color-text)',
                    }}
                  >
                    MEUS PETS
                  </button>
                  <div
                    style={{
                      borderTop: '1px solid var(--color-border)',
                      margin: 'var(--space-xs) 0',
                    }}
                  />
                  <button
                    onClick={() => handleMenuAction(() => logout())}
                    style={{
                      padding: 'var(--space-sm) var(--space-md)',
                      textAlign: 'left',
                      width: '100%',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-small)',
                      color: 'var(--color-error)',
                    }}
                  >
                    FAZER LOGOUT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
