const server = require('./app');
require('dotenv').config();
const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`server is listening on localhost:${PORT}`);
  })