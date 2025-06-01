function loadLevelButtons() {
  const maxUnlocked = localStorage.getItem('maxLevelUnlocked') 
    ? parseInt(localStorage.getItem('maxLevelUnlocked')) 
    : 1;
  
  const container = document.getElementById('levelButtons');
  container.innerHTML = '';
  
  for (let i = 1; i <= 5; i++) {
    const btn = document.createElement('button');
    btn.textContent = `Уровень ${i}`;
    btn.disabled = i > maxUnlocked;
    btn.addEventListener('click', () => startLevel(i));
    container.appendChild(btn);
  }
}

function startLevel(level) {
  showScreen('gameScreen');
  
  // Загружаем уровень через 100мс (даем время для отображения экрана)
  setTimeout(() => {
    if (typeof window.loadLevel === 'function') {
      window.loadLevel(level);
    }
    
  }, 150);
}

// Обработка кнопки "Назад" в игровом экране
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('backFromGame').addEventListener('click', () => {
    if (window.stopGame) window.stopGame();
    document.getElementById('levelCompleteMessage').style.display = 'none';
    showScreen('levelSelect');
    loadLevelButtons(); // Добавленная строка
  });
});

// Обработка кнопки "Назад" из выбора уровней
document.getElementById('backFromLevels').addEventListener('click', () => {
  showScreen('mainMenu');
});

// Обработка кнопки "Продолжить" после завершения уровня
document.getElementById('continueButton').addEventListener('click', () => {
  document.getElementById('levelCompleteMessage').style.display = 'none';
  if (window.stopGame) window.stopGame();
  showScreen('levelSelect');
});
