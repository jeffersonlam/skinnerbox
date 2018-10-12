"use strict";

// ========
// Globals
// ========
var box = document.getElementById('box');
box.addEventListener('click', clickBox);
var moneyDisplay = document.getElementById('money');
var achievementsList = document.getElementById('achievements-list');
var shopIcon = document.getElementsByClassName('shop-icon')[0];
var shopItemList = document.querySelector('.shop-item-list');
shopIcon.addEventListener('click', clickShopIcon);
var shopItems = [{
  price: 1,
  name: 'Make it Rain $1',
  description: 'A little fun never hurt anyone.'
}, {
  price: 2,
  name: 'Make it Rain $2',
  description: 'Twice the fun.'
}, {
  price: 5,
  name: 'Make it Rain $5',
  description: 'More fun for everyone!'
}, {
  price: 10,
  name: 'Make it Rain $10',
  description: 'You could buy a meal with that.'
}, {
  price: 20,
  name: 'Make it Rain $20',
  description: "That's two meals worth of money."
}];
shopItems = buildShopItems(shopItems);
var buyBtn = document.getElementById('buy-btn');
buyBtn.addEventListener('click', buyItem);
var animation = 'shake';
var counter = 0;
var money = 0;
var achievements = [{
  title: 'A Journey of a Thousand Clicks Starts With a Single Click',
  clicks: 1
}, {
  title: "What's A Skinner Box?",
  clicks: 15
}, {
  title: 'This Is A Skinner Box',
  clicks: 40
}, {
  title: 'The Conditioning Begins',
  clicks: 75
}, {
  title: 'Nothing Beats Watching Numbers Go Up',
  clicks: 150
}, {
  title: "What's The Money For, Anyway?",
  clicks: 225
}, {
  title: "It's Not Too Late To Quit",
  clicks: 300
}, {
  title: "It's A Nice Day Outside",
  clicks: 400
}, {
  title: 'Your Family and Friends Are Worried',
  clicks: 500
}, {
  title: 'Your Pet Needs Food',
  clicks: 600
}, {
  title: 'Have You Eaten Yet?',
  clicks: 700
}, {
  title: "Don't Forget About Your Laundry",
  clicks: 800
}, {
  title: "Maybe It's Time For Bed",
  clicks: 900
}, {
  title: 'The Big 1k',
  clicks: 1000
}, {
  title: "I'm Sorry For Creating This",
  clicks: 1100
}, {
  title: 'What Have I Done?',
  clicks: 1200
}, {
  title: 'Too Late To Turn Back Now',
  clicks: 1300
}, {
  title: 'The Final Stretch',
  clicks: 1400
}, {
  title: 'The End! Thank You For Playing',
  clicks: 1500
}, {
  title: 'No, Really. There Is No Need To Continue',
  clicks: 1600
}, {
  title: "Guess I Can't Stop You",
  clicks: 1700
}, {
  // Don't you dare go for this one
  title: 'A Man Chooses, A Slave Obeys',
  clicks: 10000
}];
achievements = buildAchievementCards(achievements);
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var activeShopItem = shopItems[0];
shopItems[0].html.dispatchEvent(new Event('click')); // ========
// Functions
// ========
// Parses box click

function clickBox(e) {
  counter++;
  money++;
  var el = e.target;
  var newEl = el.cloneNode(true);
  newEl.className = 'box ' + animation;
  newEl.addEventListener('click', clickBox);
  el.parentNode.replaceChild(newEl, el);
  animation = animation == 'shake' ? 'shake2' : 'shake';
  moneyDisplay.innerHTML = money;
  displayPopup('+1', e.clientX, e.clientY, 500);
  checkCounter();
  checkItemPrice();
}

function displayPopup(text, mouseX, mouseY, ms) {
  var popup = document.createElement('div');
  popup.classList.add('popup');
  popup.style.animationDuration = "".concat(ms, "ms");
  popup.style.top = mouseY - 40 + 'px';
  popup.style.left = mouseX - 20 + 'px';
  var textElement = document.createElement('div');
  textElement.innerHTML = text;
  var random = Math.floor(Math.random() * 10) - 5;
  textElement.style.transform = 'rotate(' + random + 'deg) translatex(' + random + 'px)';
  popup.appendChild(textElement);
  document.body.appendChild(popup);
  setTimeout(function () {
    var parent = popup.parentNode;
    parent.removeChild(popup);
  }, ms);
} // Checks counter for achievements criteria


function checkCounter() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = achievements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var achievement = _step.value;

      if (counter == achievement.clicks) {
        displayAchievement(achievement.card);
        return;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
} // Displays and hides achievement


function displayAchievement(achievementCard) {
  achievementsList.appendChild(achievementCard); //Display achievement

  achievementCard.classList.add('popIn');
  wait(5000).then(function () {
    achievementCard.classList.add('popOut');
    return wait(700);
  }).then(function () {
    achievementCard.classList.add('minimizeOut');
    return wait(500);
  }).then(function () {
    achievementCard.parentNode.removeChild(achievementCard);
  });
}

function wait(time) {
  return new Promise(function (res) {
    return setTimeout(function () {
      return res();
    }, time);
  });
} // Builds achievement cards for achievement array


function buildAchievementCards(achievements) {
  achievements.forEach(function (achievement) {
    var container = document.createElement('li');
    container.classList.add('achievement-container');
    container.innerHTML = "\n    <div class=\"achievement-card\">\n      <img src=\"https://placeimg.com/80/80/animals\"/>\n      <div class=\"content\">\n        <h5>Achievement unlocked!</h5>\n        <h4>".concat(achievement.title, "</h4>\n      </div>\n    </div>\n    ");
    achievement.card = container;
  });
  return achievements;
}

function clickShopIcon(e) {
  var shopWrapper = e.target.parentNode;
  shopWrapper.classList.toggle('active');
}

function clickShopItem(e) {
  if (e.target == activeShopItem) {
    return;
  }

  activeShopItem.html.classList.remove('active');
  activeShopItem = shopItems.find(function (item) {
    return item.html == e.target;
  });
  activeShopItem.html.classList.add('active');
  setActiveItem();
  checkItemPrice();
}

function setActiveItem() {
  var name = document.querySelector('.item-name');
  var description = document.querySelector('.item-description');

  if (!activeShopItem) {
    name.textContent = '';
    description.textContent = '';
  } else {
    name.textContent = activeShopItem.name;
    description.textContent = activeShopItem.description;
  }
}

function checkItemPrice() {
  if (!activeShopItem) {
    buyBtn.disabled = true;
    return;
  }

  var price = activeShopItem.price;

  if (price <= money) {
    buyBtn.disabled = false;
  } else {
    buyBtn.disabled = true;
  }
}

function buyItem(e) {
  money -= activeShopItem.price;
  moneyDisplay.innerHTML = money;
  displayPopup("-$".concat(activeShopItem.price), e.clientX, e.clientY, 1000);
  checkCounter();
  checkItemPrice();
  makeItRain(activeShopItem.price);
}

function buildShopItems(shopItems) {
  shopItems.forEach(function (item) {
    var html = document.createElement('li');
    html.classList.add('shop-item');
    html.dataset.price = item.price;
    html.textContent = "$".concat(item.price);
    item.html = html;
    shopItemList.appendChild(html);
    html.addEventListener('click', clickShopItem);
  });
  return shopItems;
} // =======
// Canvas
// =======


var rainingMoney = [];

function makeItRain(num) {
  for (var i = 0; i < num; i++) {
    var rain = {
      text: '💸',
      x: 40 + (Math.random() * window.innerWidth - 40),
      y: -10 - Math.random() * window.innerHeight / 10
    };
    rainingMoney.push(rain);
  }
}

function moveRain() {
  for (var _i = 0; _i < rainingMoney.length; _i++) {
    var rain = rainingMoney[_i];
    ctx.fillText(rain.text, rain.x, rain.y);
    rain.y += 2 + Math.random() * 4;

    if (rain.y > window.innerHeight + 50) {
      rainingMoney.splice(rainingMoney.indexOf(rain), 1);
    }
  }
}

function draw() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  ctx.font = '50px serif';
  moveRain();
  window.requestAnimationFrame(draw);
}

draw();