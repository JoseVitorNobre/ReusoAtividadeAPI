# Projeto de Cadastro de Cursos

Este projeto é uma aplicação **full-stack** composta por um back-end em **Node.js/Express** e um front-end em **React**. Ele permite a **listagem**, **adição**, **edição** e **exclusão** de cursos, com integração com um banco de dados **PostgreSQL**.

## Estrutura do Projeto

```
- server/           # Código do back-end (API)
- client/           # Código do front-end (Interface com o usuário)
- .devcontainer/    # Configuração para ambiente com Docker ou Codespaces
```

## Requisitos

- **Docker**: Para rodar a instância do PostgreSQL utilizando o `.devcontainer`.
- **Node.js** (versão 16 ou superior): Para rodar tanto o back-end quanto o front-end.
- **GitHub Codespaces**: Alternativa para rodar o projeto sem necessidade de configurar o Docker localmente.

## Como Rodar o Projeto

### 1. Configuração do PostgreSQL

#### Usando Docker:

1. Navegue até a pasta raiz do projeto.
2. Abra o terminal e execute o seguinte comando para criar a instância do PostgreSQL com o Docker:

   ```bash
   docker-compose up -d
   ```

   Isso irá iniciar um container com o PostgreSQL configurado. A instância do banco estará rodando na porta padrão do PostgreSQL (`5432`).

3. Para parar o Docker e a instância do banco de dados, execute:

   ```bash
   docker-compose down
   ```

   Isso irá parar o contêiner e liberar os recursos utilizados pelo PostgreSQL.

#### Usando GitHub Codespaces:

1. Acesse o repositório do projeto no GitHub.
2. Clique no botão **Code** e selecione **Open with Codespaces**.
3. Aguarde a configuração automática do ambiente. O **PostgreSQL** será iniciado automaticamente com as configurações definidas no arquivo `.devcontainer/devcontainer.json`.
4. Para verificar se o banco de dados está configurado corretamente, use as credenciais padrão no arquivo `.env`.

   O banco de dados estará acessível na porta `5432` no ambiente Codespaces.

### 2. Rodando o Back-End (API)

1. Navegue até a pasta `server`:

   ```bash
   cd server
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   npm start
   ```

   O back-end estará rodando na URL [http://localhost:3333](http://localhost:3333) (ou na porta configurada).

### 3. Rodando o Front-End (Client)

1. Navegue até a pasta `client`:

   ```bash
   cd client
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor do front-end:

   ```bash
   npm start
   ```

   O front-end estará acessível na URL [http://localhost:3000](http://localhost:3000) (ou na porta configurada).

### 4. Configuração Adicional

Se você estiver utilizando o **VS Code** com **Dev Containers**, pode usar a configuração contida na pasta `.devcontainer` para criar um ambiente de desenvolvimento com o PostgreSQL integrado.

1. Abra o projeto no **VS Code**.
2. Selecione "Reopen in Container" para abrir o ambiente dentro do Docker ou Codespaces.
3. O banco de dados estará acessível com a configuração padrão definida no Docker ou Codespaces.

## Endpoints da API

Aqui estão alguns dos principais endpoints disponíveis para interagir com o back-end:

- **GET /cursos**: Retorna todos os cursos.
- **GET /cursos/:id**: Retorna um curso específico pelo id.
- **POST /cursos**: Adiciona um novo curso.
- **PUT /cursos/:id**: Atualiza um curso existente.
- **DELETE /cursos/:id**: Deleta um curso pelo id.

## Tecnologias Utilizadas

### Back-End

- **Node.js**
- **Express**
- **Sequelize** (ORM para PostgreSQL)

### Front-End

- **React**
- **Axios** (para comunicação com a API)

### Banco de Dados

- **PostgreSQL** (usando Docker ou Codespaces para facilitar a configuração)