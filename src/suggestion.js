import { createAuthModal } from "./utils"

export class Suggestion {
  static create(suggestion) {
    if (!localStorage.getItem('idToken')) {
      createAuthModal({
          title: 'Warning!',
          data: '<div class="mui--text-accent mui--text-headline text-center">Authorisation Error.</div>'
      })
    } else {
      return fetch(`https://urban-app-a085c-default-rtdb.firebaseio.com/suggestions.json?auth=${JSON.parse(localStorage.getItem('idToken'))}`, {
        method: 'POST',
        body: JSON.stringify(suggestion),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(response => {
        suggestion.id = response.name
        return suggestion
      })
      .then(addToLocalStorage)
      .then(Suggestion.renderList)
      .then(() => createAuthModal({
        title: 'Suggestion successfully added!',
        data: '<div class="mui--text-dark-secondary mui--text-headline text-center">Thanks for participating in the project.</div>'
    }))
    }
  }
  static renderList() {
    const suggestions = getSuggestionsFromLocalStorage()
    const html = suggestions.length
      ? suggestions.map(toList).join('')
      : `<div class="mui--text-subhead suggestion-text">You haven't suggested anything yet</div>`
    const list = document.getElementById('list')
    list.innerHTML = html
  }
}

export function getAllSuggestions() {
  return fetch('https://urban-app-a085c-default-rtdb.firebaseio.com/suggestions.json')
  .then(response => response.json())
  .then(response => {
    if (response && response.error) {
      return `<p class="error">${response.error}</p>`
    }

    return response ? Object.keys(response).map(key => ({
      ...response[key],
      id: key
    })) : []
  })
}

export function listToHTML(suggestions) {
  return suggestions.length
      ? `<ol class="mui--text-title">${suggestions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
      : '<p class="mui--text-title">No suggestions yet</p>'
}

function addToLocalStorage(suggestion) {
  const suggestions = getSuggestionsFromLocalStorage()
  suggestions.push(suggestion)
  localStorage.setItem('suggestions', JSON.stringify(suggestions))
}

function getSuggestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('suggestions') || '[]')
}

function toList(suggestion) {
  return `
    <div class="mui--text-subhead suggestion-text">${suggestion.text}</div>
    <div class="mui-divider"></div>
  `
}
