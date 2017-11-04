'use strict';

//Create array to store product objects
var allProducts = [];
var usedImages = [];
var selections = 0;
var data = [];
var productNames = [];

//Create a constructor for the products

function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.numClicked = 0;
  this.numShown = 0;
  this.id = this.name.replace(' ', '').toLowerCase();

  allProducts.push(this);
}

//Create products
new Product('Bag', 'img/bag.jpg');
new Product('Banana', 'img/banana.jpg');
new Product('Bathroom', 'img/bathroom.jpg');
new Product('Boots', 'img/boots.jpg');
new Product('Breakfast', 'img/breakfast.jpg');
new Product('Bugglegum', 'img/bubblegum.jpg');
new Product('Chair', 'img/chair.jpg');
new Product('Cthulu', 'img/cthulhu.jpg');
new Product('Dog Duck', 'img/dog-duck.jpg');
new Product('Dragon', 'img/dragon.jpg');
new Product('Pen', 'img/pen.jpg');
new Product('Pet Sweep', 'img/pet-sweep.jpg');
new Product('Scissors', 'img/scissors.jpg');
new Product('Shark', 'img/shark.jpg');
new Product('Sweep', 'img/sweep.png');
new Product('Tauntaun', 'img/tauntaun.jpg');
new Product('Unicorn', 'img/unicorn.jpg');
new Product('USB', 'img/usb.gif');
new Product('Water Can', 'img/water-can.jpg');
new Product('Wine Glass', 'img/wine-glass.jpg');

//Display 3 randomly selected products to the page

function inArray(num, array) {
  for(var i = 0; i <= array.length; i++) {
    if(num === array[i]) {
      return true;
    }
  }
  return false;
}

// Render 3 images to the user
function getRandImage(array) {
  var num = 0;
  for(var i = 0; i < 3; i++) {
    if(usedImages.length >= array.length) {
      usedImages = [];
    }
    do {
      num = Math.floor(Math.random() * (array.length));
    } while(inArray(num, usedImages));
    usedImages.push(num);

    var pageWrapper = document.getElementById('wrapper');
    var productWrapper = document.createElement('div');
    var productNameContainer = document.createElement('div');
    var productImage = document.createElement('img');
    var productName = document.createElement('h4');

    productWrapper.className = 'card';
    productName.className = 'product-name';
    productName.textContent = array[num].name;
    productNameContainer.className = 'container';
    productImage.src = array[num].filepath;
    productImage.name = array[num].name;
    productImage.className = 'image';
    productImage.id = array[num].id;
    array[num].numShown++;

    productWrapper.appendChild(productImage);
    productNameContainer.appendChild(productName);
    productWrapper.appendChild(productNameContainer);
    pageWrapper.appendChild(productWrapper);
  }
}
getRandImage(allProducts);

//Display results to the page as a list
function getData() {
  for(var i = 0; i < allProducts.length; i++) {
    data.push(allProducts[i].numClicked);
    productNames.push(allProducts[i].name);
  }
}
function createChart () {
  var ctx = document.getElementById('chart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Clicks',
        data: data,
        backgroundColor: 'black'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
//create click handler for images
function handleImageClick(event) {
  if(event.target !== event.currentTarget) {
    var clickedProduct = event.target.id;
    console.log(clickedProduct);
  }
  event.stopPropagation();

  for(var i = 0; i < allProducts.length; i++) {
    if(allProducts[i].id === clickedProduct) {
      allProducts[i].numClicked++;
    }
  }
  var element = document.getElementById('wrapper');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  getRandImage(allProducts);
  selections++;
  if(selections === 25) {
    wrapper.removeEventListener('click', handleImageClick);
    wrapper.remove();
    getData();
    createChart();
    var dataResults = JSON.stringify(allProducts);
    localStorage.setItem('Data', dataResults);
  }
}

var wrapper = document.getElementById('wrapper');
wrapper.addEventListener('click', handleImageClick);

// 'use strict';

// //stringify all the things
// //localStorage.setItem()
// //add all the things to local storage
// //what are all the things in bus mall? votes and names, clicks
// //our stuff in local storage will be in JSON and not only JSON but stringified JSON
//
// var tyler = {
//   name: 'Tyler',
//   instructor: true,
//   favoriteNumber: 6,
//   laughs: function() {
//     alert('hahahaha');
//   }
// };
//
// var arrayChul = ['Rachel', 37, true, 'no-dog'];
//
// var anotherArray = ['random', 9, false, tyler, arrayChul];
//
// var clearLS = document.getElementById('clearStorage');
//
// clearLS.addEventListener('click', function() {
//   console.log('click it!');
//   localStorage.clear();
// });
// //localStorage.getItem();
// var retrieved = localStorage.getItem('awesome');
//
// //unstringify technically called is 'parse'
// var parsed = JSON.parse(retrieved);
