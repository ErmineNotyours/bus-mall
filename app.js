'use strict';
var count = 0; // count of 0 to 25 for the number of rounds to run
var prod1Candidate = 0;
var prod2Candidate = 0;
var prod3Candidate = 0;

function Product(name, img, pick, even, odd, display, select) {
  this.name = name;
  this.img = img;
  this.pick = pick;
  this.even = even;
  this.odd = odd;
  this.display = display;
  this.select = select;
};

var allProd = [];
allProd[0] = new Product('Bag', 'img/bag.jpg', false, false, false, 0, 0);
allProd[1] = new Product('Banana', 'img/banana.jpg', false, false, false, 0, 0);
allProd[2] = new Product('Bathroom', 'img/bathroom.jpg', false, false, false, 0, 0);
allProd[3] = new Product('Boots', 'img/boots.jpg', false, false, false, 0, 0);
allProd[4] = new Product('Breakfast Maker', 'img/breakfast.jpg', false, false, false, 0, 0);
allProd[5] = new Product('Meatball Bubblegum', 'img/bubblegum.jpg', false, false, false, 0, 0);
allProd[6] = new Product('Chair', 'img/chair.jpg', false, false, false, 0, 0);
allProd[7] = new Product('Cthulhu', 'img/cthulhu.jpg', false, false, false, 0, 0);
allProd[8] = new Product('Dog Duck', 'img/dog-duck.jpg', false, false, false, 0, 0);
allProd[9] = new Product('Dragon', 'img/dragon.jpg', false, false, false, 0, 0);
allProd[10] = new Product('Pen', 'img/pen.jpg', false, false, false, 0, 0);
allProd[11] = new Product('Pet Sweeper', 'img/pet-sweep.jpg', false, false, false, 0, 0);
allProd[12] = new Product('Scissors', 'img/scissors.jpg', false, false, false, 0, 0);
allProd[13] = new Product('Shark Sleeping Bag', 'img/shark.jpg', false, false, false, 0, 0);
allProd[14] = new Product('Baby Sweeper', 'img/sweep.png', false, false, false, 0, 0);
allProd[15] = new Product('Tauntaun Sleeping Bag', 'img/tauntaun.jpg', false, false, false, 0, 0);
allProd[16] = new Product('Unicorn Meat', 'img/unicorn.jpg', false, false, false, 0, 0);
allProd[17] = new Product('USB Tentacle', 'img/usb.gif', false, false, false, 0, 0);
allProd[18] = new Product('Perpetual Motion Water Can', 'img/water-can.jpg', false, false, false, 0, 0);
allProd[19] = new Product('Wine Glass', 'img/wine-glass.jpg', false, false, false, 0, 0);

function pickProduct(pos) {
  var flag = true;
  while (flag) {
    flag = false;
    var candProduct = Math.floor(Math.random() * allProd.length);
    // console.log('This should repeat if a candidate is rejected. candProduct = ', candProduct);
    // console.log('allProd[candProduct].pick', allProd[candProduct].pick);
    if (allProd[candProduct].pick) {
      flag = true;
      // console.log('On pick, flag = true');
    }
    if (pos / 2 == Math.floor(pos / 2)) { // pos is even
      // console.log('Pos is even, pos = ', pos);
      if (allProd[candProduct].odd) { // Product was picked in the last round
        flag = true;
        // console.log('On odd, flag = true');
      }
    } else { // pos is odd
      // console.log('Pos is odd, pos = ', pos);
      if (allProd[candProduct].even) { // Product was picked in last round
        flag = true;
        // console.log('On even, flag = true');
      }
    }
    // console.log('At bottom of while flag, flag = ', flag);
  } //wend flag
  // Picked a sucessful candidate.  Now set the Booleans of this object for the next round and pick of three
  allProd[candProduct].pick = true;
  if (pos / 2 == Math.floor(pos / 2)) { // pos is even
    allProd[candProduct].even = true;
  } else { // pos is odd
    allProd[candProduct].odd = true;
  }
  return(candProduct);
}

function pickThree(count) {
  for (var i = 0; i < allProd.length; i++) { // reset Product.pick
    allProd[i].pick = false;
  }
  // Pick 3 candidates
  // have to prepeat code manually because img1, img2, img3 are hardcoded in html.
  var candidate = pickProduct (count);
  var name = allProd[candidate].name;
  var imgPath = allProd[candidate].img;
  prod1Candidate = candidate;
  allProd[candidate].display++;
  console.log('name = ', name);
  // do just the image for now
  var s = document.getElementById('img1');
  s.src = imgPath;

  var candidate = pickProduct (count);
  var name = allProd[candidate].name;
  var imgPath = allProd[candidate].img;
  prod2Candidate = candidate;
  allProd[candidate].display++;
  console.log('name = ', name);
  // do just the image for now
  var s = document.getElementById('img2');
  s.src = imgPath;

  var candidate = pickProduct (count);
  var name = allProd[candidate].name;
  var imgPath = allProd[candidate].img;
  prod3Candidate = candidate;
  allProd[candidate].display++;
  console.log('name = ', name);
  // do just the image for now
  var s = document.getElementById('img3');
  s.src = imgPath;

}

function pickAll() {
  console.log('count = ', count);
  var results = document.getElementById('results');
  results.textContent = ('There are ' + (25 - count) + ' more rounds to pick.');
  // reset Booleans for products two counts old
  for (var prod = 0; prod < allProd.length; prod++) {
    if (count / 2 == Math.floor(count / 2)) { // count is even
      allProd[prod].even = false;
    } else { // count is odd
      allProd[prod].odd = false;
    } // next prod
  pickThree(count);
}
pickAll();

var img1 = document.getElementById('img1');
var img2 = document.getElementById('img2');
var img3 = document.getElementById('img3');

img1.addEventListener('click', img1Click);
img2.addEventListener('click', img2Click);
img3.addEventListener('click', img3Click);

function img1Click() {
  event.preventDefault();
  allProd[prod1Candidate].select++;
  count++;
  if (count > 25) {
    endResults();
  }
  pickAll();
}

function img2Click() {
  event.preventDefault();
  allProd[prod2Candidate].select++;
  count++;
  if (count > 25) {
    endResults();
  }
  pickAll();
}

function img3Click() {
  event.preventDefault();
  allProd[prod3Candidate].select++;
  count++;
  if (count > 25) {
    endResults();
  }
  pickAll();
}

function endResults() {
  var results = document.getElementById('results');
  // list items and their vote totals here
  var msg = '<p>Here\'s how many votes each product got: </p>';
  for (var i = 0; i < allProd.length; i++) {
    msg += '<p>' + allProd[i].name + ', ' + allProd[i].select + '</p>';
  }
  // add message
  results.p = msg;
}
