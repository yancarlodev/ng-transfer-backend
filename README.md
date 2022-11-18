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

- [x] Aplicação em produção: https://ng-transfer.herokuapp.com/
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

## ✅ Como utilizar a aplicação

Para facilitar a utilização da aplicação, no diretório raiz do projeto se encontro o <code>insomnia_endpoints.json</code>, um arquivo contendo as requisições já configuradas para o <a href="https://insomnia.rest/download">Insomnia</a>.

<br/>

### 🎲 Session endpoints

<strong>[POST] Register</strong> ---> /session/register

Este endpoint irá realizar o cadastro do usuário, recebendo um corpo de requisição contendo o <code>username</code>, com pelo menos 3 caracteres, e a <code>password</code>, devendo haver pelo menos 8 caracteres, um número e uma letra maiúscula.

#### Envio

```bash

{
	"username": "Cleiton",
	"password": "Teste123"
}

```

#### Resposta

A resposta é o usuário criado com seu <code>id</code>, <code>accountId</code> e sem sua <code>password</code>. Junto do usuário, também foi criado a conta com um saldo de R$ 100,00.

```bash

{
	"id": "96c172b3-3249-42a6-b9d3-743d1c55db4a",
	"username": "Cleiton",
	"accountId": "b219e1f3-a3cb-4949-b39b-0c1b669d4585"
}

```

<br/>

<strong>[POST] Login</strong> ---> /session/login

Este endpoint irá realizar o login do usuário, recebendo um corpo de requisição contendo o <code>username</code> e a <code>password</code>.

#### Envio

```bash

{
	"username": "Cleiton",
	"password": "Teste123"
}

```

#### Resposta

A reposta é um <code>token</code> de autenticação do usuário com expiração de 24h.

```bash

{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njg3MjMwNDksImV4cCI6MTY2ODgwOTQ0OSwic3ViIjoiYzE5MjQzNTItMGZlNS00OGMyLTkyODYtODYzMzNkN2U3NThkIn0.0c1160FM_ZMPGT5vH5t8Yv09ZjaUB423PTqbYWlooFs"
}

```

</br>

### 🎲 Transaction endpoints

<strong>⚠️ Para acessar esses endpoints, é necessário portar o token fornecido no login!</strong>

<strong>[GET] Get Balance</strong> ---> /transaction/balance

Este endpoint irá retornar o saldo do usuário, sem a necessidade de enviar um corpo de requisição.

#### Resposta

A reposta é o saldo do usuário.

```bash

{
	"balance": "34.14"
}

```

</br>

<strong>[POST] Do a cash-out</strong> ---> /transaction/cash-out

Este endpoint irá realizar um <em>cash-out</em> para outro usuário, sendo necessário passar o <code>username</code> do beneficiário, e um <code>value</code> contendo o valor a ser transferido.

#### Envio

```bash

{
	"username": "Matheus",
	"value": "10.43"
}

```

#### Resposta

A reposta é uma mensagem de sucesso com o nome do usuário que recebeu a transferência.

```bash

{
	"message": "Cash-out done successfully to Matheus"
}

```

</br>

<strong>[GET] Get Transactions</strong> ---> /transaction

Neste endpoint existem três <code>query params</code>, o <code>cash-outs-only</code>, que retorna apenas as transações de <em>cash-out</em>, o <code>cash-ins-only</code>, que retorna apenas as transações de <em>cash-in</em>, e o <code>order-by-time</code>, que organiza as transações por ordem de realização. Para utilizá-los, é só adicionar ao fim do endpoint um <code>/?</code>, seguido pelo query params. Ex: <code>/transaction/?cash-outs-only</code>. Caso queria utilizar dois query params ao mesmo tempo, é só separá-los por um <code>&</code>. Ex: <code>/transaction/?cash-outs-only&order-by-time</code>. Se nenhum query param por informado, será retornado todas as transações.

#### Resposta

A reposta é uma lista de transações do usuário.

<em>/transaction/?cash-outs-only&order-by-time</em>

```bash

[
	{
		"id": "c9f284b1-5f14-4208-baca-a6f70a30bfc4",
		"debitedAccountId": "6fb41862-9c66-4deb-a066-a23367f28d36",
		"creditedAccountId": "03ab7668-32db-481d-87e4-3dbbb25f6831",
		"value": "10.43",
		"createdAt": "2022-11-18T12:07:27.441Z"
	},
	{
		"id": "b17a5b49-a5cc-4cd6-b2a3-ef9612a75356",
		"debitedAccountId": "6fb41862-9c66-4deb-a066-a23367f28d36",
		"creditedAccountId": "03ab7668-32db-481d-87e4-3dbbb25f6831",
		"value": "5",
		"createdAt": "2022-11-17T21:24:34.611Z"
	},
	{
		"id": "4f521ae5-d934-4bfd-b635-3dbde41d7f67",
		"debitedAccountId": "6fb41862-9c66-4deb-a066-a23367f28d36",
		"creditedAccountId": "03ab7668-32db-481d-87e4-3dbbb25f6831",
		"value": "10",
		"createdAt": "2022-11-17T21:20:12.243Z"
	},
	{
		"id": "11144d42-ff38-4e9b-9b3f-cfd81bb38321",
		"debitedAccountId": "6fb41862-9c66-4deb-a066-a23367f28d36",
		"creditedAccountId": "03ab7668-32db-481d-87e4-3dbbb25f6831",
		"value": "50",
		"createdAt": "2022-11-17T01:43:51.025Z"
	}
]

```

</br>

<em>/transaction/?cash-outs-only&order-by-time</em>

```bash

[
	{
		"id": "d20516cc-c10c-4a2f-9230-26ee440a25f7",
		"debitedAccountId": "03ab7668-32db-481d-87e4-3dbbb25f6831",
		"creditedAccountId": "6fb41862-9c66-4deb-a066-a23367f28d36",
		"value": "65",
		"createdAt": "2022-11-17T21:38:48.427Z"
	},
	{
		"id": "75860f4c-ae7b-4f15-89fb-b7dbbc82b68a",
		"debitedAccountId": "03ab7668-32db-481d-87e4-3dbbb25f6831",
		"creditedAccountId": "6fb41862-9c66-4deb-a066-a23367f28d36",
		"value": "65.43",
		"createdAt": "2022-11-17T22:08:22.073Z"
	},
	{
		"id": "22c26b33-a7d5-4315-9c42-228ce5d789e2",
		"debitedAccountId": "03ab7668-32db-481d-87e4-3dbbb25f6831",
		"creditedAccountId": "6fb41862-9c66-4deb-a066-a23367f28d36",
		"value": "0.43",
		"createdAt": "2022-11-17T22:08:50.781Z"
	}
]

```

</br>

<em>/transaction</em>

```bash

[
	{
		"id": "11144d42-ff38-4e9b-9b3f-cfd81bb38321",
		"debitedAccountId": "6fb41862-9c66-4deb-a066-a23367f28d36",
		"creditedAccountId": "03ab7668-32db-481d-87e4-3dbbb25f6831",
		"value": "50",
		"createdAt": "2022-11-17T01:43:51.025Z"
	},
	{
		"id": "4f521ae5-d934-4bfd-b635-3dbde41d7f67",
		"debitedAccountId": "6fb41862-9c66-4deb-a066-a23367f28d36",
		"creditedAccountId": "03ab7668-32db-481d-87e4-3dbbb25f6831",
		"value": "10",
		"createdAt": "2022-11-17T21:20:12.243Z"
	},
	{
		"id": "b17a5b49-a5cc-4cd6-b2a3-ef9612a75356",
		"debitedAccountId": "6fb41862-9c66-4deb-a066-a23367f28d36",
		"creditedAccountId": "03ab7668-32db-481d-87e4-3dbbb25f6831",
		"value": "5",
		"createdAt": "2022-11-17T21:24:34.611Z"
	},
	{
		"id": "d20516cc-c10c-4a2f-9230-26ee440a25f7",
		"debitedAccountId": "03ab7668-32db-481d-87e4-3dbbb25f6831",
		"creditedAccountId": "6fb41862-9c66-4deb-a066-a23367f28d36",
		"value": "65",
		"createdAt": "2022-11-17T21:38:48.427Z"
	},
	{
		"id": "75860f4c-ae7b-4f15-89fb-b7dbbc82b68a",
		"debitedAccountId": "03ab7668-32db-481d-87e4-3dbbb25f6831",
		"creditedAccountId": "6fb41862-9c66-4deb-a066-a23367f28d36",
		"value": "65.43",
		"createdAt": "2022-11-17T22:08:22.073Z"
	},
	{
		"id": "22c26b33-a7d5-4315-9c42-228ce5d789e2",
		"debitedAccountId": "03ab7668-32db-481d-87e4-3dbbb25f6831",
		"creditedAccountId": "6fb41862-9c66-4deb-a066-a23367f28d36",
		"value": "0.43",
		"createdAt": "2022-11-17T22:08:50.781Z"
	},
	{
		"id": "c9f284b1-5f14-4208-baca-a6f70a30bfc4",
		"debitedAccountId": "6fb41862-9c66-4deb-a066-a23367f28d36",
		"creditedAccountId": "03ab7668-32db-481d-87e4-3dbbb25f6831",
		"value": "10.43",
		"createdAt": "2022-11-18T12:07:27.441Z"
	}
]

```

</br>

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
