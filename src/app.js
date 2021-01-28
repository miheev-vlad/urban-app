import { authWithEmailAndPassword, signupNewUser, getAuthForm, getRegisterForm } from './auth'
import './styles.css'
import { Suggestion, getAllSuggestions, listToHTML } from './suggestion'
import { createAllSuggestionsModal, createAuthModal, isAuth, isSignUp } from './utils'

const linkBtn = document.getElementById('link-btn')
const authBtn = document.getElementById('auth-btn')
const registerBtn = document.getElementById('register-btn')
const form = document.getElementById('form')
const input = form.querySelector('#suggestion-input')
const submitBtn = form.querySelector('#submit')

window.addEventListener('load', showAdd)
window.addEventListener('load', Suggestion.renderList)
linkBtn.addEventListener('click', showAllSuggestions)
authBtn.addEventListener('click', openAuthModal)
registerBtn.addEventListener('click', openSignUpModal)
form.addEventListener('submit', submitFormHandler)

function showAdd() {
  if (localStorage.getItem('idToken')) {
    submitBtn.disabled = false
    input.disabled = false
    authBtn.disabled = true
    registerBtn.disabled = true
  }
}

function showAllSuggestions() {
  getAllSuggestions()
    .then(listToHTML)
    .then(createAllSuggestionsModal)
}

function openAuthModal() {
  createAuthModal({
    title: 'Authorization', 
    data: getAuthForm()})
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, {once: true})
}

function openSignUpModal() {
  createAuthModal({
    title: 'Registration', 
    data: getRegisterForm()})
  document
    .getElementById('auth-form')
    .addEventListener('submit', signUpFormHandler, {once: true})
}

function authFormHandler(event) {
  event.preventDefault()
  const email = event.target.querySelector('#email').value
  const password = event.target.querySelector('#password').value
  const btn = event.target.querySelector('#submit-login')
  btn.disabled = true
  authWithEmailAndPassword(email, password)
    .then(isAuth)
    .then(createAuthModal)
    .then(() => btn.disabled = false)
}

function signUpFormHandler(event) {
  event.preventDefault()
  const email = event.target.querySelector('#email').value
  const password = event.target.querySelector('#password').value
  const btn = event.target.querySelector('#submit-register')
  btn.disabled = true
  signupNewUser(email, password)
    .then(isSignUp)
    .then(createAuthModal)
    .then(() => btn.disabled = false)
}

function submitFormHandler(event) {
  event.preventDefault()

  const suggestion = {
    text: input.value.trim(),
    date: new Date().toJSON()
  }
  submitBtn.disabled = true

  Suggestion.create(suggestion).then(() => {
      input.value = ''
      input.className = ''
      submitBtn.disabled = false    
    })
}
