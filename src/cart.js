let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem('data')) || [];

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

let totalPrice = () => {
    let total = basket.reduce((sum, item) => {
        let product = shopItemData.find((x) => x.id === item.id);
        return sum + product.price * item.item;
    }, 0);
    document.getElementById('totalPrice').innerText = `$${total.toFixed(2)}`;
};

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        shoppingCart.innerHTML = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItemData.find((y) => y.id === id) || [];
                return `
                <div class="cart-item">
                    <img width="100" src="${search.img}" alt="" />
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${search.name}</p>
                                <p class="prices">$${search.price}</p>
                            </h4>
                            <i onclick="removeItem('${id}')" class="bi bi-x-lg"></i>
                        </div>
                        <div class="cart-buttons">
                            <div class="increase-decrease">
                                <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                                <p id="${id}-amount">${item}</p>
                                <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            })
            .join(" ");
        totalPrice();
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to Home</button>
        </a>
        `;
    }
};

generateCartItems();

let increment = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search !== undefined) {
        search.item += 1;
        localStorage.setItem('data', JSON.stringify(basket));
        generateCartItems();
        calculation();
    }
};

let decrement = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search && search.item > 0) {
        search.item -= 1;
        if (search.item === 0) {
            basket = basket.filter((x) => x.id !== id);
        }
        localStorage.setItem('data', JSON.stringify(basket));
        generateCartItems();
        calculation();
    }
};
let removeItem = (id) => {
    console.log(`Removing item with id: ${id}`);
    basket = basket.filter((x) => x.id !== id);  
    localStorage.setItem('data', JSON.stringify(basket));  
    console.log(`Updated basket after removal: ${JSON.stringify(basket)}`);
    generateCartItems();  
    totalPrice();  
    calculation();  
};
