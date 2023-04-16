// Récupérer les produits du panier depuis le localStorage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Fonction pour récupérer l'index de l'objet correspondant à l'élément sélectionné
function getItemIndex(productId, color) {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].productId === productId && cartItems[i].color === color) {
      return i;
    }
  }
  return -1;
}
// Fonction pour mettre à jour le total des quantités dans l'interface
function updateTotal() {
  // Initialisation du total des quantités
  let totalQuantity = 0;
  let totalPrice = 0;

  // Boucle sur les produits du panier pour mettre à jour le total des quantités et des prix
  cartItems.forEach((item) => {
    // Ajout de la quantité de chaque article au total des quantités
    totalQuantity += item.quantity;
    // Appel à l'API pour récupérer le prix de chaque article
    fetch(`http://localhost:3000/api/products/${item.productId}`)
      .then((response) => response.json())
      .then((product) => {
        const price = product.price;
        // Calcul du prix total de chaque article en multipliant le prix par la quantité
        const itemTotalPrice = price * item.quantity;
        // Ajout du prix total de chaque article au prix total du panier
        totalPrice += itemTotalPrice;
        // Mettre à jour l'affichage du total des quantités dans l'interface
        document.querySelector("#totalPrice").innerText = totalPrice;
        document.querySelector("#totalQuantity").innerText = totalQuantity;
      });
  });

  console.log(totalQuantity);
}

// Boucle sur les produits du panier pour les afficher
cartItems.forEach((item) => {
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

      const quantityText = document.createElement("p");
      quantityText.innerText = `Quantité : ${item.quantity}`;

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
      productQuantity.append(quantityText, inputQuantity);
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
          quantityText.innerText = `Quantité : ${item.quantity}`;
          // Mettre à jour le localStorage avec la nouvelle quantité
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          // Mettre à jour le total des quantités affiché dans l'interface
          updateTotal();
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

        // Mettre à jour le total des quantités affiché dans l'interface
        updateTotal();
      });
    })
    .catch((error) => console.error(error));
});

updateTotal();
console.log(localStorage);

//formulaire

// Sélectionner le formulaire
const form = document.querySelector(".cart__order__form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêcher le formulaire de se soumettre normalement
  // Récupérer les données du formulaire
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const address = document.querySelector("#address").value;
  const city = document.querySelector("#city").value;
  const email = document.querySelector("#email").value;

  //créer un nouveau tableau contenant uniquement les ID de produit de chaque élément du panier
  const productIds = cartItems.map((item) => item.productId);

  // Créer l'objet de contact
  const contact = {
    firstName,
    lastName,
    address,
    city,
    email,
  };
  // Créer l'objet de commande
  const order = {
    contact,
    products: productIds,
    orderId:
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15),
  };
  // Envoyer la requête POST à l'API
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data && data.orderId) {
        // Rediriger vers la page de confirmation avec le numéro de commande en paramètre de requête
        window.location.href = `./confirmation.html?orderId=${data.orderId}`;
      } else {
        // Afficher un message d'erreur si la réponse ne contient pas de numéro de commande
        alert(
          "Une erreur s'est produite lors de l'enregistrement de la commande."
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

// création des regex
const regexLetters = /^[a-zA-ZÀ-ÿ\s']+$/;
const regexAddress = /^[a-zA-ZÀ-ÿ\s\d']+$/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function validateInput(input, errorMsg, regex) {
  input.addEventListener("blur", function () {
    if (regex.test(input.value)) {
      errorMsg.innerText = ""; // Effacer le message d'erreur si l'input est valide
    } else {
      if (input.id === "address") {
        errorMsg.innerText =
          "Le champ ne peux que contenir des lettres, des chiffres et des espaces."; // Message d'erreur pour l'adresse
      } else if (input.id === "email") {
        errorMsg.innerText = "Le champ doit être une adresse email valide."; // Message d'erreur pour l'email
      } else {
        errorMsg.innerText = "Le champ ne doit contenir que des lettres."; // Message d'erreur par défaut
      }
    }
  });
}

const firstNameInput = document.querySelector("#firstName");
const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
validateInput(firstNameInput, firstNameErrorMsg, regexLetters);

const lastNameInput = document.querySelector("#lastName");
const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
validateInput(lastNameInput, lastNameErrorMsg, regexLetters);

const addressInput = document.querySelector("#address");
const addressErrorMsg = document.querySelector("#addressErrorMsg");
validateInput(addressInput, addressErrorMsg, regexAddress);

const cityInput = document.querySelector("#city");
const cityErrorMsg = document.querySelector("#cityErrorMsg");
validateInput(cityInput, cityErrorMsg, regexLetters);

const emailInput = document.querySelector("#email");
const emailErrorMsg = document.querySelector("#emailErrorMsg");
validateInput(emailInput, emailErrorMsg, regexEmail);
