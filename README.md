# API de Transações

Esta é uma API REST que recebe transações e retorna estatísticas sobre essas transações. O projeto foi criado utilizando TypeScript e Node.js, inspirado no repositório [desafio-itau-vaga-99-junior](https://github.com/rafaellins-itau/desafio-itau-vaga-99-junior).

## Funcionalidades
- **POST /transacao**: Adiciona uma nova transação.
  - Requisição:
    ```json
    {
        "valor": 123.45,
        "dataHora": "2025-03-17T17:40:00-03:00"
    }
    ```
  - Respostas:
    - `201 Created`: Transação criada com sucesso.
    - `422 Unprocessable Entity`: Transação não aceita (valores inválidos).
    - `400 Bad Request`: JSON inválido.

- **DELETE /transacao**: Limpa todas as transações armazenadas.
  - Resposta:
    - `200 OK`: Todas as transações foram apagadas com sucesso.

- **GET /estatistica**: Retorna estatísticas das transações dos últimos 60 segundos.
  - Resposta:
    ```json
    {
        "count": 10,
        "sum": 1234.56,
        "avg": 123.456,
        "min": 12.34,
        "max": 123.56
    }
    ```

## Como Utilizar
1. **Instalar Dependências**: Execute `npm install` para instalar as dependências do projeto.
2. **Rodar o Servidor**: Use `npm run dev` para iniciar o servidor em modo de desenvolvimento.
3. **Testar a API**: Utilize ferramentas como Postman ou cURL para interagir com os endpoints.

## Observações
- Este projeto não utiliza bancos de dados; todas as transações são armazenadas em memória.
- A API aceita e responde apenas com JSON.
