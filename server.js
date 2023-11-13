const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

let groceryItems = [
  { id: 1, name: 'Apple', price: 1.00 },
  { id: 2, name: 'Banana', price: 0.75 },
  { id: 3, name: 'Milk', price: 2.50 },
];

app.get('/api/grocery', (req, res) => {
  res.json(groceryItems);
});

app.post('/api/grocery', (req, res) => {
  const newItem = req.body;
  newItem.id = groceryItems.length + 1;
  groceryItems.push(newItem);
  res.json(newItem);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
