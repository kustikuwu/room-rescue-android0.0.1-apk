// === МАГАЗИН ===

// Палитра цветов
const SKIN_COLORS = [
  '#27ae60', '#2980b9', '#c0392b', '#8e44ad',
  '#f39c12', '#1abc9c', '#d35400', '#34495e',
  '#e67e22', '#2ecc71', '#9b59b6', '#16a085',
  '#e74c3c', '#bdc3c7', '#7f8c8d', '#f1c40f'
];

// Переключение вкладок в магазине
document.querySelectorAll('.shop-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    document.querySelectorAll('.shop-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));

    btn.classList.add('active');
    document.querySelector(`.shop-tab[data-tab="${tab}"]`).classList.add('active');
  });
});

// Кнопка "МАГАЗИН"
document.getElementById('shopButton').addEventListener('click', () => {
  showScreen('shopScreen');
  renderColorShop();
});

// Кнопка "НАЗАД" из магазина
document.getElementById('backFromShop').addEventListener('click', () => {
  showScreen('mainMenu');
});

// Отрисовка вкладки с цветами
function renderColorShop() {
  const container = document.getElementById('colorShop');
  container.innerHTML = '';

  const selected = getSelectedSkin();
  const purchased = getPurchasedSkins();
  const coins = getCoins();

  SKIN_COLORS.forEach(color => {
    const item = document.createElement('div');
    item.className = 'shop-item';

    const preview = document.createElement('div');
    preview.className = 'shop-color-preview';
    preview.style.background = color;

    const button = document.createElement('button');

    if (color === selected) {
      button.textContent = 'ВЫБРАНО';
      button.classList.add('selected');
      button.disabled = true;
    } else if (purchased.includes(color)) {
      button.textContent = 'ВЫБРАТЬ';
      button.addEventListener('click', () => {
        setSelectedSkin(color);
        renderColorShop();
      });
    } else {
      button.textContent = 'КУПИТЬ (15)';
      button.disabled = coins < 15;
      button.addEventListener('click', () => {
        if (getCoins() >= 15) {
          addCoins(-15);
          purchaseSkin(color);
          setSelectedSkin(color);
          updateCoinDisplay();
          renderColorShop();
        }
      });
    }

    item.appendChild(preview);
    item.appendChild(button);
    container.appendChild(item);
  });
}
