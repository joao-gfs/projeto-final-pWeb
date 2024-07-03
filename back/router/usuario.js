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

function getUsuario(id){
    const usuarioBD = usuarios.find(u => u.id === id);
    if (!usuarioBD) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return usuarioBD
}


router.get('/', (req, res) => {
    
    res.status(200).json(usuarios)

});

// devolve a lista completa de filmes a assistir
router.get('/assistir', autenticarToken, (req, res) => {
    const usuarioId = req.user.id;
    const usuarioBD = getUsuario(usuarioId);

    res.status(200).json(usuarioBD.assistir);
});


// adicionar filme nos "a assistir"
router.post('/assistir', autenticarToken, (req, res) => {
    const { id, poster_path, release_date, title, overview } = req.body;
    const usuarioId = req.user.id;

    // Encontrar o usuário no banco de dados
    const usuarioBD = getUsuario(usuarioId);

    // Verificar se o filme já está na lista de "assistir"
    const filmeExistente = usuarioBD.assistir.find(filme => filme.id === id);
    if (filmeExistente) {
        return res.status(400).json({ message: 'Filme já está na lista de "a assistir"' });
    }

    // Adicionar o filme à lista de "a assistir"
    usuarioBD.assistir.push({ id, poster_path, release_date, title, overview });

    // Salvar os usuários de volta no banco de dados
    fs.writeFileSync(bdPath, JSON.stringify(usuarios, null, 2));

    res.status(200).json({ message: 'Filme adicionado à lista de "a assistir"' });
});

// Remover filme das listas "assistir" e "assistidos"
router.delete('/filme/:id', autenticarToken, (req, res) => {
    const usuarioID = req.user.id;
    const filmeID = req.params.id

    const usuarioBD = getUsuario(usuarioID);

    if (!usuarioBD) {
        console.log('Usuário não encontrado');
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Remover da lista "assistir"
    const indexAssistir = usuarioBD.assistir.findIndex(f => f.id == filmeID);
    if (indexAssistir !== -1) {
        usuarioBD.assistir.splice(indexAssistir, 1);
    }

    // Remover da lista "assistidos"
    const indexAssistidos = usuarioBD.assistidos.findIndex(f => f.id == filmeID);
    if (indexAssistidos !== -1) {
        usuarioBD.assistidos.splice(indexAssistidos, 1);
    }

    // Se o filme foi removido de qualquer lista, salvar as mudanças
    fs.writeFileSync(bdPath, JSON.stringify(usuarios, null, 2));
    res.status(200).json({ message: 'Filme removido com sucesso das listas' });
});


// devolve a lista completa de filmes assistidos
router.get('/assistidos', autenticarToken, (req, res) => {
    const usuarioId = req.user.id;
    const usuarioBD = getUsuario(usuarioId);

    res.status(200).json(usuarioBD.assistidos);
})

// adicionar filme nos "assistidos"
router.post('/assistidos', autenticarToken, (req, res) => {
    const { id, poster_path, release_date, title, overview, nota, resenha } = req.body;
    const usuarioId = req.user.id;

    // Encontrar o usuário no banco de dados
    const usuarioBD = getUsuario(usuarioId);

    // Verificar se o filme já está na lista de "assistidos"
    const filmeExistente = usuarioBD.assistidos.find(filme => filme.id === id);
    if (filmeExistente) {
        return res.status(400).json({ message: 'Filme já está na lista de "a assistir"' });
    }

    // Verificar se o filme está na lista de "assistir" e remover se estiver
    const indexFilmeAassistir = usuarioBD.assistir.findIndex(filme => filme.id === id);
    if (indexFilmeAassistir !== -1) {
        usuarioBD.assistir.splice(indexFilmeAassistir, 1);
    }
    
    // Adicionar o filme à lista de "a assistir"
    usuarioBD.assistidos.push({ id, poster_path, release_date, title, overview, nota, resenha });

    // Salvar os usuários de volta no banco de dados
    fs.writeFileSync(bdPath, JSON.stringify(usuarios, null, 2));

    res.status(200).json({ message: 'Filme adicionado à lista de "a assistir"' });
});

// editar avaliacao de um filme assistido
router.put('/assistido/:id', autenticarToken, (req, res) => {
    const { id, poster_path, release_date, title, overview, nota, resenha } = req.body;
    const usuarioId = req.user.id;

    // Encontrar o usuário no banco de dados
    const usuarioBD = getUsuario(usuarioId);

    if (!usuarioBD) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Encontrar o filme na lista de assistidos
    const indexFilmeAssistido = usuarioBD.assistidos.findIndex(filme => filme.id === id);

    // Atualizar os detalhes do filme na lista de assistidos
    usuarioBD.assistidos[indexFilmeAssistido] = { id, poster_path, release_date, title, overview, nota, resenha };

    // Salvar os usuários de volta no banco de dados
    fs.writeFileSync(bdPath, JSON.stringify(usuarios, null, 2));

    res.status(200).json({ message: 'Filme atualizado na lista de assistidos' });
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