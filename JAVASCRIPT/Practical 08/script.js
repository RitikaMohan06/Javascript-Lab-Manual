document.getElementById("gymForm").addEventListener("submit", function(e){
  e.preventDefault();

  let name = document.getElementById("fullname").value.trim();
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let contact = document.getElementById("contact").value.trim();
  let email = document.getElementById("email").value.trim();
  let plan = document.getElementById("plan").value;
  let pass = document.getElementById("password").value;
  let confirmPass = document.getElementById("confirmPassword").value;
  let termsChecked = document.getElementById("terms").checked;
  let msg = document.getElementById("message");

  if(name === "" || age === "" || gender === "" || contact === "" || email === "" || plan === "" || pass === "" || confirmPass === ""){
      msg.style.color = "red";
      msg.innerText = "⚠ Please fill all required fields.";
      return;
  }

  if(age < 14 || age > 80){
      msg.style.color = "red";
      msg.innerText = "⚠ Age must be between 14 and 80.";
      return;
  }

  if(contact.length !== 10 || isNaN(contact)){
      msg.style.color = "red";
      msg.innerText = "⚠ Enter a valid 10-digit contact number.";
      return;
  }

  if(pass !== confirmPass){
      msg.style.color = "red";
      msg.innerText = "⚠ Passwords do not match.";
      return;
  }

  if(!termsChecked){
      msg.style.color = "red";
      msg.innerText = "⚠ You must agree to the terms.";
      return;
  }

  msg.style.color = "green";
  msg.innerText = "✅ Registration Successful!";
});

// Highlight field on focus and remove highlight on blur
document.querySelectorAll(".input").forEach(input => {
  input.addEventListener("focus", () => input.style.background="#eef2ff");
  input.addEventListener("blur", () => input.style.background="white");
});

// Show selected plan message (change event)
document.getElementById("plan").addEventListener("change", function(){
  alert("You selected: " + this.value);
});
