# Site de Avaliação de Filmes 

## Introdução

Durante a rotina é comum ouvir falar de filmes, seja em conversas ou nas redes sociais, se interessar e depois se esquecer dele. Pior ainda, é sentar na frente da TV ou computador e sentir que nada agrada. Tendo isso em vista, foi criado o projeto _**NomeAqui**_, um site de avaliações de filmes, no qual os usuários podem dar notas e fazer uma resenha sobre filmes assistidos, além de registrar em uma lista os filmes que deseja assistir.

## Projeto Final - Programação Web

Este projeto foi feito para a avaliação final da matéria de Programação Web ministrada no curso de Sistemas de Informação da Unifei.

Foi construído em **JavaScript**, utilizando **Node.js** com o framework **Express** para o Backend e **React** com o servidor de desenvolvimento **Vite** para o Frontend.

## Tecnologias empregadas

### Geral
- Gestor de pacotes: `npm`
- Versionamento: `Git`
- Hospedagem do código: `GitHub`
- Linguagem: `JavaScript`

### Backend
- Runtime do Backend: `Node.js`
- Persistência de dados: Arquivo `.json`
- Sistema de autenticação: `Json Web Token (JWT)`
- Criptografia: `bcrypt`

### Frontend
- Biblioteca UI: `React`
- Servidor de desenvolvimento: `Vite`
- Validação de entradas: `Yup`

## Rotas Backend

As rotas backend foram organizadaz em três separações principais: 
- `/auth`, para autentição e autorização
- `/usuario`, para requisições relacionadas aos dados dos usuários
- `/filmes`, para rotas relacionadas aos dados dos filmes