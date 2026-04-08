import { login } from './services/api.js';

const form = document.getElementById('loginForm');
const errorMessage = document.getElementById('loginError');

const redirectToDashboard = () => {
  window.location.href = 'index.html';
};

const saveSession = (user, token) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

const showError = (message) => {
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
  }
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  errorMessage.classList.add('hidden');

  const email = form.email.value.trim();
  const password = form.password.value.trim();

  if (!email || !password) {
    showError('Enter both email and password to continue.');
    return;
  }

  try {
    const result = await login(email, password);
    saveSession(result.user, result.token);
    redirectToDashboard();
  } catch (error) {
    showError(error.message || 'Unable to log in.');
  }
});
