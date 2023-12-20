var prodNameInput = document.getElementById('prodName');
var prodCategoryInput = document.getElementById('prodCategory');
var prodPriceInput = document.getElementById('prodPrice');
var prodDescInput = document.getElementById('prodDesc');

var prodList = [];
if (localStorage.getItem('products')) {
  prodList = JSON.parse(localStorage.getItem('products'));
  displayProducts();
}

function pushProducts() {
  var products = {
    name: prodNameInput.value,
    category: prodCategoryInput.value,
    price: prodPriceInput.value,
    description: prodDescInput.value,
  };

  prodList.push(products);

  console.log(prodList);
  localStorage.setItem('products', JSON.stringify(prodList));
  displayProducts();
}

function displayProducts() {
  var cartona = ``;

  for (var i = 0; i < prodList.length; i++) {
    cartona += `
  <tr>
  <td>${i}</td>
  <td>${prodList[i].name}</td>
  <td>${prodList[i].category}</td>
  <td>${prodList[i].price}</td>
  <td>${prodList[i].description} </td>
  <td><button class="btn btn-danger" onclick="deleteProduct(${i})"> delete</button></td>
  <td><button class="btn btn-warning"  onclick="updateProduct(${i})"> update</button></td>
</tr>
  `;
  }
  document.getElementById('tbody').innerHTML = cartona;
}

function deleteProduct(index) {
  prodList.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(prodList));
  displayProducts();
}

function search(value) {
  var cartona = ``;
  for (var i = 0; i < prodList.length; i++) {
    if (prodList[i].name.toLowerCase().includes(value.toLowerCase())) {
      cartona += `
  <tr>
  <td>${i}</td>
  <td>${prodList[i].name}</td>
  <td>${prodList[i].category}</td>
  <td>${prodList[i].price}</td>
  <td>${prodList[i].description} </td>
  <td><button class="btn btn-danger" onclick="deleteProduct(${i})"> delete</button></td>
  <td><button class="btn btn-warning"  onclick="updateProduct(${i})"> update</button></td>
</tr>
  `;
    }
  }

  document.getElementById('tbody').innerHTML = cartona;
}

// function updateProduct(index) {
//   var products = {
//     name: prodNameInput.value,
//     category: prodCategoryInput.value,
//     price: prodPriceInput.value,
//     description: prodDescInput.value,
//   };

//   prodList.splice(index, 0, products);
//   localStorage.setItem('products', JSON.stringify(prodList));
//   displayProducts();
// }
