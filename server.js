const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let data = [];

app.get('/data', (req, res) => {
  res.json(data);
});

app.post('/data', (req, res) => {
  data.push(req.body);
  res.json(req.body);
});

app.put('/data/:id', (req, res) => {
  const id = req.params.id;
  const item = data.find(i => i.id === id);
  if (!item) {
    res.sendStatus(404);
  } else {
    Object.assign(item, req.body);
    res.json(item);
  }
});

app.delete('/data/:id', (req, res) => {
  const id = req.params.id;
  const index = data.findIndex(i => i.id === id);
  if (index === -1) {
    res.sendStatus(404);
  } else {
    data.splice(index, 1);
    res.sendStatus(204);
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));