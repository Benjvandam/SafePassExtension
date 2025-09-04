import { Application } from '@hotwired/stimulus'
import "@hotwired/turbo-rails"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import '../css/index.css'

import 'bootstrap'

const application = Application.start()

application.debug = false
window.Stimulus   = application

export { application }
