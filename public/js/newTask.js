document.addEventListener("DOMContentLoaded", () => {
  const newTaskButton = document.getElementById("new-task");
  const newTaskModal = new bootstrap.Modal(document.getElementById('newTaskModal'));

  if (newTaskButton) {
    newTaskButton.addEventListener("click", () => {
      newTaskModal.show();
    });
  }

  const newTaskForm = document.getElementById("new-task-form");

  if (newTaskForm) {
    newTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // Process form submission
      // Example: gather form data and send it to the server

      const formData = new FormData(newTaskForm);
      const data = Object.fromEntries(formData.entries());

      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Close the modal and handle successful task creation
          newTaskModal.hide();
          addTaskToCalendarCards(data.task);
        } else {
          alert("Failed to create task. Please try again.");
        }
      })
      .catch(error => console.error("Error:", error));
    });
  }

  function addTaskToCalendarCards(task) {
    const calendarCards = document.getElementById("calender-cards");

    if (calendarCards) {
      // Create a new card element for the task
      const taskCard = document.createElement("div");
      taskCard.classList.add("card");
      taskCard.classList.add("my-2");
      taskCard.classList.add("p-2");

      taskCard.innerHTML = `
        <h5 class="card-title">${task.name}</h5>
        <p class="card-text">Due Date: ${task.due_date}</p>
      `;

      // Append the new card to the calendar cards container
      calendarCards.appendChild(taskCard);
    }
  }
});


