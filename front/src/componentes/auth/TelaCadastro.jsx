import React from 'react';
import axios from "axios";//npm install
import { useState } from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from "react-router-dom";
import '../../styles/TelaCadastro.css'
import TopBar from '../TopBar';
import Footer from '../Footer';

//validação
const schema = yup.object().shape({
    username: yup.string().required('Necessário preencher o campo usuário!'),
    email: yup.string().email('Insira um e-mail válido!').required('Necessário preencher o campo email!'),
    senha: yup.string().required('Necessário preencher o campo senha!')
        .min(4, 'A senha deve ter no mínimo 4 caracteres!'),
    confsenha: yup.string().oneOf([yup.ref('senha'), null], 'As senhas não conferem!')
        .required('Necessário preencher o campo senha!')
})

export default function TelaCadastro() {

    const navigate = useNavigate();
    
    const [userCriado, setUserCriado] = useState(false);
    const [msg, setMsg] = useState();
    const { register, handleSubmit, formState } = useForm({resolver: yupResolver(schema)});
    const {errors} = formState;

    //enviar dados do usuário
    const submit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/cadastrar', data);
            setMsg(response.data);
            if (response.data.includes('sucesso')) {
                setUserCriado(true);
            }
        } catch (error) {
            setMsg(error.response.data);
        }
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
  
  if(msg === 'Usuário cadastrado com sucesso.') {
    return <Navigate to='/entrar' />
  }

    return (
    <>
    <TopBar/>

    <h1>Cadastro</h1>
    <section className='cadastrousuario'>
        <form onSubmit={handleSubmit(submit)}>
            <div>
                <label htmlFor="username">Usuário</label>
                <input type="text" id="username" name="username" placeholder="ex: João Silva" {...register('username')}/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" placeholder="ex: seuemail@exemplo.com" {...register('email')}/>
            </div>
            <div>
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" name="senha" placeholder="Mínimo 4 caracteres" {...register('senha')}/>
            </div>
            <div>
                <label htmlFor="confsenha">Confirmar senha</label>
                <input type="password" id="confsenha" name="confsenha" placeholder="Mínimo 4 caracteres" {...register('confsenha')}/>
            </div>

            <div>
                <button type='submit'>Enviar</button>
                <button className='btnvoltar' onClick={handleVoltar}>Voltar</button>
            </div>
            
        </form>

        {gerarMensagem()}

        <p id='erro-validacao'>{msg}</p>

        <p>Já possui uma conta? <Link to="/entrar">Entrar</Link></p>

        
        <div className='footer-default'>
            <Footer/>
        </div>
    </section>
    </>
  )
}
