fetch("products.json")
.then((resolve) => resolve.json())
.then((data) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const allProducts = document.querySelector("#allProductsInSwiper");
    data.forEach((product) => {
        const isContaine = cart.some(cartProduct => cartProduct.id === product.id)
        allProducts.innerHTML += `
        <div class="swiper-slide box">
            <img src="${product.img}" alt="${product.name.split(" ").slice(0, 1).join("")}">
            <h2>${product.name}</h2>
            <h4 class="price">$${product.price}</h4>
            <button class="add_to_cart ${isContaine ? ` active` : ""}" data-id="${product.id}">${isContaine ? "Item In Cart" : "Add To Cart"}</button>
        </div>
        `
    });
})
