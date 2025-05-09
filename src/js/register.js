import API_URL from "./config";

//Hämtar formuläret och lägger på en eventlyssnare   
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Så att inte sidan laddas om vid submit

    // Hämtar värdena från formuläret
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      // Skickar en POST-förfrågan till API:et med användardata
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      // Om svaret inte är OK, hämta och skriv ut error-meddelandet
      const data = await res.json();
      document.getElementById('message').textContent = data.message || data.error;
    } catch (err) {
      console.error(err);
      document.getElementById('message').textContent = 'Something went wrong';
    }
  });