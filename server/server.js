const app = require("./app.js")
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`🚀 Server listening on port ` + port)
})