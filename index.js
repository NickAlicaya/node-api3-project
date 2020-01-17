const server = require("./server.js");

require('dotenv').config();



const port = process.env.Port || 5000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
