import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';
import TopBar from './TopBar';
import CardFilme from './CardFilme';
import Footer from './Footer';
import '../styles/Listafilmes.css';

export default function TelaAssistidos() {
  
    const [authorized, setAuthorized] = useState(false);
    const [watched, setWatched] = useState([]);

    useEffect(() => {
      const tokenAuth = sessionStorage.getItem('token');
      if(tokenAuth != null){
        setAuthorized(true)
      }
    }, []);

    useEffect(() => {
        const fetchWatchedMovies = async () => {
            try {
                const response = await axios.get('http://localhost:3000/usuario/assistidos', {
                    headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}
                });
                setWatched(response.data);
                console.log(response.data);
                
            } catch (error) {
                console.error('Erro ao carregar perfil do usuário!', error);
            }
        };

        fetchWatchedMovies();
    }, []);

    if(!authorized){
      return(
        <p id='pForbidden'>Você precisa entrar para acessar esta página. <Link id='redirect-entrar' to='/entrar'>Entrar</Link></p>
      )
    };

    return (
    <>
    <TopBar/>
    <h1>Filmes Assistidos:</h1>
    <section>
        <ul>
            {watched.map(filme => <li>
                <CardFilme key={filme.id} {...filme} botoes={['editar', 'remover']}/>
            </li>)}
        </ul>
    </section>

    <button className='btnvoltar'><Link to='/perfil'>Voltar</Link></button>

    <Footer/>
    </>
  )
}
