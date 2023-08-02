async function addItem(event) {
    event.preventDefault();
    const candyName = event.target.candyname.value;
    const description = event.target.description.value;
    const price = parseFloat(event.target.price.value);
    const quantity = parseInt(event.target.quantity.value);

    const item = {
        candyName,
        description,
        price,
        quantity
    };

    try {
        // Add the new item to the server
        const res = await axios.post("https://crudcrud.com/api/2d6de3249c6345dba917b019317a17cf/candyData", item);
        item._id = res.data._id;

        // Save the item to localStorage
        saveItemToLocal(item);

        showItemOnScreen(item);

        // Clear the form fields after submission
        event.target.candyname.value = '';
        event.target.description.value = '';
        event.target.price.value = '';
        event.target.quantity.value = '';
    } catch (err) {
        console.log(err);
    }
}

function saveItemToLocal(item) {
    let items = JSON.parse(localStorage.getItem('candyItems')) || [];
    items.push(item);
    localStorage.setItem('candyItems', JSON.stringify(items));
}

async function fetchDataFromServer() {
    try {
        const res = await axios.get("https://crudcrud.com/api/2d6de3249c6345dba917b019317a17cf/candyData");
        const itemList = res.data;
        itemList.forEach((item) => {
            showItemOnScreen(item);
        });

        // Save the fetched items to localStorage
        localStorage.setItem('candyItems', JSON.stringify(itemList));
    } catch (err) {
        console.log(err);
    }
}

function showItemOnScreen(item) {
    const parentElement = document.getElementById('listOfitems');
    const childElement = document.createElement('li');

    const candyInfoElement = document.createElement('span');
    candyInfoElement.textContent = `${item.candyName} - ${item.description} - Price: $${item.price.toFixed(2)} - Quantity: ${item.quantity}`;

    if (item.quantity === 0) {
        candyInfoElement.textContent += ' - Candy Unavailable';
    }

    childElement.appendChild(candyInfoElement);
    childElement.id = item._id;

    const buyButtonContainer = document.createElement('div');

    const buyButton1 = document.createElement('button');
    buyButton1.textContent = 'Buy1';
    buyButton1.onclick = () => {
        updateQuantity(item._id, 1);
    };

    const buyButton2 = document.createElement('button');
    buyButton2.textContent = 'Buy2';
    buyButton2.onclick = () => {
        updateQuantity(item._id, 2);
    };

    const buyButton3 = document.createElement('button');
    buyButton3.textContent = 'Buy3';
    buyButton3.onclick = () => {
        updateQuantity(item._id, 3);
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        deleteItem(item._id);
    };

    buyButtonContainer.appendChild(buyButton1);
    buyButtonContainer.appendChild(buyButton2);
    buyButtonContainer.appendChild(buyButton3);
    buyButtonContainer.appendChild(deleteButton);

    childElement.appendChild(buyButtonContainer);
    parentElement.appendChild(childElement);
}

async function updateQuantity(itemId, updatedQuantity) {
    try {
        // Get the current item data from the server
        const response = await axios.get(`https://crudcrud.com/api/2d6de3249c6345dba917b019317a17cf/candyData/${itemId}`);
        const currentItem = response.data;
        const newQuantity = currentItem.quantity - updatedQuantity;

        // Update the quantity on the server
        await axios.put(`https://crudcrud.com/api/2d6de3249c6345dba917b019317a17cf/candyData/${itemId}`, { quantity: newQuantity });

        // Update the quantity on the screen
        updateQuantityOnScreen(itemId, newQuantity);

        // Update the local storage with the updated item
        updateItemInLocal(itemId, newQuantity);
    } catch (err) {
        console.log(err);
    }
}


function updateQuantityOnScreen(itemId, updatedQuantity) {
    const itemElement = document.getElementById(itemId);
    if (itemElement) {
        const candyInfoElement = itemElement.querySelector('span');
        if (updatedQuantity === 0) {
            candyInfoElement.textContent += ' - Candy Unavailable';
        } else {
            candyInfoElement.textContent = candyInfoElement.textContent.replace(/Quantity: \d+/, `Quantity: ${updatedQuantity}`);
        }
    }
}

function updateItemInLocal(itemId, updatedQuantity) {
    const items = JSON.parse(localStorage.getItem('candyItems')) || [];
    const updatedItems = items.map((item) => (item._id === itemId ? { ...item, quantity: updatedQuantity } : item));
    localStorage.setItem('candyItems', JSON.stringify(updatedItems));
}

async function deleteItem(itemId) {
    try {
        await axios.delete(`https://crudcrud.com/api/2d6de3249c6345dba917b019317a17cf/candyData/${itemId}`);
        deleteItemFromLocal(itemId);
        removeItemFromScreen(itemId);
    } catch (err) {
        console.log(err);
    }
}

function deleteItemFromLocal(itemId) {
    const items = JSON.parse(localStorage.getItem('candyItems')) || [];
    const updatedItems = items.filter((item) => item._id !== itemId);
    localStorage.setItem('candyItems', JSON.stringify(updatedItems));
}

function removeItemFromScreen(itemId) {
    const itemElement = document.getElementById(itemId);
    if (itemElement) {
        itemElement.remove();
    }
}

// Call fetchDataFromServer after the page is loaded
window.addEventListener("DOMContentLoaded", () => {
    fetchDataFromServer();

    // Load items from localStorage after the page is loaded (to persist data after refresh)
    const storedItems = JSON.parse(localStorage.getItem('candyItems'));
    if (storedItems) {
        storedItems.forEach((item) => {
            showItemOnScreen(item);
        });
    }
});
