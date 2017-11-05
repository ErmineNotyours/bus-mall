'use strict';
var count = 0; // count of 0 to 25 for the number of rounds to run
var prod1Candidate = 0;
var prod2Candidate = 0;
var prod3Candidate = 0;

function Product(name, img, pick, even, odd, display, select) {
  this.name = name;
  this.img = img;
  this.pick = pick; // True if currently picked in displayed three
  this.even = even; // True if picked in an even round (don't pick it in the next (odd) round)
  this.odd = odd; // True if picked in an odd round (don't pick it in the next (even) round)
  this.display = display; // Number of times product is displayed
  this.select = select; // Number of times product is selected
};

var allProd = [];
allProd[0] = new Product('R2D2 Luggage', 'img/bag.jpg', false, false, false, 0, 0);
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

// Need to check if local storage for store and data exist.  If so, populate those variables.
// From the MDN Using the Web storage API example

if(localStorage.views) {
  var jsonViews = JSON.parse(localStorage.views);
  var jsonClicks = JSON.parse(localStorage.clicks);
  // Populate variables
  for (var i = 0; i < allProd.length; i++) {

    allProd[i].display = jsonViews[i];
    allProd[i].select = jsonClicks[i];
    console.log('localStorage.views is true, allProd.select = ', allProd.select);
  } // next i
} // end if localStorage.views

function pickProduct(pos) {
  var flag = true; // Set to true to enter loop
  while (flag) {
    flag = false; // Set to false to exit loop if nothing sets it to true
    var candProduct = Math.floor(Math.random() * allProd.length); // Pick a random product
    if (allProd[candProduct].pick) { // Already displayed on screen
      flag = true;
    }
    if (pos / 2 == Math.floor(pos / 2)) { // pos is even
      if (allProd[candProduct].odd) { // Product was displayed in the last round
        flag = true;
      }
    } else { // pos is odd
      if (allProd[candProduct].even) { // Product was displayed in last round
        flag = true;
      }
    }
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
  } // next i
  // Pick 3 candidates
  // have to prepeat code manually because img1, img2, img3 are hardcoded in html.
  var candidate = pickProduct (count);
  var name = allProd[candidate].name;
  var imgPath = allProd[candidate].img;
  prod1Candidate = candidate;
  allProd[candidate].display++;
  // do just the image for now
  var s = document.getElementById('img1');
  s.src = imgPath;

  var candidate = pickProduct (count);
  var name = allProd[candidate].name;
  var imgPath = allProd[candidate].img;
  prod2Candidate = candidate;
  allProd[candidate].display++;
  // do just the image for now
  var s = document.getElementById('img2');
  s.src = imgPath;

  var candidate = pickProduct (count);
  var name = allProd[candidate].name;
  var imgPath = allProd[candidate].img;
  prod3Candidate = candidate;
  allProd[candidate].display++;
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
    } // end if
  } // next prod
  pickThree(count);
} // end function pickAll() Added bracket by Amber Kim
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
  if (count >= 25) {
    endResults();
  }
  pickAll();
}

function img2Click() {
  event.preventDefault();
  allProd[prod2Candidate].select++;
  count++;
  if (count >= 25) {
    endResults();
  }
  pickAll();
}

function img3Click() {
  event.preventDefault();
  allProd[prod3Candidate].select++;
  count++;
  if (count >= 25) {
    endResults();
  }
  pickAll();
}

function endResults() {
  // Need to stop event handling here.
  img1.removeEventListener('click', img1Click);
  img2.removeEventListener('click', img2Click);
  img3.removeEventListener('click', img3Click);
  console.log('At top of endResults, allProd.select = ', allProd.select);
  var results = document.getElementById('results');
  // list items and their vote totals here (doesn't work)
  var msg = 'Here\'s how many votes each product got: ';
  var labels = [];
  var data = [];
  var allViews = [];

  for (var i = 0; i < allProd.length; i++) {
    // var liEl = document.createElement('li');
    // liEl.textContent = allProd[i].name;
    // results.appendChild(liEl);
    // liEl.textContent = allProd[i].select;
    // results.appendChild(liEl);
    // msg += allProd[i].name + ', ' + allProd[i].select + ' ';// Need to add carrage return (ASCII 13)
    // // add Chart data
    allViews[i] = allProd[i].display; // Put into array for local storage
    labels[i] = allProd[i].name;
    data[i] = allProd[i].select;
  }
  // var data = [allProd.select];
  // add message (I hope)
  results.textContent = msg;
  var ctx = document.getElementById('chart').getContext('2d');
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of Votes',
        data: data,
        backgroundColor: 'red'
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
  var store = JSON.stringify(allViews);
  localStorage.views = store;
  localStorage.clicks = JSON.stringify(data);
  console.log('At end of endResults, allProd.select = ', allProd.select);
}
// //first two are encoding it or setting it in the database
// JSON.stringify();
// localStorage.setItem();
// //second two steps are retrieving it from the database and turning it back to javascript
// localStorage.getItem();
// JSON.parse();

// var jsonStudent2 = JSON.stringify(Student2);
// jsonStudent2 <enter>
// //should get a string
// //takes two arguments
// localStorage.setItem('key', value);
// //key can be anything we want. the value has to be encoded
// //type in localStorage and inspect Storage
