document.addEventListener("DOMContentLoaded", () => {
  const cartData = {
    original_total_price: 250000,
    items: [
      {
        id: 49839206859071,
        quantity: 1,
        title: "Asgaard sofa",
        price: 25000000,
        line_price: 25000000,
        final_line_price: 25000000,
        image:
          "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/Asgaardsofa3.png?v=1728384481",
        product_description:
          "The Asgaard sofa offers unparalleled comfort and style with its sleek design and high-quality materials.",
      },
    ],
    currency: "INR",
  };

  function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;

    cartData.items.forEach((item) => {
      const row = document.createElement("tr");
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;

      row.innerHTML = `
                <td><img src="${item.image}" alt="${
        item.title
      } class="product-image"/></td>
                <td class="title">${item.title}</td>
                <td class="price">₹${(item.price / 100).toFixed(2)}</td>
                <td><input type="number" class="quantity" value="${
                  item.quantity
                }" min="1" data-id="${item.id}"></td>
                <td class="subtotal" data-id="${item.id}">Rs. ${(
        itemSubtotal / 100
      ).toFixed(2)}</td>
                <td><button class="delete-btn" data-id="${
                  item.id
                }">🗑️</button></td>
            `;
      cartItemsContainer.appendChild(row);
    });

    //update the cart items in nav bar
    document.getElementById("cart-quantity").textContent =
      cartData.items.length;

    // Update the totals section
    document.getElementById("subtotal").textContent = "Rs " + (subtotal / 100).toFixed(
      2
    );
    document.getElementById("total").textContent = "Rs " + (subtotal / 100).toFixed(2);
  }

  // Event listener for quantity changes
  document.getElementById("cart-items").addEventListener("input", (e) => {
    if (e.target.classList.contains("quantity")) {
      const itemId = e.target.getAttribute("data-id");
      const item = cartData.items.find((item) => item.id == itemId);
      item.quantity = parseInt(e.target.value, 10);
      renderCart();
      //update the cart items in nav bar
      document.getElementById("cart-quantity").textContent = item.quantity;
    }
  });

  // Event listener for delete button (trash icon)
  document.getElementById("cart-items").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const itemId = e.target.getAttribute("data-id");
      itemToDelete = cartData.items.find((item) => item.id == itemId);
      document.getElementById("delete-modal").style.display = "block"; // Show the modal
      console.log("clicked");
    }
  });

  // Close the modal
  document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("delete-modal").style.display = "none";
  });

  // Confirm the deletion
  document.getElementById("confirm-delete").addEventListener("click", () => {
    if (itemToDelete) {
      // Remove the item from the cart
      const itemIndex = cartData.items.findIndex(
        (item) => item.id == itemToDelete.id
      );
      if (itemIndex > -1) {
        cartData.items.splice(itemIndex, 1);
        renderCart();
      }
    }
    document.getElementById("delete-modal").style.display = "none"; // Close the modal
  });

  // Cancel the deletion
  document.getElementById("cancel-delete").addEventListener("click", () => {
    document.getElementById("delete-modal").style.display = "none"; // Close the modal
  });

  renderCart(); // Initial rendering of cart items
});
