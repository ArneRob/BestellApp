let firstAttempt = true;


function renderAll(mainFood) {


    getFromLocalStorage();

    if (delivery[0] == true && firstAttempt == true) {
        firstAttempt = false;
        changeToggleOffTooOnMode()
    }

    if (delivery[0] == false && firstAttempt == true) {
        firstAttempt = false;
        changeToggleOnTooOffMode()
    }
    let renderContainer = document.getElementById('offerRenderContainer');
    renderContainer.innerHTML = "";

    for (let foodIndex = 0; foodIndex < mainFood.length; foodIndex++) {

        renderContainer.innerHTML += getOfferContainerTemplate(foodIndex);

    }

    let shopingCartRenderContainer = document.getElementById('shopingCart')


    shopingCartRenderContainer.innerHTML = "";


    for (let shopingIndex = 0; shopingIndex < shopingCart.length; shopingIndex++) {

        shopingCartRenderContainer.innerHTML += getShopingCartTemplate(shopingIndex)

    }
    if (shopingCart.length <= 0) {
        shopingCartRenderContainer.innerHTML += getEmptyShopingCartTemplate();
    }
    if (shopingCart.length > 0) {
        console.log("bild wird gelöscht")
    }
    calculateShopingCartPrice()
}


function saveToLocalStorage() {

    let stringedshopingCart = JSON.stringify(shopingCart)
    let stringedMainFood = JSON.stringify(mainFood);
    let stringedDeliveryStatus = JSON.stringify(delivery)

    localStorage.setItem("delivery", stringedDeliveryStatus)
    localStorage.setItem("shopingCart", stringedshopingCart)
    localStorage.setItem("mainFood", stringedMainFood)

    renderAll(mainFood, shopingCart);

}


function pushToShopingCart(foodIndex) {

    let nameToPush = mainFood[foodIndex].name;
    let priceToPush = mainFood[foodIndex].price;
    let found = false;

    let deliveryNotification = document.getElementById('deliveryNotifitcationID')
    deliveryNotification.classList.add('d_none')
    deliveryNotification.classList.remove('deliveryNotification')


    if (shopingCart.length > 0) {
        for (let index = 0; index < shopingCart.length; index++) {

            if (shopingCart[index].name == nameToPush) {
                found = true;
                shopingCart[index].amount += 1;
                temporaryShopingCart[0].amount = shopingCart[index].amount;
                temporaryShopingCart[0].name = nameToPush;
                temporaryShopingCart[0].price = priceToPush;
                shopingCart.splice(index, 1, temporaryShopingCart[0])
            }
        }
        if (found == false) {

            temporaryShopingCart[0].name = nameToPush;
            temporaryShopingCart[0].price = priceToPush;
            temporaryShopingCart[0].amount = 1;
            shopingCart.push(temporaryShopingCart[0])
        }
    }

    if (shopingCart.length == 0) {



        temporaryShopingCart[0].name = nameToPush;
        temporaryShopingCart[0].price = priceToPush;
        shopingCart.push(temporaryShopingCart[0])



        console.log(shopingCart)
    }
    saveToLocalStorage();

}

function addToShopingItem(shopingIndex) {

    let priceToPush = shopingCart[shopingIndex].price;
    let nameToPush = shopingCart[shopingIndex].name;
    let amountToSubtract = shopingCart[shopingIndex].amount;

    amountToSubtract += 1;

    temporaryShopingCart[0].amount = amountToSubtract;
    temporaryShopingCart[0].name = nameToPush;
    temporaryShopingCart[0].price = priceToPush;
    shopingCart.splice(shopingIndex, 1, temporaryShopingCart[0])
    console.log(shopingCart[shopingIndex].amount);

    saveToLocalStorage();

}

function removeShopingItem(shopingIndex) {
    let priceToPush = shopingCart[shopingIndex].price;
    let nameToPush = shopingCart[shopingIndex].name;
    let amountToSubtract = shopingCart[shopingIndex].amount;

    if (amountToSubtract == 1) {
        shopingItemDelete(shopingIndex)
    }

    if (amountToSubtract > 1) {
        amountToSubtract -= 1;
        temporaryShopingCart[0].amount = amountToSubtract;
        temporaryShopingCart[0].name = nameToPush;
        temporaryShopingCart[0].price = priceToPush;
        shopingCart.splice(shopingIndex, 1, temporaryShopingCart[0])
    }



    saveToLocalStorage();

}

function shopingItemDelete(shopingIndex) {

    shopingCart.splice(shopingIndex, 1)
    temporaryShopingCart[0].amount = 1;
    saveToLocalStorage();
}

function getFromLocalStorage() {

    let stringedMainFood = localStorage.getItem("mainFood")
    let unstringedMainFood = JSON.parse(stringedMainFood);

    let stringedshopingCart = localStorage.getItem("shopingCart")
    let unstringedShopingCart = JSON.parse(stringedshopingCart);

    let stringedDelivery = localStorage.getItem("delivery")
    let unstringedDelivery = JSON.parse(stringedDelivery);

    if (stringedDelivery !== null) {
        delivery = unstringedDelivery
    }

    if (stringedMainFood !== null) {
        mainFood = unstringedMainFood
    }
    if (stringedshopingCart !== null) {
        shopingCart = unstringedShopingCart
    }

}


// ---------------------------------calculate Price----------------------------


function calculateShopingCartPrice() {
    let foodPrice = 0;
    let deliveryPrice = document.getElementById("deliveryPrice").innerHTML;
    let totalPrice = document.getElementById("totalPrice").innerHTML;


    for (let index = 0; index < shopingCart.length; index++) {
        let stringPrice = shopingCart[index].price
        let amount = shopingCart[index].amount
        let unstringedPrice = parseInt(stringPrice)

        foodPrice += unstringedPrice * amount

    }

    document.getElementById("foodPrice").innerHTML = foodPrice + "€";


    let unstringedDeliveryPrice = parseInt(deliveryPrice)
    document.getElementById("totalPrice").innerHTML = foodPrice + unstringedDeliveryPrice + "€"



}


// -----------------------------------shopingCartDeliveryToggle-------------------------------------------



function changeToggleOffTooOnMode() {
    let toggleImgOn = document.getElementById("toggleImgOn");
    let toggleFontOff = document.getElementById("pickUpID");
    let toggleImgOff = document.getElementById("toggleImgOff");
    let toggleFontOn = document.getElementById("deliveryID");
    let deliveryPrice = document.getElementById("deliveryPrice")

    deliveryPrice.innerHTML = 5 + "€";

    toggleFontOff.classList.remove("pickUp")
    toggleFontOn.classList.add("delivery")
    toggleImgOn.classList.remove("d_none")
    toggleImgOff.classList.add("d_none")

    delivery[0] = true

    saveToLocalStorage()
}

function changeToggleOnTooOffMode() {

    let toggleImgOff = document.getElementById("toggleImgOff");
    let toggleFontOn = document.getElementById("deliveryID");
    let toggleImgOn = document.getElementById("toggleImgOn");
    let toggleFontOff = document.getElementById("pickUpID");
    let deliveryPrice = document.getElementById("deliveryPrice")

    deliveryPrice.innerHTML = 0 + "€";

    toggleFontOn.classList.remove("delivery")
    toggleFontOff.classList.add("pickUp")
    toggleImgOff.classList.remove("d_none")
    toggleImgOn.classList.add("d_none")

    delivery[0] = false

    saveToLocalStorage()
}


// ----------------------------------openShoppingCart------------------------------------------------------------


function openShoppingCart() {

    let shopingCart = document.getElementById('shoppingCart');

    shopingCart.classList.toggle('d_noneMedia');
    let bodyChange = document.getElementById('body');
    bodyChange.classList.toggle('overflowHidden');

    let basketButton = document.getElementById("shopingCartButton");
    basketButton.classList.toggle('shopingCartButton');
    basketButton.classList.toggle('d_none');

    let closingTag = document.getElementById('closingTagID')
    closingTag.classList.toggle('d_none')
}

function sendDelivery() {

    if (shopingCart.length >= 1) {
        let deliveryNotification = document.getElementById('deliveryNotifitcationID')
        deliveryNotification.classList.remove('d_none')
        deliveryNotification.classList.add('deliveryNotification')
    }
    shopingCart = [];
    changeToggleOnTooOffMode()
    saveToLocalStorage()
}