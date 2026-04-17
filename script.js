// Step 1 — Find HTML elements
const taskInput = document.getElementById("task-input");
const addBtn    = document.getElementById("add-btn");
const clearBtn  = document.getElementById("clear-btn");
const taskList  = document.getElementById("task-list");


// Step 2 — Load saved tasks when page opens
window.addEventListener("load", function() {
  const savedTasks = getSavedTasks();
  savedTasks.forEach(function(task) {
    renderTask(task.text, task.completed);
  });
});


// Step 3 — Add task on button click
addBtn.addEventListener("click", function() {
  addTask();
});


// Step 4 — Add task on Enter key
taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});


// Step 5 — Main addTask function
function addTask() {

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Show task on screen
  renderTask(taskText, false);

  // Save task to localStorage
  saveTask(taskText, false);

  // Clear input box
  taskInput.value = "";
}


// Step 6 — Create and show a task on screen
function renderTask(taskText, isCompleted) {

  const li = document.createElement("li");
  li.className = "task-item";

  if (isCompleted) {
    li.classList.add("completed");
  }

  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <div class="task-buttons">
      <button class="done-btn">Done</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  taskList.appendChild(li);

  // Done button — toggle completed style and update storage
  const doneBtn = li.querySelector(".done-btn");
  doneBtn.addEventListener("click", function() {
    li.classList.toggle("completed");
    updateTask(taskText, li.classList.contains("completed"));
  });

  // Delete button — remove from screen and storage
  const deleteBtn = li.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function() {
    li.remove();
    deleteTask(taskText);
  });

}


// Step 7 — Get all saved tasks from localStorage
function getSavedTasks() {
  const data = localStorage.getItem("tasks");
  if (data === null) {
    return [];
  }
  return JSON.parse(data);
}


// Step 8 — Save a new task to localStorage
function saveTask(taskText, isCompleted) {
  const tasks = getSavedTasks();
  tasks.push({ text: taskText, completed: isCompleted });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Step 9 — Update completed status in localStorage
function updateTask(taskText, isCompleted) {
  const tasks = getSavedTasks();
  const task = tasks.find(function(t) {
    return t.text === taskText;
  });
  if (task) {
    task.completed = isCompleted;
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Step 10 — Delete one task from localStorage
function deleteTask(taskText) {
  let tasks = getSavedTasks();
  tasks = tasks.filter(function(t) {
    return t.text !== taskText;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Step 11 — Clear all tasks from screen and localStorage
clearBtn.addEventListener("click", function() {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
});