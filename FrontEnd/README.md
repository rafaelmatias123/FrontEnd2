







A arquitetura do projeto segue o padrão de separação entre frontend e backend. O frontend é composto por arquivos HTML, CSS e JavaScript que interagem com a API Flask por meio de requisições HTTP assíncronas (fetch). A API Flask atua como intermediária entre a interface e os dados, realizando operações de CRUD em uma base SQLite. Para obtenção de dados de endereço, a API consulta dinamicamente o serviço externo público ViaCEP. Toda a comunicação entre as camadas é feita via protocolo HTTP, utilizando o formato JSON para envio e recebimento de dados.








docker build -t frontend-app .
docker run -d -p 8080:80 frontend-app


[ Usuário ] 
     |
     v
[ Navegador (HTML/JS) ]
     |
     v (requisições HTTP)
[ API Flask ]
     |
     v (requisição HTTP)
[ ViaCEP ]