import React from 'react';
import axios, { formToJSON } from "axios";//npm install
import { useState } from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFormState } from 'react-hook-form';
import { Form, Link, Navigate } from "react-router-dom";
import '../../styles/TelaCadastro.css'
import TopBar from '../TopBar';
import Footer from '../Footer';

//validação
const schema = yup.object().shape({
    username: yup.string().required('Erro: Necessário preencher o campo usuário!'),
    senha: yup.string().required('Erro: Necessário preencher o campo senha!')
        .min(4, 'A senha deve ter no mínimo 4 caracteres!'),
    confsenha: yup.string().oneOf([yup.ref('senha'), null], 'As senhas não conferem!')
        .required('Erro: Necessário preencher o campo senha!'),
    email: yup.string().email('Erro: Necessário preencher o campo email!')
})

export default function TelaCadastro() {
    
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
        <p>{msgValidacao}</p>
      </div>
    );
  };
  
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
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" name="senha" placeholder="Mínimo 4 caracteres" {...register('senha')}/>
            </div>
            <div>
                <label htmlFor="confsenha">Confirmar senha</label>
                <input type="password" id="confsenha" name="confsenha" placeholder="Mínimo 4 caracteres" {...register('confsenha')}/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" placeholder="ex: seuemail@exemplo.com" {...register('email')}/>
            </div>

            <button type='submit'>Enviar</button>
            
        </form>

        {gerarMensagem()}

        {msg}

        <p>Já possui uma conta? Clique em <Link to="/entrar">Entrar</Link></p>
        
        <Footer/>
    </section>
    </>
  )
}
