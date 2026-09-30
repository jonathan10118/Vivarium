import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import CadastroPet from '../pages/CadastroPet';
import Perfil from '../pages/Perfil';
import PerfilPet from '../pages/PerfilPet';
import Mapa from '../pages/Mapa';
import Configuracoes from '../pages/Configuracoes';
import MeusPets from '../pages/MeusPets';
import Contato from '../pages/Contato';
import IA from '../pages/IA';
import NotFound from '../pages/NotFound';

/**
 * Definição centralizada de rotas da aplicação Vivarium.
 * Todas as rotas públicas e autenticadas registradas no padrão React Router.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'cadastro',
        element: <Cadastro />,
      },
      {
        path: 'mapa',
        element: <Mapa />,
      },
      {
        path: 'ia',
        element: <IA />,
      },
      {
        path: 'contato',
        element: <Contato />,
      },
      {
        path: 'perfil',
        element: <Perfil />,
      },
      {
        path: 'configuracoes',
        element: <Configuracoes />,
      },
      {
        path: 'pets',
        element: <MeusPets />,
      },
      {
        path: 'meus-pets',
        element: <MeusPets />,
      },
      {
        path: 'pets/novo',
        element: <CadastroPet />,
      },
      {
        path: 'pets/:id',
        element: <PerfilPet />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
