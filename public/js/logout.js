const logout = async () => {
  try {
    console.log("logout");
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok) {
    document.location.replace('/')}
    else {
    alert(response.statusText);}
  } catch (error) {
    console.error(error);
  }
};

$("#logout-btn").on("click", logout);

console.log("logout.js");






// // DOMContentLoaded event, you ensure that your script runs only after the HTML document has been fully parsed
// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelector("#logout-btn").addEventListener("click", (e) => {
//     e.preventDefault();
    
//     fetch("/api/users/", {
//       method: "DELETE",
//       cache: "no-cache",
//     }).then((res) => {
//       if (res.ok) {
//         location.href = "/login";
//       } else {
//         alert("Could'nt log out ");
//       }
//     }).catch((error) => {
//       console.error('Error:', error);
//     });
//   });
// });
