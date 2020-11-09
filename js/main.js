function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const products = [
    {
        name: "Lays",
        price: 7.5,
    },
    {
        name: "Simba",
        price: 7
    },
    {
        name: "Doritos",
        price: 8
    },
    {
        name: "Snickers",
        price: 5
    }
];
const coins = [
    0.5,
    1,
    2,
    5
];
let moneyInput = 0;
let selectedProduct = null;
function renderMoneyAdded() {
    $("#money-added").text(`Money Added: R ${moneyInput.toFixed(2)}`);
}
function renderSelectedProduct() {
    const productText = selectedProduct != null ? selectedProduct.name : "None";
    const productPrice = selectedProduct != null ? selectedProduct.price.toFixed(2) : 0;
    $("#product-chosen").text(`Product Chosen: ${productText}`);
    $("#product-price").text(`Product Price: R ${productPrice}`);
}
function addCoin(coin) {
    moneyInput += coin;
    renderMoneyAdded();
}
function setProduct(name, price) {
    selectedProduct = {
        name,
        price
    };
    renderSelectedProduct();
}
function purchase() {
    let change = moneyInput;
    if (selectedProduct) {
        change = moneyInput - selectedProduct.price
        if (change < 0) {
            alert("Insufficient funds for purchase. Add more money");
            return;
        }
        $("#purchased").text(`Purchased: ${selectedProduct.name}`);
        selectedProduct = null;
        renderSelectedProduct();
    }
    moneyInput = 0;
    $("#change").text(`Change: R ${change.toFixed(2)}`);
    renderMoneyAdded();
}
async function getProducts() {
    $("#products").empty();
    $("#products-spinner").show();
    // Simulate time for Request
    await sleep(1000);
    $("#outer-container").css("height", "auto");
    $("#products-spinner").hide();
    products.forEach(element => {
        $("#products").append(`<div class="card col-md-4" onclick="setProduct('${element.name}', ${element.price})">
            <div class="card-body">
                <h4 class="card-title">${element.name}</h4>
                <h4 class="card-text">R ${element.price.toFixed(2)}</h4>
            </div>
        </div>`);
    });
}

async function getCoins() {
    $("#coins").empty();
    $("#coins-spinner").show();
    // Simulate Time for Request
    await sleep(1000);
    $("#outer-container").css("height", "auto");
    $("#coins-spinner").hide();
    coins.forEach(coin => {
        $("#coins").append(`<div class="card col-md-6" onclick="addCoin(${coin})">
            <h5>R ${coin.toFixed(2)}</h5>
        </div>`);
    });
}

function loadData() {
    $("#outer-container").css("height", "");
    getProducts();
    getCoins();
}

renderSelectedProduct();
renderMoneyAdded();
loadData();
