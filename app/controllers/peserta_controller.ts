import type { HttpContext } from '@adonisjs/core/http'
import Peserta from '#models/peserta'
import { pesertaValidator } from '#validators/peserta'

export default class PesertaController {
  async index({ view }: HttpContext) {
    const pesertas = await Peserta.query()
      .preload('pendaftarans', (query) => {
        query.preload('kursus')
      })
      .orderBy('created_at', 'desc')

    return view.render('peserta/index', { pesertas })
  }

  async create({ view }: HttpContext) {
    return view.render('peserta/create')
  }

  async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(pesertaValidator)

    await Peserta.create(data)

    session.flash('success', 'Peserta berhasil dibuat')
    return response.redirect().toRoute('peserta.index')
  }

  async show({ params, view }: HttpContext) {
    const peserta = await Peserta.query()
      .where('id', params.id)
      .preload('pendaftarans', (query) => {
        query.preload('kursus', (kursusQuery) => {
          kursusQuery.preload('instruktur')
        })
      })
      .firstOrFail()

    return view.render('peserta/show', { peserta })
  }

  async edit({ params, view }: HttpContext) {
    const peserta = await Peserta.findOrFail(params.id)
    return view.render('peserta/edit', { peserta })
  }

  async update({ params, request, response, session }: HttpContext) {
    const peserta = await Peserta.findOrFail(params.id)
    const data = await request.validateUsing(pesertaValidator)

    peserta.merge(data)
    await peserta.save()

    session.flash('success', 'Peserta berhasil diupdate')
    return response.redirect().toRoute('peserta.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const peserta = await Peserta.findOrFail(params.id)
    await peserta.delete()

    session.flash('success', 'Peserta berhasil dihapus')
    return response.redirect().toRoute('peserta.index')
  }
}
