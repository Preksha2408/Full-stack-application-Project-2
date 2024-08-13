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
      // event.preventDefault();
      // Process form submission
      // Example: gather form data and send it to the server

      const formData = new FormData(newTaskForm); // TO the project id from url ://grab the url 
      const data = Object.fromEntries(formData.entries());    //To do :The Object here should contain proejct id 
      console.log("Data is being sent to the server:", data);
      let path = window.location.pathname.split("/");
      

      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          taskname: data.taskname,
          due_date: data.due_date,
          taskdesc: data.taskdesc,
          projectId: path[path.length -1]
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log("New T: ", data);
        if (data) {
          console.log("Valid Task");
          // Close the modal and handle successful task creation
          newTaskModal.hide();
          addTaskToCalendarCards(data);
        } else {
          alert("Failed to create task. Please try again.");
        }
      })
      .catch(error => console.error("Error:", error));
    });
  }
});


  function addTaskToCalendarCards(task) {
  //  const calendarCards = document.getElementById("calender-cards");
    const calendarCards = document.getElementById("calender");
    console.log("Calendar Ref: ", calendarCards);
    if (calendarCards) {
      // Create a new card element for the task
      
      const taskCard = document.createElement("div");
      taskCard.classList.add("card");
      taskCard.classList.add("my-2");
      taskCard.classList.add("p-2");
      
     // const taskButton = document.createElement("button");
     // taskButton.textContent = task.task_name
     // taskButton.addEventListener('click', `data-id-${task.id}`)

      taskCard.innerHTML = `
        <a href=/api/tasks/${task.id}>
          <h5 class="card-title">${task.task_name}</h5>
          <p class="card-text">Due Date: ${task.task_due}</p>
        </a>
      `;

      //taskButton.appendChild(taskCard);
      console.log("New Task: ", taskCard);
      // Append the new card to the calendar cards container
      calendarCards.appendChild(taskCard);
    }
  }
  

