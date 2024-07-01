import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';
import TopBar from './TopBar';
import CardFilme from './CardFilme';
import Footer from './Footer';
import '../styles/Listafilmes.css';

export default function TelaAssistir() {
  
    const [watch, setWatchList] = useState([]);

    useEffect(() => {
        const fetchWatchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:3000/usuario/assistir', {
                    headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}
                });
                setWatchList(response.data);
                console.log(response.data);
                
            } catch (error) {
                console.error('Erro ao carregar perfil do usuário!', error);
            }
        };

        fetchWatchMovies();
    }, []);

    return (
    <>
    <TopBar/>
    <h1>Filmes a Assistir</h1>
    <section>
        <ul>
            {watch.map(filme => <li>
                <CardFilme key={filme.id} {...filme}/>
            </li>)}
        </ul>
    </section>

    <button className='btnvoltar'><Link to='/perfil'>Voltar</Link></button>

    <Footer/>
    </>
  )
}
