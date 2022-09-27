import { Request } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publisher from 'App/Models/Publisher'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class PublishersController {
    public async store({ request, response }: HttpContextContract) {
        try {
            const validations = await schema.create({
                name: schema.string({}, [ 
                    rules.required() 
                ]),
            })
            const data = await request.validate({ schema: validations })
            const publisher = await Publisher.create(data)
            
            return response.status(200).json({code:200,status:'success',data:publisher})
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }        
    }

    public async index({ response }: HttpContextContract) {
        const data = await Publisher.all()
    
        return response.status(200).json({ code: 200, status: 'succuess', data: data })
    }
    
      public async show({ params, response }: HttpContextContract) {
        try {
          const data = await Publisher.findBy('id', params.id)
    
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
          const data = await Publisher.findBy('id', params.id)
          data?.merge(dataRequest)
    
          await data?.save()
    
          return response.status(200).json({ code: 200, status: 'success', data: data })
        } catch (err) {
          return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
      }
    
      public async destroy({ params, response }: HttpContextContract) {
        try {
          const data = await Publisher.findBy('id', params.id)
          await data?.delete()
    
          return response.status(200).json({ code: 200, status: 'success', data: data })
        } catch (err) {
          return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
      }
}
