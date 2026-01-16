document.getElementById("processBtn").addEventListener("click", () => {
  let str = document.getElementById("userString").value;

  if (str.trim() === "") {
    document.getElementById("output").innerHTML = "❌ Please enter a valid string!";
    return;
  }

  // String operations
  let length = str.length;
  let substringValue = str.substring(1, 5); // extracting from index 1 to 4
  let index = str.indexOf("a"); // find first 'a'
  let splitted = str.split(" "); // split into words array
  let replaced = str.replace("a", "@"); // replace first 'a'

  document.getElementById("output").innerHTML = `
    <b>Original String:</b> ${str}<br><br>
    <b>Length:</b> ${length}<br>
    <b>Substring (1 to 5):</b> ${substringValue}<br>
    <b>Index of 'a':</b> ${index}<br>
    <b>Split into Words:</b> [${splitted.join(", ")}]<br>
    <b>Replace 'a' with '@':</b> ${replaced}<br>
  `;
});
