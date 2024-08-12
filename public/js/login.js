document.querySelector("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const loginObj = {
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value,
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
    if (res.ok) {
      console.log("Login successful, redirecting to homepage");
      location.reload ();
    } else {
      res.json().then(data => console.log(data));
      alert("login failed. Please Try again");
    }
  }).catch((error) => {
    console.error("Error during login:", error);
  })
});
console.log("login.js");