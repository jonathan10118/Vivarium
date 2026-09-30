/**
 * Configuracoes Page — Vivarium
 * Página de configurações da conta do usuário no Modo Dark
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Checkbox from '../../components/forms/Checkbox';

export default function Configuracoes() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    vaccineReminders: true,
    platformUpdates: false,
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const handleSavePreferences = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div
      className="container"
      style={{
        flex: 1,
        padding: 'var(--space-3xl) var(--space-lg) var(--space-5xl)',
        maxWidth: '850px',
        margin: '0 auto',
      }}
    >
      <div className="mb-8">
        <h1 className="h2 mb-2" style={{ color: 'var(--color-text)' }}>
          Configurações
        </h1>
        <p className="body text-secondary">
          Gerencie as preferências da sua conta na Vivarium
        </p>
      </div>

      {savedSuccess && (
        <div
          className="p-4 rounded-lg mb-6 flex items-center gap-3"
          style={{
            backgroundColor: 'var(--color-success-bg)',
            border: '1px solid var(--color-success)',
            color: 'var(--color-success-text)',
          }}
        >
          <span>✅</span>
          <p className="small font-medium">Preferências salvas com sucesso!</p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {/* Dados da Conta */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="h3 mb-1" style={{ fontSize: '1.15rem' }}>
                Dados da Conta
              </h3>
              <p className="small text-secondary">
                Informações associadas ao seu login e identificação
              </p>
            </div>
            <Link to="/perfil" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="sm">
                Editar no perfil
              </Button>
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-md)',
              padding: 'var(--space-md)',
              backgroundColor: 'var(--color-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-secondary-dark)',
            }}
          >
            <div>
              <span className="caption text-muted">Nome cadastrado</span>
              <p className="small font-medium" style={{ color: 'var(--color-text)', marginTop: '2px' }}>
                {user.name}
              </p>
            </div>
            <div>
              <span className="caption text-muted">E-mail de acesso</span>
              <p className="small font-medium" style={{ color: 'var(--color-text)', marginTop: '2px' }}>
                {user.email}
              </p>
            </div>
          </div>
        </Card>

        {/* Notificações e Alertas */}
        <Card>
          <h3 className="h3 mb-1" style={{ fontSize: '1.15rem' }}>
            Notificações e Avisos
          </h3>
          <p className="small text-secondary mb-4">
            Escolha como você deseja receber avisos sobre a saúde dos seus pets
          </p>

          <div className="flex flex-col gap-3">
            <Checkbox
              label="Lembretes de vacinas e consultas periódicas dos pets"
              checked={notifications.vaccineReminders}
              onChange={(e) =>
                setNotifications({ ...notifications, vaccineReminders: e.target.checked })
              }
            />
            <Checkbox
              label="E-mails sobre novidades e novos serviços próximos"
              checked={notifications.emailAlerts}
              onChange={(e) =>
                setNotifications({ ...notifications, emailAlerts: e.target.checked })
              }
            />
            <Checkbox
              label="Atualizações de segurança da conta"
              checked={notifications.platformUpdates}
              onChange={(e) =>
                setNotifications({ ...notifications, platformUpdates: e.target.checked })
              }
            />
          </div>

          <div className="mt-6 pt-4 flex gap-3" style={{ borderTop: '1px solid var(--color-border)' }}>
            <Button variant="primary" size="md" onClick={handleSavePreferences}>
              Salvar preferências
            </Button>
            <Button variant="outline" size="md" onClick={() => navigate('/perfil')}>
              Voltar ao perfil
            </Button>
          </div>
        </Card>

        {/* Suporte e Contato */}
        <Card>
          <h3 className="h3 mb-2" style={{ fontSize: '1.15rem' }}>
            Precisa de Ajuda?
          </h3>
          <p className="small text-secondary mb-4">
            Nossa equipe de suporte está à disposição para dúvidas ou orientações.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:vivariumpettech@gmail.com"
              className="btn btn-secondary btn-sm"
              style={{ textDecoration: 'none' }}
            >
              📧 vivariumpettech@gmail.com
            </a>
            <a
              href="tel:+5541996647762"
              className="btn btn-secondary btn-sm"
              style={{ textDecoration: 'none' }}
            >
              📱 (41) 99664-7762
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
