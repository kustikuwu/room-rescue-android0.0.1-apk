// Переключение экранов
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  
  if (window.updateCoinDisplay) updateCoinDisplay(); // <--- вставка
}

// Кнопки меню
document.getElementById('playButton').addEventListener('click', () => {
  showScreen('levelSelect');
  // Загружаем кнопки уровней после показа экрана
  setTimeout(() => {
    if (typeof loadLevelButtons === 'function') loadLevelButtons();
  }, 100);
});

document.getElementById('settingsButton').addEventListener('click', () => {
  showScreen('settingsMenu');
});

document.getElementById('exitButton').addEventListener('click', () => {
  alert('Спасибо за игру! Чтобы выйти — закройте вкладку.');
});

document.getElementById('backFromSettings').addEventListener('click', () => {
  showScreen('mainMenu');
});

// Показываем главное меню при загрузке страницы
showScreen('mainMenu');
if (window.updateCoinDisplay) updateCoinDisplay();

document.addEventListener('DOMContentLoaded', () => {
  if (window.updateCoinDisplay) updateCoinDisplay();
});
