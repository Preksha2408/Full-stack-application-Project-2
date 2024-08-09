document.querySelector("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const loginObj = {
    username: document.querySelector("#new-username").value,
    password: document.querySelector("#new-password").value,
  };
  
  console.log("Here is the loginObj",loginObj);
  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(loginObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log("Response for login-form",res);
    console.log("Status:", res.status); // Log status code
    console.log("Status Text:", res.statusText); // Log status text
    if (res.ok) {
      console.log("Login successful, redirecting to homepage");
      location.href = "/homepage";
    } else {
      res.json().then(data => console.log(data));
      alert("login failed. Please Try again");
    }
  }).catch((error) => {
    console.error("Error during login:", error);
  })
});