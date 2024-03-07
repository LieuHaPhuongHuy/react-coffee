function calcPrice(obj) {
    let cartItems = document.getElementsByClassName("cart-items")
    let index = [...cartItems].indexOf(obj.parentElement.parentElement)
    let price = parseFloat(obj.parentElement.previousElementSibling.innerText.replace(/\D/g, ''))
    let quantity = parseInt(obj.value)
    let totalItems = price * quantity

    // Update total value for the specific item
    let totalElement = document.getElementsByClassName("total-items")[index]
    totalElement.innerText = totalItems.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
 }

function calcTotal(obj){
    const items = document.getElementsByName("isPay")
    let cartItems = document.getElementsByClassName("cart-items")
    let total = 0
    for (item of items){
        if(item.checked){
            let index = [...cartItems].indexOf(item.parentElement.parentElement)
            let price = parseFloat(item.parentElement.previousElementSibling.innerText.replace(/\D/g, ''))
            total += price
        }
    }
    let totalPrice = document.querySelector('.total-price')
    totalPrice.innerText = total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}



function addOrder() {
    const items = document.getElementsByName("isPay");
    let cartItems = document.getElementsByClassName("cart-items");
    let link = "/order?";
    let params = [];

    for (item of items) {
        if (item.checked) {
            let quantity = parseInt(item.parentElement.previousElementSibling.previousElementSibling.firstElementChild.value);
            let id = parseInt(item.value);
            params.push(`id=${id}&quantity=${quantity}`);
        }
    }

    link += params.join("&");

    window.location.href = link;
}
