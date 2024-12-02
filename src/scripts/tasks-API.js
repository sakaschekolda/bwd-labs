document.addEventListener('DOMContentLoaded', function () {
    const upcomingList = document.getElementById('task-list');
    const inProgressList = document.getElementById('in-progress-list');
    const completedList = document.getElementById('done-list');

    const taskInput = document.getElementById('task-input'); 
    const taskDialog = document.getElementById('task-dialog');
    const taskStatusCheckbox = document.getElementById('taskStatus'); 
    const taskForm = document.getElementById('taskForm'); 
    const sortButtons = document.querySelectorAll('.sort__button');

    const storageName = 'tasksData';
    let tasks = JSON.parse(localStorage.getItem(storageName)) || {
        upcoming: [],
        inProgress: [],
        completed: [],
    };

    function reloadFromLS() {
        upcomingList.innerHTML = '';
        inProgressList.innerHTML = '';
        completedList.innerHTML = '';

        tasks.upcoming.forEach(task => upcomingList.appendChild(createTask(task, 'upcoming')));
        tasks.inProgress.forEach(task => inProgressList.appendChild(createTask(task, 'inProgress')));
        tasks.completed.forEach(task => completedList.appendChild(createTask(task, 'completed', true)));
    }

    function saveToLS() {
        localStorage.setItem(storageName, JSON.stringify(tasks));
    }

    function createTask(task, status, checkboxChecked = false) {
        const listItem = document.createElement('div'); // Changed from li to div for your structure
        listItem.className = 'tasks__item';
        listItem.setAttribute('data-id', task.id);
        listItem.setAttribute('data-text', task.text);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'tasks__item-checkbox';
        checkbox.checked = checkboxChecked;

        const textSpan = document.createElement('span');
        textSpan.className = 'tasks__item-text';
        textSpan.textContent = task.text;

        const deleteButton = document.createElement('a');
        deleteButton.href = 'javascript:void(0)';
        deleteButton.className = 'tasks__item-close';
        deleteButton.textContent = 'Delete';

        listItem.appendChild(checkbox);
        listItem.appendChild(textSpan);
        listItem.appendChild(deleteButton);

        checkbox.addEventListener('change', function () {
            if (status === 'completed') {
                moveTask(task.id, status, 'inProgress');
            } else {
                moveTask(task.id, status);
            }
        });

        deleteButton.addEventListener('click', function () {
            deleteTask(task.id, status);
        });

        return listItem;
    }

    function genId() {
        return Math.random().toString().slice(2);
    }

    function addTask(taskText, addToCompleted = false) {
        if (taskText === '') return;
        const task = {
            id: genId(),
            text: taskText,
        };

        if (addToCompleted) {
            tasks.completed.push(task);
        } else {
            tasks.upcoming.push(task);
        }

        saveToLS();
        reloadFromLS();
        
        taskInput.value = '';
        taskStatusCheckbox.checked = false;
        taskDialog.close();
    }

    function deleteTask(taskId, status) {
        tasks[status] = tasks[status].filter(task => task.id !== taskId);
        saveToLS();
        reloadFromLS();
    }

    function moveTask(taskId, currStatus, nextStatus = null) {
        const statusOrder = ['upcoming', 'inProgress', 'completed'];

        if (!nextStatus) {
            const currentIndex = statusOrder.indexOf(currStatus);
            const nextIndex = currentIndex + 1;
            if (nextIndex < statusOrder.length) {
                nextStatus = statusOrder[nextIndex];
            }
        }

        const taskIndex = tasks[currStatus].findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            const currTask = tasks[currStatus][taskIndex];
            deleteTask(taskId, currStatus);
            tasks[nextStatus].push(currTask);
            saveToLS();
            reloadFromLS();
        }
    }

    // Handle form submission
    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const toCompleted = taskStatusCheckbox.checked;
        addTask(taskInput.value, toCompleted);
    });

    // Sort tasks
    function sortTasks(status, condition) {
        tasks[status].sort((task_a, task_b) => {
            return condition === 'asc' ?
                task_a.text.localeCompare(task_b.text) :
                task_b.text.localeCompare(task_a.text);
        });

        saveToLS();
        reloadFromLS();
    }

    // Add click listeners to sort buttons
    sortButtons.forEach(button => {
        button.addEventListener('click', function () {
            const status = button.dataset.status;
            const condition = button.dataset.condition;
            sortTasks(status, condition);
        });
    });

    // Initial load of tasks from local storage
    reloadFromLS();
});
