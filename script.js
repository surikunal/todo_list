// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

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

    if (newTodo.innerText != "") {
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
        todo.addEventListener("transitionEnd", function(){
            todo.remove();
        });
    }

    // check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}