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
router.post('/assistir/:id', (req, res) => {

});

// remover filme dos "a assistir"
router.delete('/assistir/:id', (req, res) => {

});

// adicionar filme nos "assistidos"
router.post('/assistido/:id', (req, res) => {

});

// editar avaliacao de um filme assistido
router.put('/assistido/:id', (req, res) => {

});

// remover file dos "assistidos"
router.delete('/assistido/:id', (req, res) => {

});

// exporta para poder ser usado nas outras partes da aplicação
module.exports = router;