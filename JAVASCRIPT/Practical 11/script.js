const schedule = [
  { period: 1, subject: "Maths", start: "09:00", end: "10:00" },
  { period: 2, subject: "CSE Theory", start: "10:00", end: "11:00" },
  { period: 3, subject: "DBMS Lab", start: "11:00", end: "12:30" },
  { period: 4, subject: "Break", start: "12:30", end: "01:00" },
  { period: 5, subject: "AI", start: "01:00", end: "02:00" }
];

const tbody = document.querySelector("#scheduleTable tbody");

// Load schedule into table
schedule.forEach(s => {
  tbody.innerHTML += `
    <tr>
      <td>${s.period}</td>
      <td>${s.subject}</td>
      <td>${s.start}</td>
      <td>${s.end}</td>
    </tr>
  `;
});

function getTimeInMinutes(time) {
  let [h, m] = time.split(":");
  return (parseInt(h) * 60) + parseInt(m);
}

function updatePeriod() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  let currentPeriod = "No ongoing class";
  let nextStart = null;

  document.querySelectorAll("tbody tr").forEach(tr => tr.classList.remove("active"));

  schedule.forEach((p, index) => {
    let start = getTimeInMinutes(p.start);
    let end = getTimeInMinutes(p.end);

    if (currentMinutes >= start && currentMinutes < end) {
      currentPeriod = p.subject;
      document.querySelectorAll("tbody tr")[index].classList.add("active");
      nextStart = end;
    } else if (nextStart === null && currentMinutes < start) {
      nextStart = start;
    }
  });

  document.getElementById("currentPeriod").innerText = `Current Period: ${currentPeriod}`;

  if (nextStart) {
    let diff = nextStart - currentMinutes;
    let h = String(Math.floor(diff / 60)).padStart(2, "0");
    let m = String(diff % 60).padStart(2, "0");
    document.getElementById("countdown").innerText = `Next in: ${h}:${m}:00`;
  } else {
    document.getElementById("countdown").innerText = "School Day Finished ✅";
  }
}

// Update every second
setInterval(updatePeriod, 1000);

// Alerts when each period starts
schedule.forEach(p => {
  let now = new Date();
  let currentMinutes = now.getHours() * 60 + now.getMinutes();
  let start = getTimeInMinutes(p.start);
  let delay = (start - currentMinutes) * 60000;
  if (delay > 0) {
    setTimeout(() => alert(`${p.subject} period is starting now!`), delay);
  }
});
