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
import NotFound from '../pages/NotFound';

/**
 * Definição centralizada de rotas da aplicação Vivarium.
 * Novas telas e submódulos podem ser registrados nesta estrutura.
 * 
 * Nota: A proteção visual de rotas está implementada nas próprias páginas:
 * - Login/Cadastro: Redirecionam para /perfil se já autenticado
 * - Perfil/CadastroPet/PerfilPet/Configuracoes: Redirecionam para /login se não autenticado
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
        path: 'pets/novo',
        element: <CadastroPet />,
      },
      {
        path: 'perfil',
        element: <Perfil />,
      },
      {
        path: 'pets/:id',
        element: <PerfilPet />,
      },
      {
        path: 'mapa',
        element: <Mapa />,
      },
      {
        path: 'configuracoes',
        element: <Configuracoes />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
