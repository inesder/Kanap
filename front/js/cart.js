// Récupérer les produits du panier depuis le localStorage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Fonction pour récupérer l'index de l'objet correspondant à l'élément sélectionné
function getItemIndex(productId, color) {
  for (let i = 0; i < cartItems.length; i++) {
    if (
      cartItems[i].productId === productId &&
      cartItems[i].color === color
    ) {
      return i;
    }
  }
  return -1;
}

// Boucle sur les produits du panier pour les afficher
cartItems.forEach(async (item) => {
  // Récupérer les informations du produit depuis l'API
  fetch(`http://localhost:3000/api/products/${item.productId}`)
    .then((response) => response.json())
    .then((product) => {
      const cartSection = document.querySelector("#cart__items");
      // Créer les éléments HTML pour afficher les informations du produit
      const productContainer = document.createElement("article");
      productContainer.classList.add("cart__item");
      productContainer.dataset.color = item.color;
      productContainer.dataset.id = item.productId;
      productContainer.dataset.index = cartItems.indexOf(item);

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("cart__item__img");

      const productImage = document.createElement("img");
      productImage.src = product.imageUrl;
      productImage.alt = product.altTxt;

      const productContent = document.createElement("div");
      productContent.classList.add("cart__item__content");

      const productDescription = document.createElement("div");
      productDescription.classList.add("cart__item__content__description");

      const productName = document.createElement("h2");
      productName.innerText = product.name;

      const productColor = document.createElement("p");
      productColor.innerText = `Couleur : ${item.color}`;

      const productPrice = document.createElement("p");
      productPrice.innerText = product.price;

      const productSettings = document.createElement("div");
      productSettings.classList.add("cart__item__content__settings");

      const productQuantity = document.createElement("div");
      productQuantity.classList.add("cart__item__content__settings__quantity");

      const quantity = document.createElement("p");
      quantity.innerText = `Quantité : ${item.quantity}`;

      const inputQuantity = document.createElement("input");
      inputQuantity.classList.add("itemQuantity");
      inputQuantity.setAttribute("type", "number");
      inputQuantity.setAttribute("name", "itemQuantity");
      inputQuantity.setAttribute("min", "0");
      inputQuantity.setAttribute("max", "100");
      inputQuantity.setAttribute("value", "0");

      const settingsDelete = document.createElement("div");
      settingsDelete.classList.add("cart__item__content__settings__delete");

      const productDelete = document.createElement("p");
      productDelete.classList.add("deleteItem");
      productDelete.innerText = "Supprimer";

      // Ajouter les éléments HTML dans le conteneur du produit
      cartSection.appendChild(productContainer);
      productContainer.append(imageContainer, productContent);
      imageContainer.appendChild(productImage);
      productContent.append(productDescription, productSettings);
      productDescription.append(productName, productPrice, productColor);
      productSettings.append(productQuantity, settingsDelete);
      productQuantity.append(quantity, inputQuantity);
      settingsDelete.appendChild(productDelete);

      // Ajout d'un événement pour détecter le changement de valeur de l'input
      inputQuantity.addEventListener("change", function () {
        // Trouver l'élément cart__item parent de l'input
        const cartItem = inputQuantity.closest(".cart__item");

        // Récupérer l'index de l'objet item associé à l'élément cart__item
        const itemIndex = getItemIndex(
          cartItem.dataset.id,
          cartItem.dataset.color
        );

        // Récupérer l'objet item associé à l'élément cart__item
        const item = cartItems[itemIndex];

        // Convertir la valeur de l'input en nombre entier avec parseInt()
        let newQuantity = parseInt(inputQuantity.value);

        // Vérifier que la nouvelle quantité est valide
        if (newQuantity >= 0 && newQuantity <= 100) {
          // Ajouter la nouvelle quantité à la quantité déjà présente
          item.quantity = newQuantity;
          // Mettre à jour la quantité affichée dans l'interface
          quantity.innerText = `Quantité : ${item.quantity}`;
          // Mettre à jour le localStorage avec la nouvelle quantité
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } else {
          // Afficher un message d'erreur si la nouvelle quantité n'est pas valide
          alert("La quantité doit être entre 0 et 100");
        }
      });

      // Ajout d'un événement pour détecter le click sur le bouton supprimer
      productDelete.addEventListener("click", function () {
        // Trouver l'élément cart__item parent de l'input
        const cartItem = productDelete.closest(".cart__item");

        // Récupérer l'index de l'objet item associé à l'élément cart__item
        const itemIndex = getItemIndex(
          cartItem.dataset.id,
          cartItem.dataset.color
        );

        // Supprimer l'objet item associé à l'élément cart__item
        cartItems.splice(itemIndex, 1);

        // Mettre à jour le localStorage avec la nouvelle quantité
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        cartSection.removeChild(cartItem);
      });

      
    })
    .catch((error) => console.error(error));
});
