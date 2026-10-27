// Listing the prodicts with its details and all 
var products = [
    {id: 1, name: "Headphones", price: 999, category: "Electronics"},
    {id: 2, name: "Smart Watch", price: 1499, category: "Electronics"},
    {id: 3, name: "T-Shirt", price: 499, category: "Clothing"},
    {id: 4, name: "Shoes", price: 1299, category: "Clothing"},
    {id: 5, name: "Bag", price: 799, category: "Accessories"}
];

var cart = [];
var discount = 0;
      // Show products based on category, search and sort
function showProducts() {
    var box = document.getElementById("products");
    var category = document.getElementById("category").value;
    var search = document.getElementById("search").value.toLowerCase();
    var sort = document.getElementById("sort").value;

    var list = [];

    for (var i = 0; i < products.length; i++) {
        if ((category == "All" || products[i].category == category) &&
            products[i].name.toLowerCase().includes(search)) {
            list.push(products[i]);
        }
    }

    if (sort == "low") {
        list.sort(function(a, b) {
            return a.price - b.price;
        });
    }

    if (sort == "high") {
        list.sort(function(a, b) {
            return b.price - a.price;
        });
    }

    box.innerHTML = "";

    for (var i = 0; i < list.length; i++) {
        box.innerHTML += `
            <div class="product">
                <h3>${list[i].name}</h3>
                <p>Category: ${list[i].category}</p>
                <p>Price: ₹${list[i].price}</p>
                <button onclick="addCart(${list[i].id})">
                    Add to Cart
                </button>
            </div>
        `;
    }

    if (list.length == 0) {
        box.innerHTML = "<p>No products found</p>";
    }
}

// Adding the  products to cart
function addCart(id) {
    var found = false;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart[i].quantity++;
            found = true;
        }
    }

    if (found == false) {
        for (var i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                cart.push({
                    id: products[i].id,
                    name: products[i].name,
                    price: products[i].price,
                    quantity: 1
                });
            }
        }
    }

    showCart();
}

// Removing the  product from the cart
function removeCart(id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart.splice(i, 1);
            break;
        }
    }

    showCart();
}

// Change the quantity
function changeQty(id, amount) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart[i].quantity += amount;

            if (cart[i].quantity <= 0) {
                cart.splice(i, 1);
            }

            break;
        }
    }

    showCart();
}

// Show the cart and calculate the total
function showCart() {
    var box = document.getElementById("cart");
    var subtotal = 0;
    var count = 0;

    box.innerHTML = "";

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];

        subtotal += item.price * item.quantity;
        count += item.quantity;

        box.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: ₹${item.price * item.quantity}</p>
                </div>

                <button onclick="changeQty(${item.id}, 1)">+</button>
                <button onclick="changeQty(${item.id}, -1)">-</button>
                <button class="remove" onclick="removeCart(${item.id})">
                    Remove
                </button>
            </div>
        `;
    }

    if (cart.length == 0) {
        box.innerHTML = "<p>Your cart is empty</p>";
    }

    document.getElementById("cart-count").innerText = count;

    var saved = 0;

    if (discount == 10) {
        saved = subtotal * 10 / 100;
    }

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("discount").innerText = saved.toFixed(2);
    document.getElementById("total").innerText = (subtotal - saved).toFixed(2);
}

// For applying the coupon
function applyCoupon() {
    var code = document.getElementById("coupon").value.toUpperCase();

    if (cart.length == 0) {
        discount = 0;
        document.getElementById("coupon-message").innerText =
            "Add products to your cart first";
    } else if (code == "SAVE10") {
        discount = 10;
        document.getElementById("coupon-message").innerText =
            "10% discount applied";
    } else {
        discount = 0;
        document.getElementById("coupon-message").innerText =
            "Invalid coupon code";
    }

    showCart();
}

// Product filtering and sorting :- 
document.getElementById("search").addEventListener("input", showProducts);
document.getElementById("category").addEventListener("change", showProducts);
document.getElementById("sort").addEventListener("change", showProducts);

// For the checkout purpose 
document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length == 0) {
        document.getElementById("order-message").innerText =
            "Your cart is empty";
    } else {
        var name = document.getElementById("customer-name").value;
        var total = document.getElementById("total").innerText;

        document.getElementById("order-message").innerText =
            "Thank you " + name + "! Your order total is ₹" + total;

        cart = [];
        discount = 0;

        document.getElementById("coupon").value = "";
        document.getElementById("coupon-message").innerText = "";

        showCart();
        document.getElementById("checkout-form").reset();
    }
});

// For starting the website
showProducts();
showCart();
