const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const { NONAME } = require('dns');

const bdPath = path.join(__dirname, '..', 'db', 'database-usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

const apiKey = '562c60fb36e6799832d03a838a39216b'

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('Servidor ligado na porta 3000')
});


app.get('/', (req, res) => {
    
    res.status(200).json(usuarios)

});

// cadastrar usuario
app.post('/cadastrar', (req, res) => {

});

// login de usuario
app.post('/entrar', (req, res) => {

});

// buscar filme
app.get('/buscar/:titulo', async (req, res) => {
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

// adicionar filme nos "a assistir"
app.post('/assistir/:id', (req, res) => {

});

// remover filme dos "a assistir"
app.delete('/assistir/:id', (req, res) => {

});

// adicionar filme nos "assistidos"
app.post('/assistido/:id', (req, res) => {

});

// editar avaliacao de um filme assistido
app.put('/assistido/:id', (req, res) => {

});

// remover file dos "assistidos"
app.delete('/assistido/:id', (req, res) => {

});