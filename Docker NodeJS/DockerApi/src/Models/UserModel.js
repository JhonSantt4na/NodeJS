
import { connection } from '../Database/db.js'

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    EMAIL VARCHAR(255) UNIQUE NOT NULL,
    PHONE VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

connection.query(createTableQuery, (err, results) => {
   if (err) {
      console.error('Erro ao criar a tabela de usuários: ' + err.stack);
      return;
   }
   console.log('Tabela de usuários criada com sucesso:', results);
   connection.end();
});
