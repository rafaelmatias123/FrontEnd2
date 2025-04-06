# Usa a imagem oficial do Nginx como base
FROM nginx:alpine

# Remove a página padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia todos os arquivos do seu projeto para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# O Nginx já roda automaticamente ao iniciar o container
