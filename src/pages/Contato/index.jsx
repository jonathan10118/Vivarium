/**
 * Contato Page — Vivarium
 * Informações oficiais de contato e canal direto com o tutor
 * E-mail: vivariumpettech@gmail.com | Telefone: (41) 99664-7762
 */

import { useState } from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    // Simulação no frontend (sem backend)
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <div
      className="container"
      style={{
        flex: 1,
        padding: 'var(--space-3xl) var(--space-lg) var(--space-5xl)',
        maxWidth: '1050px',
        margin: '0 auto',
      }}
    >
      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
          style={{
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-primary)',
            fontSize: 'var(--font-size-small)',
            border: '1px solid var(--color-secondary-dark)',
          }}
        >
          <span>💬</span> Canais de Atendimento
        </div>
        <h1 className="h1 mb-2" style={{ color: 'var(--color-text)' }}>
          Fale com a Vivarium
        </h1>
        <p className="body text-secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Tire dúvidas, envie sugestões ou solicite suporte para a gestão dos seus pets.
          Estamos sempre prontos para atender você.
        </p>
      </div>

      {/* Cards de Contato Oficiais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* E-mail */}
        <Card>
          <div className="flex items-start gap-3">
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                border: '1px solid var(--color-secondary-dark)',
                flexShrink: 0,
              }}
            >
              📧
            </div>
            <div style={{ wordBreak: 'break-word' }}>
              <h3 className="h3 mb-1" style={{ fontSize: '1.05rem' }}>E-mail Oficial</h3>
              <a
                href="mailto:vivariumpettech@gmail.com"
                style={{
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                vivariumpettech@gmail.com
              </a>
              <p className="caption text-muted mt-1">
                Atendimento por e-mail em até 24h
              </p>
            </div>
          </div>
        </Card>

        {/* Telefone */}
        <Card>
          <div className="flex items-start gap-3">
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                border: '1px solid var(--color-secondary-dark)',
                flexShrink: 0,
              }}
            >
              📱
            </div>
            <div>
              <h3 className="h3 mb-1" style={{ fontSize: '1.05rem' }}>Telefone</h3>
              <a
                href="tel:+5541996647762"
                style={{
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                (41) 99664-7762
              </a>
              <p className="caption text-muted mt-1">
                Segunda a Sexta, das 09h às 18h
              </p>
            </div>
          </div>
        </Card>

        {/* Localização */}
        <Card>
          <div className="flex items-start gap-3">
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                border: '1px solid var(--color-secondary-dark)',
                flexShrink: 0,
              }}
            >
              📍
            </div>
            <div>
              <h3 className="h3 mb-1" style={{ fontSize: '1.05rem' }}>Localização</h3>
              <p className="small text-secondary" style={{ margin: 0, fontWeight: 500 }}>
                Curitiba, PR — Brasil
              </p>
              <p className="caption text-muted mt-1">
                Plataforma digital para todo o país
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Formulário de Mensagem Direta */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:grid-cols-2" style={{ gridColumn: 'span 2' }}>
          <h2 className="h2 mb-2" style={{ fontSize: '1.35rem' }}>
            Envie sua mensagem
          </h2>
          <p className="small text-secondary mb-6">
            Preencha os campos abaixo e entraremos em contato rapidamente.
          </p>

          {submitted && (
            <div
              className="p-4 rounded-lg mb-6 flex items-center gap-3"
              style={{
                backgroundColor: 'var(--color-success-bg)',
                border: '1px solid var(--color-success)',
                color: 'var(--color-success-text)',
              }}
            >
              <span>✅</span>
              <div>
                <p className="small font-semibold">Mensagem enviada com sucesso!</p>
                <p className="caption">
                  A equipe da Vivarium responderá em breve através do seu e-mail.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Seu Nome"
                placeholder="Ex: João da Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Seu E-mail"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <Input
              label="Assunto"
              placeholder="Ex: Dúvida sobre cadastro de pet ou estabelecimentos"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />

            <div className="form-group">
              <label className="label">Mensagem</label>
              <textarea
                className="input"
                style={{
                  minHeight: '120px',
                  padding: 'var(--space-md)',
                  resize: 'vertical',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--font-size-body)',
                }}
                placeholder="Escreva sua dúvida ou mensagem detalhada..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" isLoading={isSending}>
                Enviar mensagem
              </Button>
            </div>
          </form>
        </Card>

        {/* FAQ Rápido */}
        <Card>
          <h3 className="h3 mb-4" style={{ fontSize: '1.15rem' }}>
            Dúvidas Frequentes
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="small font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
                Como cadastrar um pet?
              </h4>
              <p className="caption text-secondary" style={{ lineHeight: 1.5 }}>
                Basta criar sua conta na Vivarium e acessar a seção "Meus Pets" ou o botão "+ Cadastrar novo pet".
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-sm)' }}>
              <h4 className="small font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
                A plataforma é gratuita?
              </h4>
              <p className="caption text-secondary" style={{ lineHeight: 1.5 }}>
                Sim! Você pode criar sua conta e cadastrar seus pets sem nenhum custo.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-sm)' }}>
              <h4 className="small font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
                Como encontrar veterinárias?
              </h4>
              <p className="caption text-secondary" style={{ lineHeight: 1.5 }}>
                Acesse a aba "Mapa" na barra superior para filtrar serviços como clínicas, pet shops e muito mais.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
