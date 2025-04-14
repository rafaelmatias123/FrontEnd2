
# Encomendas

Sistema de entrega de encomendas particular, voltado para determinadas empresas. O problema a ser resolvido é a constante mudança no endereço de entrega de corporações ou pessoas, com o propósito de tornar o processo o mais efetivo e correto possível.

A arquitetura do projeto segue o padrão de separação entre **frontend** e **backend**. O frontend é composto por arquivos HTML, CSS e JavaScript que interagem com a API Flask por meio de requisições HTTP assíncronas.

---

## Arquitetura do Projeto

**Cenário 1.1**

```
[Interface (Front-End)] ⇄ [API (Back-End)] ⇄ [Banco de Dados]
                          ↑
                          │
                [API Externa (VIACEP)]
```

A comunicação entre Front-End e Back-End ocorre via **REST**. Ambos os módulos podem ser containerizados com **Docker**.

O módulo **API (Back-End)** consulta um serviço externo (VIACEP) para trazer informações pertinentes ao endereço consultado.
Esta aplicação utiliza a API pública [VIACEP](https://viacep.com.br/) para consulta de endereços a partir de um CEP informado pelo usuário.  
A integração é feita diretamente no back-end, que trata os dados da resposta e os envia à interface.Não há redirecionamento para serviços externos durante o uso.

**Licença**: O serviço VIACEP é gratuito e de uso livre, sem necessidade de autenticação ou cadastro, conforme informado em sua [documentação oficial](https://viacep.com.br).
---

## Como executar o Front-End com Docker

Certifique-se de ter o Docker instalado e em execução em sua máquina.

No terminal, navegue até a pasta do front-end:

```bash
cd FRONTEND
```

Construa a imagem Docker:

```bash
docker build -t frontend-app .
```

Execute o container:

```bash
docker run -d -p 8080:80 frontend-app
```

Abra o navegador e acesse:

[http://localhost:8080](http://localhost:8080)
