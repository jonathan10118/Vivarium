# Vivarium

Projeto frontend desenvolvido em **React**, **Vite** e **React Router**, estruturado de forma limpa, moderna e modular para apresentação executiva e evolução progressiva.

---

## 🚀 Como Executar o Projeto Localmente

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

O servidor será disponibilizado em: `http://localhost:5173`

### 3. Gerar build de produção
```bash
npm run build
```

---

## 📁 Estrutura de Diretórios

```
Vivarium/
├── index.html                  # Ponto de entrada HTML com fontes e viewport
├── package.json                # Manifesto e dependências do projeto
├── vite.config.js              # Configurações do Vite
├── .gitignore                  # Arquivos ignorados pelo Git
├── README.md                   # Documentação do projeto
├── public/
│   └── favicon.svg             # Ícone da aplicação
└── src/
    ├── main.jsx                # Ponto de inicialização do React
    ├── App.jsx                 # Componente raiz com provedor de rotas
    ├── assets/                 # Recursos visuais (imagens, ícones, logos)
    ├── components/             # Componentes de interface reutilizáveis
    ├── layouts/                # Estruturas de layout (ex: MainLayout com Outlet)
    │   └── MainLayout.jsx
    ├── pages/                  # Telas e views da aplicação
    │   └── Home/
    │       └── index.jsx       # View inicial minimalista
    ├── routes/                 # Definição e configuração das rotas
    │   └── index.jsx
    ├── services/               # Camada de comunicação com APIs futuras
    └── styles/                 # Estilos globais e tokens de design
        ├── global.css          # Reset e estilização base
        └── variables.css       # Variáveis CSS (cores, tipografia, espaçamento)
```

---

## 🛠️ Stack Tecnológica

- **React 19** - Biblioteca base de UI
- **Vite 6** - Ferramenta de build ultrarrápida
- **React Router 7** - Roteamento declarativo
- **Vanilla CSS (Design Tokens)** - Estilização moderna e sem overhead
