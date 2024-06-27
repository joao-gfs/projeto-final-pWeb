const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Inicializar roteador
const router = express.Router();

// Inicialização do banco de dados
const bdPath = path.join(__dirname, '..', 'db', 'database-usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

// Importar modelo de usuário
const userPath = path.join(__dirname, '..', 'models', 'User');
const User = require(userPath);

// dotenv, que contém o token
require('dotenv').config();

// login de usuario
router.post('/entrar', async (req, res) => {

    const { username, senha } = req.body;

    for (let usuario of usuarios){
        console.log(usuario.username)
        if(usuario.username === username){
            const senhaValidada = await bcrypt.compare(senha, usuario.senha);
            if(senhaValidada === true){
                const tokenAcesso = jwt.sign(usuario, process.env.TOKEN);
                return res.status(200).json(tokenAcesso);
            }
            else
                return res.status(422).send(`Usuário ou senha incorretos.`);
        }
    }

    return res.status(409).send(`Usuário ${username} inexistente. Considere criar uma conta!`);

});

// cadastrar usuario
router.post('/cadastrar', async (req, res) => {

    const { username, email, senha } = req.body;

    for(let usuario of usuarios){
        if(usuario.email === email){
            return res.status(409).send(`Usuário com email ${email} já existe.`);
        }
    }

    // geracao do id
    const id = usuarios.length + 1;

    // encriptacao da senha
    const salt = await bcrypt.genSalt(10);
    const senhaCrypt = await bcrypt.hash(senha, salt);

    // criar usuario
    const novoUsuario = new User(id, username, email, senhaCrypt)

    // salvar no banco
    usuarios.push(novoUsuario);
    fs.writeFileSync(bdPath, JSON.stringify(usuarios, null, 2));
    res.status(200).send('OK');
});

module.exports = router
