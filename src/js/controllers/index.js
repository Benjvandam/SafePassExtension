import { application } from '../application'

import AppController from './app_controller'
application.register('app', AppController)

import AuthController from './auth_controller'
application.register('auth', AuthController)

import EntriesController from './entries_controller'
application.register('entries', EntriesController)

import SearchController from './search_controller'
application.register('search', SearchController)

import ClipboardController from './clipboard_controller'
application.register('clipboard', ClipboardController)

import TogglePasswordController from './toggle_password_controller'
application.register('toggle-password', TogglePasswordController)