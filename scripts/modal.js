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
let currentTaskflag=0;
let taskFlag = 0;
//let numOfTaskCount = 0;
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


function toggleStatus(span) {
    //console.log(span)

    const card = span.closest('.task-card');
    let taskId = card.getAttribute('data-id');
    //console.log(taskId)
    span.textContent = span.textContent === 'בוצע' ? 'בתהליך' : 'בוצע';

    let tasks = JSON.parse(localStorage.getItem('allTasks')) || [];

    const index = tasks.findIndex(task => task.taskCount == taskId);
 
    if (index !== -1 ) {
        tasks[index].status = span.textContent;
        localStorage.setItem('allTasks', JSON.stringify(tasks));
        //location.reload(); // טוען מחדש כדי לעדכן את הכרטיסים
       //loadTasksFromStorage();
    }



    //saveTasksToStorage();
}
function saveEditedTask(taskId) {

    currentTaskflag=0;
   // console.log(currentTaskflag)

    let numOfTaskCount = JSON.parse(localStorage.getItem('numOfTaskCount')) || [];
    
    //console.log("Saving edited task:", editingTaskId);
    const title = document.getElementById('title').value;
    const time = document.getElementById('time').value;
    const day = document.getElementById('day').value;
    const desc = document.getElementById('desc').value;
    const creator = currentUser.username;
    const status = document.getElementById('status').value;
    const priority = document.getElementById('priority').value;

    /* let newTask = new Task(
         this.title = title,
         this.time = time,
         this.day = day,
         this.desc = desc,
         this.creator = creator,
         this.status = status,
         this.priority = priority)
     newTask.userId = currentUser.userId;
     newTask.taskCount = taskId;*/

    // שולפים את המשימות
    let tasks = JSON.parse(localStorage.getItem('allTasks')) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    
    let currentTask=[];

    for (let i in tasks)
    {
        currentTask=tasks[i];
        //alert("TaskId  :"+ taskId + " "+ "numOfTaskCount  :"+numOfTaskCount+ " "+ "currentTask.userId : "
           // + currentTask.userId+ " "  +"currentUser.userId : "+  currentUser.userId+" "+"currentTask.day : "+ currentTask.day+" " +" day: "+"  "+day+"  "+"currentTask.time : "+ currentTask.time+" "+ time)
 
        if(currentTask.userId==currentUser.userId && currentTask.day==day && currentTask.time== time )
        {
            currentTaskflag=1;
          //  alert("1 : "+ taskId+" "+numOfTaskCount)
     
          //  alert("2 : "+ currentTask.userId+" "+currentUser.userId)
       
          //  alert("3 : "+ currentTask.day+" "+day)
          
          //  alert("4 : "+ currentTask.time+" "+ time)
            break;
            
        }
        else{
            currentTaskflag=0;
            document.getElementById('taskModal').style.display = 'none';

           // alert("else 1 : i=" + i +" "+ taskId+" "+numOfTaskCount)
     
          //  alert("else 2 :i= "+ i +" "+ currentTask.userId+" "+currentUser.userId)
       
           // alert("else 3 i=: "+ i +" "+ currentTask.day+" "+day)
          
           // alert("else 4 i=: "+ i +" "+ currentTask.time+" "+ time)

        }
    }



    // מוצאים את זו שאותה עורכים לפי id
    const index = tasks.findIndex(task => task.taskCount == taskId);
    //console.log(taskId)
    
 
    if (index !== -1 && currentTaskflag==0 &&tasks[index].status !='בוצע') {
        tasks[index].taskCount = taskId;
        tasks[index].title = title;
        tasks[index].time = time;
        tasks[index].day = day;
        tasks[index].desc = desc;
        tasks[index].creator = currentUser.username;
        tasks[index].status = status;
        tasks[index].priority = priority;
        localStorage.setItem('allTasks', JSON.stringify(tasks));
        closeModal();
        location.reload(); // טוען מחדש כדי לעדכן את הכרטיסים
        loadTasksFromStorage();
    } else {
         if(tasks[index].status =='בוצע')
          {
            alert(". לא ניתן עדכן סטטוס - בוצע ");
           }
         else{
            alert(" לא ניתן לעדכן - מקום תפוס ביומן ");
         }  
      }

    // saveTasksToStorage(newTask);
}

function addTask() {
    //console.log(currentTaskflag)
    currentTaskflag=0;
    taskCount = 0;
    if (localStorage.getItem("numOfTaskCount")) {
        num = parseInt(localStorage.getItem("numOfTaskCount"), 10);
        taskCount = num + 1;
        localStorage.setItem("numOfTaskCount", taskCount);
    } else {
        taskCount = 1;
        localStorage.setItem("numOfTaskCount", taskCount);
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

    let tasks = JSON.parse(localStorage.getItem('allTasks')) || [];
    
    let currentTask=[];

    for (let i in tasks)
    {
        currentTask=tasks[i];
      
      //  alert("1 : "+i+"  " + currentTask.userId+" "+currentUser.userId)
   
      //  alert("2 : "+i+"  " + currentTask.day+" "+day)
     //   alert("3 : "+i+"  " + currentTask.time+" "+ time)
 
        if(currentTask.userId==currentUser.userId && currentTask.day==day && currentTask.time== time )
        {

            currentTaskflag=1;
            
            alert("- שעה לא פנויה ביום זה למשתמש נוכחי ");
            break;

        }
    }

    if(currentTaskflag==0 )
    {
    const card = document.createElement('div');
    //card.className = `task-card priority-${priority}`;
    // card.className = `task-card priority-${priority}`;
    card.className = `task-card`;
    card.innerHTML = `
            <div class="actions">
                <button id="editBtn-${taskCount}" onclick="editTask(this)">✏️</button>
                <button id="deleteBtn-${taskCount}" onclick="deleteTask(this)">🗑️</button>
            </div>
            <div><strong>${title}</strong></div>
            <div><small>${desc}</small></div>
            <div><small>🕒 ${time}</small></div>
            <div><small>👤 ${currentUser.username}</small></div>
            <div><small class="status">סטטוס: <span id="statusSpan-${taskCount}" onclick="toggleStatus(this)" style="cursor:pointer">${status === 'done' ? 'בוצע' : 'בתהליך'}</span></small></div>
            <div><small>🎯 עדיפות: ${priority}</small></div>
           `;
    card.setAttribute('data-id', taskCount);
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
}

function openModal() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    document.getElementById('taskModal').style.display = 'flex';
    document.getElementById('creator').placeholder="creator : "+currentUser.username
    
}

function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
    document.getElementById('title').value = '';
    document.getElementById('time').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('creator').value = '';
    document.getElementById('status').value = 'in-progress';
    document.getElementById('priority').value = 'low';

    const btn = document.getElementById('taskSubmitBtn');
    btn.textContent = "הוסף משימה";
    btn.onclick = addTask;
    document.getElementById('taskModal').style.display = 'none';
    // loadTasksFromStorage();

}
function deleteTask(button) {

    const card = button.closest('.task-card');
    const taskId = card.getAttribute('data-id'); // לוקח את ה-id מהכרטיס
    card.remove();
    let tasks = JSON.parse(localStorage.getItem('allTasks') || '[]');
    tasks = tasks.filter(task => task.taskCount != taskId);
    localStorage.setItem('allTasks', JSON.stringify(tasks));

}



/*
function deleteTask(button) {

    let a  = button.id;
    let index = a.indexOf("-");
    console.log(index);

    let newTaskId= 0;
    newTaskId=+(a.slice(index+1,a.length));  
    
    let taskArr=JSON.parse(localStorage.getItem("allTasks"))

    for (let i = 0; i < taskArr.length; i++)
     {
       if(taskArr[i].taskCount==newTaskId)
       {
        taskArr.splice(i, 1);
        localStorage.setItem("allTasks", JSON.stringify(taskArr));
        window.location.reload();
        return;
       }
      }
}
 */

function editTask(button) {

    const card = button.closest('.task-card');
    let taskId = card.getAttribute('data-id');
    //editingTaskId = taskId;
    //  console.log("Saving edited task:", taskId);
    // console.log("Saving edited task:", editingTaskId);
    console.log(card)
    console.log(taskId)

    const cells = card.querySelectorAll('div');
    console.log(cells)
    document.getElementById('title').value =  cells[1].textContent;
    document.getElementById('day').value =cells[3].textContent;
    document.getElementById('desc').value = cells[2].textContent;
    document.getElementById('time').value = cells[3].textContent.replace('🕒 ', '');
    document.getElementById('creator').value = currentUser.username;  //cells[4].textContent.replace('👤 ', '');
    document.getElementById('status').value = cells[5].textContent.includes('בוצע') ? 'done' : 'in-progress';
    document.getElementById('priority').value = cells[6].textContent.replace('🎯 עדיפות: ', '').trim();

    // שינוי טקסט הכפתור
    const btn = document.getElementById('taskSubmitBtn');
    btn.textContent = "שמור שינויים";
    btn.onclick = () => saveEditedTask(taskId);
    //btn.onclick = saveEditedTask();
    //window.location.reload();

    
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
                card.setAttribute('data-id', data.taskCount);
                card.innerHTML = `
                        <div class="actions">
                            <button id="editBtn-${data.taskCount}" onclick="editTask(this)">✏️</button>
                            <button id="deleteBtn-${data.taskCount}" onclick="deleteTask(this)">🗑️</button>
                        </div>
                        <div><strong>${data.title}</strong></div>
                        <div>${data.desc}</div>
                //<div>🕒 ${data.time}</div>
                        <div>👤 ${data.creator}</div>
                        <div><small class="status">סטטוס: <span id="statusSpan-${data.taskCount}" onclick="toggleStatus(this)" style="cursor:pointer">
                                    ${data.status === 'done' ? 'בוצע' : 'בתהליך'}</span></small></div>
                        <div>🎯 עדיפות: ${data.priority}</div>
                    `;
                cell.appendChild(card);
            }
        }
    }
}

 function allTasksFunc()
{
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


