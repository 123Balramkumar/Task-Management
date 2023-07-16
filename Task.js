document.addEventListener('DOMContentLoaded', function() {
  const taskForm = document.getElementById('task-form');
  const taskTitleInput = document.getElementById('task-title');
  const taskDescriptionInput = document.getElementById('task-description');
  const createdDateInput = document.getElementById('created-date');
  const taskList = document.getElementById('task-list');
  const noTasks = document.getElementById('noTasks');
  const filterOptions = document.getElementById('filter-options');

  taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const taskTitle = taskTitleInput.value;
    const taskDescription = taskDescriptionInput.value;
    const createdDate = createdDateInput.value;

    if (taskTitle.trim() !== '' && taskDescription.trim() !== '' && createdDate !== '') {
      createTaskCard(taskTitle, taskDescription, createdDate);
      taskTitleInput.value = '';
      taskDescriptionInput.value = '';
      createdDateInput.value = '';
    }
  });

  function createTaskCard(title, description, date) {
    const taskCard = document.createElement('li');
    taskCard.className = 'task-card';
    taskCard.innerHTML = `
      <div class="mainTaskListContainer">
        <h3>Title: ${title}</h3>
        <p>Description: ${description}</p>
        <p>Created on ${date}</p>
        <div class="checkbox">
          <input type="checkbox" class="checkbox" id="checkbox-${Date.now()}">
          <label for="checkbox-${Date.now()}">Completed</label>
        </div>
        <button class="delete-button">Delete</button>
      </div>
    `;
    taskList.appendChild(taskCard);

    var task = noTasks.classList.contains('noTasks');
    if (task) {
      noTasks.classList.remove('noTasks');
      noTasks.classList.add('noNone');
    }

    const deleteButton = taskCard.querySelector('.delete-button');
    deleteButton.addEventListener('click', function() {
      taskCard.remove();
      checkEmptyTaskList();
    });

    const checkbox = taskCard.querySelector('.checkbox');
    checkbox.addEventListener('change', function() {
      taskCard.classList.toggle('completed');
      checkEmptyTaskList();
    });
  }

  function checkEmptyTaskList() {
    const tasks = document.querySelectorAll('.task-card');
    if (tasks.length === 0) {
      noTasks.classList.remove('noNone');
      noTasks.classList.add('noTasks');
    }
  }

  filterOptions.addEventListener('change', function() {
    const filterValue = filterOptions.value;
    const tasks = document.querySelectorAll('.task-card');
    tasks.forEach(function(task) {
      if (filterValue === 'completed' && !task.classList.contains('completed')) {
        task.style.display = 'none';
      } else if (filterValue === 'incomplete' && task.classList.contains('completed')) {
        task.style.display = 'none';
      } else {
        task.style.display = 'flex';
      }
    });
  });
});
