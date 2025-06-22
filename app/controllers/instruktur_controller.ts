import type { HttpContext } from '@adonisjs/core/http'
import Instruktur from '#models/instruktur'
import { instrukturValidator } from '#validators/instruktur'

export default class InstrukturController {
  async index({ view }: HttpContext) {
    const instrukturs = await Instruktur.query()
      .preload('kursuses')
      .orderBy('created_at', 'desc')

    return view.render('instruktur/index', { instrukturs })
  }

  async create({ view }: HttpContext) {
    return view.render('instruktur/create')
  }

  async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(instrukturValidator)

    await Instruktur.create(data)

    session.flash('success', 'Instruktur berhasil dibuat')
    return response.redirect().toRoute('instruktur.index')
  }

  async show({ params, view }: HttpContext) {
    const instruktur = await Instruktur.query()
      .where('id', params.id)
      .preload('kursuses')
      .firstOrFail()

    return view.render('instruktur/show', { instruktur })
  }

  async edit({ params, view }: HttpContext) {
    const instruktur = await Instruktur.findOrFail(params.id)
    return view.render('instruktur/edit', { instruktur })
  }

  async update({ params, request, response, session }: HttpContext) {
    const instruktur = await Instruktur.findOrFail(params.id)
    const data = await request.validateUsing(instrukturValidator)

    instruktur.merge(data)
    await instruktur.save()

    session.flash('success', 'Instruktur berhasil diupdate')
    return response.redirect().toRoute('instruktur.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const instruktur = await Instruktur.findOrFail(params.id)
    await instruktur.delete()

    session.flash('success', 'Instruktur berhasil dihapus')
    return response.redirect().toRoute('instruktur.index')
  }
}
