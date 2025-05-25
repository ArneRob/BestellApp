function getOfferContainerTemplate(foodIndex) {
    return `
                <div class="offerContainer" onclick="pushToShopingCart(${foodIndex})">
                    <div class="offerDescription">
                        <h3>${mainFood[foodIndex].name}</h3>
                        <p>${mainFood[foodIndex].description}</p>
                        <p>${mainFood[foodIndex].price}</p>
                    </div>
                    <img src="./assets/icons/add_24dp_FF7F00_FILL0_wght600_GRAD0_opsz24.png" alt="">
                </div>
            `
}

function getShopingCartTemplate(shopingIndex) {
    return `
            <h3 class="pizzaName">${shopingCart[shopingIndex].name}</h3>
                    <div class="foodControl">
                      <div class="amountContainer">
                        <img class="plusMinus" onclick="removeShopingItem(${shopingIndex},)" src="./assets/icons/remove_24dp_FF7F00_FILL0_wght600_GRAD0_opsz24.png"
                            alt="">
                        <p>${shopingCart[shopingIndex].amount}x</p>
                        <img class="plusMinus"  onclick="addToShopingItem(${shopingIndex})" src="./assets/icons/add_24dp_FF7F00_FILL0_wght600_GRAD0_opsz24.png"
                            alt="">
                       </div>      
                        <p>${shopingCart[shopingIndex].price}</p>
                        <img onclick="shopingItemDelete(${shopingIndex})" src="./assets/icons/delete.png" alt="">
                    </div>
           `
}


function getEmptyShopingCartTemplate() {
    return `
            <div class="emptyShopingCart">
                <p>Füge Etwas Hinzu</p>
                <img src="./assets/icons/shopping_cart_checkout_80dp_FF7F00_FILL0_wght500_GRAD0_opsz48.png" alt="">
            </div>  
            `
}