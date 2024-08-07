document.querySelector("#login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const loginObj = {
      email: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
    };
  
    fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(loginObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        location.href = "/homepage";
      } else {
        alert("trumpet sound");
      }
    });
  });