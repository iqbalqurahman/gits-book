/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('register', 'Users/AuthController.register').as('register')
  Route.post('login', 'Users/AuthController.login').as('login')
  Route.post('logout', 'Users/AuthController.logout').as('logout')

}).prefix('api/v1/user/')

Route.group(() => {
  Route.post('author', 'AuthorsController.store')
  Route.get('author', 'AuthorsController.index')
  Route.get('author/:id', 'AuthorsController.show')
  Route.put('author/:id', 'AuthorsController.update')
  Route.delete('author/:id', 'AuthorsController.destroy')

  Route.post('publishers', 'PublishersController.store')
  Route.get('publishers', 'PublishersController.index')
  Route.get('publishers/:id', 'PublishersController.show')
  Route.put('publishers/:id', 'PublishersController.update')
  Route.delete('publishers/:id', 'PublishersController.destroy')

  Route.post('book', 'BooksController.store')
  Route.get('book', 'BooksController.index')
  Route.get('book/:id', 'BooksController.show')
  Route.put('book/:id', 'BooksController.update')
  Route.delete('book/:id', 'BooksController.destroy')
  
}).prefix('api/v1/').middleware(['auth'])