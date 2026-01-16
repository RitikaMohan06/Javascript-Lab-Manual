const calcBtn = document.getElementById("calcBtn");  // button
const billOutput = document.getElementById("billOutput"); // output area

calcBtn.addEventListener("click", () => {
  let total = 0;
  let summaryText = "";
  const inputs = document.querySelectorAll(".product input");

  // arrays for items and prices
  let selectedItems = [];
  let selectedPrices = [];

  inputs.forEach(input => {
    let { value, dataset } = input;
    let qty = Number(value);
    let price = Number(dataset.price);
    let name = input.parentElement.querySelector("p").innerText.split(" ")[0]; // e.g. Lipstick

    if (qty > 0) {
      let itemTotal = qty * price;
      total += itemTotal;

      // push items into array for each qty
      for (let i = 0; i < qty; i++) {
        selectedItems.push(name);
        selectedPrices.push(price);
      }

      summaryText += `${qty} × ₹${price} = ₹${itemTotal}<br>`;
    }
  });

  // default parameter example
  function formatTotal(amount = 0) {
    return `₹${amount}`;
  }

  if (summaryText === "") {
    billOutput.innerHTML = "No items selected.";
    return;
  }

  // 📌 Apply discounts
  let discount = 0;
  let discountText = "No discount applied";

  if (total >= 2500) {
    discount = total * 0.10; // 10% off
    discountText = "10% Discount Applied";
  } else if (total >= 1000 && total <= 2000) {
    discount = total * 0.05; // 5% off
    discountText = "5% Discount Applied";
  }

  total -= discount;

  // 📌 Find min and max product price from selected items
  let minPrice = Math.min(...selectedPrices);
  let maxPrice = Math.max(...selectedPrices);

  // 📌 Create prettier array display
  let itemsArrayDisplay = `[ ${selectedItems.join(", ")} ]`;

  // Final Bill Output
  billOutput.innerHTML = `
    ${summaryText} 
    <br><b>Items in Cart:</b> <code>${itemsArrayDisplay}</code>
    <br><b>${discountText}: ₹${discount.toFixed(2)}</b>
    <br><b>Minimum Product Price: ₹${minPrice}</b>
    <br><b>Maximum Product Price: ₹${maxPrice}</b>
    <br><b>Total Bill: ${formatTotal(total)}</b>
  `;
});