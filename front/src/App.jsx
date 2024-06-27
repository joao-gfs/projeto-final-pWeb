import React, { useState } from 'react';
import './styles/App.css'
import Footer from './componentes/Footer'
import TopBar from './componentes/TopBar'
import axios from 'axios';

function App() {
  const [titulo, setTitulo] = useState('');
  const [filmes, setFilmes] = useState([]);

  const buscarFilme = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/filmes/buscar/${titulo}`);
      setFilmes(response.data);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  return (
    <>
      <TopBar/>
      <section>
        <header>
          <h1>Letter Box</h1>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <button onClick={buscarFilme}>Pesquisar</button>
        </header>
          <div>
            {filmes.map(filme => (
              <div key={filme.id}>
                <h3>{filme.title}</h3>
                <img src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={`Poster do filme ${filme.title}`} />
              </div>
            ))}
          </div>
      </section>
      <Footer/>
    </>
  );
}

export default App;
