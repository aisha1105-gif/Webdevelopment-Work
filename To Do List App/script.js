// Load tasks when page opens
window.onload = function () {
    loadTasks();
};

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    createTaskElement(taskText);
    saveTask(taskText);

    input.value = "";
}

function createTaskElement(taskText, completed = false) {
    let li = document.createElement("li");
    li.textContent = taskText;

    if (completed) {
        li.classList.add("completed");
    }

    // Mark complete
    li.onclick = function () {
        li.classList.toggle("completed");
        updateStorage();
    };

    // Delete button
    let btn = document.createElement("button");
    btn.textContent = "X";

    btn.onclick = function (e) {
        e.stopPropagation();
        li.remove();
        updateStorage();
    };

    li.appendChild(btn);

    document.getElementById("taskList").appendChild(li);
}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

function updateStorage() {
    let tasks = [];

    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}