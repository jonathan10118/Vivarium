/**
 * Home Page — Vivarium
 * Página inicial limpa e objetiva, mantendo Hero e Sobre a Vivarium
 * Seções 'Funcionalidades' e 'Pronto para começar?' removidas conforme especificação
 */

import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts';
import Button from '../../components/ui/Button';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section
        className="container"
        style={{
          padding: 'var(--space-5xl) var(--space-lg) var(--space-4xl)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div className="flex flex-col items-center gap-6" style={{ maxWidth: '850px', margin: '0 auto' }}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              backgroundColor: 'var(--color-secondary)',
              border: '1px solid var(--color-secondary-dark)',
              color: 'var(--color-primary)',
              fontSize: 'var(--font-size-small)',
              fontWeight: 'var(--font-weight-semibold)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                boxShadow: '0 0 8px var(--color-primary)',
              }}
            />
            Bem-vindo à Vivarium
          </div>

          {/* Título Principal */}
          <h1
            className="h1"
            style={{
              maxWidth: '800px',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.2,
              color: 'var(--color-text)',
            }}
          >
            Cuide melhor de quem faz parte da sua família
          </h1>

          {/* Descrição */}
          <p
            className="body"
            style={{
              maxWidth: '650px',
              color: 'var(--color-text-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.6,
            }}
          >
            A Vivarium é a plataforma completa para gerenciar a vida dos seus pets.
            Cadastre, organize e encontre os melhores serviços próximos a você.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link to={isAuthenticated ? '/perfil' : '/cadastro'} style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                {isAuthenticated ? 'Acessar meu perfil' : 'Começar agora'}
              </Button>
            </Link>
          </div>

          {/* Ilustração visual */}
          <div
            className="mt-6"
            style={{
              display: 'flex',
              gap: 'var(--space-xl)',
              fontSize: '3.5rem',
              userSelect: 'none',
            }}
            aria-hidden="true"
          >
            <span style={{ animation: 'bounce 2.2s infinite' }}>🐕</span>
            <span style={{ animation: 'bounce 2.2s infinite 0.25s' }}>🐱</span>
            <span style={{ animation: 'bounce 2.2s infinite 0.5s' }}>🐕</span>
          </div>
        </div>
      </section>

      {/* Sobre a Vivarium */}
      <section
        className="container"
        style={{
          padding: 'var(--space-4xl) var(--space-lg) var(--space-5xl)',
          textAlign: 'center',
        }}
      >
        <div
          className="card"
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            padding: 'var(--space-3xl) var(--space-2xl)',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-2xl)',
          }}
        >
          <h2
            className="h2 mb-4"
            style={{
              color: 'var(--color-text)',
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            }}
          >
            Sobre a Vivarium
          </h2>
          <p
            className="body mb-4"
            style={{
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              fontSize: '1.05rem',
            }}
          >
            Um app que vem para mudar a vida de tutores de pets. Na Vivarium você dá uma identidade ao seu pet de forma online, podendo interagir com outros pets da região. Também conversa com uma I.A feita para resolver problemas cotidianos e tem um mapa de encontro com diversos outros cães e gatos do local.
          </p>
          <p
            className="body"
            style={{
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              fontSize: '1.05rem',
            }}
          >
            Seja bem-vindo e aproveite!
          </p>
        </div>
      </section>
    </div>
  );
}
