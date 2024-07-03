import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from './Footer';
import '../styles/TelaPerfil.css'

export default function TelaPerfil() {

    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      const tokenAuth = sessionStorage.getItem('token');
      if(tokenAuth != null){
        setAuthorized(true)
      }
    })

    if(!authorized){
      return(
        <p id='pForbidden'>Você precisar entrar para acessar esta página. <Link id='redirect-entrar' to='/entrar'>Entrar</Link></p>
      )
    }

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
