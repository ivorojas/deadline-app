const express = require('express')
//const bodyParser = require('body-parser');
const app = express()
const PORT = process.env.PORT || 3001


const cors = require('cors');
const routes = require('./src/routes')

app.use(cors());
app.use(express.json());

app.use('/', routes);

/*
app.get('/', (req, res) => {
  res.send('hello world')
})
*/


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});