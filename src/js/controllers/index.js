import { application } from '../application'

import AppController from './app_controller'
application.register('app', AppController)

import AuthController from './auth_controller'
application.register('auth', AuthController)