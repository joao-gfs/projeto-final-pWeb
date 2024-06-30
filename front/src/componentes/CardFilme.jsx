import React from 'react'
import '../styles/CardFilme.css'


export default function CardFilme({poster_path, release_date, title, overview}) {
  
  //converter a data
  let data = ""
  if(release_date === ""){
    data = 'Sem registros'
  } else {
    let lista = release_date.split('-');
    data = `${lista[2]}/${lista[1]}/${lista[0]}`;
  }
  

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
