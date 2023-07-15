document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskTitleInput = document.getElementById('task-title');
    const taskDescriptionInput = document.getElementById('task-description');
    const createdDateInput = document.getElementById('created-date');
    const taskList = document.getElementById('task-list');
  
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
        <h3>Title: ${title}</h3>
        <p>Description: ${description}</p>
        <small>Created on ${date}</small>
        <button class="delete-button">Delete</button>
      `;
      taskList.appendChild(taskCard);
  
      const deleteButton = taskCard.querySelector('.delete-button');
      deleteButton.addEventListener('click', function() {
        taskCard.remove();
      });
    }
  });
  
  