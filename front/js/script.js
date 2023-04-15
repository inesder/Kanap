// Envoie une requête à l'API pour récupérer la liste des produits
fetch("http://localhost:3000/api/products")
  .then((response) => response.json()) // Convertit la réponse en JSON
  .then((data) => {
    displayProducts(data); // Appelle la fonction displayProducts avec les données récupérées
  })
  .catch((error) => console.error(error)); // Gère les erreurs

// Fonction qui crée un élément HTML avec des attributs
function displayProducts(canapes) {
  // Pour chaque article dans la liste des produits
  for (let i = 0; i < canapes.length; i++) {
    const article = canapes[i];

    // Sélectionne la section où les produits seront affichés
    const sectionItems = document.querySelector(".items");

    // Crée un élément <article> pour chaque produit
    const articleElement = document.createElement("article");

    // Crée un lien vers la page produit correspondante
    const linkElement = document.createElement("a");
    linkElement.href = `./product.html?id=${article._id}`;

    // Crée une balise <img> pour l'image du produit
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    imageElement.alt = article.altTxt;

    // Crée un titre <h3> pour le nom du produit
    const nameElement = document.createElement("h3");
    nameElement.innerText = article.name;

    // Crée une balise <p> pour la description du produit
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description;

    // Ajoute le lien à l'article, puis l'article à la section
    sectionItems.appendChild(linkElement);
    linkElement.appendChild(articleElement);

    // Ajoute l'image, le titre et la description à l'article
    articleElement.appendChild(imageElement);
    articleElement.appendChild(nameElement);
    articleElement.appendChild(descriptionElement);
  }
}
