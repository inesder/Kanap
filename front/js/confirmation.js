const urlParams = new URLSearchParams(window.location.search);
// récupérer le numéro de commande dans l'url
const orderId = urlParams.get("orderId");

// sélectionner l'élément html et y ajouter le numéro de commande
orderNumber = document.querySelector("#orderId");
orderNumber.innerText = orderId;
