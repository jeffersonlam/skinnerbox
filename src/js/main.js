// ========
// Globals
// ========
const box = document.getElementById('box');
box.addEventListener('click', clickBox);
const moneyDisplay = document.getElementById('money');
const achievementsList = document.getElementById('achievements-list');
const shopIcon = document.getElementsByClassName('shop-icon')[0];
shopIcon.addEventListener('click', clickShopIcon);
const catalogItems = document.getElementsByClassName('catalog-item');
[...catalogItems].forEach(item => {
  item.addEventListener('click', clickCatalogItem);
});
const buyBtn = document.getElementById('buy-btn');
buyBtn.addEventListener('click', buyItem);
let activeShopItem = null;
let animation = 'shake';
let counter = 0;
let money = 0;
let achievements = [
  {
    title: 'What\'s A Skinner Box?',
    clicks: 10
  },
  {
    title: 'The Conditioning Begins',
    clicks: 75
  },
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
function clickBox(e) {
  counter++;
  money++;
  const el = e.target;
  const newEl = el.cloneNode(true);
  newEl.className = "box " + animation;
  newEl.addEventListener('click', clickBox);
  el.parentNode.replaceChild(newEl, el);
  animation = (animation == 'shake' ? 'shake2' : 'shake');
  moneyDisplay.innerHTML = money;

  displayPopup(e.clientX, e.clientY);

  checkCounter();
  checkItemPrice();
}

function displayPopup(mouseX, mouseY) {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.style.top = mouseY - 40 + "px";
  popup.style.left = mouseX - 20 + "px";

  const text = document.createElement('div');
  text.innerHTML = "+1";
  const random = Math.floor(Math.random() * 10) - 5;
  text.style.transform = "rotate(" + random + "deg) translatex(" + random + "px)";

  popup.appendChild(text);
  document.body.appendChild(popup);

  setTimeout(function() {
    const parent = popup.parentNode;
    parent.removeChild(popup);
  }, 500)
}

// Checks counter for achievements criteria
function checkCounter() {
  for (const achievement of achievements) {
    if (counter == achievement.clicks){
      displayAchievement(achievement.card);
      return;
    }
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
        const parent = achievementCard.parentNode;
        parent.removeChild(achievementCard);
      }, 1000);
    }, 600);
  }, 6000);
}

// Builds achievement cards for achievement array
function buildAchievementCards(achievements) {
  achievements.forEach(achievement => {
    achievement.card = buildCard(achievement.title);
  });
  return achievements;
}

// Creates HTML for achievement card
function buildCard(title) {
  const card = document.createElement('li');
  card.classList.add('achievement-card');
  const content = document.createElement('div');
  content.classList.add('content');
  const heading = document.createElement('h5');
  heading.innerHTML = "Achievement unlocked!";
  const body = document.createElement('h4');
  body.innerHTML = title;
  const img = document.createElement('img');
  img.src = 'http://lorempixel.com/75/75/animals/?' + Math.floor(Math.random() * 1000);

  content.appendChild(img);
  content.appendChild(heading);
  content.appendChild(body);
  card.appendChild(content);

  return card;
}

function clickShopIcon(e) {
  const shopWrapper = e.target.parentNode;
  shopWrapper.classList.toggle('active');
}

function clickCatalogItem(e) {
  if (activeShopItem) activeShopItem.classList.remove('active');
  if (e.target == activeShopItem) {
    activeShopItem = null;
  } else {
    activeShopItem = e.target;
    activeShopItem.classList.add('active');
  }

  checkItemPrice();
}

function checkItemPrice() {
  if (!activeShopItem) return;

  const price = activeShopItem.dataset.price;
  if (price <= money) {
    buyBtn.disabled = false;
  } else {
    buyBtn.disabled = true;
  }
}

function buyItem() {
  console.log('Thatll be $' + activeShopItem.dataset.price);
  money -= activeShopItem.dataset.price;
  moneyDisplay.innerHTML = money;

  checkCounter();
  checkItemPrice();
}
