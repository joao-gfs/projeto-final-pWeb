import React from 'react'
import { Form, Link, Navigate } from "react-router-dom"
import '../styles/TopBar.css'

export default function TopBar() {
  return (
    <>
        <nav>
            <Link to="/cadastrar" className='cadastrar'>Cadastrar</Link>
            <Link to="/entrar" className='entrar'>Entrar</Link>
        </nav>
    </>
  )
}
