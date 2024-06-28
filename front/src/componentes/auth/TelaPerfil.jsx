import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import TopBar from '../TopBar';
import Footer from '../Footer';
import '../../styles/TelaPerfil.css'

export default function TelaPerfil() {
  
    const [user, setUser] = useState({});
    const [watched, setWatched] = useState([]);
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        const perfilUsuario = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/perfil');
                setUser(response.data);
                setWatched(response.data.watched);
                setWatchList(response.data.watchList);
            } catch (error) {
                console.error('Erro ao pesquisar perfil!');
            }
        };

        perfilUsuario();
    }, []);

    return (
    <>
        <TopBar/>
        <h1>Meus Filmes</h1>
        <section className='filmes'>
            <div className='assistidos'>
                <h2>Filmes assistidos</h2>
                <ul>
                    {watched.map(filme => <li key={filme.id}>{filme.title}</li>)}
                </ul>
            </div>
            <div className='assistir'>
            <h2>Filmes a assistir</h2>
                <ul>
                    {watchList.map(filme => <li key={filme.id}>{filme.title}</li>)}
                </ul>
            </div>

        </section>
        <div className='footer-default'>
            <Footer/>
        </div>
    </>
  )
}
