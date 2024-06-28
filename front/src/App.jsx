import React, { useState } from 'react';
import './styles/App.css'
import Footer from './componentes/Footer'
import TopBar from './componentes/TopBar'
import axios from 'axios';
import CardFilme from './componentes/CardFilme';

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
      <div className='app-container'>
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
              {filmes.map(filme => <CardFilme key={filme.id} {...filme}/>)}
            </div>
        </section>
        <Footer/>
      </div>
    </>
  );
}

export default App;
