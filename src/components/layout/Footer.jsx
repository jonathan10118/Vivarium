/**
 * Componente Footer
 * Rodapé consistente da aplicação
 */

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      className="card"
      style={{
        borderRadius: 0,
        borderTop: '1px solid var(--color-border)',
        borderBottom: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        marginTop: 'auto',
      }}
    >
      <div className="container" style={{ padding: 'var(--space-2xl) var(--space-lg)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
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
                className="h3"
                style={{
                  color: 'var(--color-primary)',
                  margin: 0,
                }}
              >
                Vivarium
              </span>
            </div>
            <p className="small text-secondary">
              Cuide melhor de quem faz parte da sua família.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="small font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
              Navegação
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li className="mb-2">
                <Link
                  to="/"
                  className="small text-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  Início
                </Link>
              </li>
            </ul>
          </div>

          {/* Funcionalidades */}
          <div>
            <h4 className="small font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
              Funcionalidades
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li className="mb-2">
                <Link
                  to="/pets/novo"
                  className="small text-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  Cadastro de pets
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/perfil"
                  className="small text-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  Perfil
                </Link>
              </li>
              <li className="mb-2">
                <span className="small text-muted">
                  Localização
                </span>
              </li>
              <li className="mb-2">
                <span className="small text-muted">
                  Estabelecimentos
                </span>
              </li>
              <li className="mb-2">
                <span className="small text-muted">
                  Rotas
                </span>
              </li>
              <li>
                <span className="small text-muted">
                  Notificações
                </span>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="small font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
              Contato
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li className="mb-2">
                <a
                  href="mailto:contato@vivarium.com.br"
                  className="small text-muted"
                  style={{ textDecoration: 'none' }}
                >
                  📧 contato@vivarium.com.br
                </a>
              </li>
              <li className="mb-2">
                <span className="small text-muted">
                  📱 (41) 99664-7762
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="caption text-muted">
            © 2026 A Vivarium. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
