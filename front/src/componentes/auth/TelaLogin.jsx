import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TopBar from '../TopBar';
import Footer from '../Footer';
import '../../styles/TelaLogin.css';

//validação
const schema = yup.object().shape({
  username: yup.string().required('Necessário preencher o campo usuário!'),
  senha: yup.string().required('Necessário preencher o campo senha!')
});

export default function TelaLogin() {

  const navigate = useNavigate();
  
  const [msg, setMsg] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  //enviar dados do usuário
  const submit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/entrar', data);
      sessionStorage.setItem('token', response.data);
      sessionStorage.setItem('username', data.username);
      setMsg('sucesso');
    } catch (error) {
      setMsg(error.response.data);
    }
  };

  if(msg.includes('sucesso')){
    return <Navigate to='/' />
  }

  //gerar mensagens de validação
  const gerarMensagem = () => {
    const primeiraMsg = Object.keys(errors)[0];//pega primeira chave de erro 
    const msgValidacao = primeiraMsg ? errors[primeiraMsg].message : null;//se existe erro pega a mensagem
    return msgValidacao && (
      <div className='msg-validacao'>
        <p id='erro-validacao'>{msgValidacao}</p>
      </div>
    );
  };

  const handleVoltar = () => {
    navigate('/');
  };

  return (
    <>
      <TopBar />

      <h1>Entrar</h1>
      <section className='loginusuario'>
        <form onSubmit={handleSubmit(submit)}>
          <div>
            <label htmlFor="username">Usuário</label>
            <input type="text" id='username' placeholder='Seu nome de usuário' {...register('username')} />
          </div>
          <div>
            <label htmlFor="senha">Senha</label>
            <input type="password" id='senha' placeholder='Sua senha' {...register('senha')} />
          </div>

          <button>Entrar</button>
          <button onClick={handleVoltar}>Voltar</button>

        </form>

      {gerarMensagem()}

      <p id='erro-validacao'>{msg}</p>

      <p>Não possui conta? <Link to="/cadastrar">Cadastrar</Link></p>
    </section>
      
      <div className='footer-default'>
        <Footer/>
      </div>
    </>
  );
}
