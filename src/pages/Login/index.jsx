/**
 * Login Page - Vivarium
 * Página de login com validação visual
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Checkbox from '../../components/forms/Checkbox';
import ErrorMessage from '../../components/ui/ErrorMessage';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redireciona se já estiver autenticado
  if (isAuthenticated) {
    navigate('/perfil');
    return null;
  }

  const validateForm = () => {
    if (!formData.email) {
      setError('Por favor, insira seu e-mail');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Por favor, insira um e-mail válido');
      return false;
    }
    if (!formData.password) {
      setError('Por favor, insira sua senha');
      return false;
    }
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);
    const result = await login(formData.email, formData.password);
    setIsLoading(false);

    if (result.success) {
      navigate('/perfil');
    } else {
      setError(result.error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Limpa erro ao digitar
    if (error) setError('');
  };

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
      <Card style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-6">
          <h1 className="h2 mb-2">Entrar</h1>
          <p className="small text-secondary">
            Acesse sua conta da Vivarium
          </p>
        </div>

        {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="E-mail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            autoComplete="email"
            error={error && !formData.email ? 'Campo obrigatório' : ''}
          />

          <div className="relative">
            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              error={error && !formData.password ? 'Campo obrigatório' : ''}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn-text absolute right-3 top-9"
              style={{ position: 'absolute', right: '12px', top: '36px' }}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? (
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
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
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
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          <Checkbox
            label="Lembrar acesso"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            fullWidth
          >
            Entrar
          </Button>
        </form>

        <div className="mt-6 pt-4 text-center" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="small text-secondary mb-3">
            Não tem uma conta?
          </p>
          <Link to="/cadastro">
            <Button variant="secondary" fullWidth>
              Criar conta
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
