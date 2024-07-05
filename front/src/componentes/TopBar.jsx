import React, { useState, useEffect } from 'react';
import { Form, Link, Navigate, useLocation } from "react-router-dom";
import '../styles/TopBar.css';

export default function TopBar() {
  const [user, setUser] = useState(null);
  const location = useLocation();//localiza o url atual

  useEffect(() => {
    const storedUser = sessionStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    setUser(null);
    return <Navigate to='/' />
  };

  return (
    <nav>
      <div className='deslogado'>
        {!user && (
          <>
            <Link to="/cadastrar" className='cadastrar'>Cadastrar</Link>
            <Link to="/entrar" className='entrar'>Entrar</Link>
          </>
        )}
      </div>
      {user && (
        <div className='logado'>
          <span className='username'>Olá, {user}!</span>
          {location.pathname !== '/perfil' && (
          <Link to='/perfil' className='perfil'>Meu Perfil</Link>)}
          {location.pathname !== '/' && (
            <Link to='/' className='menu'>Buscar</Link>)}
          <button onClick={handleLogout} className='logout'><Link to='/'>Sair</Link></button>
        </div>
      )}
    </nav>
  );
}
