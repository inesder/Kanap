// Récupération de l'ID du produit à afficher à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Appel de l'API pour récupérer les données du produit avec l'ID correspondant
fetch(`http://localhost:3000/api/products/${productId}`)
  .then(response => response.json())
  .then(data => {
    getProducts(data); // Appelle la fonction getProducts avec les données récupérées
  })
  .catch(error => console.error(error));

// Fonction qui affiche les données du produit sur la page
function getProducts(canape){
    const article = canape;
    
    // Récupération des éléments HTML à modifier
    const divImage = document.querySelector(".item__img");
    const divTitle = document.querySelector("#title");
    const spanPrice = document.querySelector("#price");
    const pDescription = document.querySelector("#description");
    const selectColors = document.querySelector('#colors');

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
    article.colors.forEach(color => {
        const option = document.createElement("option");
        option.value = color;
        option.text = color;
        selectColors.appendChild(option);
    });
}
