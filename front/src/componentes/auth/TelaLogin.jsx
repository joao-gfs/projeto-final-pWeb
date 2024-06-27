import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TopBar from '../TopBar';
import Footer from '../Footer';
import '../../styles/TelaLogin.css';

//validação
const schema = yup.object().shape({
  username: yup.string().required('Erro: Necessário preencher o campo usuário!'),
  senha: yup.string().required('Erro: Necessário preencher o campo senha!')
});

export default function TelaLogin() {
  const [msg, setMsg] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  //enviar dados do usuário
  const submit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/entrar', data);
      setMsg(response.data);
      if (response.data.includes('sucesso')) {
      }
    } catch (error) {
      setMsg(error.response.data);
    }
  };

  //gerar mensagens de validação
  const gerarMensagem = () => {
    const primeiraMsg = Object.keys(errors)[0];//pega primeira chave de erro 
    const msgValidacao = primeiraMsg ? errors[primeiraMsg].message : null;//se existe erro pega a mensagem
    return msgValidacao && (
      <div className='msg-validacao'>
        <p>{msgValidacao}</p>
      </div>
    );
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
        </form>

        {gerarMensagem()}
        {msg}

        <p>Não possui conta? Clique em <Link to="/cadastrar">Cadastrar</Link></p>
      </section>
      <Footer />
    </>
  );
}
