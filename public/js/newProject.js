document.addEventListener("DOMContentLoaded", () => {
    const newProjectButton = document.getElementById("new-project");
  
    if (newProjectButton) {
      newProjectButton.addEventListener("click", () => {
        const newProjectModal = new bootstrap.Modal(document.getElementById('newProjectModal'));
        newProjectModal.show();
      });
    }
  });