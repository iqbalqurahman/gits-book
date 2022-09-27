import { Request } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Author from 'App/Models/Author'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class AuthorsController {
    public async store({ request, response }: HttpContextContract) {
        try {
            const validations = await schema.create({
                name: schema.string({}, [ 
                    rules.required() 
                ]),
            })
            const data = await request.validate({ schema: validations })
            const author = await Author.create(data)
            
            return response.status(200).json({code:200,status:'success',data:author})
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }        
    }

    public async index({ response }: HttpContextContract) {
        const data = await Author
                    .query()
                    .preload('books')
    
        return response.status(200).json({ code: 200, status: 'succuess', data: data })
    }
    
      public async show({ params, response }: HttpContextContract) {
        try {
          const data = await Author
                      .query()
                      .preload('books')
                      .where('id', params.id)
                      .firstOrFail();
    
          return response.status(200).json({ code: 200, status: 'success', data: data })
        } catch (err) {
          return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
      }
    
      public async update({ params, request, response }: HttpContextContract) {
        try {
          const validations = await schema.create({
              name: schema.string({}, [ 
                  rules.required() 
              ]),
          })
          const dataRequest = await request.validate({ schema: validations })
          const data = await Author.findBy('id', params.id)
          data?.merge(dataRequest)
    
          await data?.save()
    
          return response.status(200).json({ code: 200, status: 'success', data: data })
        } catch (err) {
          return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
      }
    
      public async destroy({ params, response }: HttpContextContract) {
        try {
          const data = await Author.findBy('id', params.id)
          await data?.delete()
    
          return response.status(200).json({ code: 200, status: 'success', data: data })
        } catch (err) {
          return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
      }
}
