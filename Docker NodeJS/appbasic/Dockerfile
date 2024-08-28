# Comando FROM para pegar a ultima versão do Node
# alpine : para ultilizar uma versao reduzida da maquina somente com o node ('Sem muitas funcionalidades do sistema operacional') 
FROM node:alpine 

# WORKDIR : Informar o diretorio onde vamos trabalhar na maquina 
WORKDIR /usr/app

# COPY : Para copiar todos os arquivos que comerça com package e termina com json para a nossa maquina
COPY package*.json ./

# Com isso ja podemos rodar o comando do npm que cria a node_modules
RUN npm install

# Depois de ele instalar os modulos de dependencia vamos copiar todos os arquivos que temos na nossa aplicação
# Porem como ja temos o node_modules temos que adicionar ele no dockerignore 
COPY . .

# Expose : qual a porta o servidor de dentro, vai expor para o nossa maquina acessar
EXPOSE 3000

# CMD : unica por arquivo dockerfile 
# CMD : qual o comando para o servidor iniciar
# Separamos o comando em um array com os comandos
# Sempre usamos aspas duplas
CMD ["npm", "start"]