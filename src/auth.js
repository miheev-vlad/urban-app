export function getAuthForm() {
  return `
  <form class="mui-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
      <input
        type="email"
        id="email"
        required
      >
      <label for="email">Email</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
    <input
      type="password"
      id="password"
      required
    >
    <label for="password">Password</label>
    </div>
    <button
      type="submit"
      id="submit-login"
      class="mui-btn mui-btn--raised mui-btn--primary"
    >
      Log In
  </form>
  `
}

export function getRegisterForm() {
  return `
  <form class="mui-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
      <input
        type="email"
        id="email"
        required
      >
      <label for="email">Email</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
    <input
      type="password"
      id="password"
      required
    >
    <label for="password">Password</label>
    </div>
    <button
    type="submit"
    id="submit-register"
    class="mui-btn mui-btn--raised mui-btn--accent"
    >
      SignUp
    </button>
  </form>
  `
}

export function authWithEmailAndPassword(email, password) {
  const apiKey = `AIzaSyAs_7iLebJpRpJk4tPXhAuTA2mUKtkcZjI`
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({
      email, password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => data.idToken)
}

export function signupNewUser(email, password) {
  const apiKey = `AIzaSyAs_7iLebJpRpJk4tPXhAuTA2mUKtkcZjI`
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({
      email, password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => data.idToken)
}