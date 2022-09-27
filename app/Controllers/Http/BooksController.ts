import { Request } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class BooksController {
    public async store({ request, response }: HttpContextContract) {
        try {
            const validations = await schema.create({
                title: schema.string({}, [ 
                    rules.required() 
                ]),
                price: schema.number(),
                author_id: schema.number(),
                publisher_id: schema.number(),
            })
            const data = await request.validate({ schema: validations })
            const book = await Book.create(data)
            
            return response.status(200).json({code:200,status:'success',data:book})
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }        
    }

    public async index({ response }: HttpContextContract) {
        const data = await Book.all()
    
        return response.status(200).json({ code: 200, status: 'succuess', data: data })
    }
    
      public async show({ params, response }: HttpContextContract) {
        try {
          const data = await Book.findBy('id', params.id)
    
          return response.status(200).json({ code: 200, status: 'success', data: data })
        } catch (err) {
          return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
      }
    
      public async update({ params, request, response }: HttpContextContract) {
        try {
            const validations = await schema.create({
                title: schema.string({}, [ 
                    rules.required() 
                ]),
                price: schema.number(),
                author_id: schema.number(),
                publisher_id: schema.number(),
            })
            const dataRequest = await request.validate({ schema: validations })
            const data = await Book.findBy('id', params.id)
            data?.merge(dataRequest)    
            await data?.save()
    
          return response.status(200).json({ code: 200, status: 'success', data: data })
        } catch (err) {
          return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
      }
    
      public async destroy({ params, response }: HttpContextContract) {
        try {
          const data = await Book.findBy('id', params.id)
          await data?.delete()
    
          return response.status(200).json({ code: 200, status: 'success', data: data })
        } catch (err) {
          return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
      }
}
