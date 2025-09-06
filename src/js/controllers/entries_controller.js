import { Controller } from "@hotwired/stimulus"

import { getSessionStorage } from "../services/storage_service"
import { fetchEntries } from "../services/fetch_entries_service"
import { sidebar, main } from "../templates/entries_templates"

class EntriesController extends Controller {
  static targets = ["sidebar", "main"]

  async connect() {
    const token = await getSessionStorage("token")
    if (!token) {
      document.dispatchEvent(new CustomEvent("auth:signOut"))
      return
    }

    const entries = await fetchEntries()
    
    if (!entries || !entries.entries) {
      return
    }
    
    try {
      this.sidebarTarget.innerHTML = sidebar(entries.entries)
    } catch (error) {
      return
    }

    try {
      const [activeTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      })

      if (!activeTab) {
        this.mainTarget.innerHTML = main(entries.entries[0])
        return
      }

      let parsedUrl;
      try {
        parsedUrl = new URL(activeTab.url)
      } catch (error) {
        this.mainTarget.innerHTML = main(entries.entries[0])
        return
      }

      const activeEntry = entries.entries.find(entry => {
        const entryDomain = entry.url.replace(/^https?:\/\/(www\.)?/, '')
        const tabDomain = parsedUrl.hostname.replace(/^www\./, '')
        
        return entryDomain === tabDomain
      })

      if (activeEntry) {
        this.mainTarget.innerHTML = main(activeEntry)
      } else {
        this.mainTarget.innerHTML = main(entries.entries[0])
      }
    } catch (error) {
      this.mainTarget.innerHTML = main(entries.entries[0])
    }
  }

  updateMain({ params }) {
    this.mainTarget.innerHTML = main(params.entry)
  }

  navigateToLogin({ params }) {
    chrome.tabs.create({ url: params.entry.url })
  }

  async fillInCredentials({ params }) {
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    if (!activeTab) {
      return
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(activeTab.url)
    } catch (error) {
      return
    }

    const entryDomain = params.entry.url.replace(/^https?:\/\/(www\.)?/, '')
    const tabDomain = parsedUrl.hostname.replace(/^www\./, '')

    const activeEntry = entryDomain === tabDomain

    if (activeEntry) {
      chrome.tabs.sendMessage(activeTab.id, {
        username: params.entry.username,
        password: params.entry.password
      })
    }
  }
}

export default EntriesController