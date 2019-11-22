# ZSSN (Zombie Survival Social Network)
<!-- TOC -->

- [ZSSN](#Zombie Survival Social Networ)
    - [Tecnologias](#tecnologias)
    - [Estrutura do projeto](#estrutura-do-projeto)
    - [Executando o projeto](#executando-o-projeto)
    - [Acessando a aplicacao](#acessando-a-aplicacao)
    - [Documentacao da API](#documentacao-da-api)

<!-- /TOC -->

## Tecnologias
O objetivo desse projeto é implementar recursos de API para manupulação de uma base de dados de sobreviventes de um ataque zumbi:
- [nodejs](https://nodejs.org/api/)
- [typescript](https://www.typescriptlang.org/)
- [expressjs](http://expressjs.com/en/4x/api.html)
- [typescript-rest](https://github.com/thiagobustamante/typescript-rest)
- [typescript-rest-swagger](https://github.com/thiagobustamante/typescript-rest-swagger)
- [Redux](https://redux.js.org/)

## Estrutura do projeto
```bash  
+-- node_modules                          '(dependências)'
+-- dist                                  '(javascripts gerados)'
+-- src                                   '(Códigos fontes do projeto)'
|     |
|     +-- controllers                     '(Controladores que expoem as APIs do microserviços)'
|     |     |
|     |     +-- BaseController.ts         '(Classe base de todos os controladores que expoe metodos comuns)'
|     |     +-- Reports.ts                '(Controlador que expoe dados estatisticos da ZSSN)'
|     |     +-- Survivors.ts              '(Controlador que manipula as informacoes da Sobreviventes e suas operacoes na ZSSN)'
|     |     +-- index.ts                  '(Exportador das classes dos controladores)'
|     | 
|     +-- store                           '(Dados/Tipos/Funcoes que manipulam os estados da ZSSN)'
|     |     |
|     |     +-- Initial.ts                '(Informacoes do estado inicial da ZSSN)'
|     |     +-- Functions.ts              '(Funcoes auxialires de manipulacao dos estados da ZSSN)'
|     |     +-- Types.ts                  '(Tipos/Interfaces utilizados na ZSSN)'
|     |     +-- Actions.ts                '(Acoes de manipulacoes dos estados da ZSSN)'
|     |     +-- Reducers.ts               '(Reducers de manipulados dos estados da ZSSN)'
|     |     +-- Store.ts                  '(Definicao do Store de armazena o estado da ZSSN)'
|     |     |
|     +-- api-server.ts                   '(Definicao/Criacao do controlador de rotas)'
|     +-- indexTest.ts                    '(Execucao de teste/caso de uso da ZSSN)'
|     +-- index.ts                        '(Ponto de entrada do sistema)'
|     |
|     +-- swagger.json                    '(Arquivo de configuracoes do Swagger)'
|     +-- tsconfig.json                   '(Arquivo de configuracoes do compilador TypeScript)'
|     +-- package.json                    '(descritor do projeto)'
|     +-- README.md                       '(documentacao do projeto em markdown)'
```

## Executando o projeto

Se você tiver acabado de baixar o projeto, você deve instalar as dependências. Para isso, execute:

```npm install```

<br>
O arquivo **package.json** é o descritor do projeto e nele consta, dentre outras coisas, as formas possíveis de executar o projeto.

```json
  "scripts": {
    "prepare": "tsc",
    "build": "tsc",
    "start": "tsc && npm run swagger && ts-node src/index.ts",
    "swagger": "swaggerGen -c swagger.json",
    "test": "tsc && npm run swagger && ts-node src/indexTest.ts"
  },
```

<br>
Para iniciar o projeto voce deve, no diretório raiz do projeto, executar:

```npm run start```

Segue a saída logada no terminal:
```shell
Servidor de microservicoes iniciado em localhost:3003
     Acesse http://localhost:3003/api-docs/ para visualizar ou testar a API
```

## Acessando a aplicacao

Agora que o serviço está em execução, acesse: [http://localhost:3003](http://localhost:3003)
<br>
Acesse a interface do swagger, através da qual você poderá testar seus endpoints e ver documentacao sobre os endpoints e os tipos de dados utilizados, em: [http://localhost:3003/api-docs](http://localhost:3003/api-docs)

## Documentacao da API
[API](./swagger.md)