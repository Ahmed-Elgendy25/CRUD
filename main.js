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
  } else {
    swal(
      `Site Name or Url is not valid:
      🔴Site name must contain at least 3 characters
      🔴Site URL must be a valid one
      `
    );
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
  <td><button class="btn btn-warning"  onclick="updateBtn(${i})">Update</button></td>
</tr>
  `;
  }
  document.getElementById('tbody').innerHTML = cartona;
}

var websiteIndex = 0;

function updateBtn(index) {
  websiteIndex = index;
  var submitBtn = document.getElementById('submit');
  // Return to input again
  siteName.value = bookmarks[index].name;
  siteURL.value = bookmarks[index].siteURL;

  window.scrollTo(0, 0);
  document.getElementById('updateBtn').style.display = 'block';
  document.getElementById('submitBtn').style.display = 'none';
  console.log(index + 1);
}

function updateWebsite() {
  document.getElementById('updateBtn').style.display = 'none';
  document.getElementById('submitBtn').style.display = 'block';
  bookmarks[websiteIndex].name = siteName.value;
  bookmarks[websiteIndex].siteName = siteURL.value;
  localStorage.setItem('website', JSON.stringify(bookmarks));
  displayWebsite();
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
      <td>${i + 1}</td>
      <td>${bookmarks[i].name}</td>
      <td>${bookmarks[i].siteURL}</td>
    
      <td><button class="btn btn-success " onclick="visitWebsite(${i})"> Visit</button></td>
      <td><button class="btn btn-danger"  onclick="deleteWebSite(${i})"> Delete</button></td>
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

function visitWebsite(index) {
  window.open(bookmarks[index].siteURL, '_blank');
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
