const navToggle = document.querySelector('.nav-toggle');
const globalNav = document.querySelector('.global-nav');

navToggle.addEventListener('click', () => {
  globalNav.classList.toggle('active');
});

document.querySelectorAll('.global-nav a').forEach(link => {
  link.addEventListener('click', () => globalNav.classList.remove('active'));
});

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
}

function addWeeks(dateString, weeks) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + weeks * 7);
  return formatDate(date);
}

function calculateWeeks() {
  const startDate = document.getElementById('startDate').value;
  const result = document.getElementById('weekResult');
  if (!startDate) {
    result.innerHTML = '開始日を入力してください。';
    return;
  }
  result.innerHTML = `
    <strong>24週後：</strong>${addWeeks(startDate, 24)}<br>
    <strong>64週後：</strong>${addWeeks(startDate, 64)}<br>
    <strong>72週後：</strong>${addWeeks(startDate, 72)}
  `;
}

function calculateBMI() {
  const height = Number(document.getElementById('height').value);
  const weight = Number(document.getElementById('weight').value);
  const result = document.getElementById('bmiResult');

  if (!height || !weight) {
    result.innerHTML = '身長と体重を入力してください。';
    return;
  }

  const h = height / 100;
  const bmi = weight / (h * h);
  const standardWeight = 22 * h * h;
  const bmi25 = 25 * h * h;
  const bmi35 = 35 * h * h;

  result.innerHTML = `
    <strong>BMI：</strong>${bmi.toFixed(1)}<br>
    <strong>標準体重 BMI22：</strong>${standardWeight.toFixed(1)} kg<br>
    <strong>BMI25相当：</strong>${bmi25.toFixed(1)} kg<br>
    <strong>BMI35相当：</strong>${bmi35.toFixed(1)} kg
  `;
}

function calculateWeightGoals() {
  const weight = Number(document.getElementById('currentWeight').value);
  const result = document.getElementById('weightGoalResult');

  if (!weight) {
    result.innerHTML = '現在体重を入力してください。';
    return;
  }

  const goals = [5, 10, 15, 20].map(percent => {
    const goalWeight = weight * (1 - percent / 100);
    return `<strong>${percent}%減量：</strong>${goalWeight.toFixed(1)} kg`;
  });

  result.innerHTML = goals.join('<br>');
}
