import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import TopBar from '../TopBar';
import Footer from '../Footer';
import '../../styles/TelaPerfil.css'
import CardFilme from '../CardFilme';

export default function TelaPerfil() {
  
    const [user, setUser] = useState({});
    const [watched, setWatched] = useState([]);
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const storedUser = sessionStorage.getItem('username');
                console.log('user: ', storedUser)
                
                //requisição filmes assistidos
                const responseAssistidos = await axios.get('http://localhost:3000/usuario/assistido', {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setWatched(responseAssistidos.data);

                //requisição filmes a assistir
                const responseAssistir = await axios.get('http://localhost:3000/usuario/assistir', {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setWatchList(responseAssistir.data);

                if (storedUser) {
                    setUser(storedUser);
                }
                
            } catch (error) {
                console.error('Erro ao carregar perfil do usuário!', error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
    <>
        <TopBar/>
        <h1>Meus Filmes</h1>
        <section className='filmes'>
            <div className='assistidos'>
                <h2>Filmes assistidos</h2>
                <ul>
                    {watched.map(filme => (
                        <li key={filme.id}>
                            <CardFilme poster_path={filme.poster_path} 
                                release_date={filme.release_date} 
                                title={filme.title} 
                                overview={filme.overview} 
                                id={filme.id}/>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='assistir'>
            <h2>Filmes a assistir</h2>
                <ul>
                {watchList.map(filme => (
                        <li key={filme.id}>
                            <CardFilme poster_path={filme.poster_path} 
                                release_date={filme.release_date} 
                                title={filme.title} 
                                overview={filme.overview} 
                                id={filme.id}/>
                        </li>
                    ))}
                </ul>
            </div>

        </section>

        <Footer/>
    </>
  )
}
