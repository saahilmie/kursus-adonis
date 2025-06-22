import type { HttpContext } from '@adonisjs/core/http'
import Kursus from '#models/kursus'
import Instruktur from '#models/instruktur'
import { kursusValidator } from '#validators/kursus'

export default class KursusController {
  async index({ view }: HttpContext) {
    const kursuses = await Kursus.query()
      .preload('instruktur')
      .preload('pendaftarans')
      .orderBy('created_at', 'desc')

    return view.render('kursus/index', { kursuses })
  }

  async publicIndex({ view }: HttpContext) {
    const kursuses = await Kursus.query()
      .preload('instruktur')
      .orderBy('created_at', 'desc')

    return view.render('kursus/public', { kursuses })
  }

  async show({ params, view }: HttpContext) {
    const kursus = await Kursus.query()
      .where('id', params.id)
      .preload('instruktur')
      .preload('materis')
      .firstOrFail()

    return view.render('kursus/show', { kursus })
  }

  async create({ view }: HttpContext) {
    const instrukturs = await Instruktur.all()
    return view.render('kursus/create', { instrukturs })
  }

  async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(kursusValidator)

    await Kursus.create(data)

    session.flash('success', 'Kursus berhasil dibuat')
    return response.redirect().toRoute('kursus.index')
  }

  async edit({ params, view }: HttpContext) {
    const kursus = await Kursus.findOrFail(params.id)
    const instrukturs = await Instruktur.all()

    return view.render('kursus/edit', { kursus, instrukturs })
  }

  async update({ params, request, response, session }: HttpContext) {
    const kursus = await Kursus.findOrFail(params.id)
    const data = await request.validateUsing(kursusValidator)

    kursus.merge(data)
    await kursus.save()

    session.flash('success', 'Kursus berhasil diupdate')
    return response.redirect().toRoute('kursus.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const kursus = await Kursus.findOrFail(params.id)
    await kursus.delete()

    session.flash('success', 'Kursus berhasil dihapus')
    return response.redirect().toRoute('kursus.index')
  }
}
