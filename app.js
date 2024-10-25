const express = require('express');
const app = express();
const port = 4000;

app.use(express.json()); 

let items = []; 

// Serve the index.html file on the root path
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); 
});

app.post('/items', (req, res) => {
    const newItem = req.body;
    newItem.id = Date.now(); 
    items.push(newItem);
    res.status(201).json(newItem);
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const id = req.params.id; // Error: Missing parseInt to convert the ID to a number
    const item = items.find(item => item.id === id); 
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items[index] = updatedItem;
        res.json(updatedItem);
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        res.json({ message: "Item deleted" });
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
