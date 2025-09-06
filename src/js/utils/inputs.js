const findInputElement = selectors => {
  for (let selector of selectors) {
    const element = document.querySelector(selector)
    if (element) return element
  }
  return null
}

export const getUsernameInput = () => {
  const usernameSelectors = [
    'input[type="text"]',
    'input[type="email"]',
    'input[name*="email"]',
    'input[name*="name"]',
    'input[name="text"]',
    'input[placeholder*="email"]',
    'input[id*="email"]'
  ]
  return findInputElement(usernameSelectors)
}

export const getPasswordInput = () => {
  const passwordSelectors = [
    'input[type="password"]',
    'input[name*="password"]',
    'input[placeholder*="password"]',
    'input[id*="password"]'
  ]
  return findInputElement(passwordSelectors)
}
