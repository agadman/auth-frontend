document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await res.json();
  
      if (res.ok) {
        const token = result.response.token;
        sessionStorage.setItem('jwt', token);
        window.location.href = '/pages/protected.html';
      } else {
        document.getElementById('message').textContent = result.error || 'Login failed';
      }
    } catch (err) {
      console.error(err);
      document.getElementById('message').textContent = 'Something went wrong';
    }
  });