// Используем глобальный объект keys
window.keys = window.keys || {
  left: false,
  right: false,
  up: false,
  down: false,
  a: false,
  b: false
};

function setupMobileControls() {
  const controlsContainer = document.getElementById('mobile-controls');
  
  // Единый обработчик для всех кнопок
  controlsContainer.addEventListener('touchstart', handleButtonEvent);
  controlsContainer.addEventListener('touchend', handleButtonEvent);
  controlsContainer.addEventListener('touchcancel', handleButtonEvent);
  controlsContainer.addEventListener('mousedown', handleButtonEvent);
  controlsContainer.addEventListener('mouseup', handleButtonEvent);
  controlsContainer.addEventListener('mouseleave', handleButtonEvent);
}

function handleButtonEvent(e) {
  const btn = e.target.closest('.btn-control, .btn-action');
  if (!btn) return;
  
  const isActive = e.type === 'touchstart' || e.type === 'mousedown';
  const isTouch = e.type.startsWith('touch');
  
  if (isTouch) e.preventDefault();
  
  if (btn.classList.contains('btn-control')) {
    window.keys[btn.dataset.dir] = isActive;
  } else if (btn.classList.contains('btn-action')) {
    window.keys[btn.dataset.action] = isActive;
  }
}

window.addEventListener('load', setupMobileControls);