
const planner = document.getElementsByClassName('planner');
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00","19:00","20:00"];
console.log(planner)

hours.forEach(hour => {
    const hourCell = document.createElement('div');
    hourCell.className = 'cell header';
    hourCell.textContent = hour;
    $("#planner").append(hourCell);
    //planner.appendChild(hourCell);
    console.log(hourCell)


    for (let i = 0; i < 7; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'cell';
        dayCell.setAttribute('data-day', i);
        dayCell.setAttribute('data-hour', hour);
        $("#planner").append(dayCell);
        //planner.appendChild(dayCell);
        console.log(dayCell)
    }
});

function addTask() {
    const title = document.getElementById('title').value;
    const time = document.getElementById('time').value;
    const day = document.getElementById('day').value;
    const desc = document.getElementById('desc').value;
    const creator = document.getElementById('creator').value;
    const status = document.getElementById('status').value;
    const priority = document.getElementById('priority').value;

    if (!title || !time) return alert("אנא מלא את כל השדות החשובים");
    console.log(day)
    console.log(time)

    

    localStorage.setItem('tasks', JSON.stringify(tasks));



    //const cell = document.querySelector(`.cell[data-day='${day}'][data-hour='${time}']`);
    //console.log(cell)
    //if (!cell) return alert("לא נמצאה התאמה לשעה/יום");

    const card = document.createElement('div');
    card.className = `task-card priority-${priority}`;
    card.innerHTML = `
<div class="actions">
  <button onclick="editTask(this)">✏️</button>
  <button onclick="deleteTask(this)">🗑️</button>
</div>
<div><strong>${title}</strong></div>
<div><small>${desc}</small></div>
<div><small>🕒 ${time}</small></div>
<div><small>👤 ${creator}</small></div>
<div><small class="status">סטטוס: <span onclick="toggleStatus(this)" style="cursor:pointer">${status === 'done' ? 'בוצע' : 'בתהליך'}</span></small></div>
<div><small>🎯 עדיפות: ${priority}</small></div>
`;
    $("cell").append(card);
   // cell.appendChild(card);
    closeModal();
    saveTasksToStorage();

}

function openModal() {
    document.getElementById('taskModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
    document.getElementById('title').value = '';
    document.getElementById('time').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('creator').value = '';
    document.getElementById('status').value = 'in-progress';
    document.getElementById('priority').value = 'low';
}

function deleteTask(button) {
    const card = button.closest('.task-card');
    card.remove();
    saveTasksToStorage();

}

function toggleStatus(span) {
    span.textContent = span.textContent === 'בוצע' ? 'בתהליך' : 'בוצע';
    saveTasksToStorage();

}

function editTask(button) {
    const card = button.closest('.task-card');
    const cells = card.querySelectorAll('div');
    document.getElementById('title').value = cells[1].textContent;
    document.getElementById('desc').value = cells[2].textContent;
    document.getElementById('time').value = cells[3].textContent.replace('🕒 ', '');
    document.getElementById('creator').value = cells[4].textContent.replace('👤 ', '');
    document.getElementById('status').value = cells[5].textContent.includes('בוצע') ? 'done' : 'in-progress';
    document.getElementById('priority').value = cells[6].textContent.replace('🎯 עדיפות: ', '').trim();
    card.remove();
    openModal();
    saveTasksToStorage();

}

window.onclick = function (event) {
    const modal = document.getElementById('taskModal');
    if (event.target === modal) {
        closeModal();
    }
}
function saveTasksToStorage() {
    const tasks = [];
    console.log(tasks)
    document.querySelectorAll('.task-card').forEach(card => {
        const cell = card.closest('.cell');
        const task = {
            day: cell.getAttribute('data-day'),
            hour: cell.getAttribute('data-hour'),
            title: card.querySelector('strong').textContent,
            desc: card.querySelectorAll('small')[0].textContent,
            time: card.querySelectorAll('small')[1].textContent.replace('🕒 ', ''),
            creator: card.querySelectorAll('small')[2].textContent.replace('👤 ', ''),
            status: card.querySelectorAll('span')[0].textContent === 'בוצע' ? 'done' : 'in-progress',
            priority: card.querySelectorAll('small')[4].textContent.replace('🎯 עדיפות: ', '')
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromStorage() {
    const data = JSON.parse(localStorage.getItem('tasks') || '[]');
    data.forEach(task => {
        const cell = document.querySelector(`.cell[data-day='${task.day}'][data-hour='${task.hour}']`);
        if (cell) {
            const card = document.createElement('div');
            card.className = `task-card priority-${task.priority}`;
            card.innerHTML = `
        <div class="actions">
            <button onclick="editTask(this)">✏️</button>
            <button onclick="deleteTask(this)">🗑️</button>
        </div>
        <div><strong>${task.title}</strong></div>
        <div><small>${task.desc}</small></div>
        <div><small>🕒 ${task.time}</small></div>
        <div><small>👤 ${task.creator}</small></div>
        <div><small class="status">סטטוס: <span onclick="toggleStatus(this)" style="cursor:pointer">${task.status === 'done' ? 'בוצע' : 'בתהליך'}</span></small></div>
        <div><small>🎯 עדיפות: ${task.priority}</small></div>
    `;
            cell.appendChild(card);
        }
    });
}
window.onload = loadTasksFromStorage;


