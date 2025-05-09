import API_URL from "./config";

// Hämtar formuläret och lägger på eventlyssnare
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Så att inte sidan laddas om vid submit
  
    // Hämtar värden från formuläret
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      // Skickar en POST-förfrågan med e-post och lösenord
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      // Om förfrågan lyckas, lagra JWT-token i sessionStorage
      const result = await res.json();
      if (res.ok) {
        const token = result.response.token;
        sessionStorage.setItem('jwt', token); 
        window.location.href = '/protected.html'; // Omdirigera till skyddad sida
      } else {
        document.getElementById('message').textContent = result.error || 'Login failed';
      }
    } catch (err) {
      console.error(err);
      document.getElementById('message').textContent = 'Something went wrong';
    }
  });