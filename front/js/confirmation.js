const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

orderNumber = document.querySelector("#orderId");
console.log(orderId)
orderNumber.innerText = orderId