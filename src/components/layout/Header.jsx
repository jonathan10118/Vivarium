/**
 * Componente Header — Vivarium
 * Navegação principal fluida e moderna com Framer Motion
 * Estrutura: VIVARIUM | INÍCIO  MAPA  IA  CONTATO | Área de Autenticação/Perfil
 * SEM menu hambúrguer em nenhuma tela.
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useAuth } from '../../contexts';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { path: '/', label: 'INÍCIO', isExact: true },
    { path: '/mapa', label: 'MAPA' },
    { path: '/ia', label: 'IA' },
    { path: '/contato', label: 'CONTATO' },
  ];

  const isTabActive = (link) => {
    if (link.isExact) {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(link.path);
  };

  const handleMenuNavigate = (path) => {
    setIsProfileMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    logout();
    navigate('/');
  };

  // Fecha o dropdown ao clicar fora ou navegar
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isProfileMenuOpen]);

  // Fecha o menu ao mudar de rota
  useEffect(() => {
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="vivarium-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(15, 27, 46, 0.94)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.35)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 'var(--space-xs)',
          paddingBottom: 'var(--space-xs)',
          minHeight: '62px',
        }}
      >
        {/* Marca / Logo */}
        <Link
          to="/"
          className="brand-link"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            textDecoration: 'none',
            flexShrink: 0,
          }}
          aria-label="Ir para o início da Vivarium"
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text-inverse)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0112 5Z" />
            </svg>
          </div>
          <span
            className="brand-title"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Vivarium
          </span>
        </Link>

        {/* Navegação Principal: INÍCIO | MAPA | IA | CONTATO */}
        <nav
          className="vivarium-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.4rem, 1.8vw, 1.5rem)',
            margin: '0 auto',
            padding: '0 var(--space-xs)',
          }}
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => {
            const active = isTabActive(link);
            return (
              <Link
                key={link.path}
                to={link.path}
                className="nav-link-item"
                style={{
                  position: 'relative',
                  padding: 'clamp(0.35rem, 0.8vw, 0.5rem) clamp(0.55rem, 1.2vw, 1.1rem)',
                  textDecoration: 'none',
                  fontSize: 'clamp(0.75rem, 1.1vw, 0.875rem)',
                  fontWeight: active ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                  letterSpacing: '0.04em',
                  color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  borderRadius: 'var(--radius-full)',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {active && (
                  <motion.div
                    layoutId={shouldReduceMotion ? undefined : 'headerActiveTabPill'}
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32,
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(173, 216, 230, 0.14)',
                      border: '1px solid rgba(173, 216, 230, 0.35)',
                      borderRadius: 'var(--radius-full)',
                      boxShadow: '0 0 12px rgba(173, 216, 230, 0.18)',
                      zIndex: 0,
                    }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Área de Autenticação / Perfil */}
        <div
          className="auth-area"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexShrink: 0,
          }}
        >
          {/* ESTADO 1 — NÃO AUTENTICADO: ENTRAR | CADASTRAR */}
          {!isAuthenticated ? (
            <div
              className="flex items-center"
              style={{ gap: 'clamp(0.35rem, 1vw, 0.75rem)' }}
            >
              <Link
                to="/login"
                className="btn-header-login"
                style={{
                  padding: 'clamp(0.35rem, 0.8vw, 0.45rem) clamp(0.55rem, 1.2vw, 0.95rem)',
                  fontSize: 'clamp(0.75rem, 1vw, 0.85rem)',
                  fontWeight: 'var(--font-weight-semibold)',
                  letterSpacing: '0.04em',
                  color: 'var(--color-primary)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-md)',
                  transition: 'background-color var(--transition-fast), color var(--transition-fast)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                ENTRAR
              </Link>
              <Link
                to="/cadastro"
                className="btn-header-register"
                style={{
                  padding: 'clamp(0.35rem, 0.8vw, 0.45rem) clamp(0.7rem, 1.4vw, 1.15rem)',
                  fontSize: 'clamp(0.75rem, 1vw, 0.85rem)',
                  fontWeight: 'var(--font-weight-bold)',
                  letterSpacing: '0.04em',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-text-inverse)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'background-color var(--transition-fast), box-shadow var(--transition-fast), transform var(--transition-fast)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                CADASTRAR
              </Link>
            </div>
          ) : (
            /* ESTADO 2 — AUTENTICADO: SOMENTE ÍCONE VISUAL DE PERFIL */
            <div className="profile-menu-container relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                aria-label="Menu da conta de usuário"
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="true"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isProfileMenuOpen
                    ? '1px solid var(--color-primary)'
                    : '1px solid var(--color-border)',
                  backgroundColor: isProfileMenuOpen
                    ? 'var(--color-secondary)'
                    : 'var(--color-surface)',
                  color: 'var(--color-primary)',
                  cursor: 'pointer',
                  boxShadow: isProfileMenuOpen ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                }}
                onMouseLeave={(e) => {
                  if (!isProfileMenuOpen) {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              {/* DROPDOWN DA CONTA: EXATAMENTE MEU PERFIL, CONFIGURAÇÕES, MEUS PETS, FAZER LOGOUT */}
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 8px)',
                      minWidth: '220px',
                      zIndex: 1000,
                      backgroundColor: 'var(--color-surface-elevated)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                      padding: 'var(--space-xs) 0',
                    }}
                    role="menu"
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <button
                        type="button"
                        onClick={() => handleMenuNavigate('/perfil')}
                        style={{
                          padding: 'var(--space-sm) var(--space-md)',
                          textAlign: 'left',
                          width: '100%',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'var(--font-size-small)',
                          fontWeight: 'var(--font-weight-medium)',
                          letterSpacing: '0.03em',
                          color: 'var(--color-text)',
                          transition: 'background-color var(--transition-fast), color var(--transition-fast)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                          e.currentTarget.style.color = 'var(--color-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--color-text)';
                        }}
                        role="menuitem"
                      >
                        MEU PERFIL
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMenuNavigate('/configuracoes')}
                        style={{
                          padding: 'var(--space-sm) var(--space-md)',
                          textAlign: 'left',
                          width: '100%',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'var(--font-size-small)',
                          fontWeight: 'var(--font-weight-medium)',
                          letterSpacing: '0.03em',
                          color: 'var(--color-text)',
                          transition: 'background-color var(--transition-fast), color var(--transition-fast)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                          e.currentTarget.style.color = 'var(--color-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--color-text)';
                        }}
                        role="menuitem"
                      >
                        CONFIGURAÇÕES
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMenuNavigate('/pets')}
                        style={{
                          padding: 'var(--space-sm) var(--space-md)',
                          textAlign: 'left',
                          width: '100%',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'var(--font-size-small)',
                          fontWeight: 'var(--font-weight-medium)',
                          letterSpacing: '0.03em',
                          color: 'var(--color-text)',
                          transition: 'background-color var(--transition-fast), color var(--transition-fast)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                          e.currentTarget.style.color = 'var(--color-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--color-text)';
                        }}
                        role="menuitem"
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
                        type="button"
                        onClick={handleLogout}
                        style={{
                          padding: 'var(--space-sm) var(--space-md)',
                          textAlign: 'left',
                          width: '100%',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'var(--font-size-small)',
                          fontWeight: 'var(--font-weight-semibold)',
                          letterSpacing: '0.03em',
                          color: 'var(--color-error)',
                          transition: 'background-color var(--transition-fast)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-error-bg)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        role="menuitem"
                      >
                        FAZER LOGOUT
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
