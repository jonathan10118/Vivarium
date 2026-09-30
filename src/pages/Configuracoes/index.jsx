/**
 * Configuracoes Page - Vivarium
 * Página de configurações do usuário
 */

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Configuracoes() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div
      className="container"
      style={{
        flex: 1,
        padding: 'var(--space-2xl) var(--space-lg)',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="mb-8">
          <h1 className="h2 mb-2">Configurações</h1>
          <p className="body text-secondary">
            Gerencie suas preferências e configurações da conta
          </p>
        </div>

        <Card>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="h3 mb-2">Configurações em desenvolvimento</h3>
            <p className="body text-secondary mb-6">
              Em breve você poderá personalizar suas configurações de conta,
              notificações, privacidade e preferências da plataforma.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/perfil')}
            >
              Voltar para o perfil
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
