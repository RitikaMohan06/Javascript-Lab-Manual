// Restore Theme from Local Storage
if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark");
}

// Theme Switch Button Event
document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Save current theme in localStorage
  if(document.body.classList.contains("dark")){
    localStorage.setItem("theme", "dark");
  } 
  else {
    localStorage.setItem("theme", "light");
  }
});

// Save Name in Session Storage
document.getElementById("saveName").addEventListener("click", () => {
  let user = document.getElementById("username").value.trim();

  if(user === ""){
    alert("Enter your name first!");
    return;
  }

  sessionStorage.setItem("username", user);
  showWelcome();
});

// Show welcome message if user exists in session storage
function showWelcome(){
  let user = sessionStorage.getItem("username");
  if(user){
    document.getElementById("welcomeMsg").innerText = `Welcome, ${user}! 👋`;
  }
}

showWelcome();
