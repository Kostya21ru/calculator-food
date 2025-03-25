function validateWeight() {
  const weightInput = document.getElementById("weight");
  const weight = parseFloat(weightInput.value);
  if (isNaN(weight) || weight < 0 || weight > 30) {
    alert("Введите вес от 0 до 30 кг");
    weightInput.value = "";
  }
}

function calculateFood() {
  const breed = document.getElementById("breed").value;
  const age = document.getElementById("age").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const activity = document.querySelector('input[name="activity"]:checked').value;

  if (isNaN(weight) || weight < 0 || weight > 30) {
    alert("Введите корректный вес от 0 до 30 кг.");
    return;
  }

  const foodData = {
    labrador: { less_than_1: 500, "1_5": 700, more_than_5: 400 },
    ovcharka: { less_than_1: 600, "1_5": 800, more_than_5: 700 }
  };

  let baseAmount = 0;
  if (foodData[breed] && foodData[breed][age]) {
    baseAmount = foodData[breed][age];
  }

  if (weight >= 5 && weight <= 10) baseAmount *= 1.2;
  else if (weight > 10 && weight <= 20) baseAmount *= 1.3;
  else if (weight > 20 && weight <= 30) baseAmount *= 1.4;

  if (activity === "активный") baseAmount *= 1.3;

  document.getElementById("result").innerText = `Рекомендуемая норма корма: ${Math.round(baseAmount)} г/день`;
}

function toggleList(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

function generateTZ() {
  const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
  const resultList = document.getElementById('tz-result');
  resultList.innerHTML = '';
  checkboxes.forEach(cb => {
    if (cb.checked) {
      const li = document.createElement('li');
      li.innerHTML = cb.value;
      resultList.appendChild(li);
    }
  });
}

function showSection(section) {
  document.querySelector('.calculator').style.display = 'none';
  document.querySelector('.checklist').style.display = 'none';
  document.querySelector(`.${section}`).style.display = 'block';

  document.querySelectorAll('header button').forEach(link => link.classList.remove('active'));
  document.getElementById(`link-${section}`).classList.add('active');
}

window.onload = () => showSection('calculator');
