import React from 'react'
import axios from "axios";//npm install
import { useState } from "react";
import * as yup from 'yup';
import { Form, Link, Navigate } from "react-router-dom";
import './TelaCadastro.css'
import TopBar from '../TopBar';
import Footer from '../Footer/Footer';

export default function TelaCadastro() {
    
    const [user, setUser] = useState({
        id : Date.now(),
        usuario : '',
        senha : '',
        confsenha : '',
        email : ''
    });

    const [status, setStatus] = useState({
        type : '',
        msg : '',
    });

    //Receber dados do formulário
    const handleChange = (e) => {
        //constroi o novo valor
        const newValue = {
            id : Date.now(),
            [e.target.name] : e.target.value
        }
        //atualizar
        setUser({
            ...user,
            ...newValue
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!(await validate())) return;//se a função retorna diferente de true ele não continua

        //salvar dados do formulário
        const saveDataForm = true;

        try {
            //requisição para cadastrar usuário
            const resposta = await axios.post('http://localhost:3000/cadastrar', user);
            if(resposta.status === 200){
                setStatus({
            type : 'success',
            msg : 'Usuário cadastrado com sucesso!'
            });
                //resetar formulário após o sucesso
                setUser({
                    id: Date.now(),
                    usuario: '',
                    senha: '',
                    confsenha: '',
                    email: ''
                });
            }
        } catch (error) {
            setStatus({
                type : 'error',
                msg : error.response.data || 'Erro ao cadastrar Usuário'
            })
        }
    }

    //validar os campos do formulário
    async function validate(){
        let schema = yup.object().shape({
            usuario : yup.string('Erro: Necessário preencher o campo nome!')
                .required('Erro: Necessário preencher o campo nome!'),
            senha : yup.string('Erro: Necessário preencher o campo senha!')
                .required('Erro: Necessário preencher o campo senha!')
                .min(4, 'A senha deve ter no mínimo 4 caracteres!'),
            confsenha : yup.string('Erro: Necessário preencher o campo de confirmação').oneOf([yup.ref('senha'), null], 'As senhas não conferem!'),
            email : yup.string('Erro: Necessário preencher o campo email!')
                .required('Erro: Necessário preencher o campo email!')
                .email('Erro: Necessário preencher o campo email!')
        });

        try{
            await schema.validate(user);
            return true;//sucesso na validação 
        }catch (erro) {
            setStatus({
                type: 'error',
                msg : erro.errors
            });
            return false;//falha na validação
        }
    }
  
    return (
    <>
    <TopBar/>

    <h1>Cadastro</h1>
    <section className='formulario'>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="usuario">Usuário</label>
                <input type="usuario" id="usuario" name="usuario" placeholder="ex: João Silva" onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" name="senha" placeholder="Mínimo 4 caracteres" onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="confsenha">Confirmar senha</label>
                <input type="password" id="confsenha" name="confsenha" placeholder="Mínimo 4 caracteres" onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" placeholder="ex: seuemail@exemplo.com" onChange={handleChange}/>
            </div>

            <button>Enviar</button>
            
        </form>

            {status.msg}

            <p>Já possui uma conta? Clique em <Link to="/entrar">Entrar</Link></p>
        
            <Footer/>
    </section>
    </>
  )
}
