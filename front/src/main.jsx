import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import TelaCadastro from './componentes/auth/TelaCadastro.jsx'
import TelaLogin from './componentes/auth/TelaLogin.jsx'
import TelaPerfil from './componentes/TelaPerfil.jsx'
import TelaAssistidos from './componentes/TelaAssistidos.jsx'
import TelaAssistir from './componentes/TelaAssistir.jsx'
import Avaliacao from './componentes/Avaliacao.jsx'
import AvaliacaoEdit from './componentes/AvaliacaoEdit.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/cadastrar',
    element: <TelaCadastro/>
  },
  {
    path: '/entrar',
    element: <TelaLogin/>
  },
  {
    path: '/perfil',
    element: <TelaPerfil/>
  },
  {
    path: '/avaliar',
    element: <Avaliacao />
  },
  {
    path: '/editaAvaliar',
    element: <AvaliacaoEdit />
  },
  {
    path: '/filmes-assistidos',
    element: <TelaAssistidos />
  },
  {
    path: '/filmes-assistir',
    element: <TelaAssistir />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes} />
)
