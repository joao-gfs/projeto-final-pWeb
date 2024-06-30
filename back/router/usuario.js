const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const jwt = require('jsonwebtoken');

// Inicializar roteador
const router = express.Router();

// Inicialização do banco de dados
const bdPath = path.join(__dirname, '..', 'db', 'database-usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

// Dados necessários para consumo da API
const apiKey = '562c60fb36e6799832d03a838a39216b';
const apiUrl = 'https://api.themoviedb.org/3/search/movie';

router.get('/', (req, res) => {
    
    res.status(200).json(usuarios)

});

// adicionar filme nos "a assistir"
router.post('/assistir/:id', autenticarToken, (req, res) => {
    const filmeId = req.params.id;
    const usuarioId = req.user.id;

    // Encontrar o usuário no banco de dados
    const usuarioBD = usuarios.find(u => u.id === usuarioId);
    if (!usuarioBD) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verificar se o filme já está na lista de "assistir"
    const filmeExistente = usuarioBD.assistir.find(filme => filme.id === filmeId);
    if (filmeExistente) {
        return res.status(400).json({ message: 'Filme já está na lista de "a assistir"' });
    }

    // Adicionar o filme à lista de "a assistir"
    usuarioBD.assistir.push({ id: filmeId });

    // Salvar os usuários de volta no banco de dados
    fs.writeFileSync(bdPath, JSON.stringify(usuarios, null, 2));

    res.status(200).json({ message: 'Filme adicionado à lista de "a assistir"' });
});

// remover filme dos "a assistir"
router.delete('/assistir/:id', autenticarToken, (req, res) => {
    const filmeID = req.params.id;
    const usuarioID = req.user.id;

    const usuarioBD = usuarios.find(u => u.id === usuarioID);
    if(!usuarioBD) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const acharIndex = (f) => {
        return f.id == filmeID
    }

    const index = usuarioBD.assistir.findIndex(acharIndex);

    usuarioBD.assistir.splice(index, 1);        

    fs.writeFileSync(bdPath, JSON.stringify(usuarios, null, 2));

    res.status(200).json({ message: 'Filme removido com sucesso' });
});

// adicionar filme nos "assistidos"
router.post('/assistido/:id', autenticarToken, (req, res) => {
    const filmeId = req.params.id;
    const usuarioId = req.user.id;

    // Encontrar o usuário no banco de dados
    const usuarioBD = usuarios.find(u => u.id === usuarioId);
    if (!usuarioBD) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verificar se o filme já está na lista de "assistidos"
    const filmeExistente = usuarioBD.assistidos.find(filme => filme.id === filmeId);
    if (filmeExistente) {
        return res.status(400).json({ message: 'Filme já está na lista de "a assistir"' });
    }

    // Adicionar o filme à lista de "a assistir"
    usuarioBD.assistidos.push({ id: filmeId });

    // Salvar os usuários de volta no banco de dados
    fs.writeFileSync(bdPath, JSON.stringify(usuarios, null, 2));

    res.status(200).json({ message: 'Filme adicionado à lista de "a assistir"' });
});

// editar avaliacao de um filme assistido
router.put('/assistido/:id', autenticarToken, (req, res) => {

});

// remover file dos "assistidos"
router.delete('/assistido/:id', autenticarToken, (req, res) => {
    const filmeID = req.params.id;
    const usuarioID = req.user.id;

    const usuarioBD = usuarios.find(u => u.id === usuarioID);
    if(!usuarioBD) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const acharIndex = (f) => {
        return f.id == filmeID
    }

    const index = usuarioBD.assistidos.findIndex(acharIndex);

    usuarioBD.assistidos.splice(index, 1);        

    fs.writeFileSync(bdPath, JSON.stringify(usuarios, null, 2));

    res.status(200).json({ message: 'Filme removido com sucesso' });
});

function autenticarToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null)
        return res.status(401).send('Token não encontrado');

    try{
        const usuario = jwt.verify(token, process.env.TOKEN);
        req.user = usuario;
        next();
    } catch(error) {
        res.status(403).send('Token inválido');
    }
}

// exporta para poder ser usado nas outras partes da aplicação
module.exports = router;