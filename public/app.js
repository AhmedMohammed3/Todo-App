function deleteItem(itemId) {
    fetch(`/todo/delete/${itemId}`, { method: "delete" })
        .then(res => res.json())
        .then(resData => {
            console.log(resData);
            window.location.reload();
        })
        .catch(err => console.log(err));
}

function updateItem(itemId) {
    const itemText = document.getElementById('todoText').textContent;
    fetch(`/todo/update/${itemId}`, {
            method: "put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: itemText
            })
        })
        .then(res => res.json())
        .then(resData => {
            console.log(resData);
            window.location.reload();
        })
        .catch(err => console.log(err));
}