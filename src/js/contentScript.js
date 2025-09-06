import { getUsernameInput, getPasswordInput } from "./utils/inputs"

const autoFillSignIn = (username, password) => {
  const usernameInput = getUsernameInput()
  const passwordInput = getPasswordInput()

  if (usernameInput) {
    usernameInput.value = username
  } else {
    console.log("No username input found")
  }

  if (passwordInput) {
    passwordInput.value = password
  } else {
    console.log("No password input found")
  }
  document.querySelector('input[type="text"]').value = username
  document.querySelector('input[type="password"]').value = password
}

chrome.runtime.onMessage.addListener(message => {
  autoFillSignIn(message)
})