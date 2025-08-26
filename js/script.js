// Start Dark Mode
let darkMode = document.querySelector("#darkmode");
if (localStorage.getItem("dark") === "done") {
    document.documentElement.classList.add("dark");
    darkMode.classList.add("active");
    darkMode.innerHTML = `
    <i class="fa-solid fa-lightbulb"></i>
    `
}else {
    document.documentElement.classList.remove("dark");
    darkMode.classList.remove("active");
    darkMode.innerHTML = `
    <i class="fa-solid fa-moon"></i>
    `
}
darkMode.onclick = function () {
    document.documentElement.classList.toggle("dark");
    const isContaines = document.documentElement.classList.contains("dark");
    localStorage.setItem("dark", isContaines ? "done" : "notdone");
    darkMode.innerHTML = isContaines ? `<i class="fa-solid fa-lightbulb"></i>` : `<i class="fa-solid fa-moon"></i>`;
    darkMode.classList.toggle("active");
}
// End Dark Mode

// Start Menu List of Links Header at(max-width: 767px)
document.querySelector(".menu_links_icons").onclick = function () {
    document.querySelector(".links").classList.toggle("active");
    const hasActive = document.querySelector(".links").classList.contains("active");
    this.innerHTML = hasActive ? `<i class="fa-solid fa-xmark menu_list"></i>` : `<i class="fa-solid fa-bars menu_list"></i>`;
    this.classList.toggle("active");
    document.querySelectorAll(".links li").forEach((li) => {
        li.addEventListener("click", () => {
            document.querySelector(".links").classList.remove("active");
            document.querySelector(".menu_links_icons").innerHTML = `<i class="fa-solid fa-bars menu_list"></i>`;
            document.querySelector(".menu_links_icons").classList.remove("active");
        })
    })
}
// End Menu List of Links Header at(max-width: 767px)
// Start Scroll To Top
let ScrollToTop = document.querySelector("#Scroll_To_Top");
window.onscroll = function () {
    if (window.scrollY > 1000) {
        ScrollToTop.classList.add("active");
    }else {
        ScrollToTop.classList.remove("active");
    }
}
// End Scroll To Top
function showCart() {
    document.querySelector("#cart_tab").classList.toggle("active");
}

fetch("products.json")
.then((res) => res.json())
.then((data) => {
    const allBtnCarts = document.querySelectorAll(".add_to_cart");

    allBtnCarts.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const btnId = e.target.getAttribute("data-id");
            const productId = data.find(product => Number(product.id) === Number(btnId));

            document.querySelectorAll(`.add_to_cart[data-id="${btnId}"]`).forEach((btn) => {
                btn.classList.add("active");
                btn.textContent = `Item In Cart`;
            });

            addToCart(productId);

            const cartTab = document.querySelector("#cart_tab");
            const closeBtn = document.querySelector(".close_cart");
            if (cartTab && closeBtn) {
                cartTab.classList.add("active");
                closeBtn.onclick = () => cartTab.classList.remove("active");
            }
        });
    });
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const allProductsInCart = document.querySelector("#All_Items_In_Cart");
    const allProductsCheckout = document.querySelector("#All_Items_In_checkout");

    const ProductsDetailsInput = document.querySelector("[name='Product_Details']");
    const ProductsCountInput = document.querySelector("[name='Product_Count']");
    const ProductsPricesInput = document.querySelector("[name='Product_Price']");

    if (allProductsInCart) allProductsInCart.innerHTML = "";
    if (allProductsCheckout) {
        allProductsCheckout.innerHTML = "";
        ProductsDetailsInput.value = "";
        ProductsCountInput.value = "";
        ProductsPricesInput.value = "";
    }
    let cartHTML = "";
    let checkoutHTML = "";
    let itemsCart = "";

    let totalCount = 0;
    let total_price = 0;

    cart.forEach((product, index) => {
        const allPrice = Math.ceil(product.price * product.quantity);
        totalCount += product.quantity;
        total_price += allPrice;
        itemsCart += `${product.name} ---- price: $${allPrice} ---- count: ${product.quantity}\n`;
        const itemHTML = `
            <div class="box">
                <div class="cart_info">
                    <img src="${product.img}" alt="">
                    <div class="info">
                        <h4 class="order_name">${product.name}</h4>
                        <p class="order_price">$${allPrice}</p>
                    </div>
                </div>
                <div class="quaintitys">
                    <button class="decrease_quantity" data-index="${index}">-</button>
                    <span class="items_quaintity">${product.quantity}</span>
                    <button class="increase_quantity" data-index="${index}">+</button>
                    <i class="delete_item fa-solid fa-trash" data-index="${index}"></i>
                </div>
            </div>
        `;

        cartHTML += itemHTML;
        checkoutHTML += itemHTML;
    });

    // تحديث index cart
    if (allProductsInCart) {
        allProductsInCart.innerHTML = cartHTML;
        const countSpan = document.querySelector(".count_items_in_cart");
        const headerCount = document.querySelector(".cart_info_count_header");
        const sumSpan = document.querySelector(".sum_of_quaintity");

        if (countSpan) countSpan.innerHTML = totalCount;
        if (headerCount) headerCount.innerHTML = totalCount;
        if (sumSpan) sumSpan.innerHTML = `$${total_price}`;
    }

    if (allProductsCheckout) {
        allProductsCheckout.innerHTML = checkoutHTML;
        const headerCount = document.querySelector(".cart_info_count_header");
        const countSpan = document.querySelector(".count_items_in_cart");
        const sumSpanCheckout = document.querySelector(".sum_of_quaintity_checkout");
        const allCostsInCheckout = document.querySelector(".AllCost_in_checkout");

        if (headerCount) headerCount.innerHTML = totalCount;
        if (countSpan) countSpan.innerHTML = totalCount;
        if (sumSpanCheckout) sumSpanCheckout.innerHTML = `$${total_price}`;
        if (allCostsInCheckout) allCostsInCheckout.innerHTML = `$${total_price + 20}`
        
        ProductsDetailsInput.value = itemsCart;
        ProductsPricesInput.value = `$${total_price + 20}`;
        ProductsCountInput.value = `${totalCount} Product`;
    }

    // Events index
    if (allProductsInCart) {
        allProductsInCart.onclick = e => handleCartActions(e);
    }

    // Events checkout
    if (allProductsCheckout) {
        allProductsCheckout.onclick = e => handleCartActions(e);
    }
}

function handleCartActions(e) {
    if (e.target.classList.contains("increase_quantity")) {
        increaseQuantity(e.target.dataset.index);
    } else if (e.target.classList.contains("decrease_quantity")) {
        decreaseQuantity(e.target.dataset.index);
    } else if (e.target.closest(".delete_item")) {
        const index = e.target.closest(".delete_item").dataset.index;
        removeFromCart(index);
    }
}

function increaseQuantity (index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function decreaseQuantity (index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const removedProduct = cart.splice(index, 1)[0];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    updateButtonsState(removedProduct.id);
}

function updateButtonsState (productId) {
    const btns = document.querySelectorAll(`.add_to_cart[data-id="${productId}"]`);
    btns.forEach((btn) => {
        btn.classList.remove("active");
        btn.textContent = "Add To Cart";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateCart();
});

// End allProducts Json