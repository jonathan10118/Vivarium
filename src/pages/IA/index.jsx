/**
 * IA Page — Vivarium
 * Área de Inteligência Artificial da Vivarium
 * Assistente virtual especializado em saúde preventiva e bem-estar de cães e gatos
 * Executado 100% no frontend, sem APIs ou serviços externos
 */

import { useState, useRef, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Base de conhecimento local/mockada para perguntas frequentes de pets
const petKnowledgeBase = [
  {
    keywords: ['vacina', 'vacinação', 'vacinas', 'imunização'],
    category: 'Saúde e cuidados',
    title: 'Protocolo de Vacinação',
    response:
      'Para cães, as vacinas essenciais são a V8 ou V10 (cinomose, parvovirose, hepatite, leptospirose, etc.) e a Antirrábica. O protocolo de filhotes costuma iniciar aos 45-60 dias de vida com reforços a cada 21-30 dias. Para gatos, a vacina polivalente (V3, V4 ou V5) protege contra rinotraqueíte, calicivirose e panleucopenia, além da vacina contra raiva. Mantenha a carteirinha sempre em dia e consulte um veterinário para o reforço anual!',
  },
  {
    keywords: ['comida', 'ração', 'alimentação', 'quantidade', 'comer', 'nutrição'],
    category: 'Alimentação',
    title: 'Nutrição e Porção Diária',
    response:
      'A quantidade ideal de ração varia conforme peso, idade e nível de atividade física do pet. Filhotes geralmente comem de 3 a 4 vezes ao dia, enquanto adultos se adaptam bem a 2 refeições diárias. Evite alimentos proibidos como chocolate, cebola, alho, uvas e ossos cozidos. Sempre mantenha água fresca e limpa à vontade!',
  },
  {
    keywords: ['gato', 'felino', 'estresse', 'miado', 'caixa de areia'],
    category: 'Comportamento',
    title: 'Comportamento e Bem-Estar Felino',
    response:
      'Gatos são sensíveis a mudanças no ambiente. Para reduzir o estresse, proporcione enriquecimento ambiental (arranhadores, prateleiras altas, esconderijos) e garanta a regra da caixa de areia (1 caixa por gato + 1 extra). Alterações repentinas no uso da caixa de areia podem indicar problemas no trato urinário; nesses casos, consulte um veterinário.',
  },
  {
    keywords: ['pulga', 'carrapato', 'antiparasitário', 'verme', 'desparasitação'],
    category: 'Higiene',
    title: 'Controle de Parasitas',
    response:
      'A prevenção contra pulgas, carrapatos e vermes deve ser contínua durante todo o ano. Existem opções em pipetas, comprimidos mastigáveis e coleiras repelentes. A vermifugação em adultos costuma ocorrer a cada 3 a 6 meses. Consulte a melhor opção para a idade e peso do seu pet!',
  },
  {
    keywords: ['filhote', 'socializar', 'morder', 'educar', 'adestrar'],
    category: 'Comportamento',
    title: 'Socialização de Filhotes',
    response:
      'O período crítico de socialização ocorre até as 14-16 semanas. Apresente gradualmente diferentes sons, superfícies e pessoas de maneira positiva com petiscos. Utilize sempre o reforço positivo (elogios e recompensas) em vez de broncas ou punições físicas.',
  },
  {
    keywords: ['passeio', 'caminhada', 'parque', 'correr'],
    category: 'Passeios',
    title: 'Passeios e Exercícios',
    response:
      'Cães precisam de passeios diários regulares para manter saúde física e mental. A frequência ideal é de 2 a 3 passeios por dia, com duração de 15 a 30 minutos cada, dependendo da raça e idade. Evite passeios em horários de muito calor e sempre leve água e sacolinhas para coleta de fezes.',
  },
  {
    keywords: ['banho', 'tosa', 'limpeza', 'escovar'],
    category: 'Higiene',
    title: 'Banho e Higiene',
    response:
      'A frequência de banho varia de acordo com a raça e o tipo de pelagem. Em média, cães podem ser banhados a cada 15-30 dias, enquanto gatos se autolimpam e raramente precisam de banho. Use produtos específicos para animais e evite água nos ouvidos para prevenir infecções.',
  },
  {
    keywords: ['rotina', 'horário', 'dormir', 'comer'],
    category: 'Rotina',
    title: 'Rotina do Pet',
    response:
      'Manter uma rotina consistente é essencial para o bem-estar do seu pet. Horários fixos para alimentação, passeios e descanso ajudam a reduzir ansiedade e melhoram o comportamento. Pets gostam de previsibilidade e se sentem mais seguros quando sabem o que esperar.',
  },
];

// Categorias de filtros
const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'Alimentação', label: 'Alimentação' },
  { id: 'Comportamento', label: 'Comportamento' },
  { id: 'Saúde e cuidados', label: 'Saúde e cuidados' },
  { id: 'Higiene', label: 'Higiene' },
  { id: 'Passeios', label: 'Passeios' },
  { id: 'Rotina', label: 'Rotina' },
  { id: 'Outros', label: 'Outros' },
];

export default function IA() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Olá! Sou a Vivarium IA, sua assistente inteligente dedicada à saúde preventiva, nutrição e bem-estar dos seus pets. Como posso ajudar você e seu companheiro hoje?',
      timestamp: 'Agora',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const chatBottomRef = useRef(null);

  const quickPrompts = [
    '🩺 Calendário de vacinação para filhotes',
    '🍖 Quantidade diária ideal de ração',
    '🐱 Como diminuir o estresse em gatos',
    '🪲 Prevenção contra pulgas e carrapatos',
    '🐾 Dicas para socializar cães filhotes',
  ];

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simula raciocínio e busca na base de conhecimento local
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let matched = petKnowledgeBase.find((kb) =>
        kb.keywords.some((kw) => lowerQuery.includes(kw))
      );

      // Filtrar por categoria se selecionada
      if (selectedCategory !== 'all' && matched) {
        if (matched.category !== selectedCategory) {
          matched = null;
        }
      }

      let responseText = '';
      if (matched) {
        responseText = matched.response;
      } else {
        if (selectedCategory === 'all') {
          responseText = `Entendido! Sobre "${query}": Para garantir a saúde ideal do seu pet, é essencial observar o comportamento diário, manter alimentação de qualidade, hidratação constante e rotina de passeios. Lembre-se que cada animal é único. Caso note sintomas como apatia, vômitos ou perda de apetite, consulte sempre um médico veterinário.`;
        } else {
          responseText = `Sobre "${query}" na categoria "${selectedCategory}": Não encontrei informações específicas nesta categoria. Tente selecionar "Todos" ou reformular sua pergunta para receber orientações gerais.`;
        }
      }

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  useEffect(() => {
    // Só fazer scroll se houver mais de 1 mensagem (welcome + nova mensagem)
    // Isso evita scroll no carregamento inicial da página
    if (messages.length > 1) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

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
      {/* Cabeçalho Tecnológico */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
          style={{
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-primary)',
            fontSize: 'var(--font-size-small)',
            border: '1px solid var(--color-secondary-dark)',
            boxShadow: 'var(--shadow-glow)',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>✨</span> Vivarium IA v1.0 • Assistente Preventivo
        </div>
        <h1 className="h1 mb-2" style={{ color: 'var(--color-text)' }}>
          Inteligência Artificial para Cuidados Pet
        </h1>
        <p className="body text-secondary" style={{ maxWidth: '640px', margin: '0 auto' }}>
          Tire dúvidas rápidas sobre cuidados diários, sinais de bem-estar e alimentação
          com a assistente inteligente da Vivarium.
        </p>
      </div>

      {/* Filtros por Categoria */}
      <div className="mb-6">
        <div
          className="flex flex-wrap gap-2 justify-center"
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: 'var(--space-xs) var(--space-md)',
                fontSize: 'var(--font-size-small)',
                fontWeight: selectedCategory === cat.id ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                backgroundColor: selectedCategory === cat.id ? 'var(--color-primary)' : 'var(--color-surface)',
                color: selectedCategory === cat.id ? 'var(--color-text-inverse)' : 'var(--color-text)',
                border: selectedCategory === cat.id ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== cat.id) {
                  e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== cat.id) {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Caixa do Chat Interativo */}
      <div
        className="card mb-8"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-2xl)',
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '520px',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Topbar do Chat */}
        <div
          style={{
            padding: 'var(--space-md) var(--space-xl)',
            backgroundColor: 'var(--color-surface-elevated)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                border: '1px solid var(--color-secondary-dark)',
              }}
            >
              🤖
            </div>
            <div>
              <h3 className="h3" style={{ fontSize: '1.05rem', margin: 0 }}>
                Vivarium IA
              </h3>
              <span className="caption" style={{ color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }} />
                Online no navegador
              </span>
            </div>
          </div>

          <span
            className="caption text-muted"
            style={{
              backgroundColor: 'var(--color-secondary)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)',
            }}
          >
            Processamento Local
          </span>
        </div>

        {/* Histórico de Mensagens */}
        <div
          style={{
            flex: 1,
            padding: 'var(--space-xl)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-md)',
            maxHeight: '440px',
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '82%',
                  padding: 'var(--space-md) var(--space-lg)',
                  borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  backgroundColor:
                    msg.sender === 'user'
                      ? 'var(--color-primary)'
                      : 'var(--color-secondary)',
                  color:
                    msg.sender === 'user'
                      ? 'var(--color-text-inverse)'
                      : 'var(--color-text)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--color-secondary-dark)',
                  lineHeight: '1.6',
                  fontSize: '0.95rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {msg.text}
              </div>
              <span
                className="caption text-muted mt-1"
                style={{ padding: '0 4px', fontSize: '0.72rem' }}
              >
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
              <span className="caption">Vivarium IA está digitando</span>
              <span className="animate-spin" style={{ display: 'inline-block' }}>⚙️</span>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Sugestões Rápidas de Perguntas */}
        <div
          style={{
            padding: 'var(--space-xs) var(--space-lg)',
            backgroundColor: 'rgba(15, 27, 46, 0.5)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            gap: 'var(--space-xs)',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(prompt.replace(/^[^\s]+\s/, ''))}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-primary)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.backgroundColor = 'var(--color-surface)';
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Campo de Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          style={{
            padding: 'var(--space-md) var(--space-lg)',
            backgroundColor: 'var(--color-surface-elevated)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            gap: 'var(--space-sm)',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            className="input"
            placeholder="Digite uma dúvida sobre saúde, vacinas, ração ou cuidados..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button type="submit" variant="primary" disabled={!inputValue.trim() || isTyping}>
            Enviar
          </Button>
        </form>
      </div>

      {/* Aviso Médico e Preventivo */}
      <div
        className="card mb-8"
        style={{
          backgroundColor: 'var(--color-secondary)',
          border: '1px solid var(--color-secondary-dark)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-md)',
          padding: 'var(--space-lg)',
        }}
      >
        <span style={{ fontSize: '1.75rem' }}>🩺</span>
        <div style={{ flex: 1 }}>
          <h4 className="small font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
            Aviso de Saúde Preventiva
          </h4>
          <p className="caption text-secondary" style={{ margin: 0, lineHeight: 1.5 }}>
            A Vivarium IA é uma ferramenta de suporte consultivo e orientações gerais de bem-estar.
            Em caso de emergências, intoxicações ou sintomas persistentes, procure imediatamente um médico veterinário.
          </p>
        </div>
      </div>

      {/* Recursos de IA em Desenvolvimento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-3xl mb-2">📋</div>
          <h3 className="h3 mb-2" style={{ fontSize: '1.1rem' }}>
            Triagem Sintomática
          </h3>
          <p className="small text-secondary" style={{ lineHeight: 1.6 }}>
            Questionários inteligentes para identificar sinais precoces de desconforto em cães e gatos.
          </p>
        </Card>

        <Card>
          <div className="text-3xl mb-2">🥗</div>
          <h3 className="h3 mb-2" style={{ fontSize: '1.1rem' }}>
            Cálculo de Porções
          </h3>
          <p className="small text-secondary" style={{ lineHeight: 1.6 }}>
            Ajuste de gramatura diária e calorias conforme a idade, raça e peso ideal do seu animal.
          </p>
        </Card>

        <Card>
          <div className="text-3xl mb-2">🗺️</div>
          <h3 className="h3 mb-2" style={{ fontSize: '1.1rem' }}>
            Cruzamento com Mapa
          </h3>
          <p className="small text-secondary" style={{ lineHeight: 1.6 }}>
            Recomendação automática dos hospitais veterinários e serviços mais adequados próximos de você.
          </p>
        </Card>
      </div>
    </div>
  );
}
