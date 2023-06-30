function deleteItem(itemId) {
    fetch(`/todo/delete/${itemId}`, { method: "delete" })
        .then(res => res.json())
        .then(resData => {
            console.log(resData);
            window.location.reload();
        })
        .catch(err => console.log(err));
}

function editItem(itemId) {
    const editBtn = document.getElementById('editBtn-' + itemId);
    editBtn.parentNode.removeChild(editBtn);

    const todoTextInpt = document.getElementById('todo-text-' + itemId);

    const editText = document.createElement('input');
    editText.type = "text";
    editText.id = "todoText-" + itemId;
    editText.value = todoTextInpt.innerText;

    const doneIcon = document.createElement('i');
    doneIcon.classList = "fa-solid fa-check";
    doneIcon.id = "doneIcon";
    doneIcon.addEventListener('click', function() {
        updateItem(itemId);
    });

    const cancelIcon = document.createElement('i');
    cancelIcon.classList = "fa-sharp fa-solid fa-x";
    cancelIcon.id = "cancelIcon";
    cancelIcon.addEventListener('click', function() {
        window.location.reload();
    });

    todoTextInpt.innerText = "";
    todoTextInpt.appendChild(editText);
    todoTextInpt.appendChild(doneIcon);
    todoTextInpt.appendChild(cancelIcon);
    // doneIcon.
}

function updateItem(itemId) {
    const itemText = document.getElementById('todoText-' + itemId).value;
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

function signOut() {
    document.cookie = 'userId=; Max-Age=0';
    window.location.href = '/todos';
}