// Cria classe para usar na autenticação
class User {

    constructor(id, usuario, email, senha) {
        this.id = id;
        this.username = usuario;
        this.email = email;
        this.senha = senha;
        this.assistir = [];
        this.assistidos = []
    }
}

module.exports = User;