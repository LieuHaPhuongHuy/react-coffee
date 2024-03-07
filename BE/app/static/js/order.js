window.addEventListener("load", () => {
    const priceItems = document.querySelectorAll(".price-item")
    const totalPrice = document.querySelector('.total-price')
    const finalPrice = document.querySelector('.final-price')
    let rslt = 0
    for(item of priceItems) {
        let quantity = parseInt(item.previousElementSibling.innerText)
        let price = parseInt(item.innerText)
        let total = price * quantity
        rslt += total
        item.innerText = total.toLocaleString()
    }
    totalPrice.innerText = rslt.toLocaleString()
    finalPrice.innerText = rslt.toLocaleString()
})

function chooseMethod(e){
    const method = document.querySelector(".method")
    method.innerText = e.value

}

function pay() {
   const method = document.getElementsByName("methodID")
   const methodID = [...method].filter(item => item.nextElementSibling.checked).map(checkedItem => checkedItem.value);
   const orders = document.getElementsByClassName("order-item")
   const books = []

   for (order of orders){
        let quantity = order.lastChild.previousElementSibling.previousElementSibling
        let id = quantity.previousElementSibling.value
        books.push({
            "id": parseInt(id),
            "quantity": parseInt(quantity.innerText)
        })
   }

   fetch('/order/add', {
        method: "POST",
        body: JSON.stringify({
            "books": books,
            "method": parseInt(methodID)
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(()=>{
        alert("Đặt hàng thành công")
    })
}