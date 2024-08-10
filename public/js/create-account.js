document.addEventListener("DOMContentLoaded", () => {
  const createAccountForm = document.getElementById("create-account-form");
  
  createAccountForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const email = document.getElementById('new-email').value;
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
      if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
      }
     
      fetch('/api/users/create-account', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              // If account creation is successful, redirect to the login page
              window.location.href = "/login";
            } else {
              alert(data.message);
            }
          })
          .catch(error => console.error('Error:', error));  

    
    window.location.href = "/login";
  });
});
