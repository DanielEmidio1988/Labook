# LABOOK

## 📖 Introdução

Projeto 'Labook' é uma API de uma rede social com o objetivo de promover a conexão e interação entre pessoas.

Dentro da API você poderá cadastrar uma nova conta e realizar login. Além disso, você também poderá criar, visualizar, editar, curtir/descurtir e excluir publicações.

Para acessar a documentação, [aqui!](https://documenter.getpostman.com/view/24460616/2s93CHuFMz)!

![Preview](./src/assets/diagram.png)

## 📄 Descrição

### Instalando as dependências:
- npm install: Instala todas as dependências listadas no package.json;
- npm i cors: biblioteca para liberar acesso externo ao servido;
- npm i express : framework para criar o servidor (API);
- npm i knex: biblioteca query builder para conectar com banco de dados;
- npm i sqlite3: biblioteca do banco de dados SQLite;
- npm install uuid: biblioteca para geração de Identificador Único Universal;
- npm install dotenv: biblioteca de variáveis de ambiente;
- npm install jsonwebtoken: biblioteca para geração de tokens;
- npm i bcryptjs: biblioteca para criptografia de senhas;

### Executando o projeto
- npm run dev: Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor localhost toda a vez que o projeto for alterado e salvo.

### Endpoints
- Get Users: Retorna todos os usuários cadastrados;
- Post Signup: Cadastro de nova conta.
- Post Login: Informe de Login e Senha para acesso a aplicação.
- Get Posts: Retorna todos as publicações cadastradas.
- Create Post: Cadastra uma nova publicação.
- Put Edit Post: Edita uma publicação a partir do 'Id' da publicação.
- Delete Post: Deleta uma publicação existente a partir do 'Id' da publicação.
- Put Like or Dislike: Envia um 'like' (1) ou 'dislike' (0) a uma publicação.

## 💻 Tecnologias 

![NodeJs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)

### Programas utilizados:
- Postman API Platform
- VSCode

## 📫 Contato

E-mail: emidio.daniel@hotmail.com

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danielemidio1988/)
[![Codewars](https://img.shields.io/badge/Codewars-B1361E?style=for-the-badge&logo=Codewars&logoColor=white)](https://www.codewars.com/users/DanielEmidio1988)