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
    const todoDueDateInpt = document.getElementById('todo-duedate-' + itemId);
    const todoLeftSide = document.getElementById('item-left-side-' + itemId);

    const editText = document.createElement('input');
    editText.type = "text";
    editText.id = "todoText-" + itemId;
    editText.value = todoTextInpt.innerText;

    const editDueDate = document.createElement('input');
    editDueDate.type = "date";
    editDueDate.id = "todoDueDate-" + itemId;
    editDueDate.value = formatDate(todoDueDateInpt.innerText);

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
    todoDueDateInpt.innerText = "";

    todoTextInpt.appendChild(editText);
    todoDueDateInpt.appendChild(editDueDate);

    todoLeftSide.appendChild(doneIcon);
    todoLeftSide.appendChild(cancelIcon);
    // doneIcon.
}

function updateItem(itemId) {
    const itemText = document.getElementById('todoText-' + itemId).value;
    const itemDueDate = document.getElementById('todoDueDate-' + itemId).value;
    fetch(`/todo/update/${itemId}`, {
            method: "put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: itemText,
                dueDate: itemDueDate
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

function formatDate(dateStr) {
    date = new Date(dateStr);
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}