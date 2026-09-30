/**
 * Home Page - Vivarium
 * Página inicial completa com Hero, funcionalidades, sobre e CTA
 */

import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function Home() {
  const features = [
    {
      icon: '🐕',
      title: 'Cadastro de Pets',
      description: 'Registre todos os seus pets com informações detalhadas, fotos e histórico.',
    },
    {
      icon: '📋',
      title: 'Perfil do Pet',
      description: 'Acompanhe cada pet individualmente com dados completos e atualizados.',
    },
    {
      icon: '🗺️',
      title: 'Mapa de Locais',
      description: 'Encontre veterinárias, pet shops e outros serviços próximos a você.',
    },
    {
      icon: '📊',
      title: 'Organização',
      description: 'Mantenha todas as informações dos seus pets organizadas em um só lugar.',
    },
  ];

  return (
    <div style={{ flex: 1 }}>
      {/* Hero Section */}
      <section
        className="container"
        style={{
          padding: 'var(--space-5xl) var(--space-lg)',
          textAlign: 'center',
        }}
      >
        <div className="flex flex-col items-center gap-6">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-primary)',
              fontSize: 'var(--font-size-small)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
              }}
            />
            Bem-vindo à Vivarium
          </div>

          {/* Título */}
          <h1
            className="h1"
            style={{
              maxWidth: '800px',
              marginBottom: 'var(--space-sm)',
            }}
          >
            Cuide melhor de quem faz parte da sua família
          </h1>

          {/* Descrição */}
          <p
            className="body"
            style={{
              maxWidth: '600px',
              color: 'var(--color-text-secondary)',
            }}
          >
            A Vivarium é a plataforma completa para gerenciar a vida dos seus pets.
            Cadastre, organize e encontre os melhores serviços próximos a você.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link to="/cadastro">
              <Button variant="primary" size="lg">
                Começar agora
              </Button>
            </Link>
          </div>

          {/* Ilustração visual */}
          <div
            className="mt-8"
            style={{
              display: 'flex',
              gap: 'var(--space-lg)',
              fontSize: '4rem',
            }}
          >
            <span style={{ animation: 'bounce 2s infinite' }}>🐕</span>
            <span style={{ animation: 'bounce 2s infinite 0.2s' }}>🐱</span>
            <span style={{ animation: 'bounce 2s infinite 0.4s' }}>🐕</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="container"
        style={{
          padding: 'var(--space-4xl) var(--space-lg)',
        }}
      >
        <div className="text-center mb-8">
          <h2 className="h2 mb-3">Funcionalidades</h2>
          <p className="body text-secondary">
            Tudo que você precisa para cuidar dos seus pets
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="h3 mb-2">{feature.title}</h3>
              <p className="small text-secondary">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        className="container"
        style={{
          padding: 'var(--space-4xl) var(--space-lg)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="h2 mb-4">Sobre a Vivarium</h2>
          <p className="body text-secondary mb-6">
            A Vivarium é uma plataforma criada para facilitar o cuidado, a localização e a conexão entre tutores e seus animais.
            Com a Vivarium, você pode cadastrar e visualizar perfis detalhados de seus pets, encontrar estabelecimentos
            relacionados a animais próximos à sua localização e consultar locais como veterinárias, pet shops e banho e tosa.
          </p>
          <p className="body text-secondary">
            Futuramente, a plataforma oferecerá recursos avançados de localização e interação,
            permitindo que você encontre serviços mais próximos e receba recomendações personalizadas.
            Tudo isso em uma interface simples, profissional e focada no bem-estar dos seus pets.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="container"
        style={{
          padding: 'var(--space-4xl) var(--space-lg)',
          backgroundColor: 'var(--color-surface)',
          textAlign: 'center',
          borderRadius: 'var(--radius-xl)',
          margin: 'var(--space-4xl) auto',
        }}
      >
        <h2 className="h2 mb-3">Pronto para começar?</h2>
        <p className="body text-secondary mb-6">
          Crie sua conta gratuitamente e comece a cuidar melhor dos seus pets hoje mesmo.
        </p>
        <Link to="/cadastro">
          <Button variant="primary" size="lg">
            Criar conta gratuita
          </Button>
        </Link>
      </section>
    </div>
  );
}
