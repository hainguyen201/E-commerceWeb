// singin-singup
var loginComponent = document.getElementsByClassName("content login")[0];
var signupComponent = document.getElementsByClassName("content signup")[0];
var opLogin = document.getElementById("op-login");
var opSignup = document.getElementById("op-signup");
var title = document.querySelector("#notif h2");
var description = document.querySelector("#notif p");
var checkboxMale = document.getElementsByClassName("sex-male")[0];
var checkboxFemale = document.getElementsByClassName("sex-female")[0];
var root = document.getElementById("root");
var modalLoginSignup = document.getElementsByClassName("modal-login-signup")[0];
var iconCloseModal = document.getElementsByClassName("icon-close")[0];

modalLoginSignup.style.visibility = "hidden";

function helloWorld() {
    console.log("Hello world!");
}

function changeContent() {
    if (this.event.target.id == "op-login") {
        loginComponent.style.display = "block";
        signupComponent.style.display = "none";
        opSignup.style.borderBottom = "3px solid #fff";
        opLogin.style.borderBottom = "3px solid #1ba8ff";
        title.innerHTML = "Đăng nhập"
        description.innerHTML = "Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn."
    }
    else {
        loginComponent.style.display = "none";
        signupComponent.style.display = "block";
        opLogin.style.borderBottom = "3px solid #fff";
        opSignup.style.borderBottom = "3px solid #1ba8ff";
        title.innerHTML = "Tạo tài khoản"
        description.innerHTML = "Tạo tài khoản để theo dõi đơn hàng, lưudanh sách sản phẩm yêu thích, nhậnnhiều ưu đãi hấp dẫn."
    }
    //console.log(this.event.target.id); 
}

function openLoginSignupModal() {
    modalLoginSignup.style.visibility = "visible";
    root.style.opacity = 0.2;
}

var listCheckbox = [checkboxMale, checkboxFemale];

onlyCheckOne = (e) => {
    let element = e.target;
    if (element.checked) {
        listCheckbox.forEach((item) => {
            if (item != element) {
                item.checked = false;
            }
        });
    }
}

checkboxMale.addEventListener("change", this.onlyCheckOne);
checkboxFemale.addEventListener("change", (e) => this.onlyCheckOne(e));

window.onclick = function (event) {
    if (event.target == modalLoginSignup) {
        onCloseModal();
    }
}

function onCloseModal() {
    root.style.opacity = 1;
    modalLoginSignup.style.visibility = "hidden";
}
// search bar
const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];


searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
    
});
searchBar.addEventListener('keyup', function(){
    if (searchBar.value.length == 0){
        charactersList.innerHTML = "";
    }
});

const loadCharacters = async () => {
    try {
        const res = await fetch('https://hp-api.herokuapp.com/api/characters');
        hpCharacters = await res.json();
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <img src="${character.image}"></img>
            </li>
        `;
        })
        .join('');
    
    charactersList.innerHTML = htmlString;
};
loadCharacters();
// section
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
// cart
var root2 = document.getElementById("root2");
var modalCart = document.getElementsByClassName("content-section")[0];

modalCart.style.visibility = "hidden";
function openModalCart() {
    modalCart.style.visibility = "visible";
    root2.style.opacity = 0.2;
}
// var closeCart = document.getElementsByClassName("btn-close")[0];
// window.onclick = function (event) {
//     if (event.target == modalCart) {
//         onCloseCart();
//     }
// }

function onCloseCart() {
    root2.style.opacity = 1;
    modalCart.style.visibility = "hidden";
}