/**
 * When the user clicks on the button, close the dropdown menu
 * @param c - the class name of the elements you want to show
 */
filterSelection('all')
function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("product");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("filterButtons");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}


(function () {
    const cartInfo = document.getElementById("cart-info");
    const cart = document.getElementById("cart");
    cartInfo.addEventListener("click", function () {
        cart.classList.toggle("show-cart");
    });
    })();
  
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}
  
function ready() {  
    var addToCartButtons = document.getElementsByClassName("ADD_TO_CART");
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener("click", addToCartClicked);
    }
  
    var quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
  
    /*remove items first part*/
    var removeCartItemButtons = document.getElementsByClassName("btn-danger");
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    /*end*/
  
    document
        .getElementsByClassName("btn-purchase")[0]
        .addEventListener("click", purchaseClicked);
    }
  
  
    function purchaseClicked(){
        alert("Thank you for your purchase");
        var cartItems = document.getElementsByClassName("cart-items")[0];
        while (cartItems.hasChildNodes()){
            cartItems.removeChild(cartItems.firstChild);
        }
        updateCartTotal();
        updateItemsTotal();
    }
  
  
  
    /*remove items second part*/
    function removeCartItem(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
        updateItemsTotal();
    }
    /*end*/
  
  
    function quantityChanged(event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateCartTotal();
        updateItemsTotal();
    }
  
  
  
    function addToCartClicked(event) {
        var button = event.target;
        var product = button.parentElement.parentElement;
        var title = product.getElementsByClassName("product-title")[0].innerText;
        var price = product.getElementsByClassName("product_price")[0].innerText;
        var imageSrc = product.getElementsByClassName("product__image")[0].src;
        addItemToCart(title, price, imageSrc);
    
        updateCartTotal();
        /*missing*/
        updateItemsTotal();
  
    }
  
  
     function addItemToCart(title, price, imageSrc) {
        var cartRow = document.createElement("div");
        cartRow.classList.add("cart-row");
        var cartItems = document.getElementsByClassName("cart-items")[0];
        var cartItemTitles = cartItems.getElementsByClassName("cart-item-title");
        for (var i = 0; i < cartItemTitles.length; i++) {
            if (cartItemTitles[i].innerText == title) {
                alert("This item is already added to the cart");
            return;
            }
        }
        var cartRowContents = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}">
                <span class="cart-item-title">${title}</span>
              </div>
              <span class="cart-price cart-column">${price}</span>
              <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
              </div>`;
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
        cartRow
        .getElementsByClassName("btn-danger")[0]
        .addEventListener("click", removeCartItem);
        cartRow
        .getElementsByClassName("cart-quantity-input")[0]
        .addEventListener("change", quantityChanged);
    }
  
  
   
    function updateCartTotal() {
        var cartItemContainer = document.getElementsByClassName("cart-items")[0];
        var cartRows = cartItemContainer.getElementsByClassName("cart-row");
        var total = 0;
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i];
            var priceElement = cartRow.getElementsByClassName("cart-price")[0];
            var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
            var price = parseFloat(priceElement.innerText.replace("$", ""));
            var quantity = quantityElement.value;
            total = total + price * quantity;
        }
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("cart-total-price")[0].innerText =
        `${total}.000 VND`  ;
    }
  
  
  
    function updateItemsTotal() {
        var cartItemContainer = document.getElementsByClassName("cart-items")[0];
        var cartRows = cartItemContainer.getElementsByClassName("cart-row");
        var total = 0;
        for (let i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i];
            var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
            var quantity = quantityElement.value;
            var total = total + parseInt(quantity);
        }
        document.getElementById("item-count").innerText = total;
    }
  
// $("#Contact_a").click(function(){
//     $('html,body').animate({
//         scrollTop:0
//     }, 1000);
// });