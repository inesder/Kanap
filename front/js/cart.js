// Récupérer les produits du panier depuis le localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Boucle sur les produits du panier pour les afficher
cartItems.forEach(item => {
  // Récupérer les informations du produit depuis l'API
  fetch(`http://localhost:3000/api/products/${item.productId}`)
    .then(response => response.json())
    .then(product => {

        const cartSection = document.querySelector('#cart__items')
      // Créer les éléments HTML pour afficher les informations du produit
      const productContainer = document.createElement('article');
      productContainer.classList.add('cart__item');
      productContainer.setAttribute('data-color', item.color);
      productContainer.setAttribute('data-id', item.productId);
      

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('cart__item__img')

      const productImage = document.createElement('img');
      productImage.src = product.imageUrl;
      productImage.alt = product.altTxt;

      const productContent = document.createElement('div');
      productContent.classList.add('cart__item__content');

      const productDescription = document.createElement('div');
      productDescription.classList.add('cart__item__content__description');

      const productName = document.createElement('h2');
      productName.innerText = product.name;

      const productColor = document.createElement('p');
      productColor.innerText = `Couleur : ${item.color}`;

      const productPrice = document.createElement('p');
      productPrice.innerText = product.price;

      const productSettings = document.createElement('div');
      productSettings.classList.add('cart__item__content__settings');

      const productQuantity = document.createElement('div');
      productQuantity.classList.add('cart__item__content__settings__quantity');

      const quantity = document.createElement('p');
      quantity.innerText = `Quantité : ${item.quantity}`;

      const inputQuantity = document.createElement('input');
      inputQuantity.classList.add('itemQuantity');
      inputQuantity.setAttribute('type', 'number');
      inputQuantity.setAttribute('name', 'itemQuantity');
      inputQuantity.setAttribute('min', '0');
      inputQuantity.setAttribute('max', '100');
     // inputQuantity.setAttribute('value', '0');

     const settingsDelete = document.createElement('div');
     settingsDelete.classList.add('cart__item__content__settings__delete');

     const productDelete = document.createElement('p');
     productDelete.classList.add('deleteItem');
     productDelete.innerText = "Supprimer"

      // Ajouter les éléments HTML dans le conteneur du produit
      cartSection.appendChild(productContainer);
      productContainer.appendChild(imageContainer);
      imageContainer.appendChild(productImage);
      productContainer.appendChild(productContent);
      productContent.appendChild(productDescription);
      productDescription.appendChild(productName);
      productDescription.appendChild(productPrice);
      productDescription.appendChild(productColor);
      productContent.appendChild(productSettings);
      productSettings.appendChild(productQuantity);
      productQuantity.appendChild(quantity);
      productQuantity.appendChild(inputQuantity);
      productSettings.appendChild(settingsDelete);
      settingsDelete.appendChild(productDelete);
      
    })
    .catch(error => console.error(error));
});