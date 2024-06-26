const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Inicializar roteador
const router = express.Router();

// Dados necessários para consumo da API
const apiKey = '562c60fb36e6799832d03a838a39216b';
const apiUrl = 'https://api.themoviedb.org/3/search/movie';

// buscar filme
router.get('/buscar/:titulo', async (req, res) => {
    const { titulo } = req.params;

    try {
        const response = await axios.get(apiUrl, {
            params: {
                api_key: apiKey,
                query: titulo,
                language: 'pt-BR'
            }
        });

        const filmes = response.data.results;
        res.status(200).json(filmes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao buscar filmes' });
    }
});

// exporta para poder ser usado nas outras partes da aplicação
module.exports = router