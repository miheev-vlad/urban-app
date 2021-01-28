export function createAllSuggestionsModal(content) {
  const modal = document.createElement('div')
  modal.classList.add('suggestion-modal')
  const html = `
    <div class="mui--text-dark-secondary mui--text-display1 text-center">Suggestions List</div>
    <div class="suggestion-modal-content">${content}</div>
  `
  modal.innerHTML = html
  mui.overlay('on', modal)
}

export function createAuthModal(content) {
  const modal = document.createElement('div')
  modal.classList.add('auth-modal')
  const html = `
    <div class="mui--text-dark-secondary mui--text-display1 text-center">${content.title}</div>
    <div class="auth-modal-content">${content.data}</div>
  `
  modal.innerHTML = html
  const options = {
    'onclose': () => location.reload()
  };
  mui.overlay('on', options, modal)
}

export function isAuth(token) {
  if (!token) {
    return Promise.resolve({
      title: 'Warning!',
      data: '<div class="mui--text-accent mui--text-headline text-center">Authorisation Error.</div>'})
  } else {
    localStorage.setItem('idToken', JSON.stringify(token))
    return Promise.resolve({
      title: 'Successful authorisation!',
      data: '<div class="mui--text-dark-secondary mui--text-headline text-center">Now you can add your suggestions.</div>'})
  }
}

export function isSignUp(token) {
  if (!token) {
    return Promise.resolve({
      title: 'Warning!',
      data: '<div class="mui--text-accent mui--text-headline text-center">The email is already in use by another account.</div>'})
  } else {
    localStorage.setItem('idToken', JSON.stringify(token))
    return Promise.resolve({
      title: 'Successful registration!',
      data: '<div class="mui--text-dark-secondary mui--text-headline text-center">Now you can add your suggestions.</div>'})
  }
}
