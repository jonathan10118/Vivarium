/**
 * MeusPets Page — Vivarium
 * Exibe exclusivamente os pets do usuário autenticado
 * Reutiliza AuthContext e PetContext
 */

import { Link, useNavigate } from 'react-router-dom';
import { useAuth, usePets } from '../../contexts';
import PetCard from '../../components/pets/PetCard';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

export default function MeusPets() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getUserPets, isLoading } = usePets();

  // Proteção da rota — redireciona se não estiver logado
  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  // Garante que NUNCA mostra pets de outro usuário
  const userPets = getUserPets(user.id) || [];

  return (
    <div
      className="container"
      style={{
        flex: 1,
        padding: 'var(--space-3xl) var(--space-lg)',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      {/* Top Header */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        style={{
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: 'var(--space-lg)',
        }}
      >
        <div>
          <div className="flex items-center gap-3">
            <h1 className="h2 mb-1" style={{ color: 'var(--color-text)' }}>
              Meus Pets
            </h1>
            <span
              style={{
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-primary)',
                border: '1px solid var(--color-secondary-dark)',
                padding: '2px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--font-size-small)',
                fontWeight: 'var(--font-weight-bold)',
              }}
            >
              {userPets.length}
            </span>
          </div>
          <p className="body text-secondary">
            Acompanhe o perfil, informações e histórico dos seus animais cadastrados
          </p>
        </div>

        <Link to="/pets/novo" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="md">
            + Cadastrar novo pet
          </Button>
        </Link>
      </div>

      {/* Conteúdo: Lista ou Estado Vazio */}
      {userPets.length === 0 ? (
        <div
          className="card"
          style={{
            padding: 'var(--space-4xl) var(--space-xl)',
            textAlign: 'center',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <EmptyState
            icon="🐾"
            title="Nenhum pet cadastrado"
            description="Você ainda não adicionou nenhum pet à sua conta da Vivarium. Comece agora mesmo para gerenciar saúde, vacinas e cuidados com facilidade."
            action={
              <Link to="/pets/novo" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg">
                  Cadastrar primeiro pet
                </Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
}
