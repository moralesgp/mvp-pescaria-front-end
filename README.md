
# MVP Pescaria — Frontend

Projeto desenvolvido para o MVP da disciplina
Desenvolvimento Full Stack Básico da PUC-Rio.

## Objetivo

Disponibilizar uma interface para consulta de espécies
de peixes e gerenciamento de relatos de pescarias.

## Tecnologias

- HTML5
- CSS3
- JavaScript

A aplicação foi desenvolvida no formato Single Page
Application (SPA), sem a utilização de frameworks.

## Funcionalidades

- Listagem e busca de peixes por nome.
- Consulta das características, iscas e dicas de pesca.
- Consulta dos relatos associados a cada peixe.
- Cadastro de novos relatos.
- Exclusão de relatos mediante confirmação.
- Atualização dinâmica da interface, sem recarregar a página.

## Estrutura do Repositório

- `index.html`: estrutura da interface.
- `styles.css`: estilização da aplicação.
- `app.js`: lógica e integração com a API REST.
- `README.md`: documentação do projeto.

## Integração com o Backend

A comunicação com a API REST é realizada por meio
da Fetch API do JavaScript, utilizando os métodos
HTTP GET, POST e DELETE.

Todas as cinco rotas do backend foram integradas
e testadas pelo frontend.

## Execução Local

1. Obtenha o projeto pelo GitHub.
2. Inicie o backend conforme as instruções do seu README.
3. Abra o arquivo `index.html` diretamente no navegador.

O backend deve estar disponível em:

http://127.0.0.1:5000

Não é necessária a instalação de dependências
ou de um servidor web para o frontend.

## Observações

Este projeto possui finalidade acadêmica e prioriza
uma implementação simples, organizada e funcional.

A aplicação não possui autenticação ou controle
de permissões de usuários.
