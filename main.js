var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');

var bookmarks = [];
if (localStorage.getItem('website')) {
  bookmarks = JSON.parse(localStorage.getItem('website'));
  displayWebsite();
}

function pushWebSites() {
  var website = {
    name: siteName.value,
    siteURL: siteURL.value,
  };
  if (isUrl(siteURL.value)) {
    bookmarks.push(website);

    console.log(bookmarks);
    localStorage.setItem('website', JSON.stringify(bookmarks));
    displayWebsite();
  }
}

function displayWebsite() {
  var cartona = ``;

  for (var i = 0; i < bookmarks.length; i++) {
    cartona += `
  <tr>
  <td>${i + 1}</td>
  <td>${bookmarks[i].name}</td>
  <td><button class="btn btn-success " onclick="visitWebsite(${i})"> Visit</button></td>
  <td><button class="btn btn-danger"  onclick="deleteWebSite(${i})"> Delete</button></td>
</tr>
  `;
  }
  document.getElementById('tbody').innerHTML = cartona;
}

function deleteWebSite(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem('website', JSON.stringify(bookmarks));
  displayWebsite();
}

function search(value) {
  var cartona = ``;
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].name.toLowerCase().includes(value.toLowerCase())) {
      cartona += `
      <tr>
      <td>${i}</td>
      <td>${bookmarks[i].name}</td>
      <td>${bookmarks[i].siteURL}</td>
    
    
      <td><button class="btn btn-success " onclick="deleteProduct(${i})"> Visit</button></td>
      <td><button class="btn btn-danger"  onclick="updateProduct(${i})"> Delete</button></td>
    </tr>
      `;
    }
  }

  document.getElementById('tbody').innerHTML = cartona;
}

function isUrl(s) {
  var regexp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(s);
}

// function updateProduct(index) {
//   var website = {
//     name: prodNameInput.value,
//     category: prodCategoryInput.value,
//     price: prodPriceInput.value,
//     description: prodDescInput.value,
//   };

//   bookmarks.splice(index, 0, website);
//   localStorage.setItem('website', JSON.stringify(bookmarks));
//   displaywebsite();
// }
