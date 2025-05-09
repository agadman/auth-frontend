import API_URL from "./config";
const contentDiv = document.getElementById('content');
const errorP = document.getElementById('error');
const token = sessionStorage.getItem('jwt');

if (!token) {
  errorP.textContent = 'Du är inte inloggad.';
} else {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const username = payload.username; 
  const email = payload.email;

  fetch(`${API_URL}/protected`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error('Ej behörig');
      return res.json();
    })
    .then(data => {
      contentDiv.innerHTML = `
        <p>Välkommen, <strong>${username}</strong>!</p>
        <p>Den här sidan kan man endast se om man är inloggad. Ditt namn ovan hämtas från databasen.</p>
        <p>Din email hämtad från databasen: ${email}</p>
        <button id="logout">Logga ut</button>
      `;
      document.getElementById('logout').addEventListener('click', () => {
        sessionStorage.removeItem('jwt');
        window.location.href = '/index.html';
      });
    })
    .catch(err => {
      errorP.textContent = 'Kunde inte hämta innehållet.';
      console.error(err);
    });
}