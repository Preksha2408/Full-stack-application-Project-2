document.addEventListener("DOMContentLoaded", () => {
    const newTaskForm = document.getElementById("new-task-form");
  
    newTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      // Get form values
      const taskName = document.getElementById("task-name").value;
      const taskDueDate = document.getElementById("task-due-date").value;
      const taskDescription = document.getElementById("task-description").value;
      const projectName = document.getElementById("project-name").value;
  
      // Create a task object
      const newTask = {
        taskName,
        taskDueDate,
        taskDescription,
        projectName
      };
  
      // Save task to local storage
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
  
      // Optionally clear the form and hide the modal
      newTaskForm.reset();
      const modal = document.getElementById("newTaskModal");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    });
  });
  
  