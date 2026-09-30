/**
 * NotFound Page - Vivarium
 * Página 404 para rotas não encontradas
 */

import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function NotFound() {
  return (
    <div
      className="container"
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-2xl) var(--space-lg)',
      }}
    >
      <Card style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="h2 mb-3">Página não encontrada</h1>
        <p className="body text-secondary mb-6">
          Desculpe, não conseguimos encontrar a página que você está procurando.
          A URL pode estar incorreta ou a página foi removida.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Voltar para o início
          </Button>
        </Link>
      </Card>
    </div>
  );
}
