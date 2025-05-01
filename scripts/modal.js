class Task {
    //sales=0;
    constructor(title, time, day, desc,
        creator, status, priority) {
        this.title = title;
        this.time = time;
        this.day = day;
        this.desc = desc;
        this.creator = creator;
        this.status = status;
        this.priority = priority;
    }
}

let taskFlag = 0;
let taskCount = 0;
//let editingTaskId = null; // null = מצב רגיל (הוספה), אחרת = עריכה
const planner = document.getElementById('planner');
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

hours.forEach(hour => {
    const hourCell = document.createElement('div');
    hourCell.className = 'hour';
    hourCell.textContent = hour;
    planner.appendChild(hourCell);

    for (let i = 0; i < 5; i++) {

        const dayCell = document.createElement('div');
        dayCell.className = 'day-column';
        dayCell.setAttribute('data-day', i);
        dayCell.setAttribute('data-hour', hour);
        planner.appendChild(dayCell);
    }
});

function addTask() {

    if (localStorage.getItem("taskCount")) {
        taskCount = localStorage.getItem("taskCount");
        taskCount++;
        localStorage.setItem("taskCount", taskCount);
    }
    else {
        taskCount = 1;
        localStorage.setItem("taskCount", taskCount);
    }

    let currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const title = document.getElementById('title').value;
    const time = document.getElementById('time').value;
    const day = document.getElementById('day').value;
    const desc = document.getElementById('desc').value;
    const creator = currentUser.username;
    const status = document.getElementById('status').value;
    const priority = document.getElementById('priority').value;

    if (!title || !time) return alert("אנא מלא את כל השדות החשובים");

    const cell = document.querySelector(`.day-column[data-day=
                               '${day}'][data-hour='${time}']`);
    if (!cell) return alert("לא נמצאה התאמה לשעה/יום");

    const card = document.createElement('div');
    //card.className = `task-card priority-${priority}`;
    // card.className = `task-card priority-${priority}`;
    card.className = `task-card`;
    //card.setAttribute('data-id', taskCount);
    card.innerHTML = `
            <div class="actions">
                <button id="editBtn-${taskCount}" onclick="editTask(this)">✏️</button>
                <button id="deleteBtn-${taskCount}" onclick="deleteTask(this)">🗑️</button>
            </div>
            <div><strong>${title}</strong></div>
            <div><small>${desc}</small></div>
            <div><small>🕒 ${time}</small></div>
            <div><small>👤 ${creator}</small></div>
            <div><small class="status">סטטוס: <span id="statusSpan-${taskCount}" onclick="toggleStatus(this)" style="cursor:pointer">${status === 'done' ? 'בוצע' : 'בתהליך'}</span></small></div>
            <div><small>🎯 עדיפות: ${priority}</small></div>
           `;
    cell.appendChild(card);
    let newTask = new Task(
        this.title = title,
        this.time = time,
        this.day = day,
        this.desc = desc,
        this.creator = creator,
        this.status = status,
        this.priority = priority)
    newTask.userId = currentUser.userId;
    newTask.taskCount = taskCount;
    saveTasksToStorage(newTask);
    closeModal();
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
    /*
        const btn = document.getElementById('taskSubmitBtn');
        btn.textContent = "הוסף משימה";
        btn.onclick = addTask();
    
        document.getElementById('taskModal').style.display = 'none';
        */
}

function deleteTask(button) {

    console.log(button);
    let a = button.id;
    console.log(a);
    let index = a.indexOf("-");
    console.log(index);

    let new8 = 0;
    new8 = +(a.slice(index + 1, a.length));
    console.log(new8);


    for (let i = 0; i < alltasks.length; i++) {
        newId = alltasks[i].taskId;
    }

    let alltasks = JSON.parse(localStorage.getItem("allTasks"))
    {

    }

    //  const card = button.closest('.task-card');
    // console.log('.task-card');
    // console.log(card);

    //card.remove();
    // saveTasksToStorage();

    /**function removeTaskFromStorage(taskId) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id != taskId); // מוחקת רק את המשימה הזו
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } */
    /*let orders = JSON.parse(localStorage.getItem(configOption + "Orders"));
    for (let i in orders) {
        if (orders[i].orderId == orderId) {
            orders.splice(i, 1);
            localStorage.setItem(configOption + "Orders", JSON.stringify(orders));
            window.location.reload();
            return;
        }
    } */


}

function toggleStatus(span) {
    span.textContent = span.textContent === 'בוצע' ? 'בתהליך' : 'בוצע';
    saveTasksToStorage();
}

/*
function saveEditedTask() {
    console.log("Saving edited task:", editingTaskId);
    const title = document.getElementById('title').value;
    const time = document.getElementById('time').value;
    const day = document.getElementById('day').value;
    const desc = document.getElementById('desc').value;
    const creator = document.getElementById('creator').value;
    const status = document.getElementById('status').value;
    const priority = document.getElementById('priority').value;

    let newTask = new Task(
        this.title = title,
        this.time = time,
        this.day = day,
        this.desc = desc,
        this.creator = creator,
        this.status = status,
        this.priority = priority)
    newTask.userId = currentUser.userId;
    newTask.taskCount = editingTaskId;
    saveTasksToStorage(newTask);
}
*/

function editTask(button) {
    const card = button.closest('.task-card');
    // const taskId = card.getAttribute('data-id');
    //editingTaskId = taskId;
    //  console.log("Saving edited task:", editingTaskId);

    const cells = card.querySelectorAll('div');
    document.getElementById('title').value = cells[1].textContent;
    document.getElementById('desc').value = cells[2].textContent;
    document.getElementById('time').value = cells[3].textContent.replace('🕒 ', '');
    document.getElementById('creator').value = currentUser.username;  //cells[4].textContent.replace('👤 ', '');
    document.getElementById('status').value = cells[5].textContent.includes('בוצע') ? 'done' : 'in-progress';
    document.getElementById('priority').value = cells[6].textContent.replace('🎯 עדיפות: ', '').trim();
    /*
    const title = cells[1].textContent;
    const time = cells[3].textContent.replace('🕒 ', '');
    const day = cells[4].textContent;
    const desc = cells[2].textContent;
    const creator = currentUser.username;
    const status = cells[5].textContent.includes('בוצע') ? 'done' : 'in-progress';
    const priority = cells[6].textContent.replace('🎯 עדיפות: ', '').trim();
    let newTask = new Task(
        this.title = title,
        this.time = time,
        this.day = day,
        this.desc = desc,
        this.creator = creator,
        this.status = status,
        this.priority = priority)
    newTask.userId = currentUser.userId;
    newTask.taskCount = taskId;
    */
    /*
       // שינוי טקסט הכפתור
       const btn = document.getElementById('taskSubmitBtn');
       btn.textContent = "שמור שינויים";
       btn.onclick = () => saveEditedTask();
       //btn.onclick = saveEditedTask();
       */
    card.remove();
    openModal();
    //saveTasksToStorage(newTask);
}


window.onclick = function (event) {
    const modal = document.getElementById('taskModal');
    if (event.target === modal) {
        closeModal();
    }
}

function saveTasksToStorage(TaskToSave) {

    if (localStorage.getItem("allTasks")) {
        let exist = 1;
        let alltasks = JSON.parse(localStorage.getItem("allTasks"))
        for (let i in alltasks) {
            console.log(alltasks[i].taskCount)
            if (alltasks[i].taskCount === TaskToSave.taskCount) {
                console.log("exist")
                alltasks.splice(i, 1);
                alltasks.push(TaskToSave);
                exist = 0;
            }
        }
        if (exist > 0) {
            console.log("not exist")
            alltasks.push(TaskToSave);
        }
        localStorage.setItem("allTasks", JSON.stringify(alltasks));
        // closeModal()
        window.location.reload();
        //alert("You have successfully updated new task");
    }
    else {
        const taskArr = []
        taskArr.push(TaskToSave);
        localStorage.setItem('allTasks', JSON.stringify(taskArr));
        // closeModal()
        window.location.reload();
    }

}

/*
function saveTasksToStorage() {

    if (localStorage.getItem("allTasks")) {
        let alltasks = JSON.parse(localStorage.getItem("allTasks"))
        taskCount = alltasks.length + 1;
    }
    else {
        taskCount += 1;
    }

    let currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const title = document.getElementById('title').value;
    const time = document.getElementById('time').value;
    const day = document.getElementById('day').value;
    const desc = document.getElementById('desc').value;
    const creator = currentUser.username;
    const status = document.getElementById('status').value;
    const priority = document.getElementById('priority').value;

    let newId;

    if (localStorage.getItem("allTasks")) {

        let alltasks = JSON.parse(localStorage.getItem("allTasks"))

        for (let i = 0; i < alltasks.length; i++) {
            newId = alltasks[i].taskId
        }
        newId += 1

        let newTask = new Task(
            this.title = title,
            this.time = time,
            this.day = day,
            this.desc = desc,
            this.creator = creator,
            this.status = status,
            this.priority = priority)

        newTask.taskId = newId;
        newTask.userId = currentUser.userId;
        newTask.taskCount = taskCount;

        alltasks.push(newTask);

        localStorage.setItem("allTasks", JSON.stringify(alltasks));
        //alert("You have successfully updated new task");
        return;
    }
    else {

        const taskArr = []

        let newTask = new Task(
            this.title = title,
            this.time = time,
            this.day = day,
            this.desc = desc,
            this.creator = creator,
            this.status = status,
            this.priority = priority)

        //newTask.userId = 1;
        //  taskArr[creator] = [(newTask)]

        newTask.taskId = 1;
        newTask.userId = currentUser.userId;
        newTask.taskCount = taskCount;

        taskArr.push(newTask);

        localStorage.setItem('allTasks', JSON.stringify(taskArr));
    }

    /*
    document.querySelectorAll('.task-card').forEach(card => {
        const cell = card.closest('.day-column');
        console.log(cell)
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

    
    // localStorage.setItem('tasks', JSON.stringify(tasks));
}
*/
function loadTasksFromStorage() {
    const allTasks = JSON.parse(localStorage.getItem('allTasks') || '[]');
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))

    for (let i = 0; i < allTasks.length; i++) {
        let data = allTasks[i];
        if (data.userId == currentUser.userId) {
            const cell = document.querySelector(`.day-column[data-day=
                                     '${data.day}'][data-hour='${data.time}']`);
            if (cell) {
                //<div>🕒 ${data.time}</div>
                const card = document.createElement('div');


                card.className = `task-card priority-${data.priority}`;
                card.innerHTML = `
                        <div class="actions">
                            <button id="editBtn-${data.taskCount}" onclick="editTask(this)">✏️</button>
                            <button id="deleteBtn-${data.taskCount}" onclick="deleteTask(this)">🗑️</button>
                        </div>
                        <div><strong>${data.title}</strong></div>
                        <div>${data.desc}</div>
                //<div>🕒 ${data.time}</div>
                        <div>👤 ${data.creator}</div>
                        <div><small class="status">סטטוס: <span id="statusSpan-${data.taskCount}" onclick="toggleStatus(this)" style="cursor:pointer">${status === 'done' ? 'בוצע' : 'בתהליך'}</span></small></div>
                        <div>🎯 עדיפות: ${data.priority}</div>
                    `;
                cell.appendChild(card);
            }
        }
    }
}

function allTasks() {
    const alladdBtn = document.getElementById('alladdBtn');

    if (taskFlag == 1) {
        clearCalender();
        loadTasksFromStorage();
        alladdBtn.innerText = "כל המשימות ";
        taskFlag = 0;
    }
    else {
        clearCalender();
        alladdBtn.innerText = "משימות יוזר נוכחי ";
        taskFlag = 1;

        const allTasks = JSON.parse(localStorage.getItem('allTasks') || '[]');

        for (let i = 0; i < allTasks.length; i++) {
            let data = allTasks[i];
            const cell = document.querySelector(`.day-column[data-day=
                                                '${data.day}'][data-hour='${data.time}']`);
            if (cell) {
                const card = document.createElement('div');
                card.className = `task-card priority-${task.priority}`;
                card.innerHTML = `
                                <div class="actions">
                                    <button id="editBtn-${data.taskCount}" onclick="editTask(this)">✏️</button>
                                    <button id="deleteBtn-${data.taskCount}" onclick="deleteTask(this)">🗑️</button>
                                </div>
                                <div><strong>${data.title}</strong></div>
                                <div>${data.desc}</div>
                                <div>🕒 ${data.time}</div>
                                <div>👤 ${data.creator}</div>
                                <div><small class="status">סטטוס: <span id="statusSpan-${data.taskCount}" onclick="toggleStatus(this)" style="cursor:pointer">${status === 'done' ? 'בוצע' : 'בתהליך'}</span></small></div>
                                <div>🎯 עדיפות: ${data.priority}</div>
                            `;
                cell.appendChild(card);
            }
        }
    }
}

function clearCalender() {
    const allTasks = JSON.parse(localStorage.getItem('allTasks') || '[]');

    for (let i = 0; i < allTasks.length; i++) {
        let data = allTasks[i];
        const cell = document.querySelector(`.day-column[data-day=
                                            '${data.day}'][data-hour='${data.time}']`);
        if (cell) {
            cell.innerHTML = "";
        }
    }
}

window.onload = loadTasksFromStorage;


/* changes

 //const text = "JavaScript";
    //console.log(text.slice(0, 4));    // "Java"
    //console.log(text.slice(-6));     // "Script"

   /* let a  = 'Hello Hello Hello';
    console.log( a.replace('Hello', 'Bye') );

       data.forEach(task =>
         {
              const cell = document.querySelector
              (`.day-column[data-day='${task.day}'][data-hour='${task.hour}']`);
              if (cell)
                 {
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

*/


