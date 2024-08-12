
document.addEventListener("DOMContentLoaded", () => {
  const newProjectButton = document.getElementById("new-project");

  if (newProjectButton) {
    newProjectButton.addEventListener("click", () => {
      const newProjectModal = new bootstrap.Modal(document.getElementById('newProjectModal'));
      newProjectModal.show();
    });
  }

  const newProjectForm = document.getElementById("new-project-form");

  if (newProjectForm) {
    newProjectForm.addEventListener("submit", (e) => {
      e.preventDefault();


      const projectname = document.getElementById("project-name-input").value;
      const dueDate = document.getElementById("due-date-input").value;
      const due_date = dayjs(dueDate).format('MM-DD-YYYY');
      const userId = document.getElementById("hidden-userId").getAttribute("data-userId")

      // const projectname = document.getElementById("project-name-input").value;
      // const due_date = document.getElementById("due-date-input").value;
      // const userId = document.getElementById("hidden-userId").getAttribute("data-userId");

      const projectData = {
        project_name: projectname,
        due_date: due_date,
        userId: userId,
      };

      // Send the data to the server
      fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(projectData),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Redirect to homepage with the new project details
          location.href = `/projects/${data.data.id}`
        } else {
          alert("Failed to create project. Please try again.");
        }
      })
      .catch(error => console.error("Error:", error));
    });
  }
});
