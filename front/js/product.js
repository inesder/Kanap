const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch(`http://localhost:3000/api/products/${productId}`)
  .then(response => response.json())
  .then(data => {
    getProducts(data); // Appelle la fonction displayProducts avec les données récupérées
  })
  .catch(error => console.error(error));

  function getProducts(canape){
    const article = canape;
    const divImage = document.querySelector(".item__img");
    const divTitle = document.querySelector("#title");
    const spanPrice = document.querySelector("#price");
    const pDescription = document.querySelector("#description");
    const selectColors = document.querySelector('#colors');

    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;

    divTitle.innerText = article.name;
    spanPrice.innerText = article.price;
    pDescription.innerText = article.description;

    divImage.appendChild(imageElement);

    article.colors.forEach(color => {
        const option = document.createElement("option");
        option.value = color;
        option.text = color;
        selectColors.appendChild(option);
      });

  }