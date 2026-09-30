import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

/**
 * Componente raiz da aplicação Vivarium.
 */
export default function App() {
  return <RouterProvider router={router} />;
}
