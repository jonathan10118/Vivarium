/**
 * Componente Footer — Vivarium
 * Rodapé organizado e consistente para a plataforma
 * E-mail: vivariumpettech@gmail.com | Telefone: (41) 99664-7762 | Ano: 2026
 */

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'auto',
        color: 'var(--color-text)',
      }}
    >
      <div className="container" style={{ padding: 'var(--space-3xl) var(--space-lg) var(--space-xl)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand */}
          <div style={{ maxWidth: '300px' }}>
            <div className="flex items-center gap-2 mb-3">
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
                className="h3"
                style={{
                  color: 'var(--color-primary)',
                  margin: 0,
                  fontSize: '1.25rem',
                }}
              >
                Vivarium
              </span>
            </div>
            <p className="small text-secondary" style={{ lineHeight: '1.6' }}>
              A Vivarium é a sua plataforma completa para cuidar com excelência da saúde e da rotina dos seus animais de estimação.
            </p>
          </div>

          {/* Navegação Principal */}
          <div>
            <h4 className="small font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
              Navegação
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li className="mb-2">
                <Link to="/" className="small text-secondary" style={{ textDecoration: 'none' }}>
                  Início
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/mapa" className="small text-secondary" style={{ textDecoration: 'none' }}>
                  Mapa de Serviços
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/ia" className="small text-secondary" style={{ textDecoration: 'none' }}>
                  Vivarium IA
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contato" className="small text-secondary" style={{ textDecoration: 'none' }}>
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Área do Tutor */}
          <div>
            <h4 className="small font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
              Área do Tutor
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li className="mb-2">
                <Link to="/perfil" className="small text-secondary" style={{ textDecoration: 'none' }}>
                  Meu Perfil
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/pets" className="small text-secondary" style={{ textDecoration: 'none' }}>
                  Meus Pets
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/pets/novo" className="small text-secondary" style={{ textDecoration: 'none' }}>
                  Cadastrar Novo Pet
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/configuracoes" className="small text-secondary" style={{ textDecoration: 'none' }}>
                  Configurações
                </Link>
              </li>
            </ul>
          </div>

          {/* Informações de Contato */}
          <div>
            <h4 className="small font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
              Atendimento Oficial
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li className="mb-2">
                <a
                  href="mailto:vivariumpettech@gmail.com"
                  className="small text-secondary"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>📧</span> vivariumpettech@gmail.com
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://wa.me/5541996647762"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="small text-secondary"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>📱</span> (41) 99664-7762
                </a>
              </li>
              <li className="mb-2">
                <span className="small text-muted" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>📍</span> Curitiba, PR — Brasil
                </span>
              </li>
              <li>
                <span className="caption text-muted">
                  Segunda a Sexta, das 09h às 18h
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Inferior com Copyright */}
        <div
          className="mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="caption text-muted">
            A Vivarium © 2026. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link to="/contato" className="caption text-muted" style={{ textDecoration: 'none' }}>
              Suporte
            </Link>
            <Link to="/ia" className="caption text-muted" style={{ textDecoration: 'none' }}>
              Inteligência Artificial
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
