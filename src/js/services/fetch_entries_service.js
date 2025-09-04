import { getSessionStorage } from "./storage_service"

const fetchEntries = async() => {
  const token = await getSessionStorage("token")
  try {
    const response = await fetch("http://localhost:3000/api/v1/entries", {
      method: "GET",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
    })

    const entries = await response.json()

    if (entries.errors) {
      document.dispatchEvent(new CustomEvent('auth:signOut'))
      return
    } else {
      return entries
    }
  } catch (error) {
    console.error(error)
  }
}

export { fetchEntries }