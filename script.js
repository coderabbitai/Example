let items = []; 

function renderItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ''; 

    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editItem(item.id);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteItem(item.id);

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        itemList.appendChild(listItem);
    });
}

function addItem() {
    const newItemName = document.getElementById('newItemName').value;
    if (newItemName.trim() !== '') {
        fetch('/items', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newItemName }),
        })
        .then(response => response.json())
        .then(newItem => {
            items.push(newItem); 
            renderItems();
            document.getElementById('newItemName').value = ''; 
        })
        .catch(error => console.error('Error adding item:', error));
    }
}

function editItem(itemId) {
    // ... (Implementation for editing an item - you'll need to handle getting the updated name, sending a PUT request to the server, and updating the local `items` array)
    console.log(`Editing item with ID: ${itemId}`); 
}

function deleteItem(itemId) {
    fetch(`/items/${itemId}`, { 
        method: 'DELETE'
    })
    .then(() => {
        items = items.filter(item => item.id !== itemId);
        renderItems();
    })
    .catch(error => console.error('Error deleting item:', error));
}

// Fetch initial data from the server
fetch('/items')
    .then(response => response.json())
    .then(data => {
        items = data;
        renderItems();
    })
    .catch(error => console.error('Error fetching items:', error));