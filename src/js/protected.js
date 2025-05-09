import API_URL from "./config";

const contentDiv = document.getElementById('content'); // Hämtar elementet med id "content"
const errorP = document.getElementById('error'); // Hämtar elementet med id "error"
const token = sessionStorage.getItem('jwt'); // Hämtar JWT-token från sessionStorage

// Om token inte finns, visa felmeddelande
if (!token) {
  errorP.textContent = 'Du är inte inloggad.';
} else {
  // Om token finns, begär den skyddade resursen
  const payload = JSON.parse(atob(token.split('.')[1]));
  const username = payload.username; 
  const email = payload.email;

  fetch(`${API_URL}/protected`, {
    headers: {
      Authorization: `Bearer ${token}` // Skickar med token i Authorization-headern
    }
  })
    .then(res => {
      // Om svaret inte är okej, hämta felmeddelande
      if (!res.ok) throw new Error('Ej behörig'); 
      return res.json();
    })
    .then(data => {
      // Om svaret är OK, visa innehållet
      contentDiv.innerHTML = `
        <p>Välkommen, <strong>${username}</strong>!</p>
        <p>Den här sidan kan man endast se om man är inloggad. Ditt namn ovan hämtas från databasen</p>
        <p>Din email hämtad från databasen: ${email}</p>
        <button id="logout">Logga ut</button>
      `;
      // Lägger på eventlyssnare på logga ut-knappen
      document.getElementById('logout').addEventListener('click', () => {
        sessionStorage.removeItem('jwt'); // Tar bort token från sessionStorage
        window.location.href = '/index.html';
      });
    })
    .catch(err => {
      errorP.textContent = 'Kunde inte hämta innehållet.';
      console.error(err);
    });
}