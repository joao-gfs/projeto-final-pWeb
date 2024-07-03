import React, { useState } from 'react'
import TopBar from './TopBar'
import Footer from './Footer'
import axios from 'axios'
import '../styles/Avaliacao.css'
import { Navigate, useLocation } from 'react-router-dom'

export default function Avaliacao() {

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const tokenAuth = sessionStorage.getItem('token');
    if(tokenAuth != null){
      setAuthorized(true)
    }
  })

  if(!authorized){
    return(
      <p id='pForbidden'>Você precisa entrar para acessar esta página. <Link id='redirect-entrar' to='/entrar'>Entrar</Link></p>
    )
  }

    const {poster_path, release_date, title, overview, id, resenha, nota} = useLocation().state;

    const anoLancamento = release_date.split('-')[0]

    const [msg, setMsg] = useState('');
    const [botaoAtivo, setBotaoAtivo] = useState(0);
    const [avaliacao, setAvaliacao] = useState({
      id,
      poster_path,
      release_date,
      title,
      overview,
      nota,
      resenha: resenha
    })

    const handleNota = (n) => {
      const novaNota = {nota: n.target.innerText}
      setBotaoAtivo(n.target.innerText)
      setAvaliacao({
        ...avaliacao,
        ...novaNota
      });
    }

    const handleChange = (e) => {
      const novoValor = {
        resenha: e.target.value
      }
      setAvaliacao({
        ...avaliacao,
        ...novoValor
      })
    }

    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      try{
        const resposta = await axios.put(`http://localhost:3000/usuario/assistido/{id}`, avaliacao, config);
        if(resposta.status === 200){
          setMsg('OK');
        }
      } catch(error) {

      }
    }

    if(msg === 'OK'){
      return <Navigate to='/perfil' />
    }

    let divNota = null
  if(nota != 0){
    if(nota >= 4){
      divNota = <div className='notas' id='notaAlta'>{nota}</div>
    } else if(nota >= 3) {
      divNota = <div className='notas' id='notaMedia'>{nota}</div>
    } else {
      divNota = <div className='notas' id='notaBaixa'>{nota}</div>
    }
  }

  return (
    <>
        <TopBar />
        <h1>Avaliar Filme</h1>
        
        <div id='avaliacao'>
            <div id='av-head'>
              <h2>{title} - {anoLancamento}</h2>
              {divNota}
              <button onClick={handleSubmit}>Enviar</button>
            </div>
            <div id='av-body'>
              <img id='poster' src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`Poster de ${title}`} />
              <div id='texto-avaliar'>
                <p id='p-avaliacao'>{overview}</p>
                <div id='rating'>
                {['1', '2', '3', '4', '5'].map((valorNota) => (
                  <button 
                    key={valorNota} 
                    onClick={handleNota} 
                    className={botaoAtivo == valorNota ? 'ativo' : ''}
                  >
                    {valorNota}
                  </button>
                ))}
                </div>
                <div id='resenha'>
                  <label htmlFor="input-resenha">Comentário:</label>
                  <textarea id='texto-resenha' onChange={handleChange} value={avaliacao.resenha}/>
                </div>
              </div>
            </div>
            
        </div>
        
        <Footer id='footer-avaliacao'/>
    </>
    
  )
}
