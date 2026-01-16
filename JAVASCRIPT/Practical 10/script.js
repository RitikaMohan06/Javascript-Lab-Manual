document.getElementById("loadBtn").addEventListener("click", () => {
  fetch("students.json")
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector("#studentTable tbody");
      tbody.innerHTML = ""; // Clear old data if clicked again

      data.forEach(student => {
        let row = `<tr>
          <td>${student.rollno}</td>
          <td>${student.name}</td>
          <td>${student.department}</td>
          <td>${student.semester}</td>
        </tr>`;
        tbody.innerHTML += row;
      });
    })
    .catch(() => {
      alert("Error loading JSON file!");
    });
});
