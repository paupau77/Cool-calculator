const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let lastResult = null;
function updateDisplay(value) {
  display.textContent = value;
}
function appendValue(value) {
  if(value === '.' && currentInput.includes('.')) return; // evitar más puntos
  currentInput += value;
  updateDisplay(currentInput);
}
function clearAll() {
  currentInput = '';
  lastResult = null;
  updateDisplay('0');
}
function deleteLast() {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
  }
}
function calculate() {
  if(currentInput.trim() === '') return;
  // Reemplazar % por /100 para cálculo
  let expression = currentInput.replace(/%/g, '/100');
  try {
    // Evaluar expresión con seguridad mínima
    // Solo caracteres permitidos: números, operadores básicos y punto
    if (!/^[0-9+\-*/.()/ ]+$/.test(expression)) {
      updateDisplay('Error');
      currentInput = '';
      return;
    }
    let result = Function(`"use strict"; return (${expression})`)();
    if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
      lastResult = result;
      currentInput = result.toString();
      updateDisplay(currentInput);
    } else {
      updateDisplay('Error');
      currentInput = '';
    }
  } catch {
    updateDisplay('Error');
    currentInput = '';
  }
}
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    if (button.id === 'clear') {
      clearAll();
    } else if (button.id === 'delete') {
      deleteLast();
    } else if (button.id === 'percent') {
      appendValue('%');
    } else if (button.id === 'equals') {
      calculate();
    } else if(value !== undefined) {
      appendValue(value);
    }
  });
});
// Iniciar display
updateDisplay('0');