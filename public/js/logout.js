
// DOMContentLoaded event, you ensure that your script runs only after the HTML document has been fully parsed
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#logout-btn").addEventListener("click", (e) => {
      e.preventDefault();
      
      fetch("/api/users/logout", {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          location.href = "/login";
        } else {
          alert("trumpet sound");
        }
      }).catch((error) => {
        console.error('Error:', error);
      });
    });
  });
  