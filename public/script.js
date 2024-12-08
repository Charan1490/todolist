document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("task-input");
    const todoList = document.getElementById("todo-list");

    const fetchTasks = async () => {
        const response = await fetch("/tasks");
        const tasks = await response.json();
        todoList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task.name}</span>
                <button onclick="deleteTask('${task._id}')">Delete</button>
            `;
            todoList.appendChild(li);
        });
    };

    const addTask = async (task) => {
        await fetch("/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: task }),
        });
        fetchTasks();
    };

    window.deleteTask = async (id) => {
        await fetch(`/tasks/${id}`, { method: "DELETE" });
        fetchTasks();
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const task = taskInput.value.trim();
        if (task) {
            addTask(task);
            taskInput.value = "";
        }
    });

    fetchTasks();
});
