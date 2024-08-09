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
      const due_date = document.getElementById("due-date-input").value;

      const projectData = {
        projectname: projectname,
        due_date: due_date
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
          location.href = `/homepage?projectname=${encodeURIComponent(projectname)}&due_date=${encodeURIComponent(due_date)}`;
        } else {
          alert("Failed to create project. Please try again.");
        }
      })
      .catch(error => console.error("Error:", error));
    });
  }
});
