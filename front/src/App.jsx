import React from 'react';
import './styles/App.css'
import Footer from './componentes/Footer'
import TopBar from './componentes/TopBar'

function App() {

  return (
    <>
      <TopBar/>
      <section>
        <header>
          <h1>Letter Box</h1>
          <input type="text" />
          <button>Pesquisar</button>
        </header>
      </section>
      <Footer/>
    </>
  )
}

export default App
