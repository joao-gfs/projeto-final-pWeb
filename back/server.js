const express = require('express');
const cors = require('cors');

const app = express();

// Inicialização
app.use(cors());
app.use(express.json());

// Rotas
const usuariosRoutes = require('./router/usuarios');
const filmesRoutes = require('./router/filmes');
const authRoutes = require('./router/auth');

// Roteamento
app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/filmes', filmesRoutes);

app.listen(3000, () => {
    console.log('Servidor ligado na porta 3000')
});