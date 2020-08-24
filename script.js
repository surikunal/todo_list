// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// event listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// functions
function addTodo(event) {
    // prevent form from submitting each time
    event.preventDefault();
    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;

    if (newTodo.innerText !== "") {
        newTodo.classList.add("todo-item");

        todoDiv.appendChild(newTodo);   // thats how we stick a todo item inside the todo div
        // add todo to local storage
        saveLocalTodo(todoInput.value);

        // check mark button
        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class="fas fa-check"></i>';  // TRICK: here we used innerHTML instead of innerText so that we can add a icon insted of simple text
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        // trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';  // TRICK: here we used innerHTML instead of innerText so that we can add a icon insted of simple text
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // append every todo div to todo list
        todoList.appendChild(todoDiv);

        // clear todo input value
        todoInput.value = "";
    }
}

function deleteCheck(e) {
    const item = e.target;
    // delete Todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        // aimation
        todo.classList.add("fall");
        removeLocalTodo(todo);
        todo.addEventListener("transitionend", function () {  // transitionend is an inbuilt keyword which will indicate that the transition is ended (we also have a animationend keyword but here we use transitionend)
            todo.remove();
        });
    }

    // check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodo(todo) {
    // check if array already exist or not
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        // Todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;

        if (newTodo.innerText !== "") {
            newTodo.classList.add("todo-item");

            todoDiv.appendChild(newTodo);   // thats how we stick a todo item inside the todo div

            // check mark button
            const completeButton = document.createElement("button");
            completeButton.innerHTML = '<i class="fas fa-check"></i>';  // TRICK: here we used innerHTML instead of innerText so that we can add a icon insted of simple text
            completeButton.classList.add("complete-btn");
            todoDiv.appendChild(completeButton);

            // trash button
            const trashButton = document.createElement("button");
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';  // TRICK: here we used innerHTML instead of innerText so that we can add a icon insted of simple text
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);

            // append every todo div to todo list
            todoList.appendChild(todoDiv);
        }
    });
}

function removeLocalTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}