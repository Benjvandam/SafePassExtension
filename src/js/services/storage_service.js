const setSessionStorage = async(value) => {
  return new Promise(resolve => chrome.storage.session.set(value, resolve))
}

const getSessionStorage = async(key) => {
  return new Promise(resolve => {
    chrome.storage.session.get([key], result => resolve(result[key]))
  })
}

const clearSessionStorage = async(key) => {
  return new Promise(resolve => {
    chrome.storage.session.remove([key], () => resolve())
  })
}

export { 
  setSessionStorage, 
  getSessionStorage, 
  clearSessionStorage 
}