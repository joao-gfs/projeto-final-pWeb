import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import '../styles/CardFilme.css';

export default function CardFilme({ poster_path, release_date, title, overview, id , botoes=['assistir', 'assistido'], resenha='', nota=0} ) {

  const navigate = useNavigate();

  // Converter a data
  let data = "";
  if (release_date === "") {
    data = 'Sem registros';
  } else {
    let lista = release_date.split('-');
    data = `${lista[2]}/${lista[1]}/${lista[0]}`;
  }

  let config = {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}`}}

  // Função para enviar solicitação "Quero assistir"
  const handleQueroAssistir = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/usuario/assistir`, {
        id,
        poster_path,
        release_date,
        title,
        overview
      }, config);
      alert('Filme adicionado à lista "Quero assistir"');
    } catch (error) {
      alert('Erro ao adicionar filme à lista "Quero assistir"');
    }
  };

  // Função para enviar solicitação "Já assisti"
  const handleJaAssisti = () => {
    navigate('/avaliar', {state: { poster_path, release_date, title, overview, id }});
  };

  const editarAvaliacao = () => {
    navigate('/avaliar/editar', {state: { poster_path, release_date, title, overview, id, resenha, nota }});
  }

  const handleDelete = async () => {
    try{
      const response = await axios.delete(`http://localhost:3000/usuario/filme/${id}`, config);
      alert('Filme removido com sucesso!');
      window.location.reload();
    } catch (error) {
      alert('Erro ao remover filme da lista!');
    } 
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

  let buttons = []
  if(botoes.includes('assistir')){
    buttons.push(<button id='btn-assistir' onClick={handleQueroAssistir}>Quero assistir</button>);
  }
  if(botoes.includes('assistido')){
    buttons.push(<button id='btn-assistido' onClick={handleJaAssisti}>Já assisti</button>)
  }
  if(botoes.includes('editar')){
    buttons.push(<button id='btn-assistido' onClick={editarAvaliacao}>Editar</button>)
  }
  if(botoes.includes('remover')){
    buttons.push(<button id='btn-remover' onClick={handleDelete}>Remover</button>)
  }
  
  let cardText
  if(resenha === '')
    cardText = overview
  else
    cardText = resenha

  return (
    <div id='card-filme'>
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`Poster do filme ${title}`} />
        <div id='card-body'>
            <div id='card-head'>
                <h2>{title}</h2>
                {divNota}
                <div id='buttons'>
                    {buttons}
                </div>
            </div>
            <div id='card-text'>
                <p>Data de lançamento: {data}</p>
                <p id='descricao-filme'>{cardText}</p>
            </div>
        </div>
    </div>
  )
}
