document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskText = taskInput.value.trim();

    if (taskText) {
        addTaskToDOM(taskText, false);
        saveTask(taskText, false);
        taskInput.value = "";
    }
}

function addTaskToDOM(text, completed) {
    const taskList = document.getElementById("task-list");

    const taskItem = document.createElement("li");
    taskItem.className = completed ? "completed" : "";
    taskItem.innerHTML = `
        <span onclick="toggleTask(this)">${text}</span>
        <button onclick="removeTask(this)">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

function toggleTask(element) {
    const taskText = element.innerText;
    element.parentElement.classList.toggle("completed");
    updateTaskStatus(taskText, element.parentElement.classList.contains("completed"));
}

function removeTask(element) {
    const taskText = element.parentElement.querySelector("span").innerText;
    element.parentElement.remove();
    deleteTask(taskText);
}

function saveTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(task => task.text === text);
    if (task) {
        task.completed = completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function deleteTask(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
