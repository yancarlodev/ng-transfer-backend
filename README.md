<h1 align="center">
    NG Transfer
</h1>

<h3 align="center">Let's transform the financial lives of young people together!</h3>

<br/>

## 🔨 Tecnologias e bibliotecas utilizadas
- [x] NodeJS com Express - Linguagem e framework
- [x] Typescript - Superset Javascript para tipagem
- [x] JsonWebToken e Bcrypt - Autenticação e segurança
- [x] Jest e supertest - Testes automatizados e de integração
- [x] Prisma - ORM
- [x] PostgreSQL - Banco de dados
- [x] Yup - validação de dados
- [x] Express Async Errors - gerenciador de erros
- [x] Heroku - Deploy da aplicação
- [x] Docker - Containerização da aplicação


<br/>

## ✅ Links

- [x] Aplicação em produção: www.google.com
- [x] <a href="https://github.com/yancarlodev/ng-transfer-backend">Github do projeto</a>

<br/>

## ✅ Como rodar a aplicação localmente

Antes de tudo, você precisa das seguintes tecnologias:

- [x] [NPM](https://www.npmjs.com/)
- [x] [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) Opcional

<br/>

### 🎲 Preparando o ambiente

Primeiramente, será necessário configurar o arquivo <code>.env</code>. Para isso, vamos renomear o arquivo <code>.env.example</code> para <code>.env</code> e mudar as informações dentro dele:

```bash

# arquivo .env

# Define a porta em que a aplicação irá rodar
PORT=3000

# Aqui colocaremos as credenciais do postgreSQL, como o usuário, senha e o nome do banco de de dados. Por exemplo:
# "postgresql://matheus:1234@localhost:5432/NGTransfer?schema=public" 
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<database>?schema=public"

# Por fim, configuramos a chave secreta que será utilizada pela aplicação, podendo ser qualquer valor
SECRET_KEY=chavesecreta123

```

Com o <code>.env</code> pronto, podemos rodar os seguintes comandos no terminal:

```bash

# Na raiz do repositório execute o seguinte comando para baixar as dependências
$ yarn
ou
$ npm install

# Agora, execute o seguinte comando para rodar a criação do banco de dados e das tabelas
$ npx prisma migrate dev

# E por fim, rode a aplicação com o seguinte comando
$ yarn dev
ou 
$ npm run dev

# Se tudo der certo, você verá a seguinte mensagem no terminal "App listening on port <Porta definida no dotenv>. Let's transform the financial lives of young people together!"
```

<br/>

### 🎲 Testes automatizados

Para executar os testes automatizados, é necessário um arquivo <code>.env.test</code>. Logo, só precisaremos duplicar o <code>.env</code> já existente, e mudar o nome do banco de dados na <code>DATABASE_URL</code> para um banco de testes.

```bash

DATABASE_URL="postgresql://matheus:1234@localhost:5432/NGTransferTest?schema=public"

```

Após configurado, podemos rodar os testes com o seguinte comando no terminal:

```bash

yarn test

```

<br/>

<h1 align="center">👥 Desenvolvedor responsável 👥</h1> 

<table align="center">
  <tr>
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/40778394?v=4" width="100px;" alt="Foto do Yan"/><br>        
        <sub>
            <b>Yan Carlo</b> <br/>
            <a href="https://github.com/yancarlodev" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
                <a href="https://www.linkedin.com/in/yancarlodev/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
        </sub>
    </td>
  </tr>
</table>
