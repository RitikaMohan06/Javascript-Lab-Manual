const calcBtn = document.getElementById("calcBtn");  // button
const billOutput = document.getElementById("billOutput"); // output area


calcBtn.addEventListener("click", () => {
  var total = 0;          // using var
  let summaryText = "";   // using let
  const inputs = document.querySelectorAll(".product input"); // using const

  inputs.forEach(input => {
    // destructuring example
    let { value, dataset } = input;   
    let qty = Number(value);          // quantity entered by user
    let price = Number(dataset.price); // price taken from data-price

    if (qty > 0) {
      let itemTotal = qty * price;
      total += itemTotal;

      // template literals used here
      summaryText += `${qty} × ₹${price} = ₹${itemTotal}<br>`;
    }
  });

  // default parameter example
  function formatTotal(amount = 0) {
    return `₹${amount}`;
  }

  if (summaryText === "") {
    billOutput.innerHTML = "No items selected.";
  } else {
    billOutput.innerHTML = summaryText + "<br><b>Total Bill: " + formatTotal(total) + "</b>";
  }
});