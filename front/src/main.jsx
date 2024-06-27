import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import TopBar from './componentes/TopBar.jsx'
import TelaCadastro from './componentes/auth/TelaCadastro.jsx'
import TelaLogin from './componentes/auth/TelaLogin.jsx'

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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes} />
)
