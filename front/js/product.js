// Récupération de l'ID du produit à afficher à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Appel de l'API pour récupérer les données du produit avec l'ID correspondant
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    getProducts(data); // Appelle la fonction getProducts avec les données récupérées
  })
  .catch((error) => console.error(error));

// Fonction qui affiche les données du produit sur la page
function getProducts(canape) {
  // Affectation des données de l'API à une variable locale pour plus de clarté
  const article = canape;

  // Récupération des éléments HTML à modifier
  const divImage = document.querySelector(".item__img");
  const divTitle = document.querySelector("#title");
  const spanPrice = document.querySelector("#price");
  const pDescription = document.querySelector("#description");
  const selectColors = document.querySelector("#colors");
  const addToCartButton = document.querySelector("#addToCart");

  // Création d'un élément img pour afficher l'image du produit
  const imageElement = document.createElement("img");
  imageElement.src = article.imageUrl;

  // Modification des éléments HTML avec les données du produit
  divTitle.innerText = article.name;
  spanPrice.innerText = article.price;
  pDescription.innerText = article.description;

  // Affichage de l'image du produit sur la page
  divImage.appendChild(imageElement);

  // Boucle sur les couleurs disponibles pour le produit et création des options pour le menu déroulant
  article.colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.text = color;
    selectColors.appendChild(option);
  });

  // Ajouter un écouteur d'événement sur le bouton "Ajouter au panier"
  addToCartButton.addEventListener("click", () => {
    // Récupérer l'ID du produit
    const productId = article._id;

    // Récupérer la couleur sélectionnée dans le menu déroulant
    const selectedColor = selectColors.value;

    // Récupérer la quantité saisie par l'utilisateur
    const quantity = parseInt(document.querySelector("#quantity").value);

    // Récupérer les produits du panier depuis le localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Rechercher si le produit est déjà présent dans le panier
    const existingProductIndex = cartItems.findIndex(
      (item) => item.productId === productId && item.color === selectedColor
    );

    // Si le produit est déjà présent, mettre à jour la quantité
    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += quantity;
      alert("L'article a bien été ajouté à votre panier");
    }
    // Sinon, ajouter un nouvel objet avec les détails du produit
    else if (quantity > 0 && quantity <= 100 && selectedColor) {
      const item = { productId, quantity, color: selectedColor };
      cartItems.push(item);
      alert("L'article a bien été ajouté à votre panier");
    }
    // Si la quantité ou la couleur est invalide, afficher un message d'erreur
    else {
      alert("Veuillez choisir une quantité entre 0 et 100 et une couleur");
      return;
    }

    // Mettre à jour les produits du panier dans le localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("Produit ajouté au panier:", cartItems);
  });
}
