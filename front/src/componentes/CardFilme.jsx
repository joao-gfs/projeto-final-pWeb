import React from 'react';
import axios from 'axios';
import '../styles/CardFilme.css';
import { useNavigate } from 'react-router-dom';

export default function CardFilme({ poster_path, release_date, title, overview, id }) {

  const navigate = useNavigate();

  // Converter a data
  let data = "";
  if (release_date === "") {
    data = 'Sem registros';
  } else {
    let lista = release_date.split('-');
    data = `${lista[2]}/${lista[1]}/${lista[0]}`;
  }
  
  // Função para enviar solicitação "Quero assistir"
  const handleQueroAssistir = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/usuario/assistir/`, 
        {
          id,
          poster_path,
          release_date,
          title,
          overview  
        }, 
        {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      alert('Filme adicionado à lista "Quero assistir"');
    } catch (error) {
      alert('Erro ao adicionar filme à lista "Quero assistir"');
    }
  };

  // Função para enviar solicitação "Já assisti"
  const handleJaAssisti = () => {
    navigate('/avaliar');
  };

  return (
    <div id='card-filme'>
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`Poster do filme ${title}`} />
        <div id='card-body'>
            <div id='card-head'>
                <h2>{title}</h2>
                <div id='buttons'>
                    <button>Quero asistir</button>
                    <button>Já assisti</button>
                </div>
            </div>
            <div id='card-text'>
                <p>Data de lançamento: {data}</p>
                <p id='descricao-filme'>{overview}</p>
            </div>
        </div>
    </div>
  )
}
