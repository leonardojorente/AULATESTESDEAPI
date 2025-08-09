# API de Usuários e Transferências

Esta API permite o registro, login, consulta de usuários e transferência de valores entre usuários, com regras de negócio para aprendizado de testes e automação de APIs.

## Funcionalidades
- **Registro de usuário**: Não permite usuários duplicados.
- **Login**: Requer usuário e senha.
- **Consulta de usuários**: Lista todos os usuários (exceto senha).
- **Transferência de valores**:
  - Só permite transferências acima de R$ 5.000,00 para "favorecidos".
  - Para não favorecidos, o valor máximo é R$ 4.999,99.

## Estrutura do Projeto
- `controller/`: Lógica dos endpoints.
- `service/`: Regras de negócio.
- `model/`: Dados em memória.
- `app.js`: Configuração do Express e rotas.
- `server.js`: Inicialização do servidor.
- `swagger.json`: Documentação da API.

## Instalação
1. Clone o repositório.
2. Instale as dependências:
   ```
   npm install express swagger-ui-express
   ```

## Como rodar
- Para iniciar o servidor:
  ```
  node server.js
  ```
- Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints
- `POST /register` — Registro de usuário
- `POST /login` — Login
- `GET /users` — Listar usuários
- `POST /transfer` — Transferência de valores

Consulte o Swagger para detalhes de payloads e respostas.

## Observações
- O banco de dados é em memória, os dados são perdidos ao reiniciar.
- Ideal para testes e aprendizado de automação de APIs.
