import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { Request } from '@adonisjs/core/build/standalone'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
   try {
        const validations = await schema.create({
            email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
            username: schema.string({}, [rules.unique({ table: 'users', column: 'username' })]),
            password: schema.string({}, [rules.confirmed()]),
        })
        const data = await request.validate({ schema: validations })
        const user = await User.create(data)
        return response.status(200).json({code:200,status:'success',data:user})
    } catch (err) {
        return response.status(500).json({ code: 500, status: 'error', message: err.message })
    } 
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const password = await request.input('password')
    const email = await request.input('email')
    const username = await request.input('username')

    try {
        const token = await auth.use('api').attempt(username, password, {
            expiresIn: '24hours',
        })
        return response.status(200).json({code:200,status:'success',data:token.toJSON()})
    } catch {
      return response.status(400).send({ error: { message: 'User with provided credentials could not be found' } })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.status(200).json({code:200,status:'success'})
  }
}