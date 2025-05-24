const API_URL = 'https://task-c15h.onrender.com/tasks'; 

document.getElementById('task-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const input = document.getElementById('task-input');
  const task = input.value.trim();
  if (task) {
    await addTask(task);
    input.value = '';
    loadTasks();
  }
});

async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${task.id})">
        ${task.name}
      </span>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function addTask(name) {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, completed: false }),
  });
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadTasks();
}

async function toggleTask(id) {
  // We'll add this logic after backend is ready
}

loadTasks();
