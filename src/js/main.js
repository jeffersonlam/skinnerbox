// ========
// Globals
// ========
var box = document.getElementById('box');
box.addEventListener('click', clickBox);
var moneyDisplay = document.getElementById('money');
var achievementsList = document.getElementById('achievements-list');
/*var shopIcon = document.getElementsByClassName('shop-icon')[0];
shopIcon.addEventListener('click', clickShopIcon);
var catalogItems = document.getElementsByClassName('catalog-item');
for (var i = 0; i < catalogItems.length; i++) {
  catalogItems[i].addEventListener('click', clickCatalogItem);
}
var buyBtn = document.getElementById('buy-btn');
buyBtn.addEventListener('click', buyItem);*/
var animation = 'shake';
var counter = 0;
var money = 0;
var achievements = [
/*  {
    title: 'An achievement',
    clicks: 1
  },
  {
    title: 'An achievement',
    clicks: 3
  },
  {
    title: 'An achievement',
    clicks: 5
  },*/
  {
    title: 'What\'s A Skinner Box?',
    clicks: 10
  },
  {
    title: 'The Conditioning Begins',
    clicks: 75},
  {
    title: 'Nothing Beats Watching Numbers Go Up',
    clicks: 150
  },
  {
    title: 'What\'s The Money For, Anyway?',
    clicks: 225
  },
  {
    title: 'It\'s Not Too Late To Quit',
    clicks: 300
  },
  {
    title: 'It\'s A Nice Day Outside',
    clicks: 400
  },
  {
    title: 'Your Friends And Family Are Worried',
    clicks: 500
  },
  {
    title: 'Your Pet Needs Food',
    clicks: 600
  },
  {
    title: 'Have You Eaten Yet?',
    clicks: 700
  },
  {
    title: 'Don\'t Forget About Your Laundry',
    clicks: 800
  },
  {
    title: 'Maybe It\'s Time For Bed',
    clicks: 900
  },
  {
    title: 'The Big 1k',
    clicks: 1000
  },
  {
    title: 'I\'m Sorry For Creating This',
    clicks: 1100
  },
  {
    title: 'What Have I Done?',
    clicks: 1200
  },
  {
    title: 'Too Late To Turn Back Now',
    clicks: 1300
  },
  {
    title: 'The Final Stretch',
    clicks: 1400
  },
  {
    title: 'The End! Thank You For Playing',
    clicks: 1500
  },
  {
    title: 'No, Really. There Is No Need To Continue',
    clicks: 1600
  },
  {
    title: 'Guess I Can\'t Stop You',
    clicks: 1700
  },
  {
    // Don't you dare go for this one
    title: 'A Man Chooses, A Slave Obeys',
    clicks: 10000
  }
];
achievements = buildAchievementCards(achievements);

// ========
// Functions
// ========

// Parses box click
function clickBox(evt) {
  counter++;
  money++;
  var el = evt.target;
  var newEl = el.cloneNode(true);
  newEl.className = "box " + animation;
  newEl.addEventListener('click', clickBox);
  el.parentNode.replaceChild(newEl, el);
  animation = (animation == 'shake' ? 'shake2' : 'shake');
  moneyDisplay.innerHTML = money;

  displayPopup(evt.clientX, evt.clientY);

  checkCounter();
//  checkSelectedShopItem();
}

function displayPopup(mouseX, mouseY) {
  var popup = document.createElement('div');
  popup.classList.add('popup');
  popup.style.top = mouseY - 40 + "px";
  popup.style.left = mouseX - 20 + "px";

  var text = document.createElement('div');
  text.innerHTML = "+1";
  var random = Math.floor(Math.random() * 10) - 5;
  text.style.transform = "rotate(" + random + "deg) translatex(" + random + "px)";

  popup.appendChild(text);
  document.body.appendChild(popup);

  setTimeout(function() {
    var parent = popup.parentNode;
    parent.removeChild(popup);
  }, 500)
}

// Checks counter for achievements criteria
function checkCounter() {
  for (var i = 0; i < achievements.length; i++) {
    if (counter == achievements[i].clicks)
       displayAchievement(achievements[i].card);
  }
}

// Displays and hides achievement
function displayAchievement(achievementCard) {
  achievementsList.appendChild(achievementCard);

  //Display achievement
  achievementCard.classList.add('popIn');

  //Hide achievement
  setTimeout(function() {
    achievementCard.classList.remove('popIn');
    achievementCard.classList.add('popOut');

    // Minimize achievement
    setTimeout(function() {
      achievementCard.classList.remove('popOut');
      achievementCard.classList.add('minimizeOut');

      //Remove achievement node
      setTimeout(function() {
        var parent = achievementCard.parentNode;
        parent.removeChild(achievementCard);
      }, 1000);
    }, 600);
  }, 6000);
}

// Builds achievement cards for achievement array
function buildAchievementCards(achievements) {
  for (var i = 0; i < achievements.length; i++) {
    var card = buildCard(achievements[i].title);
    achievements[i].card = card;
  }
  return achievements;
};

// Creates HTML for achievement card
function buildCard(title) {
  var card = document.createElement('li');
  card.classList.add('achievement-card');
  var content = document.createElement('div');
  content.classList.add('content');
  var heading = document.createElement('h5');
  heading.innerHTML = "Achievement unlocked!";
  var body = document.createElement('h4');
  body.innerHTML = title;
  var img = document.createElement('img');
  img.src = 'http://lorempixel.com/75/75/animals/?' + Math.floor(Math.random() * 1000);

  content.appendChild(img);
  content.appendChild(heading);
  content.appendChild(body);
  card.appendChild(content);

  return card;
}

function clickShopIcon(evt) {
  var el = evt.target;
  var shopWrapper = el.parentNode;
  shopWrapper.classList.toggle('active');
}

function clickCatalogItem(evt) {
  var el = evt.target;
  if (el.classList.contains('active')) return;
  var catalogWrapper = el.parentNode;
  for (var i = 0; i < catalogWrapper.children.length; i++) {
    catalogWrapper.children[i].classList.remove('active');
  }
  el.classList.add('active');

  checkSelectedShopItem();
}

function checkSelectedShopItem() {
  var active = null;
  for (var i = 0; i < catalogItems.length; i++) {
    if (catalogItems[i].classList.contains('active'))
      active = catalogItems[i];
  }

  var price = active.dataset.price;
  if (price <= money) {
    buyBtn.disabled = false;
  } else {
    buyBtn.disabled = true;
  }
}

function buyItem() {
  for (var i = 0; i < catalogItems.length; i++) {
    if (catalogItems[i].classList.contains('active'))
      active = catalogItems[i];
  }
  console.log('Thatll be $' + active.dataset.price);
  money -= active.dataset.price;
  moneyDisplay.innerHTML = money;

  checkCounter();
  checkSelectedShopItem();
}
