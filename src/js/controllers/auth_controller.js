import { Controller } from "@hotwired/stimulus"

import { setSessionStorage, clearSessionStorage } from "../services/storage_service"

class AuthController extends Controller {
  static targets = ["email", "password", "flash"]

  async connect() {
    document.addEventListener("auth:signOut", this.signOut.bind(this))
  }

  async signIn(event) {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth", {
        method: "POST",
        body: JSON.stringify({
          email: this.emailTarget.value,
          password: this.passwordTarget.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()

      if(data.error) {
        this.flashTarget.innerHTML = `<div class="p-3 bg-danger text-white rounded my-3">${data.error[0]}</div>`
      } 

      if(data.token) {
       await setSessionStorage({ token: data.token })
       Turbo.visit("/frames/entries.html", { frame: "app" })
      }
    } catch (error) {
      console.error(error)
    }
    event.preventDefault()
  }

  async signOut(event) {
    await clearSessionStorage("token")
    Turbo.visit("/frames/signin.html", { frame: "app" })
  }
}

export default AuthController