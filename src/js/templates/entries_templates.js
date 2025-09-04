export const sidebar = (entries) => {
  return entries.map(entry => (`
    <div class="entry-item"
      data-action="click->entries#updateMain"
      data-entries-entry-param='${JSON.stringify(entry)}'
      data-search-target="item"
    >
      <div class="entry-favicon">
        <img src="https://www.google.com/s2/favicons?domain=${entry.url}&sz=32" />
      </div>
      <div>
        ${entry.name}
      </div>
    </div>
  `)).join('')
}

export const main = (entry) => {
  return `
  <div>
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div class="d-flex align-items-center">
        <div class="entry-favicon">
          <img src="https://www.google.com/s2/favicons?domain=${entry.url}&sz=32" />
        </div>
        <div>
          ${entry.name}
        </div>
      </div>
      <div class="d-flex align-items-center">
        <button
          class="btn btn-sm btn-outline-primary border-0"
          data-action="click->entries#navigateToLogin"
          data-entries-entry-param='${JSON.stringify(entry)}'
        >
          <i class="bi bi-box-arrow-in-right"></i>
        </button>
        <button
          class="btn btn-sm btn-outline-primary border-0"
          data-action="click->entries#fillInCredentials"
          data-entries-entry-param='${JSON.stringify(entry)}'
        >
          <i class="bi bi-lightning-charge-fill"></i>
        </button>
      </div>
    </div>
    <div>
      <ul class="list-group">
        <li class="py-0 list-group-item d-flex justify-content-between align-items-center">
          <div class="form-floating w-100">
            <input type="text" readonly class="form-control-plaintext px-0 pb-0" id="usernameInput" placeholder="username" value="${entry.username}">
            <label class="fw-bold text-dark px-0" for="usernameInput">Username</label>
          </div>
          <div class="d-flex">
            <button
              class="btn btn-sm btn-outline-primary border-0"
              data-controller="clipboard"
              data-action="click->clipboard#copy"
              data-clipboard-content-param="${entry.username}"
            >
            <i class="bi bi-clipboard-plus"></i>
            </button>
          </div>
        </li>
        <li class="py-0 list-group-item d-flex justify-content-between align-items-center" data-controller="toggle-password">
          <div class="form-floating w-100">
            <input type="password" readonly class="form-control-plaintext px-0 pb-0" id="passwordInput" placeholder="password" value="${entry.password}" data-toggle-password-target="input">
            <label class="fw-bold text-dark px-0" for="passwordInput">Password</label>
          </div>
          <div class="d-flex">
            <button
              class="btn btn-sm btn-outline-primary border-0"
              data-action="click->toggle-password#toggle"
            >
              <i class="bi bi-eye"></i>
            </button>
            <button
              class="btn btn-sm btn-outline-primary border-0"
              data-controller="clipboard"
              data-action="click->clipboard#copy"
              data-clipboard-content-param="${entry.password}"
            >
              <i class="bi bi-clipboard-check"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="text-center small">
  <div>
    Modified at: ${entry.updated_at}
  </div>
  <div>
    Created at: ${entry.created_at}
  </div>
</div>
  `
}
