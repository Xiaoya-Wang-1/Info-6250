function layoutPage(title, bodyContent) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <link rel="stylesheet" href="/style.css">
      </head>
     
      <body>
        <header>
          <h1>Session App</h1>
        </header>
        <main>
          ${bodyContent}
        </main>
      </body>
      </html>
    `;
  }
  

  function renderLoginPage() {
    const bodyContent = `
      <h2>Login</h2>
      <form action="/login" method="POST">
        <label for="username">Username:</label>
        <input id="username" name="username" class="uername-input" type="text" />
        <button type="submit" class="login-button">Login</button>
      </form>
    `;
    return layoutPage('Login Page', bodyContent);
  }
  

  function renderDataPage(username, storedWord) {
    const bodyContent = `
      <h2>Welcome, ${username}!</h2>
      <section class="stored-word-section">
        <p><strong>Current stored word:</strong> "${storedWord}"</p>
        <form action="/update-word" method="POST" class="word-form">
          <label for="newWord">Update stored word:</label>
          <input id="newWord" class="word-input" name="newWord" type="text" value="${storedWord}" />
          <button type="submit" class="change-button">Change</button>
        </form>
      </section>
      <section class="logout-section">
        <form action="/logout" method="POST">
          <button type="submit" class="logout-button">Logout</button>
        </form>
      </section>
    `;
    return layoutPage('Your Data', bodyContent);
  }
  
 
  function renderErrorPage(statusCode, message) {
    const bodyContent = `
      <h2 class="error-title">Error</h2>
      <p>${message}</p>
      <p class="return-box"><a href="/" class="return-home">Return to home</a></p>
    `;
    
    return layoutPage(`Error ${statusCode}`, bodyContent);
  }
  
  module.exports = {
    renderLoginPage,
    renderDataPage,
    renderErrorPage,
  };  