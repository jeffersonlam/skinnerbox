// ========
// Globals
// ========
const box = document.getElementById('box');
box.addEventListener('click', clickBox);
const moneyDisplay = document.getElementById('money');
const achievementsList = document.getElementById('achievements-list');
const shopIcon = document.getElementsByClassName('shop-icon')[0];
const shopItemList = document.querySelector('.shop-item-list');
shopIcon.addEventListener('click', clickShopIcon);
let shopItems = [
  {
    price: 1,
    name: 'Make it Rain $1',
    description: 'A little fun never hurt anyone.',
  },
  {
    price: 2,
    name: 'Make it Rain $2',
    description: 'Twice the fun.',
  },
  {
    price: 5,
    name: 'Make it Rain $5',
    description: 'More fun for everyone!',
  },
  {
    price: 10,
    name: 'Make it Rain $10',
    description: 'You could buy a meal with that.',
  },
  {
    price: 20,
    name: 'Make it Rain $20',
    description: "That's two meals worth of money.",
  },
];
shopItems = buildShopItems(shopItems);
const buyBtn = document.getElementById('buy-btn');
buyBtn.addEventListener('click', buyItem);
let animation = 'shake';
let counter = 0;
let money = 0;
let achievements = [
  {
    title: 'A Journey of a Thousand Clicks Starts With a Single Click',
    clicks: 1,
  },
  {
    title: "What's A Skinner Box?",
    clicks: 15,
  },
  {
    title: 'This Is A Skinner Box',
    clicks: 40,
  },
  {
    title: 'The Conditioning Begins',
    clicks: 75,
  },
  {
    title: 'Nothing Beats Watching Numbers Go Up',
    clicks: 150,
  },
  {
    title: "What's The Money For, Anyway?",
    clicks: 225,
  },
  {
    title: "It's Not Too Late To Quit",
    clicks: 300,
  },
  {
    title: "It's A Nice Day Outside",
    clicks: 400,
  },
  {
    title: 'Your Family and Friends Are Worried',
    clicks: 500,
  },
  {
    title: 'Your Pet Needs Food',
    clicks: 600,
  },
  {
    title: 'Have You Eaten Yet?',
    clicks: 700,
  },
  {
    title: "Don't Forget About Your Laundry",
    clicks: 800,
  },
  {
    title: "Maybe It's Time For Bed",
    clicks: 900,
  },
  {
    title: 'The Big 1k',
    clicks: 1000,
  },
  {
    title: "I'm Sorry For Creating This",
    clicks: 1100,
  },
  {
    title: 'What Have I Done?',
    clicks: 1200,
  },
  {
    title: 'Too Late To Turn Back Now',
    clicks: 1300,
  },
  {
    title: 'The Final Stretch',
    clicks: 1400,
  },
  {
    title: 'The End! Thank You For Playing',
    clicks: 1500,
  },
  {
    title: 'No, Really. There Is No Need To Continue',
    clicks: 1600,
  },
  {
    title: "Guess I Can't Stop You",
    clicks: 1700,
  },
  {
    // Don't you dare go for this one
    title: 'A Man Chooses, A Slave Obeys',
    clicks: 10000,
  },
];
achievements = buildAchievementCards(achievements);

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

activeShopItem = shopItems[0];
shopItems[0].html.dispatchEvent(new Event('click'));

// ========
// Functions
// ========

// Parses box click
function clickBox(e) {
  counter++;
  money++;
  const el = e.target;
  const newEl = el.cloneNode(true);
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
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.style.animationDuration = `${ms}ms`;
  popup.style.top = mouseY - 40 + 'px';
  popup.style.left = mouseX - 20 + 'px';

  const textElement = document.createElement('div');
  textElement.innerHTML = text;
  const random = Math.floor(Math.random() * 10) - 5;
  textElement.style.transform =
    'rotate(' + random + 'deg) translatex(' + random + 'px)';

  popup.appendChild(textElement);
  document.body.appendChild(popup);

  setTimeout(function() {
    const parent = popup.parentNode;
    parent.removeChild(popup);
  }, ms);
}

// Checks counter for achievements criteria
function checkCounter() {
  for (const achievement of achievements) {
    if (counter == achievement.clicks) {
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

  wait(5000)
    .then(() => {
      achievementCard.classList.add('popOut');
      return wait(700);
    })
    .then(() => {
      achievementCard.classList.add('minimizeOut');
      return wait(500);
    })
    .then(() => {
      achievementCard.parentNode.removeChild(achievementCard);
    });
}

function wait(time) {
  return new Promise(res => setTimeout(() => res(), time));
}

// Builds achievement cards for achievement array
function buildAchievementCards(achievements) {
  achievements.forEach(achievement => {
    const container = document.createElement('li');
    container.classList.add('achievement-container');
    container.innerHTML = `
    <div class="achievement-card">
      <img src="https://placeimg.com/80/80/animals"/>
      <div class="content">
        <h5>Achievement unlocked!</h5>
        <h4>${achievement.title}</h4>
      </div>
    </div>
    `;

    achievement.card = container;
  });
  return achievements;
}

function clickShopIcon(e) {
  const shopWrapper = e.target.parentNode;
  shopWrapper.classList.toggle('active');
}

function clickShopItem(e) {
  if (e.target == activeShopItem) {
    return;
  }
  activeShopItem.html.classList.remove('active');
  activeShopItem = shopItems.find(item => item.html == e.target);
  activeShopItem.html.classList.add('active');

  setActiveItem();
  checkItemPrice();
}

function setActiveItem() {
  const name = document.querySelector('.item-name');
  const description = document.querySelector('.item-description');

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

  const price = activeShopItem.price;
  if (price <= money) {
    buyBtn.disabled = false;
  } else {
    buyBtn.disabled = true;
  }
}

function buyItem(e) {
  money -= activeShopItem.price;
  moneyDisplay.innerHTML = money;

  displayPopup(`-$${activeShopItem.price}`, e.clientX, e.clientY, 1000);
  checkCounter();
  checkItemPrice();
  makeItRain(activeShopItem.price);
}

function buildShopItems(shopItems) {
  shopItems.forEach(item => {
    const html = document.createElement('li');
    html.classList.add('shop-item');
    html.dataset.price = item.price;
    html.textContent = `$${item.price}`;
    item.html = html;

    shopItemList.appendChild(html);
    html.addEventListener('click', clickShopItem);
  });

  return shopItems;
}

// =======
// Canvas
// =======
const rainingMoney = [];
ctx.font = '50px serif';

function makeItRain(num) {
  for (let i = 0; i < num; i++) {
    const rain = {
      text: '💸',
      x: 40 + (Math.random() * window.innerWidth - 40),
      y: -10 - (Math.random() * window.innerHeight / 10),
    };

    rainingMoney.push(rain);
  }
}

function moveRain() {
  for (const rain of rainingMoney) {
    ctx.fillText(rain.text, rain.x, rain.y);
    rain.y += 2 + Math.random() * 4;
    if (rain.y > window.innerHeight + 50) {
      rainingMoney.splice(rainingMoney.indexOf(rain), 1);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  moveRain();
  window.requestAnimationFrame(draw);
}
draw();
