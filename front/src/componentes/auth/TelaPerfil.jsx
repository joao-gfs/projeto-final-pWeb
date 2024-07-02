import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import TopBar from '../TopBar';
import Footer from '../Footer';
import '../../styles/TelaPerfil.css'
import CardFilme from '../CardFilme';

export default function TelaPerfil() {
  
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('username');
        if (storedUser) {
          setUser(storedUser);
        }
      }, []);

    return (
    <>
        <TopBar/>
        <h1>Ver lista de Filmes</h1>
        <section className='filmes'>
            <div className='assistidos'>
                <h2><Link to='/filmes-assistidos'>Meus Filmes assistidos</Link></h2>
            </div>
            <div className='assistir'>
            <h2><Link to='/filmes-assistir'>Meus Filmes para assistir</Link></h2>
            </div>

        </section>

        <div className='footer-default'>
          <Footer/>
        </div>
    </>
  )
}
