// date
function initDate() {
  let today = new Date();

  let dayName = today.getDay();
  let dayNum = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MEI",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DES",
  ];

  const dayWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const idElement = ["date", "month", "year", "day"];
  const dateValue = [dayNum, months[month], year, dayWeek[dayName]];

  for (let i = 0; i < idElement.length; i++) {
    document.getElementById(idElement[i]).firstChild.nodeValue = dateValue[i];
  }
}
initDate();

// Todo APP
const todoInput = document.querySelector("#todo-input");
const btnAdd = document.querySelector("#btn-add");
const todoList = document.querySelector("#todo-list");

// Event Listener
// trigger button with enter
window.addEventListener("DOMContentLoaded", getTodos);
todoInput.addEventListener("keyup", function (el) {
  if (el.keyCode === 13) {
    btnAdd.click();
    btnAdd.addEventListener("click", addTodo);
  }
});
btnAdd.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
todoList.addEventListener("click", lineThrough);

// function
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    let li = document.createElement("li");
    let del = document.createElement("span");

    li.setAttribute("class", "item");
    li.innerText = todo;
    del.setAttribute("class", "delete material-icons");
    del.innerText = "cancel";

    li.appendChild(del);
    todoList.appendChild(li);
  });
}

function addTodo() {
  let inputValue = todoInput.value;
  if (inputValue == "") {
    alert("Silahkan masukkan ToDo terlebih dahulu");
  } else {
    createElement(inputValue);
    addTodoLocalStorage(inputValue);
    todoInput.value = "";
    todoInput.focus();
  }
}

function deleteTodo(el) {
  if (el.target.classList.contains("delete")) {
    const parent = el.target.parentElement;
    deleteTodoLocalStorage(parent);
    parent.remove();
  }
}

function createElement(value) {
  let li = document.createElement("li");
  let del = document.createElement("span");

  li.setAttribute("class", "item");
  li.innerText = value;
  del.setAttribute("class", "delete material-icons");
  del.innerText = "cancel";

  li.appendChild(del);
  todoList.appendChild(li);
}

function lineThrough(el) {
  if (el.target.classList.contains("item")) {
    el.target.classList.toggle("line");
  }
}

function addTodoLocalStorage(value) {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(value);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodoLocalStorage(el) {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo, index) => {
    if (el.firstChild.textContent == todo) {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
}
